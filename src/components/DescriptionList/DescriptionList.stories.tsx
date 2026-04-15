import type { Meta, StoryObj } from '@storybook/react-vite';
import { DescriptionList } from './DescriptionList';

const meta: Meta<typeof DescriptionList> = {
  title: 'Components/Data Display/DescriptionList',
  component: DescriptionList,
  tags: ['autodocs'],
  decorators: [(Story) => <div style={{ width: 480 }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof DescriptionList>;

const patientInfo = [
  { label: 'Full Name', value: 'Jane A. Cooper' },
  { label: 'Date of Birth', value: 'March 14, 1985' },
  { label: 'MRN', value: '001234' },
  { label: 'Primary Insurance', value: 'BlueCross BlueShield PPO' },
  { label: 'Primary Care Physician', value: 'Dr. Robert Fox' },
  { label: 'Phone', value: '(555) 123-4567' },
];

export const Vertical: Story = {
  args: {
    items: patientInfo,
    layout: 'vertical',
  },
};

export const Horizontal: Story = {
  args: {
    items: patientInfo,
    layout: 'horizontal',
  },
};

export const Grid: Story = {
  args: {
    items: patientInfo,
    layout: 'grid',
    columns: 2,
  },
};

export const ThreeColumnGrid: Story = {
  name: 'Three-Column Grid',
  args: {
    items: patientInfo,
    layout: 'grid',
    columns: 3,
  },
};
