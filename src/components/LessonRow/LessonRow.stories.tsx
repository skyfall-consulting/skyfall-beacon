import type { Meta, StoryObj } from '@storybook/react-vite';
import { LessonRow } from './LessonRow';

const meta: Meta<typeof LessonRow> = {
  title: 'Beacon X/Learning Patterns/LessonRow',
  component: LessonRow,
  tags: ['autodocs'],
  decorators: [(Story) => <div style={{ width: 520 }}><Story /></div>],
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof LessonRow>;

export const Available: Story = {
  args: {
    order: '1.1',
    title: 'What is a histogram, really?',
    kind: 'video',
    duration: '8 min',
    status: 'available',
    onSelect: () => {},
  },
};

export const InProgress: Story = {
  args: {
    order: '1.2',
    title: 'Designing for the median, not the average',
    kind: 'reading',
    duration: '12 min',
    status: 'in-progress',
    onSelect: () => {},
  },
};

export const Completed: Story = {
  args: {
    order: '1.3',
    title: 'Knowledge check: chart types',
    kind: 'quiz',
    duration: '5 min',
    status: 'completed',
    onSelect: () => {},
  },
};

export const Locked: Story = {
  args: {
    order: '2.1',
    title: 'Capstone: build a public dashboard',
    kind: 'project',
    duration: '90 min',
    status: 'locked',
  },
};

export const LiveSession: Story = {
  args: {
    order: '3.0',
    title: 'Office hours with Dr. Park',
    kind: 'live',
    duration: 'Apr 22 · 4 PM PT',
    status: 'available',
    onSelect: () => {},
  },
};

export const ModuleList: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <LessonRow order="1.1" title="What is a histogram, really?" kind="video" duration="8 min" status="completed" onSelect={() => {}} />
      <LessonRow order="1.2" title="Designing for the median, not the average" kind="reading" duration="12 min" status="completed" onSelect={() => {}} />
      <LessonRow order="1.3" title="Knowledge check: chart types" kind="quiz" duration="5 min" status="in-progress" onSelect={() => {}} />
      <LessonRow order="1.4" title="Color, contrast, and the colorblind 8%" kind="reading" duration="10 min" status="available" onSelect={() => {}} />
      <LessonRow order="2.1" title="Capstone: build a public dashboard" kind="project" duration="90 min" status="locked" />
    </div>
  ),
};
