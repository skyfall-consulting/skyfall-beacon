import type { Meta, StoryObj } from '@storybook/react-vite';
import { AchievementBadge } from './AchievementBadge';

const meta: Meta<typeof AchievementBadge> = {
  title: 'Beacon X/Learning Patterns/AchievementBadge',
  component: AchievementBadge,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    tone: { control: { type: 'inline-radio' }, options: ['reward', 'milestone', 'streak', 'mastery'] },
    size: { control: { type: 'inline-radio' }, options: ['sm', 'md', 'lg'] },
  },
};

export default meta;
type Story = StoryObj<typeof AchievementBadge>;

export const Reward: Story = {
  args: {
    title: 'First lesson complete',
    description: 'Earned April 12',
    tone: 'reward',
    glow: true,
  },
};

export const Milestone: Story = {
  args: {
    title: 'Module 3 complete',
    description: '24 lessons mastered',
    tone: 'milestone',
  },
};

export const Streak: Story = {
  args: {
    title: '7-day streak',
    description: 'Keep the momentum going',
    tone: 'streak',
    glow: true,
  },
};

export const Mastery: Story = {
  args: {
    title: 'Data Visualization mastery',
    description: 'Top 5% of cohort',
    tone: 'mastery',
    size: 'lg',
    glow: true,
  },
};

export const Unearned: Story = {
  args: {
    title: 'Capstone champion',
    description: 'Submit your final project',
    tone: 'milestone',
    earned: false,
  },
};

export const Gallery: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24, width: 520 }}>
      <AchievementBadge title="First lesson" description="Earned Apr 12" tone="reward" glow />
      <AchievementBadge title="Module 3 complete" description="24 lessons" tone="milestone" />
      <AchievementBadge title="7-day streak" description="Keep going" tone="streak" glow />
      <AchievementBadge title="Data Viz mastery" description="Top 5%" tone="mastery" />
      <AchievementBadge title="Capstone champion" description="Locked" tone="milestone" earned={false} />
      <AchievementBadge title="30-day streak" description="Locked" tone="streak" earned={false} />
    </div>
  ),
};
