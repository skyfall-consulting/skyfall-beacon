import type { Meta, StoryObj } from '@storybook/react-vite';
import { DatePicker } from './DatePicker';

const meta: Meta<typeof DatePicker> = {
  title: 'Components/Inputs/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  decorators: [(Story) => <div style={{ width: 280 }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {
  args: { fullWidth: true },
};

export const DateOfBirth: Story = {
  args: {
    fullWidth: true,
    max: '2026-03-19',
  },
};

export const AppointmentDate: Story = {
  args: {
    fullWidth: true,
    min: '2026-03-19',
    max: '2026-12-31',
    defaultValue: '2026-04-01',
  },
};

export const Small: Story = {
  args: { size: 'sm', fullWidth: true, defaultValue: '2026-01-15' },
};

export const Large: Story = {
  args: { size: 'lg', fullWidth: true, defaultValue: '2026-06-01' },
};

export const WithError: Story = {
  args: { error: true, defaultValue: '2020-01-01', fullWidth: true },
};

export const Disabled: Story = {
  args: { disabled: true, defaultValue: '2026-03-19', fullWidth: true },
};
