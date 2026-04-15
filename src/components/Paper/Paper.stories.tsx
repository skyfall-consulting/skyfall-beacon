import type { Meta, StoryObj } from '@storybook/react-vite';
import { Paper } from './Paper';

const meta: Meta<typeof Paper> = {
  title: 'Components/Surfaces/Paper',
  component: Paper,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Paper>;

export const Default: Story = {
  args: {
    padding: 'md',
    children: 'Default paper surface — the base atom for all elevated UI.',
    style: { maxWidth: 400 },
  },
};

export const Elevations: Story = {
  name: 'Elevation Scale',
  render: () => (
    <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
      {([0, 1, 2, 3, 4] as const).map((level) => (
        <Paper key={level} elevation={level} padding="md" radius="lg" style={{ width: 120, textAlign: 'center' }}>
          <strong>elevation={level}</strong>
        </Paper>
      ))}
    </div>
  ),
};

export const Surfaces: Story = {
  name: 'Surface Variants',
  render: () => (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', padding: 24, background: 'var(--beacon-color-surface-canvas)', borderRadius: 12 }}>
      {(['default', 'subtle', 'canvas', 'raised'] as const).map((s) => (
        <Paper key={s} surface={s} padding="md" elevation={1} radius="md" style={{ width: 140, textAlign: 'center' }}>
          {s}
        </Paper>
      ))}
    </div>
  ),
};

export const RadiusScale: Story = {
  name: 'Radius Scale',
  render: () => (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
      {(['none', 'sm', 'md', 'lg', 'xl'] as const).map((r) => (
        <Paper key={r} radius={r} padding="md" elevation={2} style={{ width: 100, height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {r}
        </Paper>
      ))}
    </div>
  ),
};

export const CompositionHint: Story = {
  name: 'Composition: Card-like',
  render: () => (
    <Paper elevation={2} radius="lg" padding="lg" style={{ maxWidth: 360 }}>
      <h3 style={{ margin: '0 0 8px', fontSize: 16, fontWeight: 600, color: 'var(--beacon-color-text-primary)' }}>
        Patient Summary
      </h3>
      <p style={{ margin: 0, fontSize: 14, color: 'var(--beacon-color-text-secondary)', lineHeight: '22px' }}>
        Paper provides the surface layer. Card adds layout opinions on top.
        Healthcare domain cards (PatientCard, InsuranceCard) will compose from this atom.
      </p>
    </Paper>
  ),
};
