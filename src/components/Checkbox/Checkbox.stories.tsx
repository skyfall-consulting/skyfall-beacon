import type { Meta, StoryObj } from '@storybook/react-vite';
import { Checkbox } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Inputs/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: { label: 'I agree to the terms of service' },
};

export const Checked: Story = {
  args: { label: 'Consent obtained', defaultChecked: true },
};

export const WithError: Story = {
  args: { label: 'Required consent', error: true },
};

export const Disabled: Story = {
  args: { label: 'Not available', disabled: true },
};
