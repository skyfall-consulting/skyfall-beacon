import type { Meta, StoryObj } from '@storybook/react-vite';
import { Toolbar, ToolbarGroup, ToolbarDivider } from './Toolbar';

const meta: Meta<typeof Toolbar> = {
  title: 'Components/Layout/Toolbar',
  component: Toolbar,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Toolbar>;

const iconBtn = (label: string, path: string) => (
  <button
    type="button"
    aria-label={label}
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 4,
      border: 'none',
      background: 'transparent',
      borderRadius: 4,
      cursor: 'pointer',
      color: 'var(--beacon-color-text-secondary)',
    }}
  >
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d={path} />
    </svg>
  </button>
);

export const Default: Story = {
  render: () => (
    <Toolbar aria-label="Text formatting">
      <ToolbarGroup>
        {iconBtn('Bold', 'M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6zM6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z')}
        {iconBtn('Italic', 'M19 4h-9M14 20H5M15 4L9 20')}
        {iconBtn('Underline', 'M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3M4 21h16')}
      </ToolbarGroup>
      <ToolbarDivider />
      <ToolbarGroup>
        {iconBtn('Align left', 'M17 10H3M21 6H3M21 14H3M17 18H3')}
        {iconBtn('Align center', 'M21 6H3M17 10H7M21 14H3M17 18H7')}
        {iconBtn('Align right', 'M21 10H7M21 6H3M21 14H3M21 18H7')}
      </ToolbarGroup>
    </Toolbar>
  ),
};

export const Outlined: Story = {
  render: () => (
    <Toolbar variant="outlined" aria-label="Document actions">
      <ToolbarGroup>
        {iconBtn('Undo', 'M3 7v6h6M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13')}
        {iconBtn('Redo', 'M21 7v6h-6M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3L21 13')}
      </ToolbarGroup>
      <ToolbarDivider />
      {iconBtn('Print', 'M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2M6 14h12v8H6z')}
      {iconBtn('Download', 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3')}
    </Toolbar>
  ),
};

export const Small: Story = {
  render: () => (
    <Toolbar size="sm" variant="outlined" aria-label="Quick actions">
      {iconBtn('Copy', 'M20 9h-9a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2zM5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1')}
      {iconBtn('Cut', 'M6 2L16 22M16 2L6 22M2 12h20')}
      {iconBtn('Paste', 'M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2M8 2h8v4H8z')}
    </Toolbar>
  ),
};
