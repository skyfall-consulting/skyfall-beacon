import { type TableHTMLAttributes, type ThHTMLAttributes, type TdHTMLAttributes, type HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';
import styles from './Table.module.css';

export interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
  /** Compact density for admin/operational views */
  density?: 'default' | 'compact';
  /** Striped rows for scan-ability */
  striped?: boolean;
}

/**
 * Table — data table with accessible defaults.
 *
 * Accessibility:
 * - Semantic <table> / <thead> / <tbody> / <th> structure
 * - Use scope="col" on header cells
 * - For complex tables, use aria-describedby to link to a caption
 * - Healthcare note: clinical data tables should use tabular numerals
 *   (monospace) and adequate row height for readability under stress
 */
export function Table({ density = 'default', striped = false, className, children, ...props }: TableProps) {
  return (
    <div className={styles.wrapper}>
      <table
        className={cn(styles.table, styles[density], striped && styles.striped, className)}
        {...props}
      >
        {children}
      </table>
    </div>
  );
}

export function TableHead({ className, children, ...props }: HTMLAttributes<HTMLTableSectionElement>) {
  return <thead className={cn(styles.thead, className)} {...props}>{children}</thead>;
}

export function TableBody({ className, children, ...props }: HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody className={cn(styles.tbody, className)} {...props}>{children}</tbody>;
}

export function TableRow({ className, children, ...props }: HTMLAttributes<HTMLTableRowElement>) {
  return <tr className={cn(styles.tr, className)} {...props}>{children}</tr>;
}

export function TableHeaderCell({ className, children, ...props }: ThHTMLAttributes<HTMLTableCellElement>) {
  return <th scope="col" className={cn(styles.th, className)} {...props}>{children}</th>;
}

export function TableCell({ className, children, ...props }: TdHTMLAttributes<HTMLTableCellElement>) {
  return <td className={cn(styles.td, className)} {...props}>{children}</td>;
}
