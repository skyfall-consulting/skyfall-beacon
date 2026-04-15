import type { Meta, StoryObj } from '@storybook/react-vite';
import { BarChart } from './BarChart';
import { StackedBarChart } from './StackedBarChart';

const meta: Meta<typeof BarChart> = {
  title: 'Beacon X/Charts/BarChart',
  component: BarChart,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof BarChart>;

const claimsData = [
  { category: 'Inpatient', count: 412 },
  { category: 'Outpatient', count: 1280 },
  { category: 'Pharmacy', count: 894 },
  { category: 'Lab', count: 642 },
  { category: 'Imaging', count: 318 },
];

export const Default: Story = {
  args: {
    title: 'Claims by category',
    subtitle: 'Q1 2026',
    data: claimsData,
    xKey: 'category',
    series: [{ dataKey: 'count', label: 'Claims' }],
    style: { maxWidth: 720 },
  },
};

export const Horizontal: Story = {
  args: {
    title: 'Top referring providers',
    subtitle: 'Last 30 days',
    data: [
      { name: 'Dr. Patel', referrals: 48 },
      { name: 'Dr. Nguyen', referrals: 41 },
      { name: 'Dr. Johnson', referrals: 36 },
      { name: 'Dr. Garcia', referrals: 32 },
      { name: 'Dr. Kim', referrals: 27 },
    ],
    xKey: 'name',
    series: [{ dataKey: 'referrals', label: 'Referrals' }],
    horizontal: true,
    style: { maxWidth: 720 },
  },
};

export const Stacked: StoryObj<typeof StackedBarChart> = {
  render: (args) => <StackedBarChart {...args} />,
  args: {
    title: 'Patient mix by quarter',
    data: [
      { quarter: 'Q1', medicare: 412, medicaid: 298, commercial: 184 },
      { quarter: 'Q2', medicare: 438, medicaid: 312, commercial: 197 },
      { quarter: 'Q3', medicare: 461, medicaid: 324, commercial: 211 },
      { quarter: 'Q4', medicare: 482, medicaid: 341, commercial: 224 },
    ],
    xKey: 'quarter',
    series: [
      { dataKey: 'medicare', label: 'Medicare' },
      { dataKey: 'medicaid', label: 'Medicaid' },
      { dataKey: 'commercial', label: 'Commercial' },
    ],
    style: { maxWidth: 720 },
  },
};

export const Empty: Story = {
  args: {
    title: 'Claims by category',
    data: [],
    xKey: 'category',
    series: [{ dataKey: 'count' }],
    style: { maxWidth: 720 },
  },
};
