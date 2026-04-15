import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Autocomplete } from './Autocomplete';

const meta: Meta<typeof Autocomplete> = {
  title: 'Components/Inputs/Autocomplete',
  component: Autocomplete,
  tags: ['autodocs'],
  decorators: [(Story) => <div style={{ width: 360 }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof Autocomplete>;

const diagnosisOptions = [
  { value: 'j06.9', label: 'Acute upper respiratory infection' },
  { value: 'j18.9', label: 'Pneumonia, unspecified' },
  { value: 'i10', label: 'Essential hypertension' },
  { value: 'e11.9', label: 'Type 2 diabetes mellitus' },
  { value: 'j45.909', label: 'Unspecified asthma, uncomplicated' },
  { value: 'm54.5', label: 'Low back pain' },
  { value: 'r10.9', label: 'Unspecified abdominal pain' },
  { value: 'k21.0', label: 'Gastro-esophageal reflux disease' },
  { value: 'f32.9', label: 'Major depressive disorder' },
  { value: 'j02.9', label: 'Acute pharyngitis, unspecified' },
];

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState<string | undefined>();
    return (
      <Autocomplete
        options={diagnosisOptions}
        value={value}
        onChange={setValue}
        placeholder="Search diagnosis codes..."
      />
    );
  },
};

export const WithPreselected: Story = {
  render: () => {
    const [value, setValue] = useState('i10');
    return (
      <Autocomplete
        options={diagnosisOptions}
        value={value}
        onChange={setValue}
        placeholder="Search diagnosis codes..."
      />
    );
  },
};

export const Small: Story = {
  render: () => {
    const [value, setValue] = useState<string | undefined>();
    return (
      <Autocomplete
        options={diagnosisOptions}
        value={value}
        onChange={setValue}
        placeholder="Quick search..."
        size="sm"
      />
    );
  },
};

export const Large: Story = {
  render: () => {
    const [value, setValue] = useState<string | undefined>();
    return (
      <Autocomplete
        options={diagnosisOptions}
        value={value}
        onChange={setValue}
        placeholder="Search..."
        size="lg"
      />
    );
  },
};

export const Loading: Story = {
  render: () => (
    <Autocomplete
      options={[]}
      placeholder="Searching medications..."
      loading
    />
  ),
};

export const NoResults: Story = {
  render: () => {
    const [value, setValue] = useState<string | undefined>();
    return (
      <Autocomplete
        options={[]}
        value={value}
        onChange={setValue}
        placeholder="Search..."
        noResultsText="No matching diagnoses found"
      />
    );
  },
};

export const WithError: Story = {
  render: () => (
    <Autocomplete
      options={diagnosisOptions}
      error
      placeholder="Required field..."
    />
  ),
};

export const Disabled: Story = {
  args: {
    options: diagnosisOptions,
    value: 'i10',
    disabled: true,
  },
};
