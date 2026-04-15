import type { Meta, StoryObj } from '@storybook/react-vite';
import { Divider } from './Divider';

const meta: Meta<typeof Divider> = {
  title: 'Components/Data Display/Divider',
  component: Divider,
  tags: ['autodocs'],
  decorators: [(Story) => <div style={{ width: 400 }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof Divider>;

export const Default: Story = { args: {} };
export const SmallSpacing: Story = { args: { spacing: 'sm' } };
export const LargeSpacing: Story = { args: { spacing: 'lg' } };
