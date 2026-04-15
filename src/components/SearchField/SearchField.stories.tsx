import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { SearchField } from './SearchField';

const meta: Meta<typeof SearchField> = {
  title: 'Components/Inputs/SearchField',
  component: SearchField,
  tags: ['autodocs'],
  decorators: [(Story) => <div style={{ width: 360 }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof SearchField>;

export const Default: Story = {
  args: { placeholder: 'Search patients...', fullWidth: true },
};

export const Small: Story = {
  args: { placeholder: 'Quick search...', size: 'sm', fullWidth: true },
};

export const Large: Story = {
  args: { placeholder: 'Search medical records...', size: 'lg', fullWidth: true },
};

export const WithError: Story = {
  args: { defaultValue: 'xyz', error: true, fullWidth: true },
};

export const Disabled: Story = {
  args: { placeholder: 'Search...', disabled: true, fullWidth: true },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState('Jane Smith');
    return (
      <SearchField
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onClear={() => setValue('')}
        placeholder="Search patients..."
        fullWidth
      />
    );
  },
};
