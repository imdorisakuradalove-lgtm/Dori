import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { AppIcon } from '@/src/design-system/components/AppIcon';
import { Badge } from '@/src/design-system/components/Badge';
import { Button } from '@/src/design-system/components/Button';
import { Card } from '@/src/design-system/components/Card';
import { ScreenContainer } from '@/src/design-system/components/ScreenContainer';
import { SectionHeading } from '@/src/design-system/components/SectionHeading';
import { color, spacing, typography } from '@/src/design-system/tokens';
import { scenes } from '@/src/features/scenes/data/scenes';
import { useNetworkStatus } from '@/src/state/useNetworkStatus';

export default function HomeScreen() {
  const router = useRouter();
  const network = useNetworkStatus();

  return (
    <ScreenContainer>
      <View style={styles.statusRow}>
        <Badge
          label={network === 'checking' ? 'Checking connection' : network === 'online' ? 'Online' : 'Offline'}
          tone={network === 'online' ? 'success' : network === 'offline' ? 'warning' : 'neutral'}
        />
        <Badge label="Emergency ready offline" tone="accent" />
      </View>

      <View>
        <Text style={[typography.display, styles.title]}>What do you need to say?</Text>
        <Text style={[typography.body, styles.subtitle]}>
          Tap. Speak. Show. Keep moving. No Japanese required.
        </Text>
      </View>

      <View style={styles.heroGroup}>
        <Button
          label="One-Tap Translate"
          size="hero"
          variant="primary"
          onPress={() => router.push('/translate')}
          accessibilityHint="Type what you want to say and get natural Japanese"
        >
          <AppIcon name={{ ios: 'bubble.left.and.text.bubble.right.fill', android: 'translate', web: 'translate' }} tintColor={color.textPrimary} size={22} />
        </Button>
        <Button
          label="Emergency"
          size="hero"
          variant="emergency"
          onPress={() => router.push('/emergency')}
          accessibilityHint="Open offline emergency phrases and calling"
        >
          <AppIcon name={{ ios: 'exclamationmark.triangle.fill', android: 'emergency', web: 'emergency' }} tintColor="#160406" size={22} />
        </Button>
      </View>

      <View>
        <SectionHeading title="Quick scenes" subtitle="Bundled phrases — work offline" />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.sceneRow}>
          {scenes.map((scene) => (
            <Card key={scene.id} onPress={() => router.push(`/scenes/${scene.id}`)} style={styles.sceneCard} accessibilityLabel={scene.title}>
              <AppIcon name={scene.icon} tintColor={color.silver} size={26} />
              <Text style={[typography.label, styles.sceneLabel]} numberOfLines={2}>
                {scene.title}
              </Text>
            </Card>
          ))}
        </ScrollView>
      </View>

      <View>
        <SectionHeading title="Recent" />
        <Card>
          <Text style={[typography.body, styles.emptyText]}>
            Your recent translations will appear here once Translate is connected to a live provider.
          </Text>
        </Card>
      </View>

      <View>
        <SectionHeading title="Favorites" />
        <Card onPress={() => router.push('/favorites')} accessibilityLabel="Open Favorites">
          <Text style={[typography.body, styles.emptyText]}>No favorites yet. Tap to view Favorites.</Text>
        </Card>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  statusRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    flexWrap: 'wrap',
  },
  title: {
    color: color.textPrimary,
  },
  subtitle: {
    color: color.textSecondary,
    marginTop: spacing.xs,
  },
  heroGroup: {
    gap: spacing.md,
  },
  sceneRow: {
    gap: spacing.md,
    paddingVertical: spacing.xs,
  },
  sceneCard: {
    width: 108,
    alignItems: 'flex-start',
    gap: spacing.sm,
  },
  sceneLabel: {
    color: color.textPrimary,
  },
  emptyText: {
    color: color.textSecondary,
  },
});
