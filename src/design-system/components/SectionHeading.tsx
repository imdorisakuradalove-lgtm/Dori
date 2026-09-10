import { StyleSheet, Text, View } from 'react-native';

import { color, spacing, typography } from '../tokens';

type Props = {
  title: string;
  subtitle?: string;
};

export function SectionHeading({ title, subtitle }: Props) {
  return (
    <View style={styles.container}>
      <Text style={[typography.heading, styles.title]}>{title}</Text>
      {subtitle ? <Text style={[typography.body, styles.subtitle]}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.xs,
  },
  title: {
    color: color.textPrimary,
  },
  subtitle: {
    color: color.textSecondary,
  },
});
