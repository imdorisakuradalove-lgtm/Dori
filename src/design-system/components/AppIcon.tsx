import { SymbolView, type SymbolViewProps } from 'expo-symbols';
import type { ColorValue } from 'react-native';

import type { IconName } from '../IconName';

type Props = {
  name: IconName;
  size?: number;
  tintColor?: ColorValue;
};

/**
 * Thin wrapper around expo-symbols' SymbolView.
 *
 * SymbolView's `name` prop is typed against the full SF Symbols /
 * Material Symbols literal unions, which is far more precise than this
 * app's simple `{ios, android, web}` triples need to be at this phase. The
 * cast is isolated here rather than at every call site. A wrong name is a
 * cosmetic miss (the icon silently doesn't render, `fallback` covers it),
 * not a functional break — but names should still be spot-checked against
 * the real SF Symbols / Material Symbols catalogs on a physical device
 * before shipping (see Phase 0 report).
 */
export function AppIcon({ name, size = 24, tintColor }: Props) {
  return (
    <SymbolView
      name={name as SymbolViewProps['name']}
      size={size}
      tintColor={tintColor}
      fallback={null}
    />
  );
}
