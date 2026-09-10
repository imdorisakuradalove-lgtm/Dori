import { StyleSheet, Text, View } from 'react-native';

import { AppIcon } from '@/src/design-system/components/AppIcon';
import { Badge } from '@/src/design-system/components/Badge';
import { Card } from '@/src/design-system/components/Card';
import { ScreenContainer } from '@/src/design-system/components/ScreenContainer';
import { SectionHeading } from '@/src/design-system/components/SectionHeading';
import { color, spacing, typography } from '@/src/design-system/tokens';
import { PhraseCard } from '@/src/features/shared/components/PhraseCard';
import { useFavoritesStore } from '@/src/state/favoritesStore';

export default function FavoritesScreen() {
  const favorites = useFavoritesStore((state) => state.favorites);
  const storageAvailable = useFavoritesStore((state) => state.storageAvailable);

  return (
    <ScreenContainer>
      <SectionHeading title="Favorites" subtitle="Saved on this device — no account, works offline." />

      {!storageAvailable ? (
        <Card style={styles.emptyCard}>
          <AppIcon name={{ ios: 'exclamationmark.triangle', android: 'warning', web: 'warning' }} tintColor={color.warning} size={28} />
          <Text style={[typography.heading, styles.emptyTitle]}>Local storage unavailable</Text>
          <Text style={[typography.body, styles.emptyBody]}>
            This device&apos;s local database couldn&apos;t be opened, so favorites can&apos;t be saved or shown right
            now. Scenes and Emergency still work — they don&apos;t depend on this.
          </Text>
        </Card>
      ) : favorites.length === 0 ? (
        <Card style={styles.emptyCard}>
          <AppIcon name={{ ios: 'star', android: 'star_outline', web: 'star_outline' }} tintColor={color.textMuted} size={32} />
          <Text style={[typography.heading, styles.emptyTitle]}>No favorites yet</Text>
          <Text style={[typography.body, styles.emptyBody]}>
            Tap the star on any phrase in Scenes to save it here. Favorites stay on this device and work
            offline.
          </Text>
        </Card>
      ) : (
        <View style={styles.list}>
          {favorites.map((favorite) => (
            <View key={favorite.phraseKey} style={styles.item}>
              {favorite.sceneTitle ? <Badge label={favorite.sceneTitle} tone="neutral" /> : null}
              <PhraseCard
                zh={favorite.zh}
                ja={favorite.ja}
                romaji={favorite.romaji}
                english={favorite.english}
                tel={favorite.tel}
                favorite={{ phraseKey: favorite.phraseKey, sceneId: favorite.sceneId, sceneTitle: favorite.sceneTitle }}
              />
            </View>
          ))}
        </View>
      )}
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
  list: {
    gap: spacing.lg,
  },
  item: {
    gap: spacing.sm,
  },
});
