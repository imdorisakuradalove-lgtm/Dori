import { useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { AppIcon } from '@/src/design-system/components/AppIcon';
import { Badge } from '@/src/design-system/components/Badge';
import { Card } from '@/src/design-system/components/Card';
import { ScreenContainer } from '@/src/design-system/components/ScreenContainer';
import { SectionHeading } from '@/src/design-system/components/SectionHeading';
import { color, spacing, typography } from '@/src/design-system/tokens';
import { scenes } from '@/src/features/scenes/data/scenes';

export default function ScenesScreen() {
  const router = useRouter();

  return (
    <ScreenContainer>
      <SectionHeading
        title="Scenes"
        subtitle="Bundled phrases for common situations — work fully offline, in airplane mode, from first launch."
      />
      <View style={styles.list}>
        {scenes.map((scene) => (
          <Card key={scene.id} onPress={() => router.push(`/scenes/${scene.id}`)} accessibilityLabel={scene.title}>
            <View style={styles.row}>
              <AppIcon name={scene.icon} tintColor={color.silver} size={28} />
              <View style={styles.textCol}>
                <Text style={[typography.heading, styles.title]}>{scene.title}</Text>
                <Text style={[typography.body, styles.description]}>{scene.description}</Text>
              </View>
            </View>
            <Badge label="Offline ready" tone="success" />
          </Card>
        ))}
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: spacing.md,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  textCol: {
    flex: 1,
    gap: spacing.xs,
  },
  title: {
    color: color.textPrimary,
  },
  description: {
    color: color.textSecondary,
  },
});
