import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tooltip } from './Tooltip';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Data Display/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Top: Story = {
  args: {
    content: 'View patient details',
    children: <button style={{ padding: '8px 16px' }}>Hover me</button>,
    placement: 'top',
  },
};

export const Bottom: Story = {
  args: {
    content: 'Last updated: March 12, 2026',
    children: <span style={{ textDecoration: 'underline dotted', cursor: 'help' }}>Updated recently</span>,
    placement: 'bottom',
  },
};
