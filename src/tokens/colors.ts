/** Brand primary palette — Luminous Sky */
export const brandPrimary = {
  50: '#ECF6FF',
  100: '#D6ECFF',
  200: '#ADD7FF',
  300: '#7CBEFF',
  400: '#4BA3FB',
  500: '#1F86F0',
  600: '#1370D6',
  700: '#0E58AB',
  800: '#0A4385',
  900: '#073166',
} as const;

/** Brand secondary palette — Indigo */
export const brandSecondary = {
  50: '#EFEEFE',
  100: '#DDDBFC',
  200: '#BCB6F8',
  300: '#948AF1',
  400: '#7164E6',
  500: '#5546D1',
  600: '#4536B1',
  700: '#382B8E',
  800: '#2C236F',
  900: '#201A52',
} as const;

/** Support accent — Mint (also exported as accentTeal for parity with shared API) */
export const accentMint = {
  50: '#E8FAF4',
  100: '#CDF3E5',
  200: '#9CE7CC',
  300: '#6BD6AF',
  400: '#3FBE91',
  500: '#20A074',
  600: '#15825D',
  700: '#10684A',
} as const;

export const accentTeal = accentMint;

/** Reward accent — Soft Amber */
export const accentAmber = {
  50: '#FFF6E2',
  100: '#FEEBC0',
  200: '#FCD68A',
  300: '#F8BD55',
  400: '#ECA22F',
  500: '#C9831A',
  600: '#A06612',
  700: '#7A4D0D',
} as const;

/** Neutral palette — Cloud / Slate */
export const neutral = {
  0: '#FFFFFF',
  25: '#FBFCFE',
  50: '#F4F7FB',
  100: '#ECF1F7',
  200: '#DCE3ED',
  300: '#C0CAD8',
  400: '#91A0B5',
  500: '#65758D',
  600: '#4A586E',
  700: '#334052',
  800: '#222C3B',
  900: '#131B28',
} as const;

/** Semantic colors */
export const semantic = {
  success: { 50: '#E8F8EE', 500: '#259A57', 700: '#167440' },
  warning: { 50: '#FFF4DC', 500: '#C9831A', 700: '#8E5B0F' },
  error: { 50: '#FFEFEF', 500: '#D6383F', 700: '#9A2329' },
  info: { 50: '#ECF6FF', 500: '#1F86F0', 700: '#0E58AB' },
} as const;

/** Text aliases */
export const text = {
  primary: '#131B28',
  secondary: '#4A586E',
  muted: '#65758D',
  inverse: '#FFFFFF',
  brand: '#1370D6',
} as const;

/** Surface aliases */
export const surface = {
  canvas: '#FBFCFE',
  default: '#FFFFFF',
  subtle: '#F4F7FB',
  raised: '#FFFFFF',
  spotlight: '#ECF6FF',
} as const;

/** Border aliases */
export const border = {
  default: '#DCE3ED',
  strong: '#C0CAD8',
  inverse: '#334052',
} as const;

/** Data visualization — Beacon learning palette */
export const dataVis = {
  1: '#1F86F0',
  2: '#5546D1',
  3: '#20A074',
  4: '#ECA22F',
  5: '#D6383F',
  gridline: '#DCE3ED',
  axis: '#65758D',
} as const;

/** Beacon-specific progress tokens */
export const progress = {
  track: '#ECF1F7',
  fillDefault: '#1F86F0',
  fillSuccess: '#20A074',
  fillReward: '#ECA22F',
  gradient: 'linear-gradient(90deg, #1F86F0 0%, #5546D1 100%)',
} as const;
