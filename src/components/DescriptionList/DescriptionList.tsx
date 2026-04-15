import { type ReactNode, type HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';
import styles from './DescriptionList.module.css';

export interface DescriptionListItem {
  /** Label / term */
  label: ReactNode;
  /** Value / description */
  value: ReactNode;
}

export interface DescriptionListProps extends HTMLAttributes<HTMLDListElement> {
  /** Array of label-value pairs */
  items: DescriptionListItem[];
  /** Layout mode */
  layout?: 'vertical' | 'horizontal' | 'grid';
  /** Number of columns for grid layout */
  columns?: number;
}

/**
 * DescriptionList — semantic key-value display using dl/dt/dd.
 *
 * Accessibility:
 * - Uses <dl>, <dt>, <dd> semantic HTML
 * - Screen readers will announce terms and definitions
 * - Healthcare note: ideal for patient demographics, encounter details,
 *   and insurance information panels
 */
export function DescriptionList({
  items,
  layout = 'vertical',
  columns = 2,
  className,
  style,
  ...props
}: DescriptionListProps) {
  return (
    <dl
      className={cn(styles.list, styles[layout], className)}
      style={{
        ...(layout === 'grid' ? { '--dl-columns': columns } as React.CSSProperties : {}),
        ...style,
      }}
      {...props}
    >
      {items.map((item, i) => (
        <div key={i} className={styles.item}>
          <dt className={styles.term}>{item.label}</dt>
          <dd className={styles.definition}>{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
