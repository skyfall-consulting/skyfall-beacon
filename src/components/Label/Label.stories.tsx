import type { Meta, StoryObj } from '@storybook/react-vite';
import { Label } from './Label';

const meta: Meta<typeof Label> = {
  title: 'Components/Utils/Label',
  component: Label,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Label>;

export const Default: Story = {
  args: { children: 'Patient name' },
};

export const Required: Story = {
  args: { children: 'Date of birth', required: true },
};
