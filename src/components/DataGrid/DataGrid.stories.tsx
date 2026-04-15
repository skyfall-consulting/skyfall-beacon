import { useState, useMemo } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DataGrid } from './DataGrid';
import type { DataGridColumn, SortDirection } from './DataGrid';
import { StatusBadge } from '../StatusBadge';
import type { StatusBadgeStatus } from '../StatusBadge';
import { Avatar } from '../Avatar';
import { Pagination } from '../Pagination';

const meta: Meta<typeof DataGrid> = {
  title: 'Components/Data Display/DataGrid',
  component: DataGrid,
  tags: ['autodocs'],
  decorators: [(Story) => <div style={{ width: '100%', maxWidth: 960 }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof DataGrid>;

// ── Sample patient data ──

interface Patient {
  mrn: string;
  name: string;
  dob: string;
  department: string;
  status: StatusBadgeStatus;
  lastVisit: string;
}

const patients: Patient[] = [
  { mrn: '001234', name: 'Jane Cooper', dob: '03/14/1985', department: 'Cardiology', status: 'active', lastVisit: '2026-03-15' },
  { mrn: '001235', name: 'Robert Fox', dob: '07/22/1972', department: 'Neurology', status: 'pending', lastVisit: '2026-03-12' },
  { mrn: '001236', name: 'Esther Howard', dob: '11/03/1990', department: 'Orthopedics', status: 'discharged', lastVisit: '2026-03-10' },
  { mrn: '001237', name: 'Cameron Williams', dob: '01/18/1968', department: 'Oncology', status: 'critical', lastVisit: '2026-03-16' },
  { mrn: '001238', name: 'Brooklyn Simmons', dob: '05/29/1995', department: 'Cardiology', status: 'scheduled', lastVisit: '2026-02-28' },
  { mrn: '001239', name: 'Leslie Alexander', dob: '09/07/1983', department: 'Pediatrics', status: 'active', lastVisit: '2026-03-14' },
  { mrn: '001240', name: 'Jenny Wilson', dob: '12/01/1977', department: 'Dermatology', status: 'in-progress', lastVisit: '2026-03-16' },
  { mrn: '001241', name: 'Guy Hawkins', dob: '04/11/1960', department: 'Pulmonology', status: 'cancelled', lastVisit: '2026-03-01' },
  { mrn: '001242', name: 'Jacob Jones', dob: '08/25/1988', department: 'Gastroenterology', status: 'active', lastVisit: '2026-03-13' },
  { mrn: '001243', name: 'Kristin Watson', dob: '02/14/1992', department: 'Rheumatology', status: 'inactive', lastVisit: '2026-01-20' },
];

const patientColumns: DataGridColumn<Patient>[] = [
  {
    key: 'mrn',
    header: 'MRN',
    sortable: true,
    width: 90,
    render: (v) => (
      <span style={{ fontFamily: 'var(--beacon-font-family-mono)' }}>{v as string}</span>
    ),
  },
  { key: 'name', header: 'Patient Name', sortable: true },
  { key: 'dob', header: 'Date of Birth', width: 120 },
  { key: 'department', header: 'Department', sortable: true },
  {
    key: 'status',
    header: 'Status',
    width: 130,
    render: (v) => <StatusBadge status={v as StatusBadgeStatus} dot size="sm" />,
  },
  { key: 'lastVisit', header: 'Last Visit', sortable: true, width: 110 },
];

// ── Stories ──

export const Default: Story = {
  name: 'Patient List',
  render: () => (
    <DataGrid columns={patientColumns} data={patients} striped />
  ),
};

export const Sortable: Story = {
  name: 'Sortable Columns',
  render: () => {
    const [sortCol, setSortCol] = useState<string>('name');
    const [sortDir, setSortDir] = useState<SortDirection>('asc');

    const sorted = useMemo(() => {
      return [...patients].sort((a, b) => {
        const aVal = a[sortCol as keyof Patient] ?? '';
        const bVal = b[sortCol as keyof Patient] ?? '';
        const cmp = String(aVal).localeCompare(String(bVal));
        return sortDir === 'asc' ? cmp : -cmp;
      });
    }, [sortCol, sortDir]);

    return (
      <DataGrid
        columns={patientColumns}
        data={sorted}
        sortColumn={sortCol}
        sortDirection={sortDir}
        onSort={(col, dir) => { setSortCol(col); setSortDir(dir); }}
        striped
      />
    );
  },
};

export const Selectable: Story = {
  name: 'Selectable Rows',
  render: () => {
    const [selected, setSelected] = useState<number[]>([]);
    return (
      <div>
        <p style={{ fontFamily: 'var(--beacon-font-family-sans)', fontSize: 13, color: 'var(--beacon-color-text-muted)', marginBottom: 8 }}>
          {selected.length} of {patients.length} patient(s) selected
        </p>
        <DataGrid
          columns={patientColumns}
          data={patients}
          selectable
          selectedRows={selected}
          onSelectionChange={setSelected}
        />
      </div>
    );
  },
};

export const Loading: Story = {
  name: 'Loading State',
  render: () => (
    <DataGrid columns={patientColumns} data={[]} loading striped />
  ),
};

export const Empty: Story = {
  name: 'Empty State',
  render: () => (
    <DataGrid
      columns={patientColumns}
      data={[]}
      emptyMessage="No patients match your search criteria"
    />
  ),
};

export const CompactDensity: Story = {
  name: 'Compact Density',
  render: () => (
    <DataGrid columns={patientColumns} data={patients} density="compact" striped />
  ),
};

export const ComfortableDensity: Story = {
  name: 'Comfortable Density',
  render: () => (
    <DataGrid columns={patientColumns} data={patients.slice(0, 5)} density="comfortable" />
  ),
};

export const WithRowClick: Story = {
  name: 'Clickable Rows',
  render: () => {
    const [clicked, setClicked] = useState<string | null>(null);
    return (
      <div>
        {clicked && (
          <p style={{ fontFamily: 'var(--beacon-font-family-sans)', fontSize: 13, color: 'var(--beacon-color-text-secondary)', marginBottom: 8 }}>
            Clicked: {clicked}
          </p>
        )}
        <DataGrid
          columns={patientColumns}
          data={patients}
          onRowClick={(row) => setClicked(row.name)}
          striped
        />
      </div>
    );
  },
};

export const WithPagination: Story = {
  name: 'With Pagination',
  render: () => {
    const pageSize = 4;
    const [page, setPage] = useState(1);
    const totalPages = Math.ceil(patients.length / pageSize);
    const pageData = patients.slice((page - 1) * pageSize, page * pageSize);

    return (
      <div>
        <DataGrid columns={patientColumns} data={pageData} striped />
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
          <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} size="sm" />
        </div>
      </div>
    );
  },
};

export const WithAvatars: Story = {
  name: 'With Avatars',
  render: () => {
    const columnsWithAvatar: DataGridColumn<Patient>[] = [
      {
        key: 'name',
        header: 'Patient',
        sortable: true,
        render: (_v, row) => (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Avatar name={row.name} size="sm" />
            <span>{row.name}</span>
          </div>
        ),
      },
      ...patientColumns.filter((c) => c.key !== 'name'),
    ];
    return <DataGrid columns={columnsWithAvatar} data={patients} striped />;
  },
};

export const KitchenSink: Story = {
  name: 'Kitchen Sink',
  render: () => {
    const [selected, setSelected] = useState<number[]>([]);
    const [sortCol, setSortCol] = useState<string>('name');
    const [sortDir, setSortDir] = useState<SortDirection>('asc');
    const [page, setPage] = useState(1);
    const pageSize = 5;

    const sorted = useMemo(() => {
      return [...patients].sort((a, b) => {
        const aVal = a[sortCol as keyof Patient] ?? '';
        const bVal = b[sortCol as keyof Patient] ?? '';
        const cmp = String(aVal).localeCompare(String(bVal));
        return sortDir === 'asc' ? cmp : -cmp;
      });
    }, [sortCol, sortDir]);

    const totalPages = Math.ceil(sorted.length / pageSize);
    const pageData = sorted.slice((page - 1) * pageSize, page * pageSize);

    const columnsWithAvatar: DataGridColumn<Patient>[] = [
      {
        key: 'name',
        header: 'Patient',
        sortable: true,
        render: (_v, row) => (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Avatar name={row.name} size="sm" status="active" />
            <div>
              <div style={{ fontWeight: 500 }}>{row.name}</div>
              <div style={{ fontSize: 12, color: 'var(--beacon-color-text-muted)' }}>MRN: {row.mrn}</div>
            </div>
          </div>
        ),
      },
      { key: 'dob', header: 'DOB', width: 110 },
      { key: 'department', header: 'Department', sortable: true },
      {
        key: 'status',
        header: 'Status',
        width: 130,
        render: (v) => <StatusBadge status={v as StatusBadgeStatus} dot size="sm" />,
      },
      { key: 'lastVisit', header: 'Last Visit', sortable: true, width: 110 },
    ];

    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, fontFamily: 'var(--beacon-font-family-sans)' }}>
          <h3 style={{ margin: 0, fontSize: 18, fontWeight: 600, color: 'var(--beacon-color-text-primary)' }}>
            Patient Directory
          </h3>
          <span style={{ fontSize: 13, color: 'var(--beacon-color-text-muted)' }}>
            {selected.length > 0 ? `${selected.length} selected` : `${patients.length} patients`}
          </span>
        </div>
        <DataGrid
          columns={columnsWithAvatar}
          data={pageData}
          selectable
          selectedRows={selected}
          onSelectionChange={setSelected}
          sortColumn={sortCol}
          sortDirection={sortDir}
          onSort={(col, dir) => { setSortCol(col); setSortDir(dir); setPage(1); }}
          striped
          stickyHeader
          onRowClick={(row) => alert(`Viewing patient: ${row.name}`)}
        />
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 12 }}>
          <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} size="sm" />
        </div>
      </div>
    );
  },
};
