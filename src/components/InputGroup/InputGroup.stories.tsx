import type { Meta, StoryObj } from '@storybook/react-vite';
import { InputGroup } from './InputGroup';

const meta: Meta<typeof InputGroup> = {
  title: 'Components/Layout/InputGroup',
  component: InputGroup,
  tags: ['autodocs'],
  decorators: [(Story) => <div style={{ maxWidth: 400 }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof InputGroup>;

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '8px 12px',
  border: 'none',
  background: 'transparent',
  fontFamily: 'var(--beacon-font-family-sans)',
  fontSize: 14,
  outline: 'none',
};

export const WithPrefix: Story = {
  name: 'Start Addon',
  render: () => (
    <InputGroup startAddon="$">
      <input style={inputStyle} placeholder="0.00" />
    </InputGroup>
  ),
};

export const WithSuffix: Story = {
  name: 'End Addon',
  render: () => (
    <InputGroup endAddon="mg">
      <input style={inputStyle} placeholder="Dosage" />
    </InputGroup>
  ),
};

export const WithBoth: Story = {
  name: 'Both Addons',
  render: () => (
    <InputGroup startAddon="https://" endAddon=".com">
      <input style={inputStyle} placeholder="domain" />
    </InputGroup>
  ),
};

export const WithIcon: Story = {
  name: 'Icon Addon',
  render: () => (
    <InputGroup
      startAddon={
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      }
    >
      <input style={inputStyle} placeholder="Search patients..." />
    </InputGroup>
  ),
};

export const ErrorState: Story = {
  render: () => (
    <InputGroup startAddon="MRN" error>
      <input style={inputStyle} placeholder="Enter MRN" />
    </InputGroup>
  ),
};

export const Disabled: Story = {
  render: () => (
    <InputGroup startAddon="$" disabled>
      <input style={inputStyle} placeholder="0.00" disabled />
    </InputGroup>
  ),
};
