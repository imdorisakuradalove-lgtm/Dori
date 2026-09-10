import { Tabs, useRouter } from 'expo-router';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';

import { AppIcon } from '@/src/design-system/components/AppIcon';
import { color, radius, spacing, typography } from '@/src/design-system/tokens';

const tabBarStyle = {
  backgroundColor: color.backgroundElevated,
  borderTopColor: color.border,
};

export default function TabLayout() {
  const router = useRouter();

  return (
    <View style={styles.root}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: color.accent,
          tabBarInactiveTintColor: color.textMuted,
          tabBarStyle,
        }}>
        <Tabs.Screen
          name="home"
          options={{
            title: 'Home',
            tabBarIcon: ({ color: tint }) => (
              <AppIcon name={{ ios: 'house.fill', android: 'home', web: 'home' }} tintColor={tint} size={24} />
            ),
          }}
        />
        <Tabs.Screen
          name="translate"
          options={{
            title: 'Translate',
            tabBarIcon: ({ color: tint }) => (
              <AppIcon
                name={{ ios: 'bubble.left.and.text.bubble.right.fill', android: 'translate', web: 'translate' }}
                tintColor={tint}
                size={24}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="scenes"
          options={{
            title: 'Scenes',
            tabBarIcon: ({ color: tint }) => (
              <AppIcon name={{ ios: 'map.fill', android: 'map', web: 'map' }} tintColor={tint} size={24} />
            ),
          }}
        />
        <Tabs.Screen
          name="favorites"
          options={{
            title: 'Favorites',
            tabBarIcon: ({ color: tint }) => (
              <AppIcon name={{ ios: 'star.fill', android: 'star', web: 'star' }} tintColor={tint} size={24} />
            ),
          }}
        />
        <Tabs.Screen
          name="me"
          options={{
            title: 'Me',
            tabBarIcon: ({ color: tint }) => (
              <AppIcon name={{ ios: 'person.crop.circle.fill', android: 'person', web: 'person' }} tintColor={tint} size={24} />
            ),
          }}
        />
      </Tabs>

      {/* Emergency must be reachable from anywhere in the app in one tap — not nested in a tab or menu. */}
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Emergency phrases"
        accessibilityHint="Opens offline emergency phrases and calling"
        onPress={() => router.push('/emergency')}
        style={({ pressed }) => [styles.emergencyButton, { opacity: pressed ? 0.85 : 1 }]}>
        <AppIcon name={{ ios: 'exclamationmark.triangle.fill', android: 'emergency', web: 'emergency' }} tintColor="#160406" size={20} />
        <Text style={[typography.label, styles.emergencyLabel]}>Emergency</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: color.background,
  },
  emergencyButton: {
    position: 'absolute',
    right: spacing.lg,
    bottom: Platform.select({ ios: 96, android: 88, default: 96 }),
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    backgroundColor: color.emergency,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    shadowColor: '#000',
    shadowOpacity: 0.35,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  emergencyLabel: {
    color: '#160406',
  },
});
