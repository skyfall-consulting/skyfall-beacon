import type { Meta, StoryObj } from '@storybook/react-vite';
import { IconButton } from './IconButton';

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
    <line x1="5" y1="5" x2="15" y2="15" />
    <line x1="15" y1="5" x2="5" y2="15" />
  </svg>
);

const meta: Meta<typeof IconButton> = {
  title: 'Components/Inputs/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  args: { icon: <CloseIcon />, 'aria-label': 'Close' },
};

export default meta;
type Story = StoryObj<typeof IconButton>;

export const Ghost: Story = { args: { variant: 'ghost' } };
export const Secondary: Story = { args: { variant: 'secondary' } };
export const Primary: Story = { args: { variant: 'primary' } };
export const Danger: Story = { args: { variant: 'danger' } };
export const Small: Story = { args: { size: 'sm' } };
export const Disabled: Story = { args: { disabled: true } };
