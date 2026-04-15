import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Rating } from './Rating';

const meta: Meta<typeof Rating> = {
  title: 'Components/Inputs/Rating',
  component: Rating,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Rating>;

export const Default: Story = {
  args: {
    value: 3,
    label: 'Product rating',
  },
};

export const Interactive: Story = {
  render: () => {
    const [value, setValue] = useState(0);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontFamily: 'var(--beacon-font-family-sans)' }}>
        <Rating value={value} onChange={setValue} label="Your rating" />
        <span style={{ fontSize: 14, color: 'var(--beacon-color-text-secondary)' }}>
          {value > 0 ? `You rated ${value} of 5` : 'Click to rate'}
        </span>
      </div>
    );
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Rating value={4} size="sm" label="Small rating" readOnly />
      <Rating value={4} size="md" label="Medium rating" readOnly />
      <Rating value={4} size="lg" label="Large rating" readOnly />
    </div>
  ),
};

export const ReadOnly: Story = {
  args: {
    value: 4,
    readOnly: true,
    label: 'Average rating',
  },
};

export const CustomMax: Story = {
  name: 'Custom Max (10)',
  args: {
    value: 7,
    max: 10,
    size: 'sm',
    readOnly: true,
    label: 'Score out of 10',
  },
};

export const Disabled: Story = {
  args: {
    value: 2,
    disabled: true,
    label: 'Disabled rating',
  },
};
