import type { Meta, StoryObj } from '@storybook/react-vite';
import { Progress } from './Progress';

const meta: Meta<typeof Progress> = {
  title: 'Components/Data Display/Progress',
  component: Progress,
  tags: ['autodocs'],
  decorators: [(Story) => <div style={{ width: 320 }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof Progress>;

export const Default: Story = {
  args: { value: 60, label: 'Progress', showValue: true },
};

export const Small: Story = {
  args: { value: 45, size: 'sm' },
};

export const Variants: Story = {
  name: 'All Variants',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Progress value={75} variant="default" label="Default" showValue />
      <Progress value={90} variant="success" label="Complete" showValue />
      <Progress value={50} variant="warning" label="In Progress" showValue />
      <Progress value={25} variant="error" label="At Risk" showValue />
    </div>
  ),
};

export const PatientIntake: Story = {
  name: 'Patient Intake Progress',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Progress value={100} variant="success" label="Demographics" showValue size="sm" />
      <Progress value={100} variant="success" label="Insurance" showValue size="sm" />
      <Progress value={60} variant="default" label="Medical History" showValue size="sm" />
      <Progress value={0} variant="default" label="Consent Forms" showValue size="sm" />
    </div>
  ),
};
