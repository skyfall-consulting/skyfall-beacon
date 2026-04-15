import type { Meta, StoryObj } from '@storybook/react-vite';
import { Grid } from './Grid';

const meta: Meta<typeof Grid> = {
  title: 'Components/Layout/Grid',
  component: Grid,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Grid>;

const Cell = ({ children }: { children: React.ReactNode }) => (
  <div style={{ padding: 16, background: 'var(--beacon-color-surface-subtle)', borderRadius: 8, border: '1px solid var(--beacon-color-border-default)', textAlign: 'center', fontFamily: 'var(--beacon-font-family-sans)', fontSize: 14, color: 'var(--beacon-color-text-secondary)' }}>
    {children}
  </div>
);

export const Default: Story = {
  render: () => (
    <Grid columns={3}>
      <Cell>1</Cell>
      <Cell>2</Cell>
      <Cell>3</Cell>
      <Cell>4</Cell>
      <Cell>5</Cell>
      <Cell>6</Cell>
    </Grid>
  ),
};

export const AutoFill: Story = {
  name: 'Auto-fill Responsive',
  render: () => (
    <Grid columns="auto" minItemWidth={200}>
      <Cell>Patient List</Cell>
      <Cell>Lab Results</Cell>
      <Cell>Medications</Cell>
      <Cell>Appointments</Cell>
      <Cell>Insurance</Cell>
      <Cell>Documents</Cell>
    </Grid>
  ),
};

export const TwoColumn: Story = {
  name: 'Two Columns',
  render: () => (
    <Grid columns={2} gap="lg">
      <Cell>Left panel</Cell>
      <Cell>Right panel</Cell>
    </Grid>
  ),
};

export const FourColumn: Story = {
  name: 'Four Columns',
  render: () => (
    <Grid columns={4} gap="sm">
      <Cell>Total Patients</Cell>
      <Cell>Avg Wait</Cell>
      <Cell>Satisfaction</Cell>
      <Cell>Occupancy</Cell>
    </Grid>
  ),
};
