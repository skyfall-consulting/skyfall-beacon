import type { Meta, StoryObj } from '@storybook/react-vite';
import { KpiStatCard } from './KpiStatCard';

const meta: Meta<typeof KpiStatCard> = {
  title: 'Beacon X/Charts/KpiStatCard',
  component: KpiStatCard,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof KpiStatCard>;

const trend = [142, 158, 161, 174, 168, 172, 184, 192, 201, 218, 224, 236];

export const Default: Story = {
  args: {
    label: 'Active patients',
    value: '1,284',
    change: 8.4,
    changeLabel: 'vs last 30 days',
    sparklineData: trend,
    style: { maxWidth: 320 },
  },
};

export const Inverse: Story = {
  args: {
    label: 'Avg wait time',
    value: '12',
    unit: 'min',
    change: -14.2,
    changeLabel: 'vs last week',
    inverse: true,
    sparklineData: [22, 21, 19, 20, 18, 17, 16, 15, 14, 13, 13, 12],
    sparklineColor: 'var(--beacon-data-vis-2)',
    style: { maxWidth: 320 },
  },
};

export const NoSparkline: Story = {
  args: {
    label: 'Care plans active',
    value: '847',
    change: 2.1,
    changeLabel: 'vs last month',
    style: { maxWidth: 320 },
  },
};

export const Compact: Story = {
  args: {
    label: 'Adherence',
    value: '94',
    unit: '%',
    change: 1.2,
    sparklineData: trend,
    density: 'compact',
    style: { maxWidth: 280 },
  },
};

export const Grid: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: 16,
        maxWidth: 1080,
      }}
    >
      <KpiStatCard
        label="Active patients"
        value="1,284"
        change={8.4}
        changeLabel="vs last 30 days"
        sparklineData={trend}
      />
      <KpiStatCard
        label="Avg wait time"
        value="12"
        unit="min"
        change={-14.2}
        changeLabel="vs last week"
        inverse
        sparklineData={[22, 21, 19, 20, 18, 17, 16, 15, 14, 13, 13, 12]}
        sparklineColor="var(--beacon-data-vis-2)"
      />
      <KpiStatCard
        label="Care gaps closed"
        value="312"
        change={5.6}
        changeLabel="vs last 30 days"
        sparklineData={[20, 22, 24, 28, 26, 29, 31, 30, 33, 35, 38, 42]}
        sparklineColor="var(--beacon-data-vis-3)"
      />
      <KpiStatCard
        label="Readmission rate"
        value="6.2"
        unit="%"
        change={-2.8}
        changeLabel="vs Q4 2025"
        inverse
        sparklineData={[8.4, 8.1, 7.8, 7.5, 7.2, 7.0, 6.8, 6.6, 6.5, 6.3, 6.2, 6.2]}
        sparklineColor="var(--beacon-data-vis-4)"
      />
    </div>
  ),
};
