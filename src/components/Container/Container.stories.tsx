import type { Meta, StoryObj } from '@storybook/react-vite';
import { Container } from './Container';

const meta: Meta<typeof Container> = {
  title: 'Components/Layout/Container',
  component: Container,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Container>;

const DemoContent = ({ label }: { label: string }) => (
  <div style={{ padding: 24, background: 'var(--beacon-color-surface-subtle)', borderRadius: 8, border: '1px dashed var(--beacon-color-border-default)', textAlign: 'center', fontFamily: 'var(--beacon-font-family-sans)', color: 'var(--beacon-color-text-secondary)' }}>
    {label}
  </div>
);

export const Default: Story = {
  render: () => (
    <Container>
      <DemoContent label="Container (max-width: lg, 1024px)" />
    </Container>
  ),
};

export const Sizes: Story = {
  name: 'Max-Width Presets',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Container maxWidth="sm"><DemoContent label="sm — 640px" /></Container>
      <Container maxWidth="md"><DemoContent label="md — 768px" /></Container>
      <Container maxWidth="lg"><DemoContent label="lg — 1024px" /></Container>
      <Container maxWidth="xl"><DemoContent label="xl — 1280px" /></Container>
      <Container maxWidth="full"><DemoContent label="full — 100%" /></Container>
    </div>
  ),
};

export const AsSection: Story = {
  name: 'Semantic Element',
  render: () => (
    <Container as="section" maxWidth="md">
      <DemoContent label="Rendered as <section>" />
    </Container>
  ),
};
