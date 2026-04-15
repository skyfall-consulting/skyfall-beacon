import type { Meta, StoryObj } from '@storybook/react-vite';
import { Accordion } from './Accordion';

const meta: Meta<typeof Accordion> = {
  title: 'Components/Surfaces/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  decorators: [(Story) => <div style={{ width: 520 }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const FAQ: Story = {
  args: {
    items: [
      {
        id: 'hours',
        title: 'What are the clinic hours?',
        content: 'Our clinic is open Monday through Friday, 8:00 AM to 6:00 PM. Saturday hours are 9:00 AM to 1:00 PM. We are closed on Sundays and holidays.',
      },
      {
        id: 'insurance',
        title: 'What insurance plans do you accept?',
        content: 'We accept most major insurance plans including Blue Cross Blue Shield, Aetna, Cigna, UnitedHealthcare, and Medicare. Please contact our office to verify coverage.',
      },
      {
        id: 'telehealth',
        title: 'Do you offer telehealth appointments?',
        content: 'Yes, we offer telehealth visits for follow-up consultations, medication management, and minor concerns. Schedule through the patient portal or call our office.',
      },
    ],
  },
};

export const PatientHistory: Story = {
  args: {
    allowMultiple: true,
    defaultOpenIds: ['allergies'],
    items: [
      {
        id: 'allergies',
        title: 'Allergies',
        content: 'Penicillin (severe), Sulfa drugs (moderate), Latex (mild). Last reviewed: March 2026.',
      },
      {
        id: 'medications',
        title: 'Current Medications',
        content: 'Lisinopril 10mg daily, Metformin 500mg twice daily, Atorvastatin 20mg at bedtime.',
      },
      {
        id: 'conditions',
        title: 'Active Conditions',
        content: 'Type 2 Diabetes Mellitus, Essential Hypertension, Hyperlipidemia.',
      },
      {
        id: 'surgeries',
        title: 'Surgical History',
        content: 'Appendectomy (2015), Right knee arthroscopy (2019).',
      },
    ],
  },
};

export const SingleOpen: Story = {
  args: {
    defaultOpenIds: ['vitals'],
    items: [
      {
        id: 'vitals',
        title: 'Vital Signs',
        content: 'BP: 128/82 mmHg, HR: 72 bpm, Temp: 98.6\u00B0F, SpO2: 98%, Weight: 165 lbs.',
      },
      {
        id: 'labs',
        title: 'Recent Lab Results',
        content: 'HbA1c: 6.8%, Fasting Glucose: 118 mg/dL, Total Cholesterol: 195 mg/dL.',
      },
      {
        id: 'notes',
        title: 'Provider Notes',
        content: 'Patient reports improved adherence to medication regimen. Glycemic control stable. Continue current plan.',
      },
    ],
  },
};
