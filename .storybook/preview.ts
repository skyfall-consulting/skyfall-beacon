import type { Preview } from '@storybook/react-vite';
import skyfallBeaconTheme from './skyfallBeaconTheme';
import '../src/tokens/beacon-tokens.css';
import './storybook.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      theme: skyfallBeaconTheme,
    },
    a11y: {
      test: 'error',
    },
    backgrounds: {
      options: {
        white: { name: 'White', value: '#FFFFFF' },
        canvas: { name: 'Canvas', value: '#FBFCFE' },
        subtle: { name: 'Subtle', value: '#F4F7FB' },
        spotlight: { name: 'Spotlight', value: '#ECF6FF' },
        dark: { name: 'Dark', value: '#131B28' }
      }
    },
    layout: 'centered',
    options: {
      storySort: {
        order: [
          'Overview',
          ['Introduction', 'Installation'],
          'Components',
          [
            'Foundations',
            [
              'Tokens',
              ['Colors', 'Typography', 'Spacing', 'Radius', 'Shadows', 'Motion', 'Focus'],
              'Theme',
              'Icons',
              'Typography',
            ],
            'Inputs',
            'Data Display',
            'Feedback',
            'Surfaces',
            'Navigation',
            'Layout',
            'Utils',
          ],
          'Beacon X',
          ['Charts', 'Learning Patterns'],
        ],
      },
    },
  },

  initialGlobals: {
    backgrounds: {
      value: 'white'
    }
  }
};

export default preview;
