import type { Meta, StoryObj } from '@storybook/react-vite';
import { CollapsiblePanel } from './CollapsiblePanel';

const meta: Meta<typeof CollapsiblePanel> = {
  title: 'Components/Surfaces/CollapsiblePanel',
  component: CollapsiblePanel,
  tags: ['autodocs'],
  decorators: [(Story) => <div style={{ width: 480 }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof CollapsiblePanel>;

export const Allergies: Story = {
  args: {
    title: 'Allergies',
    defaultOpen: true,
    children: (
      <ul style={{ margin: 0, paddingLeft: 16 }}>
        <li>Penicillin &mdash; Severe (anaphylaxis)</li>
        <li>Sulfa drugs &mdash; Moderate (rash)</li>
        <li>Latex &mdash; Mild (contact dermatitis)</li>
      </ul>
    ),
  },
};

export const Medications: Story = {
  args: {
    title: 'Current Medications',
    children: (
      <ul style={{ margin: 0, paddingLeft: 16 }}>
        <li>Lisinopril 10mg &mdash; Once daily</li>
        <li>Metformin 500mg &mdash; Twice daily</li>
        <li>Atorvastatin 20mg &mdash; At bedtime</li>
        <li>Aspirin 81mg &mdash; Once daily</li>
      </ul>
    ),
  },
};

export const InsuranceInfo: Story = {
  args: {
    title: 'Insurance Information',
    children: (
      <div>
        <p style={{ margin: '0 0 8px' }}><strong>Primary:</strong> Blue Cross Blue Shield</p>
        <p style={{ margin: '0 0 8px' }}><strong>Policy #:</strong> BCB-789456123</p>
        <p style={{ margin: '0 0 8px' }}><strong>Group #:</strong> GRP-456</p>
        <p style={{ margin: 0 }}><strong>Copay:</strong> $25</p>
      </div>
    ),
  },
};

export const MultiplePanels: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <CollapsiblePanel title="Allergies" defaultOpen>
        <p style={{ margin: 0 }}>Penicillin (severe), Sulfa drugs (moderate), Latex (mild).</p>
      </CollapsiblePanel>
      <CollapsiblePanel title="Medications">
        <p style={{ margin: 0 }}>Lisinopril 10mg daily, Metformin 500mg twice daily, Atorvastatin 20mg at bedtime.</p>
      </CollapsiblePanel>
      <CollapsiblePanel title="Insurance Info">
        <p style={{ margin: 0 }}>Blue Cross Blue Shield, Policy #BCB-789456123, Copay: $25.</p>
      </CollapsiblePanel>
      <CollapsiblePanel title="Emergency Contact">
        <p style={{ margin: 0 }}>Sarah Cooper (Spouse) &mdash; (555) 123-4567</p>
      </CollapsiblePanel>
    </div>
  ),
};
