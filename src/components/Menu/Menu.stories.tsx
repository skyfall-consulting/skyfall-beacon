import type { Meta, StoryObj } from '@storybook/react-vite';
import { Menu, MenuItem, MenuDivider, MenuGroup } from './Menu';

const EditIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const CopyIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

const TrashIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
);

const PrintIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 6 2 18 2 18 9" />
    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
    <rect x="6" y="14" width="12" height="8" />
  </svg>
);

const TriggerButton = ({ children }: { children: React.ReactNode }) => (
  <button
    type="button"
    style={{
      padding: '8px 14px',
      borderRadius: 8,
      border: '1px solid var(--beacon-color-border-default)',
      background: 'var(--beacon-color-surface-default)',
      fontSize: 14,
      fontWeight: 500,
      cursor: 'pointer',
      fontFamily: 'inherit',
      color: 'var(--beacon-color-text-primary)',
    }}
  >
    {children}
  </button>
);

const meta: Meta<typeof Menu> = {
  title: 'Components/Navigation/Menu',
  component: Menu,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Menu>;

export const Default: Story = {
  render: () => (
    <Menu trigger={<TriggerButton>Actions ▾</TriggerButton>}>
      <MenuItem icon={<EditIcon />}>Edit record</MenuItem>
      <MenuItem icon={<CopyIcon />}>Duplicate</MenuItem>
      <MenuItem icon={<PrintIcon />}>Print summary</MenuItem>
      <MenuDivider />
      <MenuItem icon={<TrashIcon />} danger>Delete record</MenuItem>
    </Menu>
  ),
};

export const WithGroups: Story = {
  name: 'Grouped Menu',
  render: () => (
    <Menu trigger={<TriggerButton>Patient Options ▾</TriggerButton>} width={220}>
      <MenuGroup label="View">
        <MenuItem>Chart summary</MenuItem>
        <MenuItem>Lab results</MenuItem>
        <MenuItem>Medications</MenuItem>
      </MenuGroup>
      <MenuDivider />
      <MenuGroup label="Actions">
        <MenuItem>Schedule appointment</MenuItem>
        <MenuItem>Send message</MenuItem>
        <MenuItem>Refer to specialist</MenuItem>
      </MenuGroup>
      <MenuDivider />
      <MenuItem danger>Archive patient</MenuItem>
    </Menu>
  ),
};

export const AlignEnd: Story = {
  name: 'Align End',
  render: () => (
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Menu trigger={<TriggerButton>⋮</TriggerButton>} align="end" width={180}>
        <MenuItem>View details</MenuItem>
        <MenuItem>Edit</MenuItem>
        <MenuDivider />
        <MenuItem danger>Remove</MenuItem>
      </Menu>
    </div>
  ),
};

export const WithShortcuts: Story = {
  name: 'With Keyboard Shortcuts',
  render: () => (
    <Menu trigger={<TriggerButton>File ▾</TriggerButton>} width={240}>
      <MenuItem trailing="⌘N">New record</MenuItem>
      <MenuItem trailing="⌘O">Open...</MenuItem>
      <MenuItem trailing="⌘S">Save</MenuItem>
      <MenuDivider />
      <MenuItem trailing="⌘P" icon={<PrintIcon />}>Print</MenuItem>
    </Menu>
  ),
};

export const DisabledItems: Story = {
  render: () => (
    <Menu trigger={<TriggerButton>Options ▾</TriggerButton>}>
      <MenuItem>Available action</MenuItem>
      <MenuItem disabled>Locked action</MenuItem>
      <MenuItem disabled>Requires permissions</MenuItem>
      <MenuDivider />
      <MenuItem danger>Delete</MenuItem>
    </Menu>
  ),
};
