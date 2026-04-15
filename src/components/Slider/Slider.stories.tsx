import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Slider } from './Slider';

const meta: Meta<typeof Slider> = {
  title: 'Components/Inputs/Slider',
  component: Slider,
  tags: ['autodocs'],
  decorators: [(Story) => <div style={{ width: 320 }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof Slider>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState(50);
    return <Slider value={value} onChange={setValue} />;
  },
};

export const WithLabel: Story = {
  render: () => {
    const [value, setValue] = useState(7);
    return (
      <Slider
        value={value}
        onChange={setValue}
        min={0}
        max={10}
        label="Pain Level"
        showValue
      />
    );
  },
};

export const Small: Story = {
  render: () => {
    const [value, setValue] = useState(37);
    return (
      <Slider
        value={value}
        onChange={setValue}
        size="sm"
        label="Satisfaction Score"
        showValue
      />
    );
  },
};

export const WithStep: Story = {
  render: () => {
    const [value, setValue] = useState(98);
    return (
      <Slider
        value={value}
        onChange={setValue}
        min={95}
        max={105}
        step={0.1}
        label="Temperature (°F)"
        showValue
      />
    );
  },
};

export const Disabled: Story = {
  args: {
    value: 60,
    label: 'Volume',
    showValue: true,
    disabled: true,
  },
};
