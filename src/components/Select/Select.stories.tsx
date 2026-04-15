import type { Meta, StoryObj } from '@storybook/react-vite';
import { Select } from './Select';

const meta: Meta<typeof Select> = {
  title: 'Components/Inputs/Select',
  component: Select,
  tags: ['autodocs'],
  decorators: [(Story) => <div style={{ width: 280 }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
  args: { fullWidth: true },
  render: (args) => (
    <Select {...args}>
      <option value="">Select department...</option>
      <option value="cardiology">Cardiology</option>
      <option value="neurology">Neurology</option>
      <option value="orthopedics">Orthopedics</option>
    </Select>
  ),
};

export const WithError: Story = {
  args: { error: true, fullWidth: true },
  render: (args) => (
    <Select {...args}>
      <option value="">Required field</option>
    </Select>
  ),
};

export const Disabled: Story = {
  args: { disabled: true, fullWidth: true },
  render: (args) => (
    <Select {...args}>
      <option>Not editable</option>
    </Select>
  ),
};
