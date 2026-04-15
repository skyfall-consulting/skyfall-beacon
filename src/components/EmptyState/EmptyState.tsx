import { type ReactNode, type HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';
import styles from './EmptyState.module.css';

export interface EmptyStateProps extends HTMLAttributes<HTMLDivElement> {
  /** Optional icon displayed above the title */
  icon?: ReactNode;
  /** Title text */
  title: string;
  /** Descriptive text below the title */
  description?: string;
  /** Optional action element (e.g., a button) */
  action?: ReactNode;
}

/**
 * EmptyState — centered placeholder for empty tables, lists, or views.
 *
 * Accessibility:
 * - Uses semantic heading and paragraph elements
 * - Healthcare note: provide clear, actionable guidance in empty states
 *   (e.g., "No patients match your filters. Try adjusting your search.")
 */
export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
  ...props
}: EmptyStateProps) {
  return (
    <div className={cn(styles.container, className)} {...props}>
      {icon && <div className={styles.icon} aria-hidden="true">{icon}</div>}
      <h3 className={styles.title}>{title}</h3>
      {description && <p className={styles.description}>{description}</p>}
      {action && <div className={styles.action}>{action}</div>}
    </div>
  );
}
