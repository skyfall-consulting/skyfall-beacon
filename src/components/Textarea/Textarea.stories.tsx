import type { Meta, StoryObj } from '@storybook/react-vite';
import { Textarea } from './Textarea';

const meta: Meta<typeof Textarea> = {
  title: 'Components/Inputs/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  decorators: [(Story) => <div style={{ width: 360 }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: { placeholder: 'Enter clinical notes...', fullWidth: true, rows: 4 },
};

export const WithError: Story = {
  args: { defaultValue: 'Incomplete note', error: true, fullWidth: true },
};

export const Disabled: Story = {
  args: { defaultValue: 'Previous notes content', disabled: true, fullWidth: true },
};
