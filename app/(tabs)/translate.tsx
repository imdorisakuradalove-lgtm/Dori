import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { Badge } from '@/src/design-system/components/Badge';
import { Button } from '@/src/design-system/components/Button';
import { Card } from '@/src/design-system/components/Card';
import { ScreenContainer } from '@/src/design-system/components/ScreenContainer';
import { SectionHeading } from '@/src/design-system/components/SectionHeading';
import { color, radius, spacing, typography } from '@/src/design-system/tokens';
import { useNetworkStatus } from '@/src/state/useNetworkStatus';

type Tone = 'polite' | 'simple' | 'urgent';

const TONES: { id: Tone; label: string }[] = [
  { id: 'polite', label: 'Polite' },
  { id: 'simple', label: 'Simple' },
  { id: 'urgent', label: 'Urgent' },
];

export default function TranslateScreen() {
  const router = useRouter();
  const network = useNetworkStatus();
  const [input, setInput] = useState('');
  const [tone, setTone] = useState<Tone>('polite');
  const [attempted, setAttempted] = useState(false);

  return (
    <ScreenContainer>
      <View>
        <View style={styles.badgeRow}>
          <Badge
            label={network === 'checking' ? 'Checking connection' : network === 'online' ? 'Online' : 'Offline'}
            tone={network === 'online' ? 'success' : network === 'offline' ? 'warning' : 'neutral'}
          />
          <Badge label="AI translation not built yet" tone="warning" />
        </View>
        <Text style={[typography.title, styles.title]}>Translate</Text>
        <Text style={[typography.body, styles.subtitle]}>
          Type what you want to say in Chinese. Live AI translation needs an internet connection once it
          exists — it is not wired up in this build yet, regardless of your connection right now.
        </Text>
      </View>

      <TextInput
        value={input}
        onChangeText={setInput}
        placeholder="例如：请问洗手间在哪里？"
        placeholderTextColor={color.textMuted}
        multiline
        style={styles.input}
        accessibilityLabel="Text to translate"
      />

      <View>
        <SectionHeading title="Tone" />
        <View style={styles.toneRow}>
          {TONES.map((t) => {
            const selected = t.id === tone;
            return (
              <Pressable
                key={t.id}
                accessibilityRole="button"
                accessibilityState={{ selected }}
                onPress={() => setTone(t.id)}
                style={[styles.toneChip, selected && styles.toneChipSelected]}>
                <Text style={[typography.label, { color: selected ? color.textOnAccent : color.textSecondary }]}>{t.label}</Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      <Button
        label="Translate"
        size="hero"
        disabled={input.trim().length === 0}
        onPress={() => setAttempted(true)}
        accessibilityHint="Live translation is not yet connected in this build"
      />

      {attempted ? (
        <Card>
          <Text style={[typography.body, styles.notice]}>
            Live translation isn&apos;t connected in this build yet. This screen will call a real
            Chinese → Japanese translation service in a later phase (see docs/PROVIDER_DECISION.md).
          </Text>
          <Button
            label="Browse offline phrases instead"
            variant="secondary"
            onPress={() => router.push('/scenes')}
            style={styles.noticeButton}
          />
        </Card>
      ) : null}

      <Card>
        <Text style={[typography.label, styles.footnoteTitle]}>Offline phrase library available</Text>
        <Text style={[typography.caption, styles.footnote]}>
          Scenes and Emergency are bundled with the app and always work, with or without a connection.
        </Text>
        <Text style={[typography.label, styles.footnoteTitle, styles.footnoteSpacing]}>
          AI translation requires an internet connection
        </Text>
        <Text style={[typography.caption, styles.footnote]}>
          Once built, typing a new phrase here will need connectivity. It will never work offline, and
          this screen will always say so rather than pretending otherwise.
        </Text>
      </Card>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  badgeRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    flexWrap: 'wrap',
  },
  title: {
    color: color.textPrimary,
    marginTop: spacing.sm,
  },
  subtitle: {
    color: color.textSecondary,
    marginTop: spacing.xs,
  },
  input: {
    minHeight: 96,
    backgroundColor: color.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: color.border,
    padding: spacing.lg,
    color: color.textPrimary,
    fontSize: typography.body.fontSize,
    textAlignVertical: 'top',
  },
  toneRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  toneChip: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    backgroundColor: color.surfaceAlt,
    borderWidth: 1,
    borderColor: color.border,
  },
  toneChipSelected: {
    backgroundColor: color.accent,
    borderColor: color.accent,
  },
  notice: {
    color: color.textSecondary,
  },
  footnoteTitle: {
    color: color.textPrimary,
    marginBottom: spacing.xs,
  },
  footnoteSpacing: {
    marginTop: spacing.md,
  },
  noticeButton: {
    marginTop: spacing.md,
  },
  footnote: {
    color: color.textMuted,
  },
});
