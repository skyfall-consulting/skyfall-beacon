import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { OTPInput } from './OTPInput';

const meta: Meta<typeof OTPInput> = {
  title: 'Components/Inputs/OTPInput',
  component: OTPInput,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof OTPInput>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return <OTPInput value={value} onChange={setValue} />;
  },
};

export const FourDigits: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return <OTPInput length={4} value={value} onChange={setValue} />;
  },
};

export const WithValue: Story = {
  render: () => {
    const [value, setValue] = useState('482916');
    return <OTPInput value={value} onChange={setValue} />;
  },
};

export const WithError: Story = {
  render: () => {
    const [value, setValue] = useState('123');
    return <OTPInput value={value} onChange={setValue} error />;
  },
};

export const Disabled: Story = {
  args: {
    value: '000000',
    disabled: true,
  },
};

export const AutoFocus: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return <OTPInput value={value} onChange={setValue} autoFocus />;
  },
};
