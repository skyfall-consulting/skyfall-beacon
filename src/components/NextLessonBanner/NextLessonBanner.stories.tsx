import type { Meta, StoryObj } from '@storybook/react-vite';
import { NextLessonBanner } from './NextLessonBanner';

const meta: Meta<typeof NextLessonBanner> = {
  title: 'Beacon X/Learning Patterns/NextLessonBanner',
  component: NextLessonBanner,
  tags: ['autodocs'],
  decorators: [(Story) => <div style={{ width: 720 }}><Story /></div>],
  parameters: { layout: 'centered' },
  argTypes: {
    tone: {
      control: { type: 'inline-radio' },
      options: ['momentum', 'milestone', 'gentle', 'celebration'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof NextLessonBanner>;

export const Momentum: Story = {
  args: {
    headline: 'Pick up where you left off',
    lessonTitle: 'Designing for the median, not the average',
    context: 'Module 3 · 12 min remaining',
    tone: 'momentum',
    ctaLabel: 'Continue lesson',
    onCta: () => {},
  },
};

export const Milestone: Story = {
  args: {
    headline: 'You\u2019re one step from a milestone',
    lessonTitle: 'Finish Module 3 to unlock the capstone',
    context: '2 lessons remaining',
    tone: 'milestone',
    ctaLabel: 'Finish module',
    onCta: () => {},
  },
};

export const Gentle: Story = {
  args: {
    headline: 'Welcome back \u2014 ease in',
    lessonTitle: 'Quick refresher: histograms in 4 minutes',
    context: 'No pressure \u2014 a short reading to warm up',
    tone: 'gentle',
    ctaLabel: 'Start refresher',
    onCta: () => {},
  },
};

export const Celebration: Story = {
  args: {
    headline: 'Course complete \u2014 nicely done',
    lessonTitle: 'Foundations of Data Visualization',
    context: 'Your certificate is ready to share',
    tone: 'celebration',
    ctaLabel: 'View certificate',
    onCta: () => {},
  },
};

export const WithoutCta: Story = {
  args: {
    headline: 'Today\u2019s focus',
    lessonTitle: 'Color, contrast, and the colorblind 8%',
    context: 'Module 2 · 10 min',
    tone: 'momentum',
  },
};
