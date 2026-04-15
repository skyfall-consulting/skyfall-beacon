import type { Meta, StoryObj } from '@storybook/react-vite';
import { Sparkline } from './Sparkline';

const meta: Meta<typeof Sparkline> = {
  title: 'Beacon X/Charts/Sparkline',
  component: Sparkline,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof Sparkline>;

const trend = [12, 15, 14, 18, 21, 19, 24, 28, 26, 31, 35, 33];

export const Line: Story = {
  args: {
    data: trend,
    variant: 'line',
    width: 160,
    height: 40,
    ariaLabel: 'Patient enrollment trend, increasing',
  },
};

export const Area: Story = {
  args: {
    data: trend,
    variant: 'area',
    width: 160,
    height: 40,
    ariaLabel: 'Patient enrollment trend, increasing',
  },
};

export const InTableCell: Story = {
  render: () => (
    <table style={{ borderCollapse: 'collapse', fontFamily: 'var(--beacon-font-family-sans)' }}>
      <thead>
        <tr>
          <th
            style={{
              textAlign: 'left',
              padding: '8px 16px',
              fontSize: 12,
              color: 'var(--beacon-color-text-secondary)',
            }}
          >
            Provider
          </th>
          <th
            style={{
              textAlign: 'left',
              padding: '8px 16px',
              fontSize: 12,
              color: 'var(--beacon-color-text-secondary)',
            }}
          >
            30-day trend
          </th>
        </tr>
      </thead>
      <tbody>
        {[
          ['Dr. Patel', [4, 6, 5, 7, 8, 7, 9, 10, 12]],
          ['Dr. Nguyen', [12, 11, 13, 12, 14, 13, 15, 14, 16]],
          ['Dr. Johnson', [9, 8, 8, 7, 6, 7, 6, 5, 4]],
        ].map(([name, data]) => (
          <tr key={name as string}>
            <td style={{ padding: '12px 16px', borderTop: '1px solid var(--beacon-color-border-subtle)' }}>
              {name}
            </td>
            <td style={{ padding: '12px 16px', borderTop: '1px solid var(--beacon-color-border-subtle)' }}>
              <Sparkline data={data as number[]} variant="area" width={120} height={32} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  ),
};
