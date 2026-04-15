import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar } from './Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Components/Data Display/Avatar',
  component: Avatar,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const WithInitials: Story = {
  args: { name: 'Jane Cooper', size: 'lg' },
};

export const WithStatus: Story = {
  args: { name: 'Dr. Robert Fox', size: 'lg', status: 'active' },
};

export const AllSizes: Story = {
  name: 'All Sizes',
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <Avatar name="Jane Cooper" size="sm" />
      <Avatar name="Jane Cooper" size="md" />
      <Avatar name="Jane Cooper" size="lg" />
      <Avatar name="Jane Cooper" size="xl" />
    </div>
  ),
};

export const CareTeam: Story = {
  name: 'Care Team',
  render: () => (
    <div style={{ display: 'flex', gap: 8 }}>
      <Avatar name="Dr. Sarah Chen" status="active" />
      <Avatar name="RN Maria Lopez" status="busy" />
      <Avatar name="Dr. James Wilson" status="away" />
      <Avatar name="PT Alex Johnson" status="inactive" />
    </div>
  ),
};
