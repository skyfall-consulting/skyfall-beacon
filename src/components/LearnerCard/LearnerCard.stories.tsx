import type { Meta, StoryObj } from '@storybook/react-vite';
import { LearnerCard } from './LearnerCard';

const meta: Meta<typeof LearnerCard> = {
  title: 'Beacon X/Learning Patterns/LearnerCard',
  component: LearnerCard,
  tags: ['autodocs'],
  decorators: [(Story) => <div style={{ width: 360 }}><Story /></div>],
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof LearnerCard>;

export const Active: Story = {
  args: {
    name: 'Maya Chen',
    cohort: 'Spring 2026 · Data Viz cohort',
    status: 'active',
    progress: 62,
    streakDays: 14,
    achievements: 5,
  },
};

export const InProgress: Story = {
  args: {
    name: 'Jordan Patel',
    cohort: 'Spring 2026 · Data Viz cohort',
    status: 'in-progress',
    progress: 38,
    streakDays: 3,
    achievements: 2,
  },
};

export const Inactive: Story = {
  args: {
    name: 'Sam Rivera',
    cohort: 'Spring 2026 · Data Viz cohort',
    status: 'inactive',
    progress: 12,
    streakDays: 0,
    achievements: 1,
  },
};

export const Complete: Story = {
  args: {
    name: 'Priya Kapoor',
    cohort: 'Spring 2026 · Data Viz cohort',
    status: 'active',
    progress: 100,
    streakDays: 42,
    achievements: 11,
  },
};

export const Minimal: Story = {
  args: {
    name: 'Devon Walsh',
    cohort: 'Onboarding',
    status: 'active',
  },
};
