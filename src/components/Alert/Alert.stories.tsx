import type { Meta, StoryObj } from '@storybook/react-vite';
import { Alert } from './Alert';

const meta: Meta<typeof Alert> = {
  title: 'Components/Feedback/Alert',
  component: Alert,
  tags: ['autodocs'],
  decorators: [(Story) => <div style={{ width: 480 }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Info: Story = {
  args: { status: 'info', title: 'Appointment reminder', children: 'Your telehealth visit is in 30 minutes.' },
};

export const Success: Story = {
  args: { status: 'success', title: 'Record saved', children: 'Patient chart has been updated.' },
};

export const Warning: Story = {
  args: { status: 'warning', title: 'Allergy flag', children: 'Patient has documented penicillin allergy.' },
};

export const Error: Story = {
  args: { status: 'error', title: 'Submission failed', children: 'Unable to process the lab order. Please try again.' },
};
