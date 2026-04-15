import { type HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';
import styles from './Badge.module.css';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Status variant */
  status?: 'neutral' | 'success' | 'warning' | 'error' | 'info';
}

/**
 * Badge / StatusChip — small label for status or metadata.
 *
 * Accessibility:
 * - Always include meaningful text content (not color alone)
 * - In healthcare contexts, pair with text like "Active", "Pending",
 *   "Critical" rather than relying on color to communicate status
 */
export function Badge({ status = 'neutral', className, children, ...props }: BadgeProps) {
  return (
    <span className={cn(styles.badge, styles[status], className)} {...props}>
      {children}
    </span>
  );
}
