export const fontFamily = {
  sans: '"Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  mono: '"IBM Plex Mono", "SFMono-Regular", Consolas, monospace',
} as const;

export const fontWeight = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const;

export const fontSize = {
  'display-lg': '40px',
  'display-md': '32px',
  'heading-xl': '28px',
  'heading-lg': '24px',
  'heading-md': '20px',
  'heading-sm': '18px',
  'body-lg': '16px',
  'body-md': '14px',
  'body-sm': '13px',
  'label-lg': '14px',
  'label-md': '13px',
  caption: '12px',
  data: '14px',
  code: '13px',
} as const;

export const lineHeight = {
  'display-lg': '48px',
  'display-md': '40px',
  'heading-xl': '36px',
  'heading-lg': '32px',
  'heading-md': '28px',
  'heading-sm': '26px',
  'body-lg': '24px',
  'body-md': '22px',
  'body-sm': '20px',
  'label-lg': '20px',
  'label-md': '18px',
  caption: '16px',
  data: '20px',
  code: '18px',
} as const;

export const tracking = {
  tight: '-0.02em',
  normal: '0em',
  wide: '0.01em',
} as const;
