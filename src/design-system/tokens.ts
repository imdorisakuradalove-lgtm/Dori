/**
 * Original dark cosmic design system tokens.
 *
 * No celebrity likeness, mascot, or third-party brand asset is referenced
 * anywhere in this file — see docs/LEGAL_BRAND_SAFETY.md. Palette favors
 * high contrast over decoration so text stays readable outdoors and under
 * station lighting, per docs/UX_PRINCIPLES.md.
 */

export const color = {
  background: '#05060B',
  backgroundElevated: '#0B0D16',
  surface: '#12141F',
  surfaceAlt: '#181B29',
  border: '#2A2E42',
  borderSubtle: '#1D2032',

  textPrimary: '#F5F6FB',
  textSecondary: '#B7BBD1',
  textMuted: '#7B7F98',
  textOnAccent: '#0B0D16',

  silver: '#C9CDDD',
  nebula: '#5B4E96',
  nebulaSoft: '#2E2A4D',

  accent: '#E0304A',
  accentPressed: '#B5253B',
  accentSoft: '#3A1620',

  emergency: '#FF3B4E',
  emergencyPressed: '#D62E3F',
  emergencySurface: '#241019',

  success: '#3FBF7F',
  warning: '#E2A93B',

  overlay: 'rgba(5, 6, 11, 0.82)',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  huge: 48,
} as const;

export const radius = {
  sm: 8,
  md: 12,
  lg: 18,
  xl: 24,
  pill: 999,
} as const;

export const typography = {
  display: { fontSize: 32, lineHeight: 38, fontWeight: '700' as const },
  title: { fontSize: 24, lineHeight: 30, fontWeight: '700' as const },
  heading: { fontSize: 20, lineHeight: 26, fontWeight: '600' as const },
  bodyLarge: { fontSize: 18, lineHeight: 26, fontWeight: '400' as const },
  body: { fontSize: 16, lineHeight: 23, fontWeight: '400' as const },
  label: { fontSize: 14, lineHeight: 20, fontWeight: '600' as const },
  caption: { fontSize: 13, lineHeight: 18, fontWeight: '500' as const },
} as const;

/** Minimum touch target size (points), applied to every tappable control. */
export const minTouchTarget = 48;

/** Minimum height for a primary hero action per the 3-second rule. */
export const heroActionHeight = 64;
