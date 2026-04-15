import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Modal } from './Modal';

const meta: Meta<typeof Modal> = {
  title: 'Components/Surfaces/Modal',
  component: Modal,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof Modal>;

const ModalDemo = ({ size }: { size?: 'sm' | 'md' | 'lg' }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button onClick={() => setOpen(true)}>Open Modal</button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Confirm Appointment"
        size={size}
        footer={
          <>
            <button onClick={() => setOpen(false)}>Cancel</button>
            <button onClick={() => setOpen(false)}>Confirm</button>
          </>
        }
      >
        <p>Are you sure you want to schedule this appointment for March 15, 2026 at 2:00 PM?</p>
      </Modal>
    </>
  );
};

export const Default: Story = {
  render: () => <ModalDemo />,
};

export const Small: Story = {
  render: () => <ModalDemo size="sm" />,
};

export const Large: Story = {
  render: () => <ModalDemo size="lg" />,
};
