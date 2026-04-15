import type { Meta, StoryObj } from '@storybook/react-vite';
import { CourseCard } from './CourseCard';
import { Button } from '../Button/Button';

const meta: Meta<typeof CourseCard> = {
  title: 'Beacon X/Learning Patterns/CourseCard',
  component: CourseCard,
  tags: ['autodocs'],
  decorators: [(Story) => <div style={{ maxWidth: 360 }}><Story /></div>],
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof CourseCard>;

export const InProgress: Story = {
  args: {
    title: 'Foundations of Data Visualization',
    description: 'Learn how to design clear, honest charts and dashboards.',
    instructor: 'Dr. Lena Park',
    modules: 8,
    duration: '6 hrs',
    level: 'intermediate',
    status: 'in-progress',
    progress: 42,
    tags: ['Data', 'Design'],
    action: <Button variant="primary" size="sm">Continue lesson</Button>,
  },
};

export const NotStarted: Story = {
  args: {
    title: 'Intro to Algorithmic Thinking',
    description: 'Build the mental models that great engineers rely on.',
    instructor: 'Marcus Reyes',
    modules: 12,
    duration: '9 hrs',
    level: 'beginner',
    status: 'not-started',
    tags: ['Computer Science', 'Beginner Friendly'],
    action: <Button variant="primary" size="sm">Start course</Button>,
  },
};

export const Completed: Story = {
  args: {
    title: 'Writing for Product Teams',
    description: 'Sharper docs, sharper specs, sharper thinking.',
    instructor: 'Aisha Thompson',
    modules: 6,
    duration: '4 hrs',
    level: 'intermediate',
    status: 'completed',
    progress: 100,
    tags: ['Communication'],
    action: <Button variant="ghost" size="sm">View certificate</Button>,
  },
};

export const WithoutCover: Story = {
  args: {
    title: 'Statistics for Curious People',
    description: 'No prior math required — just curiosity.',
    instructor: 'Dr. Henry Okafor',
    modules: 10,
    duration: '7 hrs',
    level: 'beginner',
    status: 'in-progress',
    progress: 18,
    tags: ['Math'],
  },
};
