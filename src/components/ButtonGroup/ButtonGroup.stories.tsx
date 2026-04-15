import type { Meta, StoryObj } from '@storybook/react-vite';
import { ButtonGroup } from './ButtonGroup';
import { Button } from '../Button/Button';

const meta: Meta<typeof ButtonGroup> = {
  title: 'Components/Inputs/ButtonGroup',
  component: ButtonGroup,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ButtonGroup>;

export const Default: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="secondary">Cancel</Button>
      <Button variant="primary">Save</Button>
    </ButtonGroup>
  ),
};

export const Connected: Story = {
  render: () => (
    <ButtonGroup connected>
      <Button variant="secondary">Day</Button>
      <Button variant="secondary">Week</Button>
      <Button variant="secondary">Month</Button>
    </ButtonGroup>
  ),
};

export const Vertical: Story = {
  render: () => (
    <ButtonGroup orientation="vertical" connected>
      <Button variant="secondary">Overview</Button>
      <Button variant="secondary">Lab Results</Button>
      <Button variant="secondary">Medications</Button>
      <Button variant="secondary">Notes</Button>
    </ButtonGroup>
  ),
};

export const MixedVariants: Story = {
  name: 'Mixed Variants',
  render: () => (
    <ButtonGroup>
      <Button variant="ghost">Discard</Button>
      <Button variant="secondary">Save Draft</Button>
      <Button variant="primary">Submit Order</Button>
    </ButtonGroup>
  ),
};

export const ToolbarExample: Story = {
  name: 'Toolbar',
  render: () => (
    <ButtonGroup connected aria-label="Text formatting">
      <Button variant="secondary" size="sm">B</Button>
      <Button variant="secondary" size="sm">I</Button>
      <Button variant="secondary" size="sm">U</Button>
    </ButtonGroup>
  ),
};
