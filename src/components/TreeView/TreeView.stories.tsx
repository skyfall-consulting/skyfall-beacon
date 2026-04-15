import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { TreeView, type TreeNode } from './TreeView';

const meta: Meta<typeof TreeView> = {
  title: 'Components/Data Display/TreeView',
  component: TreeView,
  tags: ['autodocs'],
  decorators: [(Story) => <div style={{ maxWidth: 320 }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof TreeView>;

const fileTree: TreeNode[] = [
  {
    id: 'src',
    label: 'src',
    children: [
      {
        id: 'components',
        label: 'components',
        children: [
          { id: 'button', label: 'Button.tsx' },
          { id: 'card', label: 'Card.tsx' },
          { id: 'modal', label: 'Modal.tsx' },
        ],
      },
      {
        id: 'utils',
        label: 'utils',
        children: [
          { id: 'cn', label: 'cn.ts' },
          { id: 'hooks', label: 'hooks.ts' },
        ],
      },
      { id: 'index', label: 'index.ts' },
    ],
  },
  { id: 'package', label: 'package.json' },
  { id: 'readme', label: 'README.md' },
];

export const Default: Story = {
  args: {
    data: fileTree,
    defaultExpanded: ['src'],
  },
};

export const Interactive: Story = {
  render: () => {
    const [selected, setSelected] = useState<string | null>(null);
    return (
      <TreeView
        data={fileTree}
        defaultExpanded={['src', 'components']}
        selected={selected}
        onSelect={(id) => setSelected(id)}
      />
    );
  },
};

export const WithLines: Story = {
  name: 'Guide Lines',
  args: {
    data: fileTree,
    defaultExpanded: ['src', 'components', 'utils'],
    showLines: true,
  },
};

export const Small: Story = {
  args: {
    data: fileTree,
    defaultExpanded: ['src'],
    size: 'sm',
  },
};

const departmentTree: TreeNode[] = [
  {
    id: 'cardiology',
    label: 'Cardiology',
    children: [
      { id: 'interventional', label: 'Interventional' },
      { id: 'electrophysiology', label: 'Electrophysiology' },
      { id: 'heart-failure', label: 'Heart Failure', disabled: true },
    ],
  },
  {
    id: 'neurology',
    label: 'Neurology',
    children: [
      { id: 'stroke', label: 'Stroke Unit' },
      { id: 'epilepsy', label: 'Epilepsy Center' },
    ],
  },
  {
    id: 'oncology',
    label: 'Oncology',
    children: [
      { id: 'medical-onc', label: 'Medical Oncology' },
      { id: 'radiation', label: 'Radiation Therapy' },
      { id: 'surgical-onc', label: 'Surgical Oncology' },
    ],
  },
];

export const DepartmentHierarchy: Story = {
  name: 'Department Hierarchy',
  args: {
    data: departmentTree,
    defaultExpanded: ['cardiology'],
  },
};
