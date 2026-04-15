import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { NumberField } from './NumberField';

const meta: Meta<typeof NumberField> = {
  title: 'Components/Inputs/NumberField',
  component: NumberField,
  tags: ['autodocs'],
  decorators: [(Story) => <div style={{ width: 200 }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof NumberField>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState(0);
    return <NumberField value={value} onChange={setValue} placeholder="0" />;
  },
};

export const Dosage: Story = {
  render: () => {
    const [value, setValue] = useState(250);
    return (
      <NumberField
        value={value}
        onChange={setValue}
        min={0}
        max={1000}
        step={50}
        suffix="mg"
      />
    );
  },
};

export const HeartRate: Story = {
  render: () => {
    const [value, setValue] = useState(72);
    return (
      <NumberField
        value={value}
        onChange={setValue}
        min={30}
        max={220}
        suffix="bpm"
      />
    );
  },
};

export const WithPrefix: Story = {
  render: () => {
    const [value, setValue] = useState(150);
    return (
      <NumberField
        value={value}
        onChange={setValue}
        min={0}
        prefix="$"
      />
    );
  },
};

export const Small: Story = {
  render: () => {
    const [value, setValue] = useState(5);
    return <NumberField value={value} onChange={setValue} size="sm" min={0} max={10} />;
  },
};

export const Large: Story = {
  render: () => {
    const [value, setValue] = useState(98);
    return <NumberField value={value} onChange={setValue} size="lg" suffix="°F" />;
  },
};

export const WithError: Story = {
  render: () => {
    const [value, setValue] = useState(300);
    return <NumberField value={value} onChange={setValue} max={200} error suffix="mg" />;
  },
};

export const Disabled: Story = {
  render: () => <NumberField value={42} disabled suffix="kg" />,
};
