import type { Meta, StoryObj } from '@storybook/react-vite';
import { ChartCard } from './ChartCard';

const meta: Meta<typeof ChartCard> = {
  title: 'Beacon X/Charts/ChartCard',
  component: ChartCard,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof ChartCard>;

const placeholder = (
  <div
    style={{
      height: 220,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--beacon-color-text-muted)',
      fontSize: 13,
      border: '1px dashed var(--beacon-color-border-default)',
      borderRadius: 'var(--beacon-radius-md)',
    }}
  >
    [Chart body slot]
  </div>
);

export const Default: Story = {
  args: {
    title: 'Patient cohort overview',
    subtitle: 'Last 30 days',
    metric: '1,284',
    children: placeholder,
    style: { maxWidth: 720 },
  },
};

export const Loading: Story = {
  args: {
    title: 'Patient cohort overview',
    subtitle: 'Last 30 days',
    state: 'loading',
    children: placeholder,
    style: { maxWidth: 720 },
  },
};

export const Empty: Story = {
  args: {
    title: 'Patient cohort overview',
    state: 'empty',
    children: placeholder,
    style: { maxWidth: 720 },
  },
};

export const ErrorState: Story = {
  args: {
    title: 'Patient cohort overview',
    state: 'error',
    children: placeholder,
    style: { maxWidth: 720 },
  },
};
