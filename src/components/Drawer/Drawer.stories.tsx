import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Drawer } from './Drawer';

const meta: Meta<typeof Drawer> = {
  title: 'Components/Navigation/Drawer',
  component: Drawer,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Drawer>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <button
          onClick={() => setOpen(true)}
          style={{
            padding: '8px 16px',
            borderRadius: 8,
            border: '1px solid var(--beacon-color-border-default)',
            background: 'var(--beacon-color-surface-default)',
            cursor: 'pointer',
            fontFamily: 'var(--beacon-font-family-sans)',
          }}
        >
          Open Drawer
        </button>
        <Drawer
          open={open}
          onClose={() => setOpen(false)}
          title="Patient Details"
        >
          <p>Drawer content goes here. Use this panel for detailed patient information, order entry, or contextual forms.</p>
        </Drawer>
      </>
    );
  },
};

export const LeftPosition: Story = {
  name: 'Left Position',
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <button
          onClick={() => setOpen(true)}
          style={{
            padding: '8px 16px',
            borderRadius: 8,
            border: '1px solid var(--beacon-color-border-default)',
            background: 'var(--beacon-color-surface-default)',
            cursor: 'pointer',
            fontFamily: 'var(--beacon-font-family-sans)',
          }}
        >
          Open Left Drawer
        </button>
        <Drawer
          open={open}
          onClose={() => setOpen(false)}
          title="Navigation"
          position="left"
          size="sm"
        >
          <nav style={{ fontFamily: 'var(--beacon-font-family-sans)' }}>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ padding: '8px 0', borderBottom: '1px solid var(--beacon-color-border-default)' }}>Dashboard</li>
              <li style={{ padding: '8px 0', borderBottom: '1px solid var(--beacon-color-border-default)' }}>Patients</li>
              <li style={{ padding: '8px 0', borderBottom: '1px solid var(--beacon-color-border-default)' }}>Appointments</li>
              <li style={{ padding: '8px 0' }}>Reports</li>
            </ul>
          </nav>
        </Drawer>
      </>
    );
  },
};

export const WithFooter: Story = {
  name: 'With Footer Actions',
  render: () => {
    const [open, setOpen] = useState(false);
    const btnStyle: React.CSSProperties = {
      padding: '8px 16px',
      borderRadius: 8,
      border: 'none',
      cursor: 'pointer',
      fontFamily: 'var(--beacon-font-family-sans)',
      fontWeight: 500,
    };
    return (
      <>
        <button
          onClick={() => setOpen(true)}
          style={{ ...btnStyle, border: '1px solid var(--beacon-color-border-default)', background: 'var(--beacon-color-surface-default)' }}
        >
          Edit Patient Record
        </button>
        <Drawer
          open={open}
          onClose={() => setOpen(false)}
          title="Edit Patient"
          size="lg"
          footer={
            <>
              <button style={{ ...btnStyle, background: 'var(--beacon-color-neutral-100)' }} onClick={() => setOpen(false)}>
                Cancel
              </button>
              <button style={{ ...btnStyle, background: 'var(--beacon-color-brand-primary-500)', color: 'white' }} onClick={() => setOpen(false)}>
                Save Changes
              </button>
            </>
          }
        >
          <p style={{ fontFamily: 'var(--beacon-font-family-sans)' }}>
            Form fields for editing patient demographics, insurance, and care team would go here.
          </p>
        </Drawer>
      </>
    );
  },
};
