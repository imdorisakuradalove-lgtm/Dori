import * as Clipboard from 'expo-clipboard';
import { useState } from 'react';
import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';

import { AppIcon } from '@/src/design-system/components/AppIcon';
import { Card } from '@/src/design-system/components/Card';
import { color, radius, spacing, typography } from '@/src/design-system/tokens';

type Props = {
  zh: string;
  ja: string;
  romaji: string;
  english?: string;
  /** e.g. "tel:110" — when present, a real Call button is shown. */
  tel?: string;
  telLabel?: string;
};

/**
 * Displays one phrase. Copy is real (device clipboard). Play is
 * intentionally shown as disabled — TTS is not implemented until Phase 3,
 * and this must never look like a working control per docs/MVP_SCOPE.md.
 */
export function PhraseCard({ zh, ja, romaji, english, tel, telLabel }: Props) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await Clipboard.setStringAsync(ja);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <Card style={styles.card}>
      <Text style={[typography.body, styles.zh]}>{zh}</Text>
      <Text style={[typography.title, styles.ja]}>{ja}</Text>
      <Text style={[typography.caption, styles.romaji]}>{romaji}</Text>
      {english ? <Text style={[typography.caption, styles.english]}>{english}</Text> : null}

      <View style={styles.actions}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={copied ? 'Copied' : 'Copy Japanese text'}
          onPress={handleCopy}
          style={({ pressed }) => [styles.actionButton, { opacity: pressed ? 0.7 : 1 }]}>
          <AppIcon
            name={{ ios: copied ? 'checkmark' : 'doc.on.doc', android: copied ? 'check' : 'content_copy', web: copied ? 'check' : 'content_copy' }}
            size={18}
            tintColor={copied ? color.success : color.textSecondary}
          />
          <Text style={[typography.caption, { color: copied ? color.success : color.textSecondary }]}>
            {copied ? 'Copied' : 'Copy'}
          </Text>
        </Pressable>

        <View style={[styles.actionButton, styles.disabledAction]} accessibilityRole="none">
          <AppIcon name={{ ios: 'speaker.slash', android: 'volume_off', web: 'volume_off' }} size={18} tintColor={color.textMuted} />
          <Text style={[typography.caption, { color: color.textMuted }]}>Audio — coming soon</Text>
        </View>

        {tel ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={telLabel ?? `Call ${tel.replace('tel:', '')}`}
            onPress={() => Linking.openURL(tel)}
            style={({ pressed }) => [styles.actionButton, styles.callAction, { opacity: pressed ? 0.7 : 1 }]}>
            <AppIcon name={{ ios: 'phone.fill', android: 'call', web: 'call' }} size={18} tintColor={color.emergency} />
            <Text style={[typography.caption, { color: color.emergency }]}>{telLabel ?? `Call ${tel.replace('tel:', '')}`}</Text>
          </Pressable>
        ) : null}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: spacing.xs,
  },
  zh: {
    color: color.textSecondary,
  },
  ja: {
    color: color.textPrimary,
    marginTop: spacing.xs,
  },
  romaji: {
    color: color.silver,
  },
  english: {
    color: color.textMuted,
  },
  actions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    marginTop: spacing.md,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderRadius: radius.md,
  },
  disabledAction: {
    opacity: 0.7,
  },
  callAction: {
    backgroundColor: color.emergencySurface,
  },
});
