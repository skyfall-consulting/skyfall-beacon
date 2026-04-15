import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ColorPicker } from './ColorPicker';

const meta: Meta<typeof ColorPicker> = {
  title: 'Components/Inputs/ColorPicker',
  component: ColorPicker,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ColorPicker>;

export const Default: Story = {
  args: {
    label: 'Brand Color',
    value: '#1A73E8',
  },
};

export const Interactive: Story = {
  render: () => {
    const [color, setColor] = useState('#0D9488');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <ColorPicker label="Theme Color" value={color} onChange={setColor} />
        <div style={{ padding: 16, borderRadius: 8, backgroundColor: color, color: 'white', fontFamily: 'var(--beacon-font-family-sans)', fontSize: 14 }}>
          Preview: {color}
        </div>
      </div>
    );
  },
};

export const CustomSwatches: Story = {
  name: 'Custom Swatches',
  args: {
    label: 'Status Color',
    value: '#16A34A',
    swatches: ['#16A34A', '#EAB308', '#F97316', '#EF4444', '#6B7280'],
  },
};

export const Small: Story = {
  args: {
    label: 'Accent',
    value: '#A855F7',
    size: 'sm',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Locked Color',
    value: '#0A2540',
    disabled: true,
  },
};
