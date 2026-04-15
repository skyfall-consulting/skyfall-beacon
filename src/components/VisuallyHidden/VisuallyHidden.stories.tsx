import type { Meta, StoryObj } from '@storybook/react-vite';
import { VisuallyHidden } from './VisuallyHidden';

const meta: Meta<typeof VisuallyHidden> = {
  title: 'Components/Utils/VisuallyHidden',
  component: VisuallyHidden,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof VisuallyHidden>;

export const Default: Story = {
  render: () => (
    <div style={{ fontFamily: 'var(--beacon-font-family-sans)', fontSize: 14, color: 'var(--beacon-color-text-secondary)' }}>
      <p>The text below is visually hidden but accessible to screen readers:</p>
      <VisuallyHidden>This text is only visible to assistive technology</VisuallyHidden>
      <p style={{ marginTop: 8, fontStyle: 'italic', color: 'var(--beacon-color-text-muted)' }}>
        (Inspect the DOM to see the hidden span element)
      </p>
    </div>
  ),
};

export const IconButton: Story = {
  name: 'Icon Button with Label',
  render: () => (
    <button
      type="button"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        height: 40,
        border: '1px solid var(--beacon-color-border-default)',
        borderRadius: 8,
        background: 'var(--beacon-color-surface-default)',
        cursor: 'pointer',
        color: 'var(--beacon-color-text-primary)',
      }}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
      <VisuallyHidden>Search patients</VisuallyHidden>
    </button>
  ),
};

export const SkipLink: Story = {
  name: 'Skip Navigation Link',
  render: () => (
    <div style={{ fontFamily: 'var(--beacon-font-family-sans)', fontSize: 14 }}>
      <a
        href="#main-content"
        style={{
          position: 'absolute',
          left: -9999,
          top: 'auto',
          width: 1,
          height: 1,
          overflow: 'hidden',
        }}
        onFocus={(e) => {
          const el = e.currentTarget;
          el.style.position = 'static';
          el.style.width = 'auto';
          el.style.height = 'auto';
        }}
        onBlur={(e) => {
          const el = e.currentTarget;
          el.style.position = 'absolute';
          el.style.left = '-9999px';
          el.style.width = '1px';
          el.style.height = '1px';
        }}
      >
        Skip to main content
      </a>
      <p style={{ color: 'var(--beacon-color-text-muted)' }}>Tab into this story to see the skip link appear</p>
    </div>
  ),
};
