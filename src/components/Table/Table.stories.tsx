import type { Meta, StoryObj } from '@storybook/react-vite';
import { Table, TableHead, TableBody, TableRow, TableHeaderCell, TableCell } from './Table';

const meta: Meta<typeof Table> = {
  title: 'Components/Data Display/Table',
  component: Table,
  tags: ['autodocs'],
  decorators: [(Story) => <div style={{ width: 640 }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof Table>;

export const Default: Story = {
  render: (args) => (
    <Table {...args}>
      <TableHead>
        <TableRow>
          <TableHeaderCell>MRN</TableHeaderCell>
          <TableHeaderCell>Patient</TableHeaderCell>
          <TableHeaderCell>Department</TableHeaderCell>
          <TableHeaderCell>Status</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell style={{ fontFamily: 'var(--beacon-font-family-mono)' }}>001234</TableCell>
          <TableCell>Jane Cooper</TableCell>
          <TableCell>Cardiology</TableCell>
          <TableCell>Active</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ fontFamily: 'var(--beacon-font-family-mono)' }}>001235</TableCell>
          <TableCell>Robert Fox</TableCell>
          <TableCell>Neurology</TableCell>
          <TableCell>Pending</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ fontFamily: 'var(--beacon-font-family-mono)' }}>001236</TableCell>
          <TableCell>Esther Howard</TableCell>
          <TableCell>Orthopedics</TableCell>
          <TableCell>Discharged</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

export const Striped: Story = {
  args: { striped: true },
  render: (args) => (
    <Table {...args}>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Date</TableHeaderCell>
          <TableHeaderCell>Test</TableHeaderCell>
          <TableHeaderCell>Result</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow><TableCell>2026-03-01</TableCell><TableCell>CBC</TableCell><TableCell>Normal</TableCell></TableRow>
        <TableRow><TableCell>2026-03-05</TableCell><TableCell>BMP</TableCell><TableCell>Normal</TableCell></TableRow>
        <TableRow><TableCell>2026-03-08</TableCell><TableCell>Lipid Panel</TableCell><TableCell>High</TableCell></TableRow>
        <TableRow><TableCell>2026-03-10</TableCell><TableCell>TSH</TableCell><TableCell>Normal</TableCell></TableRow>
      </TableBody>
    </Table>
  ),
};

export const Compact: Story = {
  args: { density: 'compact', striped: true },
  render: (args) => (
    <Table {...args}>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Code</TableHeaderCell>
          <TableHeaderCell>Description</TableHeaderCell>
          <TableHeaderCell>Qty</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow><TableCell>99213</TableCell><TableCell>Office visit, est. patient</TableCell><TableCell>1</TableCell></TableRow>
        <TableRow><TableCell>85025</TableCell><TableCell>Complete blood count</TableCell><TableCell>1</TableCell></TableRow>
        <TableRow><TableCell>80053</TableCell><TableCell>Comprehensive metabolic panel</TableCell><TableCell>1</TableCell></TableRow>
      </TableBody>
    </Table>
  ),
};
