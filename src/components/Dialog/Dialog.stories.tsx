import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Dialog } from './Dialog';

const meta: Meta<typeof Dialog> = {
  title: 'Components/Feedback/Dialog',
  component: Dialog,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
  args: {
    open: true,
    title: 'Confirm Appointment',
    message: 'Are you sure you want to confirm this appointment for Maria Santos on March 25, 2026 at 10:30 AM?',
    confirmLabel: 'Confirm',
    cancelLabel: 'Cancel',
    variant: 'default',
  },
};

export const Danger: Story = {
  args: {
    open: true,
    title: 'Delete Patient Record',
    message: 'This action cannot be undone. The patient record and all associated data will be permanently removed.',
    confirmLabel: 'Delete Record',
    cancelLabel: 'Keep Record',
    variant: 'danger',
  },
};

export const Loading: Story = {
  args: {
    open: true,
    title: 'Cancel Appointment',
    message: 'Are you sure you want to cancel this appointment? The patient will be notified.',
    confirmLabel: 'Cancel Appointment',
    cancelLabel: 'Go Back',
    variant: 'danger',
    loading: true,
  },
};

export const Interactive: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <button onClick={() => setOpen(true)}>Open Dialog</button>
        <Dialog
          open={open}
          onConfirm={() => {
            alert('Confirmed!');
            setOpen(false);
          }}
          onCancel={() => setOpen(false)}
          title="Discharge Patient"
          message="Are you sure you want to discharge this patient? Please ensure all discharge instructions have been provided."
          confirmLabel="Discharge"
          cancelLabel="Cancel"
          variant="default"
        />
      </>
    );
  },
};
