import type { Meta, StoryObj } from '@storybook/react-vite';
import { Chip } from './Chip';

const PillIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M10.5 1.5H8A6.5 6.5 0 0 0 8 14.5h8a6.5 6.5 0 0 0 0-13h-2.5" />
    <line x1="8" y1="8" x2="16" y2="8" />
  </svg>
);

const meta: Meta<typeof Chip> = {
  title: 'Components/Data Display/Chip',
  component: Chip,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Chip>;

export const Default: Story = {
  args: { children: 'Chip' },
};

export const Colors: Story = {
  name: 'Color Variants',
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <Chip color="neutral">Neutral</Chip>
      <Chip color="primary">Primary</Chip>
      <Chip color="success">Active</Chip>
      <Chip color="warning">Pending</Chip>
      <Chip color="error">Critical</Chip>
      <Chip color="info">Info</Chip>
    </div>
  ),
};

export const Outlined: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <Chip variant="outlined" color="neutral">Neutral</Chip>
      <Chip variant="outlined" color="primary">Primary</Chip>
      <Chip variant="outlined" color="success">Active</Chip>
      <Chip variant="outlined" color="error">Critical</Chip>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <Chip size="sm">Small</Chip>
      <Chip size="md">Medium</Chip>
    </div>
  ),
};

export const WithIcon: Story = {
  args: {
    icon: <PillIcon />,
    children: 'Amoxicillin',
    color: 'primary',
  },
};

export const Deletable: Story = {
  args: {
    children: 'Penicillin Allergy',
    color: 'error',
    onDelete: () => alert('Deleted'),
  },
};

export const Clickable: Story = {
  args: {
    children: 'Filter: Active',
    color: 'primary',
    variant: 'outlined',
    onClick: () => alert('Clicked'),
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled',
    disabled: true,
    onDelete: () => {},
  },
};

export const AllergyTags: Story = {
  name: 'Composition: Allergy Tags',
  render: () => (
    <div>
      <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--beacon-color-text-primary)', marginBottom: 8 }}>
        Known Allergies
      </div>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        <Chip color="error" size="sm" onDelete={() => {}}>Penicillin</Chip>
        <Chip color="error" size="sm" onDelete={() => {}}>Sulfa</Chip>
        <Chip color="warning" size="sm" onDelete={() => {}}>Latex (mild)</Chip>
        <Chip color="neutral" size="sm" onClick={() => {}}>+ Add allergy</Chip>
      </div>
    </div>
  ),
};
