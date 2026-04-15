import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { CheckboxGroup } from './CheckboxGroup';

const meta: Meta<typeof CheckboxGroup> = {
  title: 'Components/Inputs/CheckboxGroup',
  component: CheckboxGroup,
  tags: ['autodocs'],
  decorators: [(Story) => <div style={{ width: 360 }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof CheckboxGroup>;

const symptomOptions = [
  { value: 'fever', label: 'Fever' },
  { value: 'cough', label: 'Cough' },
  { value: 'fatigue', label: 'Fatigue' },
  { value: 'headache', label: 'Headache' },
  { value: 'shortness-of-breath', label: 'Shortness of breath' },
  { value: 'body-aches', label: 'Body aches' },
];

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>([]);
    return (
      <CheckboxGroup
        label="Reported Symptoms"
        name="symptoms"
        options={symptomOptions}
        value={value}
        onChange={setValue}
      />
    );
  },
};

export const WithPreselected: Story = {
  render: () => {
    const [value, setValue] = useState(['fever', 'cough']);
    return (
      <CheckboxGroup
        label="Reported Symptoms"
        name="symptoms-pre"
        options={symptomOptions}
        value={value}
        onChange={setValue}
      />
    );
  },
};

export const Horizontal: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>([]);
    return (
      <CheckboxGroup
        label="Allergies"
        name="allergies"
        options={[
          { value: 'penicillin', label: 'Penicillin' },
          { value: 'latex', label: 'Latex' },
          { value: 'pollen', label: 'Pollen' },
          { value: 'none', label: 'None' },
        ]}
        value={value}
        onChange={setValue}
        orientation="horizontal"
      />
    );
  },
};

export const WithError: Story = {
  render: () => (
    <CheckboxGroup
      label="Consent Forms"
      name="consent"
      options={[
        { value: 'hipaa', label: 'HIPAA Authorization' },
        { value: 'treatment', label: 'Consent to Treatment' },
        { value: 'billing', label: 'Financial Responsibility' },
      ]}
      value={[]}
      error="At least one consent form must be acknowledged"
    />
  ),
};

export const WithDisabledOption: Story = {
  render: () => {
    const [value, setValue] = useState(['vitals']);
    return (
      <CheckboxGroup
        label="Lab Orders"
        name="labs"
        options={[
          { value: 'vitals', label: 'Vital Signs' },
          { value: 'cbc', label: 'Complete Blood Count' },
          { value: 'restricted', label: 'Restricted Panel', disabled: true },
        ]}
        value={value}
        onChange={setValue}
      />
    );
  },
};

export const Disabled: Story = {
  args: {
    label: 'Completed Assessments',
    name: 'assessments',
    options: [
      { value: 'intake', label: 'Intake Assessment' },
      { value: 'physical', label: 'Physical Exam' },
    ],
    value: ['intake', 'physical'],
    disabled: true,
  },
};
