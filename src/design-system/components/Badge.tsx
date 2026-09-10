import { StyleSheet, Text, View } from 'react-native';

import { color, radius, spacing, typography } from '../tokens';

export type BadgeTone = 'neutral' | 'success' | 'warning' | 'accent';

type Props = {
  label: string;
  tone?: BadgeTone;
};

const toneStyles: Record<BadgeTone, { bg: string; text: string }> = {
  neutral: { bg: color.surfaceAlt, text: color.textSecondary },
  success: { bg: '#12291E', text: color.success },
  warning: { bg: '#332413', text: color.warning },
  accent: { bg: color.accentSoft, text: color.accent },
};

/** Small status label — used to keep capability levels (offline/online, draft content) honest and visible. */
export function Badge({ label, tone = 'neutral' }: Props) {
  const t = toneStyles[tone];
  return (
    <View style={[styles.base, { backgroundColor: t.bg }]}>
      <Text style={[typography.caption, { color: t.text }]} numberOfLines={1}>
        {label.toUpperCase()}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.pill,
  },
});
