import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProgressRing } from './ProgressRing';

const meta: Meta<typeof ProgressRing> = {
  title: 'Beacon X/Learning Patterns/ProgressRing',
  component: ProgressRing,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    size: { control: { type: 'inline-radio' }, options: ['sm', 'md', 'lg'] },
    tone: { control: { type: 'inline-radio' }, options: ['default', 'success', 'reward'] },
  },
};

export default meta;
type Story = StoryObj<typeof ProgressRing>;

export const Default: Story = {
  args: { value: 42, size: 'md', tone: 'default' },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
      <ProgressRing value={42} size="sm" />
      <ProgressRing value={42} size="md" />
      <ProgressRing value={42} size="lg" />
    </div>
  ),
};

export const Tones: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
      <ProgressRing value={62} size="lg" tone="default" label="Course" />
      <ProgressRing value={100} size="lg" tone="success" label="Module" />
      <ProgressRing value={86} size="lg" tone="reward" label="Streak" />
    </div>
  ),
};

export const Complete: Story = {
  args: { value: 100, size: 'lg', tone: 'success', label: 'Course complete' },
};

export const WithCenterContent: Story = {
  args: {
    value: 7,
    max: 10,
    size: 'lg',
    tone: 'reward',
    label: 'Lessons today',
    centerContent: (
      <span style={{ fontSize: 14, fontWeight: 600 }}>7/10</span>
    ),
  },
};
