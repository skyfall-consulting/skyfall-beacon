import type { Meta, StoryObj } from '@storybook/react-vite';
import { TrendStatCard } from './TrendStatCard';

const meta: Meta<typeof TrendStatCard> = {
  title: 'Beacon X/Charts/TrendStatCard',
  component: TrendStatCard,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof TrendStatCard>;

const data = [
  { week: 'W1', value: 142 },
  { week: 'W2', value: 158 },
  { week: 'W3', value: 161 },
  { week: 'W4', value: 174 },
  { week: 'W5', value: 168 },
  { week: 'W6', value: 184 },
  { week: 'W7', value: 192 },
  { week: 'W8', value: 218 },
];

export const Default: Story = {
  args: {
    label: 'Care gap closures',
    value: '218',
    change: 12.4,
    changeLabel: '8-week trend',
    data,
    xKey: 'week',
    yKey: 'value',
    style: { maxWidth: 360 },
  },
};

export const InverseGood: Story = {
  args: {
    label: '30-day readmissions',
    value: '6.2',
    unit: '%',
    change: -8.6,
    changeLabel: 'vs prior 30 days',
    inverse: true,
    color: 'var(--beacon-data-vis-2)',
    data: [
      { week: 'W1', value: 8.1 },
      { week: 'W2', value: 7.8 },
      { week: 'W3', value: 7.5 },
      { week: 'W4', value: 7.3 },
      { week: 'W5', value: 7.0 },
      { week: 'W6', value: 6.7 },
      { week: 'W7', value: 6.4 },
      { week: 'W8', value: 6.2 },
    ],
    xKey: 'week',
    yKey: 'value',
    style: { maxWidth: 360 },
  },
};

export const Row: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 16,
        maxWidth: 1200,
      }}
    >
      <TrendStatCard
        label="Care gap closures"
        value="218"
        change={12.4}
        changeLabel="8-week trend"
        data={data}
        xKey="week"
        yKey="value"
      />
      <TrendStatCard
        label="30-day readmissions"
        value="6.2"
        unit="%"
        change={-8.6}
        changeLabel="vs prior 30 days"
        inverse
        color="var(--beacon-data-vis-2)"
        data={[
          { week: 'W1', value: 8.1 },
          { week: 'W2', value: 7.8 },
          { week: 'W3', value: 7.5 },
          { week: 'W4', value: 7.3 },
          { week: 'W5', value: 7.0 },
          { week: 'W6', value: 6.7 },
          { week: 'W7', value: 6.4 },
          { week: 'W8', value: 6.2 },
        ]}
        xKey="week"
        yKey="value"
      />
      <TrendStatCard
        label="Daily encounters"
        value="487"
        change={3.4}
        changeLabel="7-day average"
        color="var(--beacon-data-vis-3)"
        data={[
          { day: 'Mon', value: 412 },
          { day: 'Tue', value: 438 },
          { day: 'Wed', value: 461 },
          { day: 'Thu', value: 472 },
          { day: 'Fri', value: 481 },
          { day: 'Sat', value: 476 },
          { day: 'Sun', value: 487 },
        ]}
        xKey="day"
        yKey="value"
      />
    </div>
  ),
};
