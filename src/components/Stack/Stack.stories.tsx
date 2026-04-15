import type { Meta, StoryObj } from '@storybook/react-vite';
import { Stack } from './Stack';

const meta: Meta<typeof Stack> = {
  title: 'Components/Layout/Stack',
  component: Stack,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Stack>;

const Box = ({ children }: { children: React.ReactNode }) => (
  <div style={{ padding: '12px 20px', background: 'var(--beacon-color-surface-subtle)', borderRadius: 8, border: '1px solid var(--beacon-color-border-default)', fontFamily: 'var(--beacon-font-family-sans)', fontSize: 14, color: 'var(--beacon-color-text-secondary)' }}>
    {children}
  </div>
);

export const Vertical: Story = {
  render: () => (
    <Stack gap="md">
      <Box>Patient Name</Box>
      <Box>Date of Birth</Box>
      <Box>Medical Record Number</Box>
    </Stack>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <Stack direction="horizontal" gap="md" align="center">
      <Box>Cancel</Box>
      <Box>Save Draft</Box>
      <Box>Submit</Box>
    </Stack>
  ),
};

export const SpaceBetween: Story = {
  name: 'Space Between',
  render: () => (
    <Stack direction="horizontal" justify="between" align="center">
      <Box>Patient: Maria Santos</Box>
      <Box>Status: Active</Box>
    </Stack>
  ),
};

export const Nested: Story = {
  render: () => (
    <Stack gap="lg">
      <Stack direction="horizontal" gap="md" align="center">
        <Box>Header Left</Box>
        <Box>Header Right</Box>
      </Stack>
      <Stack gap="sm">
        <Box>Body row 1</Box>
        <Box>Body row 2</Box>
        <Box>Body row 3</Box>
      </Stack>
    </Stack>
  ),
};

export const Wrapping: Story = {
  render: () => (
    <Stack direction="horizontal" gap="sm" wrap>
      {['Penicillin', 'Sulfa', 'Latex', 'Codeine', 'Aspirin', 'Iodine'].map((tag) => (
        <Box key={tag}>{tag}</Box>
      ))}
    </Stack>
  ),
};
