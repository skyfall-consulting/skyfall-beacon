import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'Components/Data Display/Badge',
  component: Badge,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Neutral: Story = { args: { children: 'Draft', status: 'neutral' } };
export const Success: Story = { args: { children: 'Active', status: 'success' } };
export const Warning: Story = { args: { children: 'Pending Review', status: 'warning' } };
export const Error: Story = { args: { children: 'Critical', status: 'error' } };
export const Info: Story = { args: { children: 'Scheduled', status: 'info' } };
