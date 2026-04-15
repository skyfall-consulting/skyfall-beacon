import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Backdrop } from './Backdrop';

const meta: Meta<typeof Backdrop> = {
  title: 'Components/Feedback/Backdrop',
  component: Backdrop,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Backdrop>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <button onClick={() => setOpen(true)}>Show Backdrop</button>
        <Backdrop open={open} onClick={() => setOpen(false)}>
          <div style={{
            background: 'var(--beacon-color-surface-default)',
            borderRadius: 12,
            padding: 32,
            maxWidth: 360,
            boxShadow: 'var(--beacon-shadow-xl)',
            textAlign: 'center',
          }}>
            <p style={{ margin: '0 0 16px', fontSize: 14, color: 'var(--beacon-color-text-primary)' }}>
              Click outside to dismiss
            </p>
            <button onClick={() => setOpen(false)}>Close</button>
          </div>
        </Backdrop>
      </>
    );
  },
};

export const Variants: Story = {
  name: 'Intensity Variants',
  render: () => {
    const [active, setActive] = useState<string | null>(null);
    return (
      <div style={{ display: 'flex', gap: 12 }}>
        {(['default', 'light', 'opaque'] as const).map((v) => (
          <button key={v} onClick={() => setActive(v)}>{v}</button>
        ))}
        {active && (
          <Backdrop open variant={active as any} onClick={() => setActive(null)}>
            <div style={{
              background: 'var(--beacon-color-surface-default)',
              borderRadius: 12,
              padding: 24,
              boxShadow: 'var(--beacon-shadow-xl)',
            }}>
              <p style={{ margin: '0 0 12px', fontSize: 14, color: 'var(--beacon-color-text-primary)' }}>
                variant="{active}"
              </p>
              <button onClick={() => setActive(null)}>Dismiss</button>
            </div>
          </Backdrop>
        )}
      </div>
    );
  },
};
