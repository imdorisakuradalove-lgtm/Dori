import { PropsWithChildren } from 'react';
import { Pressable, StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';

import { color, minTouchTarget, radius, spacing, typography } from '../tokens';

export type ButtonVariant = 'primary' | 'secondary' | 'emergency' | 'ghost';
export type ButtonSize = 'default' | 'hero';

type Props = PropsWithChildren<{
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  accessibilityHint?: string;
  style?: StyleProp<ViewStyle>;
  /** Small text shown under the label, e.g. a status note. */
  helperText?: string;
}>;

const variantStyles: Record<ButtonVariant, { bg: string; bgPressed: string; text: string; border?: string }> = {
  primary: { bg: color.accent, bgPressed: color.accentPressed, text: color.textPrimary },
  secondary: { bg: color.surfaceAlt, bgPressed: color.border, text: color.textPrimary, border: color.border },
  emergency: { bg: color.emergency, bgPressed: color.emergencyPressed, text: '#160406' },
  ghost: { bg: 'transparent', bgPressed: color.surfaceAlt, text: color.textSecondary },
};

export function Button({
  label,
  onPress,
  variant = 'primary',
  size = 'default',
  disabled = false,
  accessibilityHint,
  style,
  helperText,
  children,
}: Props) {
  const v = variantStyles[variant];
  const isHero = size === 'hero';

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        {
          backgroundColor: pressed ? v.bgPressed : v.bg,
          borderColor: v.border,
          borderWidth: v.border ? 1 : 0,
          minHeight: isHero ? 64 : minTouchTarget,
          opacity: disabled ? 0.5 : 1,
        },
        style,
      ]}>
      <View style={styles.content}>
        {children}
        <Text
          style={[
            isHero ? typography.heading : typography.label,
            { color: v.text },
          ]}
          numberOfLines={1}>
          {label}
        </Text>
      </View>
      {helperText ? (
        <Text style={[typography.caption, styles.helperText, { color: v.text }]} numberOfLines={2}>
          {helperText}
        </Text>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: radius.lg,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  helperText: {
    marginTop: spacing.xs,
    opacity: 0.85,
    textAlign: 'center',
  },
});
