import type { Meta, StoryObj } from '@storybook/react-vite';
import { DonutChart } from './DonutChart';

const meta: Meta<typeof DonutChart> = {
  title: 'Beacon X/Charts/DonutChart',
  component: DonutChart,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof DonutChart>;

export const Default: Story = {
  args: {
    title: 'Care plan adherence',
    subtitle: '1,840 active patients',
    centerLabel: '78%',
    centerSublabel: 'Adherent',
    data: [
      { name: 'Adherent', value: 1435 },
      { name: 'At risk', value: 287 },
      { name: 'Non-adherent', value: 118 },
    ],
    style: { maxWidth: 640 },
  },
};

export const PaymentMix: Story = {
  args: {
    title: 'Payer mix',
    subtitle: 'Active members',
    centerLabel: '12.4k',
    centerSublabel: 'Members',
    data: [
      { name: 'Medicare', value: 5240 },
      { name: 'Medicaid', value: 3812 },
      { name: 'Commercial', value: 2698 },
      { name: 'Self-pay', value: 654 },
    ],
    style: { maxWidth: 640 },
  },
};

export const Pie: Story = {
  args: {
    title: 'Encounter distribution',
    variant: 'pie',
    data: [
      { name: 'Telehealth', value: 482 },
      { name: 'In-clinic', value: 941 },
      { name: 'Home visit', value: 162 },
    ],
    style: { maxWidth: 640 },
  },
};

export const Empty: Story = {
  args: {
    title: 'Care plan adherence',
    data: [],
    style: { maxWidth: 640 },
  },
};
