import Constants from 'expo-constants';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Badge } from '@/src/design-system/components/Badge';
import { Card } from '@/src/design-system/components/Card';
import { ScreenContainer } from '@/src/design-system/components/ScreenContainer';
import { SectionHeading } from '@/src/design-system/components/SectionHeading';
import { color, radius, spacing, typography } from '@/src/design-system/tokens';
import { type FontSize, useSettingsStore } from '@/src/state/settingsStore';

export default function MeScreen() {
  const fontSize = useSettingsStore((state) => state.fontSize);
  const storageAvailable = useSettingsStore((state) => state.storageAvailable);
  const lastWriteFailed = useSettingsStore((state) => state.lastWriteFailed);
  const setFontSize = useSettingsStore((state) => state.setFontSize);
  const version = Constants.expoConfig?.version ?? 'unknown';

  const settingsBadge = !storageAvailable
    ? { label: 'Local storage unavailable — not saved', tone: 'warning' as const }
    : lastWriteFailed
      ? { label: 'Could not save — will retry next change', tone: 'warning' as const }
      : { label: 'Saved on this device', tone: 'success' as const };

  return (
    <ScreenContainer>
      <SectionHeading title="Me" subtitle="No account required — everything here stays on this device." />

      <Card>
        <Text style={[typography.label, styles.rowLabel]}>Text size</Text>
        <View style={styles.fontRow}>
          {(['default', 'large'] as FontSize[]).map((size) => {
            const selected = size === fontSize;
            return (
              <Pressable
                key={size}
                accessibilityRole="button"
                accessibilityState={{ selected }}
                onPress={() => setFontSize(size)}
                style={[styles.fontChip, selected && styles.fontChipSelected]}>
                <Text style={[typography.label, { color: selected ? color.textOnAccent : color.textSecondary }]}>
                  {size === 'default' ? 'Default' : 'Large'}
                </Text>
              </Pressable>
            );
          })}
        </View>
        <Text
          style={[
            styles.preview,
            { color: color.textPrimary, fontSize: fontSize === 'large' ? 24 : typography.body.fontSize },
          ]}>
          助けてください。
        </Text>
        <Badge label={settingsBadge.label} tone={settingsBadge.tone} />
      </Card>

      <Card>
        <Text style={[typography.label, styles.rowLabel]}>Feedback</Text>
        <Text style={[typography.body, styles.rowBody]}>Coming in a later phase.</Text>
      </Card>

      <Card>
        <Text style={[typography.label, styles.rowLabel]}>About</Text>
        <Text style={[typography.body, styles.rowBody]}>
          A real-world communication survival tool for Chinese travelers in Japan.
        </Text>
        <Text style={[typography.caption, styles.version]}>Version {version} · Phase 1</Text>
      </Card>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  rowLabel: {
    color: color.textPrimary,
    marginBottom: spacing.sm,
  },
  rowBody: {
    color: color.textSecondary,
  },
  fontRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  fontChip: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    backgroundColor: color.surfaceAlt,
    borderWidth: 1,
    borderColor: color.border,
  },
  fontChipSelected: {
    backgroundColor: color.accent,
    borderColor: color.accent,
  },
  preview: {
    marginBottom: spacing.md,
  },
  version: {
    color: color.textMuted,
    marginTop: spacing.sm,
  },
});
