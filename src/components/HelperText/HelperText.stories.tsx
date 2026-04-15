import type { Meta, StoryObj } from '@storybook/react-vite';
import { HelperText } from './HelperText';

const meta: Meta<typeof HelperText> = {
  title: 'Components/Utils/HelperText',
  component: HelperText,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof HelperText>;

export const Default: Story = {
  args: { children: 'Enter your full legal name as shown on your ID.' },
};

export const Error: Story = {
  args: { children: 'This field is required.', error: true },
};
