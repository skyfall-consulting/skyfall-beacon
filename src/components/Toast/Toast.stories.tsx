import type { Meta, StoryObj } from '@storybook/react-vite';
import { Toast } from './Toast';

const meta: Meta<typeof Toast> = {
  title: 'Components/Feedback/Toast',
  component: Toast,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof Toast>;

export const Info: Story = {
  args: {
    status: 'info',
    title: 'Appointment reminder',
    message: 'Your telehealth visit is in 30 minutes.',
    duration: 0,
  },
};

export const Success: Story = {
  args: {
    status: 'success',
    title: 'Record saved',
    message: 'Patient chart has been updated successfully.',
    duration: 0,
  },
};

export const Warning: Story = {
  args: {
    status: 'warning',
    title: 'Session expiring',
    message: 'Your session will expire in 5 minutes. Save your work.',
    duration: 0,
  },
};

export const Error: Story = {
  args: {
    status: 'error',
    title: 'Submission failed',
    message: 'Unable to process the lab order. Please try again.',
    duration: 0,
  },
};

export const WithAction: Story = {
  args: {
    status: 'info',
    message: 'New lab results are available for review.',
    duration: 0,
    action: (
      <button
        style={{
          background: 'none',
          border: 'none',
          color: 'var(--beacon-color-info-600)',
          fontWeight: 600,
          cursor: 'pointer',
          fontSize: '0.875rem',
          padding: '4px 8px',
          borderRadius: '4px',
        }}
      >
        View
      </button>
    ),
  },
};

export const MessageOnly: Story = {
  args: {
    status: 'success',
    message: 'Changes saved.',
    duration: 0,
  },
};
