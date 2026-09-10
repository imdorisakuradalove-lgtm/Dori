import * as Network from 'expo-network';
import { useEffect, useState } from 'react';
import { AppState } from 'react-native';

export type NetworkStatus = 'checking' | 'online' | 'offline';

const POLL_INTERVAL_MS = 10_000;

/**
 * Real, minimal connectivity check (expo-network) — not a fake status
 * badge. Never reports "online" just because the app launched; only after
 * a check actually succeeds. Re-checks when the app returns to the
 * foreground and on a light interval while active, so a transient change
 * (e.g. entering/leaving airplane mode) is reflected without needing to
 * background/foreground the app. A failed check degrades to "offline"
 * rather than throwing, so a flaky read never crashes the screen. Used so
 * the UI can honestly say whether Level 3 (online translation) is
 * currently reachable, per docs/ARCHITECTURE.md.
 */
export function useNetworkStatus(): NetworkStatus {
  const [status, setStatus] = useState<NetworkStatus>('checking');

  useEffect(() => {
    let cancelled = false;

    async function refresh() {
      let next: NetworkStatus;
      try {
        const state = await Network.getNetworkStateAsync();
        next = state.isConnected && state.isInternetReachable !== false ? 'online' : 'offline';
      } catch {
        next = 'offline';
      }
      if (!cancelled) setStatus(next);
    }

    refresh();
    const subscription = AppState.addEventListener('change', (nextState) => {
      if (nextState === 'active') refresh();
    });
    const interval = setInterval(() => {
      if (AppState.currentState === 'active') refresh();
    }, POLL_INTERVAL_MS);

    return () => {
      cancelled = true;
      subscription.remove();
      clearInterval(interval);
    };
  }, []);

  return status;
}
