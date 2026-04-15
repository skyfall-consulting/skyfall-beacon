import { addons } from 'storybook/manager-api';
import skyfallBeaconTheme from './skyfallBeaconTheme';

addons.setConfig({
  theme: skyfallBeaconTheme,
  sidebar: {
    showRoots: true,
  },
  toolbar: {
    title: { hidden: false },
    zoom: { hidden: false },
    eject: { hidden: false },
    copy: { hidden: false },
    fullscreen: { hidden: false },
  },
});
