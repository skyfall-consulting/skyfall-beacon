import type { Meta, StoryObj } from '@storybook/react-vite';
import { StatusBadge } from './StatusBadge';
import type { StatusBadgeStatus } from './StatusBadge';

const meta: Meta<typeof StatusBadge> = {
  title: 'Components/Data Display/StatusBadge',
  component: StatusBadge,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof StatusBadge>;

export const Success: Story = {
  args: { status: 'success', dot: true },
};

export const InProgress: Story = {
  args: { status: 'in-progress', dot: true },
};

export const Locked: Story = {
  args: { status: 'locked', dot: true },
};

export const AllStatuses: Story = {
  name: 'All Statuses',
  render: () => {
    const statuses: StatusBadgeStatus[] = [
      'neutral', 'info', 'success', 'warning', 'error',
      'pending', 'in-progress', 'inactive', 'completed', 'locked',
    ];
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {statuses.map((s) => (
          <StatusBadge key={s} status={s} dot />
        ))}
      </div>
    );
  },
};

export const WithCustomLabel: Story = {
  args: { status: 'success', label: 'Lesson complete', dot: true },
};

export const Small: Story = {
  name: 'Small Size',
  render: () => (
    <div style={{ display: 'flex', gap: 8 }}>
      <StatusBadge status="success" size="sm" dot />
      <StatusBadge status="in-progress" size="sm" dot />
      <StatusBadge status="locked" size="sm" dot />
    </div>
  ),
};
