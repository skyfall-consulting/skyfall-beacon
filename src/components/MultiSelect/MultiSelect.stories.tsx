import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { MultiSelect } from './MultiSelect';

const meta: Meta<typeof MultiSelect> = {
  title: 'Components/Inputs/MultiSelect',
  component: MultiSelect,
  tags: ['autodocs'],
  decorators: [(Story) => <div style={{ width: 360 }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof MultiSelect>;

const specialtyOptions = [
  { value: 'cardiology', label: 'Cardiology' },
  { value: 'dermatology', label: 'Dermatology' },
  { value: 'endocrinology', label: 'Endocrinology' },
  { value: 'gastroenterology', label: 'Gastroenterology' },
  { value: 'neurology', label: 'Neurology' },
  { value: 'oncology', label: 'Oncology' },
  { value: 'orthopedics', label: 'Orthopedics' },
  { value: 'pediatrics', label: 'Pediatrics' },
  { value: 'psychiatry', label: 'Psychiatry' },
  { value: 'radiology', label: 'Radiology' },
];

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>([]);
    return (
      <MultiSelect
        options={specialtyOptions}
        value={value}
        onChange={setValue}
        placeholder="Select specialties..."
      />
    );
  },
};

export const WithPreselected: Story = {
  render: () => {
    const [value, setValue] = useState(['cardiology', 'neurology']);
    return (
      <MultiSelect
        options={specialtyOptions}
        value={value}
        onChange={setValue}
        placeholder="Select specialties..."
      />
    );
  },
};

export const MaxDisplayedTags: Story = {
  render: () => {
    const [value, setValue] = useState(['cardiology', 'neurology', 'oncology', 'pediatrics']);
    return (
      <MultiSelect
        options={specialtyOptions}
        value={value}
        onChange={setValue}
        maxDisplayedTags={2}
      />
    );
  },
};

export const Small: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>(['cardiology']);
    return (
      <MultiSelect
        options={specialtyOptions}
        value={value}
        onChange={setValue}
        size="sm"
      />
    );
  },
};

export const Large: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>([]);
    return (
      <MultiSelect
        options={specialtyOptions}
        value={value}
        onChange={setValue}
        size="lg"
        placeholder="Select departments..."
      />
    );
  },
};

export const WithError: Story = {
  render: () => (
    <MultiSelect
      options={specialtyOptions}
      value={[]}
      error
      placeholder="Required field..."
    />
  ),
};

export const Disabled: Story = {
  args: {
    options: specialtyOptions,
    value: ['cardiology', 'neurology'],
    disabled: true,
  },
};
