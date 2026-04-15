import type { Meta, StoryObj } from '@storybook/react-vite';
import { FileUpload } from './FileUpload';

const meta: Meta<typeof FileUpload> = {
  title: 'Components/Inputs/FileUpload',
  component: FileUpload,
  tags: ['autodocs'],
  decorators: [(Story) => <div style={{ width: 400 }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof FileUpload>;

export const Default: Story = {
  args: {
    onFilesSelected: (files) => console.log('Selected:', files),
  },
};

export const MedicalDocument: Story = {
  args: {
    accept: '.pdf,.doc,.docx',
    maxSize: 10 * 1024 * 1024,
    onFilesSelected: (files) => console.log('Medical docs:', files),
  },
};

export const MedicalImages: Story = {
  args: {
    accept: 'image/*,.dicom',
    multiple: true,
    maxSize: 25 * 1024 * 1024,
    onFilesSelected: (files) => console.log('Images:', files),
  },
};

export const WithError: Story = {
  args: {
    error: 'File format not supported. Please upload a PDF or image file.',
    accept: '.pdf,image/*',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const MultipleFiles: Story = {
  args: {
    multiple: true,
    accept: '.pdf,.jpg,.png',
    maxSize: 5 * 1024 * 1024,
    onFilesSelected: (files) => console.log('Multiple files:', files),
  },
};
