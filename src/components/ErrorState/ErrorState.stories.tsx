import type { Meta, StoryObj } from '@storybook/react-vite';
import { ErrorState } from './ErrorState';

const meta: Meta<typeof ErrorState> = {
  title: 'Components/Feedback/ErrorState',
  component: ErrorState,
  tags: ['autodocs'],
  decorators: [(Story) => <div style={{ maxWidth: 480 }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof ErrorState>;

export const Default: Story = {
  args: {
    title: 'Something went wrong',
    description: 'We encountered an unexpected error. Please try again.',
  },
};

export const WithRetry: Story = {
  name: 'With Retry Action',
  args: {
    title: 'Failed to load patient records',
    description: 'The server did not respond in time. Check your connection and try again.',
    errorCode: 'ERR_TIMEOUT_504',
    action: (
      <button
        style={{
          padding: '8px 20px',
          borderRadius: 8,
          border: 'none',
          background: 'var(--beacon-color-brand-primary-500)',
          color: 'white',
          cursor: 'pointer',
          fontFamily: 'var(--beacon-font-family-sans)',
          fontWeight: 500,
          fontSize: 14,
        }}
      >
        Retry
      </button>
    ),
  },
};

export const NetworkError: Story = {
  args: {
    title: 'No connection',
    description: 'Unable to reach the server. Please check your network connection.',
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="1" y1="1" x2="23" y2="23" />
        <path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55" />
        <path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39" />
        <path d="M10.71 5.05A16 16 0 0 1 22.56 9" />
        <path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88" />
        <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
        <line x1="12" y1="20" x2="12.01" y2="20" />
      </svg>
    ),
    action: (
      <button
        style={{
          padding: '8px 20px',
          borderRadius: 8,
          border: '1px solid var(--beacon-color-border-default)',
          background: 'var(--beacon-color-surface-default)',
          cursor: 'pointer',
          fontFamily: 'var(--beacon-font-family-sans)',
          fontWeight: 500,
          fontSize: 14,
        }}
      >
        Try Again
      </button>
    ),
  },
};

export const PermissionDenied: Story = {
  args: {
    title: 'Access denied',
    description: 'You do not have permission to view this resource. Contact your administrator if you believe this is an error.',
    errorCode: 'ERR_FORBIDDEN_403',
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
  },
};
