import type { Meta, StoryObj } from '@storybook/react-vite';
import { Popover } from './Popover';

const meta: Meta<typeof Popover> = {
  title: 'Components/Surfaces/Popover',
  component: Popover,
  tags: ['autodocs'],
  decorators: [(Story) => <div style={{ padding: 120, display: 'flex', justifyContent: 'center' }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof Popover>;

export const Default: Story = {
  args: {
    trigger: (
      <button
        style={{
          padding: '8px 16px',
          borderRadius: 8,
          border: '1px solid var(--beacon-color-border-default)',
          background: 'var(--beacon-color-surface-default)',
          cursor: 'pointer',
          fontFamily: 'var(--beacon-font-family-sans)',
        }}
      >
        Open Popover
      </button>
    ),
    content: (
      <div>
        <strong>Patient Quick View</strong>
        <p style={{ margin: '8px 0 0', color: 'var(--beacon-color-text-secondary)' }}>
          Jane Cooper, DOB: 03/14/1985<br />
          MRN: 001234 | Cardiology
        </p>
      </div>
    ),
  },
};

export const TopPlacement: Story = {
  name: 'Top Placement',
  args: {
    ...Default.args,
    placement: 'top',
  },
};

export const RightPlacement: Story = {
  name: 'Right Placement',
  args: {
    ...Default.args,
    placement: 'right',
  },
};

export const MedicationDetails: Story = {
  name: 'Medication Details',
  args: {
    trigger: (
      <span style={{ textDecoration: 'underline', cursor: 'pointer', color: 'var(--beacon-color-brand-primary-500)', fontFamily: 'var(--beacon-font-family-sans)' }}>
        Lisinopril 10mg
      </span>
    ),
    content: (
      <div style={{ maxWidth: 260, fontFamily: 'var(--beacon-font-family-sans)' }}>
        <strong>Lisinopril 10mg</strong>
        <p style={{ margin: '4px 0', fontSize: 13, color: 'var(--beacon-color-text-secondary)' }}>
          ACE Inhibitor - Antihypertensive
        </p>
        <p style={{ margin: '4px 0', fontSize: 13, color: 'var(--beacon-color-text-secondary)' }}>
          <strong>Dosage:</strong> 10mg once daily<br />
          <strong>Route:</strong> Oral<br />
          <strong>Prescriber:</strong> Dr. Robert Fox
        </p>
      </div>
    ),
    placement: 'bottom',
    align: 'start',
  },
};
