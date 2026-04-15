import type { Meta, StoryObj } from '@storybook/react-vite';
import { Switch } from './Switch';

const meta: Meta<typeof Switch> = {
  title: 'Components/Inputs/Switch',
  component: Switch,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  args: { label: 'Enable notifications' },
};

export const On: Story = {
  args: { label: 'Dark mode', defaultChecked: true },
};

export const Disabled: Story = {
  args: { label: 'Feature locked', disabled: true },
};
