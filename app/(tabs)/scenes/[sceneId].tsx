import { Stack, useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { Badge } from '@/src/design-system/components/Badge';
import { ScreenContainer } from '@/src/design-system/components/ScreenContainer';
import { SectionHeading } from '@/src/design-system/components/SectionHeading';
import { color, spacing, typography } from '@/src/design-system/tokens';
import { PhraseCard } from '@/src/features/shared/components/PhraseCard';
import { getSceneById } from '@/src/features/scenes/data/scenes';

export default function SceneDetailScreen() {
  const { sceneId } = useLocalSearchParams<{ sceneId: string }>();
  const scene = getSceneById(sceneId);

  if (!scene) {
    return (
      <ScreenContainer>
        <Text style={[typography.body, { color: color.textSecondary }]}>Scene not found.</Text>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <Stack.Screen options={{ headerShown: true, headerTitle: scene.title, headerStyle: { backgroundColor: color.backgroundElevated }, headerTintColor: color.textPrimary }} />
      <View style={styles.headerRow}>
        <Badge label="Offline ready" tone="success" />
        <Badge label="Draft content — unreviewed" tone="warning" />
      </View>
      <Text style={[typography.body, styles.description]}>{scene.description}</Text>

      {scene.categories.map((category) => (
        <View key={category.id} style={styles.category}>
          {scene.categories.length > 1 ? <SectionHeading title={category.label} /> : null}
          <View style={styles.phraseList}>
            {category.phrases.map((phrase) => (
              <PhraseCard
                key={phrase.id}
                zh={phrase.zh}
                ja={phrase.ja}
                romaji={phrase.romaji}
                english={phrase.english}
                favorite={{ phraseKey: phrase.id, sceneId: scene.id, sceneTitle: scene.title }}
              />
            ))}
          </View>
        </View>
      ))}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    flexWrap: 'wrap',
  },
  description: {
    color: color.textSecondary,
  },
  category: {
    gap: spacing.md,
  },
  phraseList: {
    gap: spacing.md,
  },
});
