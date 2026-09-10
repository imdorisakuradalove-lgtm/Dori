import * as Network from 'expo-network';
import { useEffect, useState } from 'react';
import { AppState } from 'react-native';

export type NetworkStatus = 'checking' | 'online' | 'offline';

/**
 * Real, minimal connectivity check (expo-network) — not a fake status
 * badge. Used so the UI can honestly say whether Level 3 (online
 * translation) is currently reachable, per docs/ARCHITECTURE.md.
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

    return () => {
      cancelled = true;
      subscription.remove();
    };
  }, []);

  return status;
}
