import type { Meta, StoryObj } from '@storybook/react-vite';
import { FormField } from './FormField';
import { TextField } from '../TextField';
import { Select } from '../Select';

const meta: Meta<typeof FormField> = {
  title: 'Components/Layout/FormField',
  component: FormField,
  tags: ['autodocs'],
  decorators: [(Story) => <div style={{ width: 360 }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof FormField>;

export const Default: Story = {
  args: {
    label: 'Patient Name',
    htmlFor: 'patient-name',
    helperText: 'Enter the patient\'s full legal name',
    children: <TextField id="patient-name" placeholder="John Doe" fullWidth />,
  },
};

export const Required: Story = {
  args: {
    label: 'Medical Record Number',
    htmlFor: 'mrn',
    required: true,
    helperText: 'Unique identifier for the patient record',
    children: <TextField id="mrn" placeholder="MRN-000000" fullWidth />,
  },
};

export const WithError: Story = {
  args: {
    label: 'Email Address',
    htmlFor: 'email',
    required: true,
    error: 'A valid email address is required for patient notifications',
    children: <TextField id="email" defaultValue="invalid@" error fullWidth />,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Insurance Provider',
    htmlFor: 'insurance',
    disabled: true,
    helperText: 'Contact admin to update insurance information',
    children: <TextField id="insurance" defaultValue="Blue Cross" disabled fullWidth />,
  },
};

export const WithSelect: Story = {
  args: {
    label: 'Blood Type',
    htmlFor: 'blood-type',
    required: true,
    children: (
      <Select id="blood-type" fullWidth>
        <option value="">Select blood type</option>
        <option value="a-pos">A+</option>
        <option value="a-neg">A−</option>
        <option value="b-pos">B+</option>
        <option value="b-neg">B−</option>
        <option value="o-pos">O+</option>
        <option value="o-neg">O−</option>
        <option value="ab-pos">AB+</option>
        <option value="ab-neg">AB−</option>
      </Select>
    ),
  },
};

export const PatientRegistrationForm: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <FormField label="First Name" htmlFor="first" required>
        <TextField id="first" placeholder="First name" fullWidth />
      </FormField>
      <FormField label="Last Name" htmlFor="last" required>
        <TextField id="last" placeholder="Last name" fullWidth />
      </FormField>
      <FormField label="Date of Birth" htmlFor="dob" required helperText="MM/DD/YYYY format">
        <TextField id="dob" placeholder="01/15/1990" fullWidth />
      </FormField>
      <FormField label="Phone" htmlFor="phone" helperText="Primary contact number">
        <TextField id="phone" placeholder="(555) 123-4567" fullWidth />
      </FormField>
    </div>
  ),
};
