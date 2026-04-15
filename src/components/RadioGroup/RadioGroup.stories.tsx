import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { RadioGroup } from './RadioGroup';

const meta: Meta<typeof RadioGroup> = {
  title: 'Components/Inputs/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
  decorators: [(Story) => <div style={{ width: 360 }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState<string | undefined>();
    return (
      <RadioGroup
        label="Insurance Type"
        name="insurance"
        options={[
          { value: 'private', label: 'Private Insurance' },
          { value: 'medicare', label: 'Medicare' },
          { value: 'medicaid', label: 'Medicaid' },
          { value: 'self-pay', label: 'Self-Pay' },
        ]}
        value={value}
        onChange={setValue}
      />
    );
  },
};

export const WithPreselected: Story = {
  render: () => {
    const [value, setValue] = useState('urgent');
    return (
      <RadioGroup
        label="Visit Priority"
        name="priority"
        options={[
          { value: 'routine', label: 'Routine' },
          { value: 'urgent', label: 'Urgent' },
          { value: 'emergency', label: 'Emergency' },
        ]}
        value={value}
        onChange={setValue}
      />
    );
  },
};

export const Horizontal: Story = {
  render: () => {
    const [value, setValue] = useState<string | undefined>();
    return (
      <RadioGroup
        label="Patient Gender"
        name="gender"
        options={[
          { value: 'male', label: 'Male' },
          { value: 'female', label: 'Female' },
          { value: 'other', label: 'Other' },
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
    <RadioGroup
      label="Appointment Type"
      name="appt-type"
      options={[
        { value: 'in-person', label: 'In-Person Visit' },
        { value: 'telehealth', label: 'Telehealth' },
        { value: 'phone', label: 'Phone Consultation' },
      ]}
      error="Please select an appointment type"
    />
  ),
};

export const WithDisabledOption: Story = {
  render: () => {
    const [value, setValue] = useState<string | undefined>();
    return (
      <RadioGroup
        label="Department"
        name="dept"
        options={[
          { value: 'cardiology', label: 'Cardiology' },
          { value: 'neurology', label: 'Neurology' },
          { value: 'oncology', label: 'Oncology', disabled: true },
        ]}
        value={value}
        onChange={setValue}
      />
    );
  },
};

export const Disabled: Story = {
  args: {
    label: 'Referral Source',
    name: 'referral',
    options: [
      { value: 'physician', label: 'Physician Referral' },
      { value: 'self', label: 'Self-Referral' },
    ],
    value: 'physician',
    disabled: true,
  },
};
