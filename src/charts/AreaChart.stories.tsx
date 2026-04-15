import type { Meta, StoryObj } from '@storybook/react-vite';
import { AreaChart } from './AreaChart';

const meta: Meta<typeof AreaChart> = {
  title: 'Beacon X/Charts/AreaChart',
  component: AreaChart,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof AreaChart>;

const visitData = [
  { day: 'Mon', visits: 142 },
  { day: 'Tue', visits: 158 },
  { day: 'Wed', visits: 161 },
  { day: 'Thu', visits: 174 },
  { day: 'Fri', visits: 168 },
  { day: 'Sat', visits: 91 },
  { day: 'Sun', visits: 78 },
];

export const Default: Story = {
  args: {
    title: 'Daily clinic visits',
    subtitle: 'This week',
    metric: '972',
    data: visitData,
    xKey: 'day',
    series: [{ dataKey: 'visits', label: 'Visits' }],
    style: { maxWidth: 720 },
  },
};

export const Stacked: Story = {
  args: {
    title: 'Encounter mix by department',
    subtitle: 'Last 6 months',
    data: [
      { month: 'Oct', cardiology: 220, oncology: 180, primary: 410 },
      { month: 'Nov', cardiology: 240, oncology: 192, primary: 432 },
      { month: 'Dec', cardiology: 260, oncology: 205, primary: 458 },
      { month: 'Jan', cardiology: 274, oncology: 218, primary: 471 },
      { month: 'Feb', cardiology: 281, oncology: 224, primary: 494 },
      { month: 'Mar', cardiology: 299, oncology: 236, primary: 512 },
    ],
    xKey: 'month',
    series: [
      { dataKey: 'cardiology', label: 'Cardiology' },
      { dataKey: 'oncology', label: 'Oncology' },
      { dataKey: 'primary', label: 'Primary Care' },
    ],
    stacked: true,
    style: { maxWidth: 720 },
  },
};

export const Empty: Story = {
  args: {
    title: 'Daily clinic visits',
    data: [],
    xKey: 'day',
    series: [{ dataKey: 'visits' }],
    style: { maxWidth: 720 },
  },
};
