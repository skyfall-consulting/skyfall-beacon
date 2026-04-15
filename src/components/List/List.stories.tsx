import type { Meta, StoryObj } from '@storybook/react-vite';
import { List, ListItem } from './List';

const AvatarPlaceholder = ({ initials }: { initials: string }) => (
  <div style={{
    width: 36, height: 36, borderRadius: '50%',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 14, fontWeight: 600,
    backgroundColor: 'var(--beacon-color-brand-primary-100)',
    color: 'var(--beacon-color-brand-primary-700)',
  }}>
    {initials}
  </div>
);

const StatusDot = ({ color }: { color: string }) => (
  <span style={{
    width: 8, height: 8, borderRadius: '50%',
    backgroundColor: color, display: 'inline-block',
  }} />
);

const meta: Meta<typeof List> = {
  title: 'Components/Data Display/List',
  component: List,
  tags: ['autodocs'],
  decorators: [(Story) => <div style={{ width: 420 }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof List>;

export const PatientList: Story = {
  render: () => (
    <List divided>
      <ListItem
        prefix={<AvatarPlaceholder initials="JC" />}
        description="DOB: 03/14/1985 | MRN: 00124789"
        suffix={<StatusDot color="var(--beacon-color-success-500)" />}
        onClick={() => {}}
      >
        Jane Cooper
      </ListItem>
      <ListItem
        prefix={<AvatarPlaceholder initials="RW" />}
        description="DOB: 07/22/1972 | MRN: 00098321"
        suffix={<StatusDot color="var(--beacon-color-warning-500)" />}
        onClick={() => {}}
      >
        Robert Wilson
      </ListItem>
      <ListItem
        prefix={<AvatarPlaceholder initials="ML" />}
        description="DOB: 11/03/1990 | MRN: 00156742"
        suffix={<StatusDot color="var(--beacon-color-success-500)" />}
        onClick={() => {}}
      >
        Maria Lopez
      </ListItem>
      <ListItem
        prefix={<AvatarPlaceholder initials="DP" />}
        description="DOB: 01/28/1968 | MRN: 00078456"
        suffix={<StatusDot color="var(--beacon-color-error-500)" />}
        onClick={() => {}}
        disabled
      >
        David Park
      </ListItem>
    </List>
  ),
};

export const NotificationList: Story = {
  render: () => {
    const BellIcon = () => (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" style={{ color: 'var(--beacon-color-text-muted)' }}>
        <path d="M10 2a6 6 0 00-6 6v3l-1.3 2.6A.5.5 0 003.1 14.5h13.8a.5.5 0 00.4-.9L16 11V8a6 6 0 00-6-6zm0 16a2 2 0 01-2-2h4a2 2 0 01-2 2z" />
      </svg>
    );
    return (
      <List divided padding="sm">
        <ListItem prefix={<BellIcon />} description="2 minutes ago" onClick={() => {}}>
          Lab results ready for Jane Cooper
        </ListItem>
        <ListItem prefix={<BellIcon />} description="15 minutes ago" onClick={() => {}}>
          Appointment scheduled: Robert Wilson
        </ListItem>
        <ListItem prefix={<BellIcon />} description="1 hour ago" onClick={() => {}}>
          Prescription renewal request
        </ListItem>
      </List>
    );
  },
};

export const SelectedItem: Story = {
  render: () => (
    <List divided>
      <ListItem onClick={() => {}}>Dashboard</ListItem>
      <ListItem onClick={() => {}} selected>Patients</ListItem>
      <ListItem onClick={() => {}}>Appointments</ListItem>
      <ListItem onClick={() => {}}>Settings</ListItem>
    </List>
  ),
};
