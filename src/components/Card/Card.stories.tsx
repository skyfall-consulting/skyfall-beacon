import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card } from './Card';

const meta: Meta<typeof Card> = {
  title: 'Components/Surfaces/Card',
  component: Card,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Flat: Story = {
  args: {
    children: <div><strong>Patient Summary</strong><p style={{ margin: '8px 0 0', color: '#4B5B6C' }}>John Doe — MRN: 1234567</p></div>,
  },
};

export const Raised: Story = {
  args: {
    elevation: 'raised',
    children: <div><strong>Lab Results</strong><p style={{ margin: '8px 0 0', color: '#4B5B6C' }}>Complete blood count — Normal</p></div>,
  },
};

export const NoPadding: Story = {
  args: {
    padding: 'none',
    children: <div style={{ padding: 24 }}>Custom padded content</div>,
  },
};
