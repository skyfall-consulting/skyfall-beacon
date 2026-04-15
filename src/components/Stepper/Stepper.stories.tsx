import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Stepper } from './Stepper';

const meta: Meta<typeof Stepper> = {
  title: 'Components/Navigation/Stepper',
  component: Stepper,
  tags: ['autodocs'],
  decorators: [(Story) => <div style={{ width: 640 }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof Stepper>;

const patientIntakeSteps = [
  { label: 'Demographics', description: 'Personal information' },
  { label: 'Insurance', description: 'Coverage details' },
  { label: 'Medical History', description: 'Past conditions' },
  { label: 'Consent', description: 'Forms and signatures' },
  { label: 'Review', description: 'Verify information' },
];

export const Default: Story = {
  args: {
    steps: patientIntakeSteps,
    activeStep: 2,
  },
};

export const FirstStep: Story = {
  args: {
    steps: patientIntakeSteps,
    activeStep: 0,
  },
};

export const LastStep: Story = {
  args: {
    steps: patientIntakeSteps,
    activeStep: 4,
  },
};

export const Interactive: Story = {
  render: () => {
    const [step, setStep] = useState(1);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <Stepper
          steps={patientIntakeSteps}
          activeStep={step}
          onStepClick={setStep}
        />
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => setStep((s) => Math.max(0, s - 1))}>Previous</button>
          <button onClick={() => setStep((s) => Math.min(patientIntakeSteps.length - 1, s + 1))}>Next</button>
        </div>
      </div>
    );
  },
};

export const Vertical: Story = {
  render: () => (
    <div style={{ width: 280 }}>
      <Stepper
        steps={[
          { label: 'Check-in', description: 'Arrive and register' },
          { label: 'Vitals', description: 'Blood pressure, temperature' },
          { label: 'Consultation', description: 'Meet with physician' },
          { label: 'Lab Work', description: 'Blood draw and tests' },
          { label: 'Checkout', description: 'Schedule follow-up' },
        ]}
        activeStep={2}
        orientation="vertical"
      />
    </div>
  ),
};

export const SimpleSteps: Story = {
  args: {
    steps: [
      { label: 'Step 1' },
      { label: 'Step 2' },
      { label: 'Step 3' },
    ],
    activeStep: 1,
  },
};
