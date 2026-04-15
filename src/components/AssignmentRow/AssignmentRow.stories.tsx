import type { Meta, StoryObj } from '@storybook/react-vite';
import { AssignmentRow } from './AssignmentRow';
import { Button } from '../Button/Button';

const meta: Meta<typeof AssignmentRow> = {
  title: 'Beacon X/Learning Patterns/AssignmentRow',
  component: AssignmentRow,
  tags: ['autodocs'],
  decorators: [(Story) => <div style={{ width: 560 }}><Story /></div>],
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof AssignmentRow>;

export const NotStarted: Story = {
  args: {
    title: 'Reading response: chapter 4',
    course: 'Foundations of Data Visualization',
    dueLabel: 'Due Apr 22',
    status: 'not-started',
    trailing: <Button variant="ghost" size="sm">Open</Button>,
  },
};

export const InProgress: Story = {
  args: {
    title: 'Build a stacked bar chart',
    course: 'Foundations of Data Visualization',
    dueLabel: 'Due Apr 19',
    status: 'in-progress',
    trailing: <Button variant="ghost" size="sm">Resume</Button>,
  },
};

export const Submitted: Story = {
  args: {
    title: 'Critique: government dashboards',
    course: 'Foundations of Data Visualization',
    dueLabel: 'Submitted Apr 14',
    status: 'submitted',
  },
};

export const Graded: Story = {
  args: {
    title: 'Quiz: chart selection',
    course: 'Foundations of Data Visualization',
    dueLabel: 'Returned Apr 12',
    status: 'graded',
    score: '92 / 100',
    trailing: <Button variant="ghost" size="sm">View feedback</Button>,
  },
};

export const Overdue: Story = {
  args: {
    title: 'Capstone proposal',
    course: 'Foundations of Data Visualization',
    dueLabel: 'Due Apr 10',
    status: 'overdue',
    trailing: <Button variant="primary" size="sm">Submit late</Button>,
  },
};

export const Tracker: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <AssignmentRow title="Capstone proposal" course="Data Viz" dueLabel="Due Apr 10" status="overdue" />
      <AssignmentRow title="Build a stacked bar chart" course="Data Viz" dueLabel="Due Apr 19" status="in-progress" />
      <AssignmentRow title="Reading response: chapter 4" course="Data Viz" dueLabel="Due Apr 22" status="not-started" />
      <AssignmentRow title="Critique: government dashboards" course="Data Viz" dueLabel="Submitted Apr 14" status="submitted" />
      <AssignmentRow title="Quiz: chart selection" course="Data Viz" dueLabel="Returned Apr 12" status="graded" score="92 / 100" />
    </div>
  ),
};
