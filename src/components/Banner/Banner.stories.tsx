import type { Meta, StoryObj } from '@storybook/react-vite';
import { Banner } from './Banner';

const meta: Meta<typeof Banner> = {
  title: 'Components/Feedback/Banner',
  component: Banner,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof Banner>;

export const Info: Story = {
  args: {
    status: 'info',
    children: 'Scheduled maintenance: The system will be unavailable on Saturday, March 21 from 2:00 AM to 6:00 AM EST.',
    dismissible: true,
  },
};

export const Success: Story = {
  args: {
    status: 'success',
    children: 'System update complete. All new features are now available.',
    dismissible: true,
  },
};

export const Warning: Story = {
  args: {
    status: 'warning',
    children: 'Your session will expire in 10 minutes. Please save any unsaved work.',
    dismissible: false,
  },
};

export const Error: Story = {
  args: {
    status: 'error',
    children: 'Connection to the lab system is currently unavailable. Results may be delayed.',
    dismissible: true,
  },
};

export const WithAction: Story = {
  args: {
    status: 'info',
    children: 'A new version of the clinical workflow module is available.',
    action: (
      <button
        style={{
          background: 'none',
          border: '1px solid currentColor',
          color: 'inherit',
          padding: '4px 12px',
          borderRadius: '6px',
          fontWeight: 600,
          cursor: 'pointer',
          fontSize: '0.8125rem',
          whiteSpace: 'nowrap',
        }}
      >
        Learn More
      </button>
    ),
    dismissible: true,
  },
};
