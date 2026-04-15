import type { Meta, StoryObj } from '@storybook/react-vite';
import { Skeleton } from './Skeleton';

const meta: Meta<typeof Skeleton> = {
  title: 'Components/Data Display/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Text: Story = {
  args: { variant: 'text', width: 200 },
};

export const MultiLineText: Story = {
  args: { variant: 'text', lines: 3, width: 300 },
};

export const Circular: Story = {
  args: { variant: 'circular', width: 48, height: 48 },
};

export const Rectangular: Story = {
  args: { variant: 'rectangular', width: 300, height: 160 },
};

export const PatientCardLoading: Story = {
  name: 'Patient Card Loading',
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', width: 320 }}>
      <Skeleton variant="circular" width={48} height={48} />
      <div style={{ flex: 1 }}>
        <Skeleton variant="text" width="60%" />
        <div style={{ height: 8 }} />
        <Skeleton variant="text" lines={2} />
      </div>
    </div>
  ),
};
