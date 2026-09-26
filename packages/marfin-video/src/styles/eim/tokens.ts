export const EIM_COLORS = {
  bg: '#F7F4EC',
  surface: '#FBF8F1',
  navy: '#163B6E',
  blue: '#1D4DFF',
  blueAlt: '#2F62F1',
  paleBlue: '#DCE8F8',
  paleBlueAlt: '#E5ECF5',
  muted: '#5E7391',
  line: '#CAD7EA',
  white: '#FFFFFF',
  black: '#111111',
} as const;

export const EIM_SPACING = {
  pageX: 72,
  top: 80,
  bottom: 72,
  gap2xs: 4,
  gapXs: 8,
  gapSm: 12,
  gapMd: 20,
  gapLg: 32,
  gapXl: 48,
  gap2xl: 64,
} as const;

export const EIM_RADIUS = {
  card: 28,
  pill: 999,
} as const;

export const EIM_STROKE = {
  thin: 1,
  base: 2,
  strong: 3,
} as const;

export const EIM_SHADOWS = {
  card: '0 8px 40px rgba(22,59,110,0.08)',
} as const;

export const EIM_TYPE = {
  hero: {
    fontFamily: 'Inter, Arial, Helvetica, sans-serif',
    fontWeight: 800,
    fontSize: 150,
    lineHeight: 0.92,
    letterSpacing: -4,
  },
  display: {
    fontFamily: 'Inter, Arial, Helvetica, sans-serif',
    fontWeight: 800,
    fontSize: 112,
    lineHeight: 0.94,
    letterSpacing: -3,
  },
  headline: {
    fontFamily: 'Inter, Arial, Helvetica, sans-serif',
    fontWeight: 700,
    fontSize: 68,
    lineHeight: 0.98,
    letterSpacing: -1.8,
  },
  subheadline: {
    fontFamily: 'Inter, Arial, Helvetica, sans-serif',
    fontWeight: 700,
    fontSize: 34,
    lineHeight: 1.02,
    letterSpacing: -1,
  },
  body: {
    fontFamily: 'Inter, Arial, Helvetica, sans-serif',
    fontWeight: 500,
    fontSize: 24,
    lineHeight: 1.24,
    letterSpacing: -0.3,
  },
  label: {
    fontFamily: 'Inter, Arial, Helvetica, sans-serif',
    fontWeight: 700,
    fontSize: 18,
    lineHeight: 1.2,
    letterSpacing: 2,
    textTransform: 'uppercase' as const,
  },
  micro: {
    fontFamily: 'Inter, Arial, Helvetica, sans-serif',
    fontWeight: 700,
    fontSize: 16,
    lineHeight: 1.2,
    letterSpacing: 2.4,
    textTransform: 'uppercase' as const,
  },
} as const;

export const EIM_DEFAULTS = {
  fps: 30,
  width: 1080,
  height: 1920,
  settleSeconds: 2,
  headerLeft: ['JAKARTA', 'INDONESIA'],
  topRuleWidth: 84,
  footerRuleWidth: 88,
} as const;
