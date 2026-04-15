import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Pagination } from './Pagination';

const meta: Meta<typeof Pagination> = {
  title: 'Components/Navigation/Pagination',
  component: Pagination,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    return <Pagination currentPage={page} totalPages={10} onPageChange={setPage} />;
  },
};

export const Small: Story = {
  render: () => {
    const [page, setPage] = useState(3);
    return <Pagination currentPage={page} totalPages={8} onPageChange={setPage} size="sm" />;
  },
};

export const ManyPages: Story = {
  name: 'Many Pages',
  render: () => {
    const [page, setPage] = useState(15);
    return <Pagination currentPage={page} totalPages={50} onPageChange={setPage} siblingCount={2} />;
  },
};

export const FewPages: Story = {
  name: 'Few Pages',
  render: () => {
    const [page, setPage] = useState(2);
    return <Pagination currentPage={page} totalPages={3} onPageChange={setPage} />;
  },
};
