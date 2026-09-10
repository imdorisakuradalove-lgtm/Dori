import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { AppIcon } from '@/src/design-system/components/AppIcon';
import { Badge } from '@/src/design-system/components/Badge';
import { ScreenContainer } from '@/src/design-system/components/ScreenContainer';
import { color, spacing, typography } from '@/src/design-system/tokens';
import { emergencyPhrases } from '@/src/features/emergency/data/emergencyPhrases';
import { PhraseCard } from '@/src/features/shared/components/PhraseCard';

/**
 * Emergency: reachable globally, works fully offline (Level 1 bundled
 * content), no login, no network dependency, no decorative animation or
 * music per docs/UX_PRINCIPLES.md and docs/MVP_SCOPE.md.
 */
export default function EmergencyScreen() {
  const router = useRouter();

  return (
    <ScreenContainer style={styles.screen}>
      <View style={styles.header}>
        <View style={styles.headerText}>
          <Text style={[typography.display, styles.title]}>Emergency</Text>
          <Badge label="Works fully offline" tone="accent" />
        </View>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Close"
          onPress={() => router.back()}
          style={({ pressed }) => [styles.closeButton, { opacity: pressed ? 0.7 : 1 }]}>
          <AppIcon name={{ ios: 'xmark', android: 'close', web: 'close' }} tintColor={color.textPrimary} size={22} />
        </Pressable>
      </View>

      <View style={styles.list}>
        {emergencyPhrases.map((phrase) => (
          <PhraseCard
            key={phrase.id}
            zh={phrase.zh}
            ja={phrase.ja}
            romaji={phrase.romaji}
            english={phrase.english}
            tel={phrase.tel}
            telLabel={phrase.tel ? `Call ${phrase.tel.replace('tel:', '')}` : undefined}
          />
        ))}
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: color.emergencySurface,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerText: {
    gap: spacing.sm,
    flex: 1,
  },
  title: {
    color: color.textPrimary,
  },
  closeButton: {
    padding: spacing.sm,
  },
  list: {
    gap: spacing.md,
  },
});
