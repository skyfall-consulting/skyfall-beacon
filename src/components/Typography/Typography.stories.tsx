import type { Meta, StoryObj } from '@storybook/react-vite';
import { Typography } from './Typography';

const meta: Meta<typeof Typography> = {
  title: 'Components/Foundations/Typography',
  component: Typography,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Typography>;

export const TypeScale: Story = {
  name: 'Type Scale',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 600 }}>
      <Typography variant="display-lg">Display Large</Typography>
      <Typography variant="display-md">Display Medium</Typography>
      <Typography variant="heading-xl">Heading XL</Typography>
      <Typography variant="heading-lg">Heading Large</Typography>
      <Typography variant="heading-md">Heading Medium</Typography>
      <Typography variant="heading-sm">Heading Small</Typography>
      <Typography variant="body-lg">Body Large — for prominent paragraphs and lead text.</Typography>
      <Typography variant="body-md">Body Medium — the default reading size for most content.</Typography>
      <Typography variant="body-sm">Body Small — secondary descriptions and metadata.</Typography>
      <Typography variant="label-lg">Label Large</Typography>
      <Typography variant="label-md">Label Medium</Typography>
      <Typography variant="caption">Caption — timestamps, footnotes, fine print.</Typography>
      <Typography variant="data">1,247.50 — data/mono for numeric displays.</Typography>
      <Typography variant="code">const patient = await getRecord(id);</Typography>
    </div>
  ),
};

export const Colors: Story = {
  name: 'Color Variants',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Typography color="primary">Primary — default text</Typography>
      <Typography color="secondary">Secondary — supporting text</Typography>
      <Typography color="muted">Muted — de-emphasized text</Typography>
      <Typography color="success">Success — positive outcomes</Typography>
      <Typography color="warning">Warning — attention needed</Typography>
      <Typography color="error">Error — critical issues</Typography>
      <Typography color="info">Info — neutral information</Typography>
      <div style={{ background: 'var(--beacon-color-neutral-900)', padding: '8px 12px', borderRadius: 8, alignSelf: 'flex-start' }}>
        <Typography color="inverse">Inverse — on dark surfaces</Typography>
      </div>
    </div>
  ),
};

export const Weights: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Typography weight="regular">Regular (400)</Typography>
      <Typography weight="medium">Medium (500)</Typography>
      <Typography weight="semibold">Semibold (600)</Typography>
      <Typography weight="bold">Bold (700)</Typography>
    </div>
  ),
};

export const Truncation: Story = {
  render: () => (
    <div style={{ maxWidth: 280 }}>
      <Typography truncate variant="body-md" style={{ marginBottom: 12 }}>
        This is a very long patient name that should truncate with an ellipsis when it overflows the container.
      </Typography>
      <Typography lineClamp={2} variant="body-sm" color="secondary">
        This paragraph is clamped to two lines. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
      </Typography>
    </div>
  ),
};

export const HealthcareComposition: Story = {
  name: 'Composition: Patient Header',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Typography variant="heading-md">Maria Santos</Typography>
      <Typography variant="body-sm" color="secondary">DOB: 03/14/1985 &middot; MRN: 4821903</Typography>
      <Typography variant="caption" color="muted">Last visit: March 22, 2026</Typography>
    </div>
  ),
};
