import { Link, Stack } from 'expo-router';
import { StyleSheet, Text } from 'react-native';

import { ScreenContainer } from '@/src/design-system/components/ScreenContainer';
import { color, spacing, typography } from '@/src/design-system/tokens';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Not found', headerShown: true, headerStyle: { backgroundColor: color.backgroundElevated }, headerTintColor: color.textPrimary }} />
      <ScreenContainer scroll={false} contentStyle={styles.container}>
        <Text style={[typography.heading, styles.title]}>This screen doesn&apos;t exist.</Text>
        <Link href="/" style={styles.link}>
          <Text style={[typography.body, styles.linkText]}>Go to Home</Text>
        </Link>
      </ScreenContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: color.textPrimary,
  },
  link: {
    marginTop: spacing.lg,
  },
  linkText: {
    color: color.accent,
  },
});
