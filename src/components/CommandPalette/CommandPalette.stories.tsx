import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { CommandPalette, type CommandItem } from './CommandPalette';

const meta: Meta<typeof CommandPalette> = {
  title: 'Components/Navigation/CommandPalette',
  component: CommandPalette,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CommandPalette>;

const sampleCommands: CommandItem[] = [
  { id: 'new-patient', label: 'New Patient', description: 'Create a new patient record', group: 'Actions', shortcut: '⌘N' },
  { id: 'new-appointment', label: 'New Appointment', description: 'Schedule an appointment', group: 'Actions', shortcut: '⌘⇧A' },
  { id: 'new-rx', label: 'New Prescription', description: 'Write a new prescription', group: 'Actions' },
  { id: 'search-patients', label: 'Search Patients', description: 'Find a patient by name or MRN', group: 'Navigation', shortcut: '⌘K' },
  { id: 'dashboard', label: 'Go to Dashboard', group: 'Navigation' },
  { id: 'schedule', label: 'Go to Schedule', group: 'Navigation' },
  { id: 'lab-results', label: 'Lab Results', group: 'Navigation' },
  { id: 'settings', label: 'Settings', description: 'System preferences', group: 'System', shortcut: '⌘,' },
  { id: 'logout', label: 'Sign Out', group: 'System' },
  { id: 'archived', label: 'Archived Records', group: 'System', disabled: true },
];

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <div>
        <button
          onClick={() => setOpen(true)}
          style={{
            padding: '8px 16px',
            fontFamily: 'var(--beacon-font-family-sans)',
            fontSize: 14,
            border: '1px solid var(--beacon-color-border-default)',
            borderRadius: 6,
            background: 'var(--beacon-color-surface-default)',
            cursor: 'pointer',
          }}
        >
          Open Command Palette (⌘K)
        </button>
        <CommandPalette
          open={open}
          onClose={() => setOpen(false)}
          items={sampleCommands}
          onSelect={(item) => console.log('Selected:', item.label)}
        />
      </div>
    );
  },
};

export const WithCustomPlaceholder: Story = {
  name: 'Custom Placeholder',
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <div>
        <button onClick={() => setOpen(true)} style={{ padding: '8px 16px', fontFamily: 'var(--beacon-font-family-sans)', fontSize: 14, border: '1px solid var(--beacon-color-border-default)', borderRadius: 6, background: 'var(--beacon-color-surface-default)', cursor: 'pointer' }}>
          Open
        </button>
        <CommandPalette
          open={open}
          onClose={() => setOpen(false)}
          items={sampleCommands}
          onSelect={(item) => console.log('Selected:', item.label)}
          placeholder="What do you need?"
          emptyMessage="No matching commands. Try a different search."
        />
      </div>
    );
  },
};
