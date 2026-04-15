import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { SideNav } from './SideNav';

const DashboardIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path d="M3 3h6v6H3V3zm8 0h6v6h-6V3zM3 11h6v6H3v-6zm8 0h6v6h-6v-6z" /></svg>
);
const PatientsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path d="M10 10a4 4 0 100-8 4 4 0 000 8zm-7 8a7 7 0 0114 0H3z" /></svg>
);
const CalendarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path d="M6 2v2H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2V2h-2v2H8V2H6zm-2 6h12v8H4V8z" /></svg>
);
const ChartIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path d="M2 17V3h2v12h14v2H2zm4-4V7h2v6H6zm4-8v8h2V5h-2zm4 3v5h2V8h-2z" /></svg>
);
const SettingsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path d="M10 13a3 3 0 100-6 3 3 0 000 6zm7-1.5l1.3 1-1.5 2.6-1.5-.6a5.5 5.5 0 01-1.3.8l-.2 1.6H8.2l-.2-1.6a5.5 5.5 0 01-1.3-.8l-1.5.6L3.7 12.5l1.3-1a5.6 5.6 0 010-1.6l-1.3-1L5.2 6.4l1.5.6a5.5 5.5 0 011.3-.8L8.2 4.5h3.6l.2 1.6a5.5 5.5 0 011.3.8l1.5-.6L16.3 8.9l-1.3 1a5.6 5.6 0 010 1.6z" /></svg>
);

const meta: Meta<typeof SideNav> = {
  title: 'Components/Navigation/SideNav',
  component: SideNav,
  tags: ['autodocs'],
  decorators: [(Story) => <div style={{ height: 500, display: 'flex' }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof SideNav>;

export const Default: Story = {
  args: {
    items: [
      { label: 'Dashboard', href: '#', icon: <DashboardIcon />, active: true },
      { label: 'Patients', href: '#', icon: <PatientsIcon /> },
      { label: 'Appointments', href: '#', icon: <CalendarIcon /> },
      { label: 'Analytics', href: '#', icon: <ChartIcon /> },
      { label: 'Settings', href: '#', icon: <SettingsIcon /> },
    ],
  },
};

export const WithNestedItems: Story = {
  args: {
    items: [
      { label: 'Dashboard', href: '#', icon: <DashboardIcon /> },
      {
        label: 'Patients',
        href: '#',
        icon: <PatientsIcon />,
        active: true,
        children: [
          { label: 'All Patients', href: '#' },
          { label: 'New Patient', href: '#' },
          { label: 'Discharged', href: '#' },
        ],
      },
      { label: 'Appointments', href: '#', icon: <CalendarIcon /> },
      { label: 'Settings', href: '#', icon: <SettingsIcon /> },
    ],
  },
};

export const Collapsible: Story = {
  render: () => {
    const [collapsed, setCollapsed] = useState(false);
    return (
      <SideNav
        collapsed={collapsed}
        onCollapse={setCollapsed}
        items={[
          { label: 'Dashboard', href: '#', icon: <DashboardIcon />, active: true },
          { label: 'Patients', href: '#', icon: <PatientsIcon /> },
          { label: 'Appointments', href: '#', icon: <CalendarIcon /> },
          { label: 'Analytics', href: '#', icon: <ChartIcon /> },
          { label: 'Settings', href: '#', icon: <SettingsIcon /> },
        ]}
      />
    );
  },
};
