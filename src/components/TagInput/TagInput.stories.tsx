import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { TagInput } from './TagInput';

const meta: Meta<typeof TagInput> = {
  title: 'Components/Inputs/TagInput',
  component: TagInput,
  tags: ['autodocs'],
  decorators: [(Story) => <div style={{ maxWidth: 400 }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof TagInput>;

export const Default: Story = {
  render: () => {
    const [tags, setTags] = useState(['Cardiology', 'Urgent']);
    return <TagInput label="Specialties" value={tags} onChange={setTags} />;
  },
};

export const WithLimit: Story = {
  name: 'Max Tags',
  render: () => {
    const [tags, setTags] = useState(['Allergy 1', 'Allergy 2']);
    return <TagInput label="Known Allergies" value={tags} onChange={setTags} max={5} placeholder="Add allergy…" />;
  },
};

export const Small: Story = {
  render: () => {
    const [tags, setTags] = useState(['ICD-10', 'CPT']);
    return <TagInput label="Code Systems" value={tags} onChange={setTags} size="sm" />;
  },
};

export const ErrorState: Story = {
  render: () => {
    const [tags, setTags] = useState(['Penicillin']);
    return <TagInput label="Allergies" value={tags} onChange={setTags} error />;
  },
};

export const Disabled: Story = {
  render: () => (
    <TagInput label="Diagnoses" value={['Hypertension', 'Type 2 Diabetes']} disabled />
  ),
};

export const Empty: Story = {
  render: () => {
    const [tags, setTags] = useState<string[]>([]);
    return <TagInput label="Tags" value={tags} onChange={setTags} placeholder="Type and press Enter…" />;
  },
};
