import type { Meta, StoryObj } from '@storybook/react-vite';
import { Timeline } from './Timeline';

const meta: Meta<typeof Timeline> = {
  title: 'Components/Data Display/Timeline',
  component: Timeline,
  tags: ['autodocs'],
  decorators: [(Story) => <div style={{ maxWidth: 520 }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof Timeline>;

export const CareTimeline: Story = {
  args: {
    items: [
      {
        id: '1',
        title: 'Lab results received',
        description: 'CBC and metabolic panel results are now available for review.',
        timestamp: 'Mar 19, 2026 at 2:30 PM',
        variant: 'info',
      },
      {
        id: '2',
        title: 'Appointment completed',
        description: 'Follow-up visit with Dr. Chen. Vitals recorded.',
        timestamp: 'Mar 18, 2026 at 10:15 AM',
        variant: 'success',
      },
      {
        id: '3',
        title: 'Medication prescribed',
        description: 'Lisinopril 10mg daily prescribed for hypertension.',
        timestamp: 'Mar 18, 2026 at 10:30 AM',
        variant: 'default',
      },
      {
        id: '4',
        title: 'Allergy documented',
        description: 'Patient reported penicillin allergy. Added to chart.',
        timestamp: 'Mar 15, 2026 at 3:00 PM',
        variant: 'warning',
      },
      {
        id: '5',
        title: 'Critical lab value',
        description: 'Potassium level 6.2 mEq/L flagged as critical.',
        timestamp: 'Mar 14, 2026 at 11:45 AM',
        variant: 'error',
      },
    ],
  },
};

export const SimpleTimeline: Story = {
  args: {
    items: [
      {
        id: '1',
        title: 'Patient checked in',
        timestamp: '9:00 AM',
        variant: 'success',
      },
      {
        id: '2',
        title: 'Vitals recorded',
        timestamp: '9:10 AM',
        variant: 'default',
      },
      {
        id: '3',
        title: 'Provider visit',
        timestamp: '9:25 AM',
        variant: 'info',
      },
    ],
  },
};
