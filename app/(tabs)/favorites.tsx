import { StyleSheet, Text, View } from 'react-native';

import { AppIcon } from '@/src/design-system/components/AppIcon';
import { Badge } from '@/src/design-system/components/Badge';
import { Card } from '@/src/design-system/components/Card';
import { ScreenContainer } from '@/src/design-system/components/ScreenContainer';
import { SectionHeading } from '@/src/design-system/components/SectionHeading';
import { color, spacing, typography } from '@/src/design-system/tokens';

export default function FavoritesScreen() {
  return (
    <ScreenContainer>
      <SectionHeading title="Favorites" subtitle="Phrases you pin will always be available here, offline." />

      <Card style={styles.emptyCard}>
        <AppIcon name={{ ios: 'star', android: 'star_outline', web: 'star_outline' }} tintColor={color.textMuted} size={32} />
        <Text style={[typography.heading, styles.emptyTitle]}>No favorites yet</Text>
        <Text style={[typography.body, styles.emptyBody]}>
          Favoriting isn&apos;t wired up to local storage in this build yet. Once it is (Phase 1), anything
          you pin from Scenes or Translate will stay here and keep working offline.
        </Text>
        <View style={styles.badgeRow}>
          <Badge label="Local storage — coming soon" tone="warning" />
        </View>
      </Card>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  emptyCard: {
    alignItems: 'flex-start',
    gap: spacing.sm,
  },
  emptyTitle: {
    color: color.textPrimary,
  },
  emptyBody: {
    color: color.textSecondary,
  },
  badgeRow: {
    marginTop: spacing.xs,
  },
});
