import { create } from 'storybook/theming/create';

export default create({
  base: 'light',

  // Brand
  brandTitle: 'Skyfall Beacon',
  brandUrl: 'https://skyfall.consulting',
  brandImage: '/beacon_logo.png',
  brandTarget: '_self',

  // Colors — Beacon luminous sky
  colorPrimary: '#1F86F0',
  colorSecondary: '#5546D1',

  // UI chrome — bright, airy, slightly more atmospheric than Aegis
  appBg: '#FBFCFE',
  appContentBg: '#FFFFFF',
  appPreviewBg: '#FFFFFF',
  appBorderColor: '#DCE3ED',
  appBorderRadius: 12,

  // Text
  textColor: '#131B28',
  textInverseColor: '#FFFFFF',
  textMutedColor: '#65758D',

  // Toolbar
  barTextColor: '#65758D',
  barHoverColor: '#1F86F0',
  barSelectedColor: '#1F86F0',
  barBg: '#FFFFFF',

  // Inputs
  inputBg: '#FFFFFF',
  inputBorder: '#DCE3ED',
  inputTextColor: '#131B28',
  inputBorderRadius: 8,

  // Booleans
  booleanBg: '#ECF1F7',
  booleanSelectedBg: '#1F86F0',

  // Button
  buttonBg: '#F4F7FB',
  buttonBorder: '#DCE3ED',

  // Grid
  gridCellSize: 12,
});
