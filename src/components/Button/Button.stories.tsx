import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Inputs/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'danger'],
    },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: { children: 'Primary Action', variant: 'primary' },
};

export const Secondary: Story = {
  args: { children: 'Secondary', variant: 'secondary' },
};

export const Ghost: Story = {
  args: { children: 'Ghost', variant: 'ghost' },
};

export const Danger: Story = {
  args: { children: 'Delete Record', variant: 'danger' },
};

export const Small: Story = {
  args: { children: 'Small', size: 'sm' },
};

export const Large: Story = {
  args: { children: 'Large', size: 'lg' },
};

export const FullWidth: Story = {
  args: { children: 'Full Width', fullWidth: true },
  decorators: [(Story) => <div style={{ width: 320 }}><Story /></div>],
};

export const Loading: Story = {
  args: { children: 'Saving...', loading: true },
};

export const Disabled: Story = {
  args: { children: 'Disabled', disabled: true },
};
