import { type ReactNode, type HTMLAttributes, useCallback } from 'react';
import { cn } from '../../utils/cn';
import { Table, TableHead, TableBody, TableRow, TableHeaderCell, TableCell } from '../Table';
import { Skeleton } from '../Skeleton';
import { EmptyState } from '../EmptyState';
import styles from './DataGrid.module.css';

export interface DataGridColumn<T = Record<string, unknown>> {
  /** Unique key for the column, used as the data accessor */
  key: string;
  /** Column header label */
  header: ReactNode;
  /** Custom render function for cell content */
  render?: (value: unknown, row: T, rowIndex: number) => ReactNode;
  /** Whether this column is sortable */
  sortable?: boolean;
  /** Column width (CSS value) */
  width?: string | number;
  /** Text alignment */
  align?: 'left' | 'center' | 'right';
}

export type SortDirection = 'asc' | 'desc';

export interface DataGridProps<T = Record<string, unknown>> extends Omit<HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  /** Column definitions */
  columns: DataGridColumn<T>[];
  /** Data array */
  data: T[];
  /** Enable row selection with checkboxes */
  selectable?: boolean;
  /** Callback when selection changes, receives array of selected row indices */
  onSelectionChange?: (selectedIndices: number[]) => void;
  /** Currently selected row indices (controlled) */
  selectedRows?: number[];
  /** Current sort column key */
  sortColumn?: string;
  /** Current sort direction */
  sortDirection?: SortDirection;
  /** Callback when a sortable column header is clicked */
  onSort?: (column: string, direction: SortDirection) => void;
  /** Show loading skeleton */
  loading?: boolean;
  /** Message shown when data is empty */
  emptyMessage?: string;
  /** Row density */
  density?: 'default' | 'compact' | 'comfortable';
  /** Sticky header */
  stickyHeader?: boolean;
  /** Striped rows */
  striped?: boolean;
  /** Callback when a row is clicked */
  onRowClick?: (row: T, index: number) => void;
}

/**
 * DataGrid — composable data grid built on Table primitives.
 *
 * Accessibility:
 * - Built on semantic Table components (table/thead/tbody/tr/th/td)
 * - Sortable columns use aria-sort
 * - Selection checkboxes include accessible labels
 * - Loading state announced via aria-busy
 * - Healthcare note: designed for patient lists, lab results,
 *   appointment schedules, and other clinical data views
 */
export function DataGrid<T extends Record<string, unknown>>({
  columns,
  data,
  selectable = false,
  onSelectionChange,
  selectedRows = [],
  sortColumn,
  sortDirection,
  onSort,
  loading = false,
  emptyMessage = 'No data available',
  density = 'default',
  stickyHeader = false,
  striped = false,
  onRowClick,
  className,
  ...props
}: DataGridProps<T>) {
  const allSelected = data.length > 0 && selectedRows.length === data.length;
  const someSelected = selectedRows.length > 0 && !allSelected;

  const handleSelectAll = useCallback(() => {
    if (!onSelectionChange) return;
    if (allSelected) {
      onSelectionChange([]);
    } else {
      onSelectionChange(data.map((_, i) => i));
    }
  }, [allSelected, data, onSelectionChange]);

  const handleSelectRow = useCallback(
    (index: number) => {
      if (!onSelectionChange) return;
      if (selectedRows.includes(index)) {
        onSelectionChange(selectedRows.filter((i) => i !== index));
      } else {
        onSelectionChange([...selectedRows, index]);
      }
    },
    [selectedRows, onSelectionChange]
  );

  const handleSort = useCallback(
    (key: string) => {
      if (!onSort) return;
      const newDirection: SortDirection =
        sortColumn === key && sortDirection === 'asc' ? 'desc' : 'asc';
      onSort(key, newDirection);
    },
    [sortColumn, sortDirection, onSort]
  );

  const tableDensity = density === 'comfortable' ? 'default' : density;

  const getAriaSort = (key: string): 'ascending' | 'descending' | 'none' | undefined => {
    if (sortColumn !== key) return 'none';
    return sortDirection === 'asc' ? 'ascending' : 'descending';
  };

  // Accessor function to get nested values by dot-notation key
  const getValue = (row: T, key: string): unknown => {
    return key.split('.').reduce<unknown>((obj, k) => {
      if (obj && typeof obj === 'object') return (obj as Record<string, unknown>)[k];
      return undefined;
    }, row);
  };

  const loadingRows = 5;

  return (
    <div
      className={cn(styles.container, stickyHeader && styles.stickyHeader, className)}
      aria-busy={loading}
      {...props}
    >
      <Table
        density={tableDensity}
        striped={striped}
        className={cn(density === 'comfortable' && styles.comfortable)}
      >
        <TableHead>
          <TableRow>
            {selectable && (
              <TableHeaderCell style={{ width: 44 }}>
                <input
                  type="checkbox"
                  checked={allSelected}
                  ref={(el) => {
                    if (el) el.indeterminate = someSelected;
                  }}
                  onChange={handleSelectAll}
                  aria-label="Select all rows"
                  className={styles.checkbox}
                />
              </TableHeaderCell>
            )}
            {columns.map((col) => (
              <TableHeaderCell
                key={col.key}
                style={{
                  width: col.width,
                  textAlign: col.align,
                }}
                aria-sort={col.sortable ? getAriaSort(col.key) : undefined}
              >
                {col.sortable ? (
                  <button
                    className={styles.sortButton}
                    onClick={() => handleSort(col.key)}
                    style={{ textAlign: col.align }}
                  >
                    {col.header}
                    <span className={styles.sortIcon} aria-hidden="true">
                      {sortColumn === col.key ? (
                        sortDirection === 'asc' ? (
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="4 8 7 5 10 8" />
                          </svg>
                        ) : (
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="4 6 7 9 10 6" />
                          </svg>
                        )
                      ) : (
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.3">
                          <polyline points="4 5 7 3 10 5" />
                          <polyline points="4 9 7 11 10 9" />
                        </svg>
                      )}
                    </span>
                  </button>
                ) : (
                  col.header
                )}
              </TableHeaderCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            Array.from({ length: loadingRows }, (_, rowIdx) => (
              <TableRow key={`skeleton-${rowIdx}`}>
                {selectable && (
                  <TableCell>
                    <Skeleton variant="rectangular" width={16} height={16} />
                  </TableCell>
                )}
                {columns.map((col) => (
                  <TableCell key={col.key}>
                    <Skeleton variant="text" width="80%" />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columns.length + (selectable ? 1 : 0)}>
                <EmptyState title={emptyMessage} />
              </td>
            </tr>
          ) : (
            data.map((row, rowIdx) => {
              const isSelected = selectedRows.includes(rowIdx);
              return (
                <TableRow
                  key={rowIdx}
                  className={cn(
                    isSelected && styles.selectedRow,
                    onRowClick && styles.clickableRow
                  )}
                  onClick={onRowClick ? () => onRowClick(row, rowIdx) : undefined}
                >
                  {selectable && (
                    <TableCell>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={(e) => {
                          e.stopPropagation();
                          handleSelectRow(rowIdx);
                        }}
                        onClick={(e) => e.stopPropagation()}
                        aria-label={`Select row ${rowIdx + 1}`}
                        className={styles.checkbox}
                      />
                    </TableCell>
                  )}
                  {columns.map((col) => {
                    const value = getValue(row, col.key);
                    return (
                      <TableCell key={col.key} style={{ textAlign: col.align }}>
                        {col.render ? col.render(value, row, rowIdx) : (value as ReactNode)}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
}
