import type { Meta, StoryObj } from '@storybook/react-vite';
import { LineChart } from './LineChart';

const meta: Meta<typeof LineChart> = {
  title: 'Beacon X/Charts/LineChart',
  component: LineChart,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof LineChart>;

const adherenceData = [
  { week: 'W1', adherence: 78, target: 85 },
  { week: 'W2', adherence: 81, target: 85 },
  { week: 'W3', adherence: 79, target: 85 },
  { week: 'W4', adherence: 84, target: 85 },
  { week: 'W5', adherence: 86, target: 85 },
  { week: 'W6', adherence: 88, target: 85 },
  { week: 'W7', adherence: 87, target: 85 },
  { week: 'W8', adherence: 90, target: 85 },
];

export const Default: Story = {
  args: {
    title: 'Medication adherence',
    subtitle: '8-week rolling average across active care plans',
    metric: '88%',
    data: adherenceData,
    xKey: 'week',
    series: [{ dataKey: 'adherence', label: 'Adherence %' }],
    referenceLines: [{ value: 85, label: 'Target' }],
    style: { maxWidth: 720 },
  },
};

export const MultiSeries: Story = {
  args: {
    title: 'Patient enrollment vs discharge',
    subtitle: 'Last 6 months',
    data: [
      { month: 'Oct', enrolled: 412, discharged: 388 },
      { month: 'Nov', enrolled: 437, discharged: 401 },
      { month: 'Dec', enrolled: 458, discharged: 423 },
      { month: 'Jan', enrolled: 491, discharged: 444 },
      { month: 'Feb', enrolled: 512, discharged: 461 },
      { month: 'Mar', enrolled: 540, discharged: 478 },
    ],
    xKey: 'month',
    series: [
      { dataKey: 'enrolled', label: 'Enrolled' },
      { dataKey: 'discharged', label: 'Discharged' },
    ],
    style: { maxWidth: 720 },
  },
};

export const Loading: Story = {
  args: {
    title: 'Medication adherence',
    subtitle: '8-week rolling average',
    state: 'loading',
    data: [],
    xKey: 'week',
    series: [{ dataKey: 'adherence' }],
    style: { maxWidth: 720 },
  },
};

export const Empty: Story = {
  args: {
    title: 'Medication adherence',
    subtitle: 'No data for the selected range',
    data: [],
    xKey: 'week',
    series: [{ dataKey: 'adherence' }],
    style: { maxWidth: 720 },
  },
};

export const Error: Story = {
  args: {
    title: 'Medication adherence',
    state: 'error',
    data: [],
    xKey: 'week',
    series: [{ dataKey: 'adherence' }],
    style: { maxWidth: 720 },
  },
};
