import type { Meta, StoryObj } from '@storybook/react-vite';
import { AppBar } from './AppBar';

const navLinkStyle: React.CSSProperties = {
  padding: '6px 12px',
  borderRadius: 6,
  fontSize: 14,
  fontWeight: 500,
  color: 'var(--beacon-color-text-secondary)',
  textDecoration: 'none',
  cursor: 'pointer',
  border: 'none',
  background: 'none',
  fontFamily: 'inherit',
};

const activeLinkStyle: React.CSSProperties = {
  ...navLinkStyle,
  color: 'var(--beacon-color-brand-primary-600)',
  backgroundColor: 'var(--beacon-color-brand-primary-50)',
};

const AvatarSmall = () => (
  <div style={{
    width: 32, height: 32, borderRadius: '50%',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 13, fontWeight: 600,
    backgroundColor: 'var(--beacon-color-brand-primary-100)',
    color: 'var(--beacon-color-brand-primary-700)',
    cursor: 'pointer',
  }}>
    DR
  </div>
);

const BellIcon = () => (
  <button type="button" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, display: 'flex', color: 'var(--beacon-color-text-muted)' }}>
    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
      <path d="M10 2a6 6 0 00-6 6v3l-1.3 2.6A.5.5 0 003.1 14.5h13.8a.5.5 0 00.4-.9L16 11V8a6 6 0 00-6-6zm0 16a2 2 0 01-2-2h4a2 2 0 01-2 2z" />
    </svg>
  </button>
);

const meta: Meta<typeof AppBar> = {
  title: 'Components/Surfaces/AppBar',
  component: AppBar,
  tags: ['autodocs'],
  decorators: [(Story) => <div style={{ width: '100%' }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof AppBar>;

export const Default: Story = {
  args: {
    logo: <span style={{ fontSize: 18, fontWeight: 700 }}>Beacon Health</span>,
    children: (
      <>
        <a href="#" style={activeLinkStyle}>Dashboard</a>
        <a href="#" style={navLinkStyle}>Patients</a>
        <a href="#" style={navLinkStyle}>Appointments</a>
        <a href="#" style={navLinkStyle}>Reports</a>
      </>
    ),
    actions: (
      <>
        <BellIcon />
        <AvatarSmall />
      </>
    ),
  },
};

export const LogoOnly: Story = {
  args: {
    logo: <span style={{ fontSize: 18, fontWeight: 700 }}>Beacon Health</span>,
    actions: <AvatarSmall />,
  },
};

export const WithSearch: Story = {
  args: {
    logo: <span style={{ fontSize: 18, fontWeight: 700 }}>Beacon</span>,
    children: (
      <>
        <a href="#" style={navLinkStyle}>Dashboard</a>
        <a href="#" style={navLinkStyle}>Patients</a>
      </>
    ),
    actions: (
      <>
        <input
          type="search"
          placeholder="Search patients..."
          style={{
            padding: '6px 12px',
            borderRadius: 6,
            border: '1px solid var(--beacon-color-border-default)',
            fontSize: 14,
            width: 200,
            fontFamily: 'inherit',
          }}
        />
        <BellIcon />
        <AvatarSmall />
      </>
    ),
  },
};
