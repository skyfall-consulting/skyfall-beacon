import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tabs } from './Tabs';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Navigation/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  decorators: [(Story) => <div style={{ width: 520 }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  args: {
    tabs: [
      { id: 'overview', label: 'Overview', content: <p>Patient overview and demographics.</p> },
      { id: 'history', label: 'History', content: <p>Medical history and past procedures.</p> },
      { id: 'medications', label: 'Medications', content: <p>Current medication list and dosages.</p> },
      { id: 'lab', label: 'Lab Results', content: <p>Recent lab results and trends.</p> },
    ],
  },
};

export const WithDisabled: Story = {
  args: {
    tabs: [
      { id: 'active', label: 'Active', content: <p>Active prescriptions.</p> },
      { id: 'archived', label: 'Archived', content: <p>Archived prescriptions.</p>, disabled: true },
    ],
  },
};
