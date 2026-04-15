import type { Meta, StoryObj } from '@storybook/react-vite';
import { EmptyState } from './EmptyState';

const meta: Meta<typeof EmptyState> = {
  title: 'Components/Feedback/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
  decorators: [(Story) => <div style={{ width: 480 }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

const SearchIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const ClipboardIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <rect x="8" y="2" width="8" height="4" rx="1" />
  </svg>
);

export const Default: Story = {
  args: {
    title: 'No results found',
    description: 'Try adjusting your search or filter criteria to find what you are looking for.',
  },
};

export const WithIcon: Story = {
  args: {
    icon: <SearchIcon />,
    title: 'No patients found',
    description: 'No patients match your current search. Try adjusting your filters or search terms.',
  },
};

export const WithAction: Story = {
  args: {
    icon: <ClipboardIcon />,
    title: 'No appointments scheduled',
    description: 'There are no upcoming appointments for this patient.',
    action: (
      <button
        style={{
          padding: '8px 16px',
          borderRadius: 8,
          border: 'none',
          background: 'var(--beacon-color-brand-primary-500)',
          color: 'white',
          cursor: 'pointer',
          fontFamily: 'var(--beacon-font-family-sans)',
          fontWeight: 500,
        }}
      >
        Schedule Appointment
      </button>
    ),
  },
};
