import type { Meta, StoryObj } from '@storybook/react-vite';
import { Kbd } from './Kbd';

const meta: Meta<typeof Kbd> = {
  title: 'Components/Data Display/Kbd',
  component: Kbd,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Kbd>;

export const Default: Story = {
  args: {
    children: 'K',
  },
};

export const Shortcut: Story = {
  name: 'Keyboard Shortcut',
  render: () => (
    <span style={{ fontFamily: 'var(--beacon-font-family-sans)', fontSize: 14, color: 'var(--beacon-color-text-secondary)', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
      <Kbd>⌘</Kbd> <Kbd>K</Kbd>
    </span>
  ),
};

export const InMenuItem: Story = {
  name: 'In Menu Item',
  render: () => (
    <div style={{ fontFamily: 'var(--beacon-font-family-sans)', display: 'flex', flexDirection: 'column', gap: 4, width: 240 }}>
      {[
        { label: 'New Patient', shortcut: '⌘N' },
        { label: 'Search', shortcut: '⌘K' },
        { label: 'Save', shortcut: '⌘S' },
        { label: 'Print', shortcut: '⌘P' },
      ].map(({ label, shortcut }) => (
        <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', borderRadius: 6, fontSize: 14, color: 'var(--beacon-color-text-primary)' }}>
          <span>{label}</span>
          <span style={{ display: 'inline-flex', gap: 2 }}>
            {shortcut.split('').map((k, i) => <Kbd key={i} size="sm">{k}</Kbd>)}
          </span>
        </div>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontFamily: 'var(--beacon-font-family-sans)' }}>
      <span style={{ fontSize: 12, color: 'var(--beacon-color-text-muted)' }}>sm:</span>
      <Kbd size="sm">Esc</Kbd>
      <span style={{ fontSize: 12, color: 'var(--beacon-color-text-muted)' }}>md:</span>
      <Kbd size="md">Esc</Kbd>
    </div>
  ),
};
