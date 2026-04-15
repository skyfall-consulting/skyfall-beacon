import type { Meta, StoryObj } from '@storybook/react-vite';
import { Link } from './Link';

const meta: Meta<typeof Link> = {
  title: 'Components/Navigation/Link',
  component: Link,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Link>;

export const Default: Story = {
  args: {
    href: '#',
    children: 'View patient record',
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: 14 }}>
      <Link href="#" variant="default">Default — always underlined</Link>
      <Link href="#" variant="subtle">Subtle — underline on hover</Link>
      <Link href="#" variant="standalone">Standalone — no underline, for nav items</Link>
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: 14 }}>
      <Link href="#" color="primary">Primary color</Link>
      <Link href="#" color="secondary">Secondary color</Link>
      <div style={{ color: 'var(--beacon-color-error-700)' }}>
        <Link href="#" color="inherit">Inherits parent color</Link>
      </div>
    </div>
  ),
};

export const External: Story = {
  args: {
    href: 'https://skyfall.consulting',
    external: true,
    children: 'Skyfall Consulting',
  },
};

export const Disabled: Story = {
  args: {
    href: '#',
    disabled: true,
    children: 'Disabled link',
  },
};

export const InlineContext: Story = {
  name: 'Composition: Inline',
  render: () => (
    <p style={{ fontSize: 14, lineHeight: '22px', color: 'var(--beacon-color-text-primary)', maxWidth: 400 }}>
      The patient was referred by <Link href="#">Dr. Elena Rodriguez</Link> and
      has an upcoming appointment on <Link href="#">March 28, 2026</Link>. See the
      full <Link href="#" variant="subtle">referral history</Link> for more context.
    </p>
  ),
};
