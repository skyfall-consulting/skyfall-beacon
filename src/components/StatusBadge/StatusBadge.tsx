import { type HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';
import styles from './StatusBadge.module.css';

/**
 * Generic, cross-kit semantic status vocabulary.
 *
 * NOTE: This is a Beacon refactor of an Aegis component that previously shipped
 * a healthcare-specific status set (critical, discharged, scheduled). The shared
 * vocabulary below is more reusable across kits — Aegis can map clinical
 * severities and Beacon can map learning states onto the same primitives.
 */
export type StatusBadgeStatus =
  | 'neutral'
  | 'info'
  | 'success'
  | 'warning'
  | 'error'
  | 'pending'
  | 'in-progress'
  | 'inactive'
  | 'completed'
  | 'locked';

export interface StatusBadgeProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'> {
  /** Semantic status */
  status: StatusBadgeStatus;
  /** Override the default label text */
  label?: string;
  /** Size variant */
  size?: 'sm' | 'md';
  /** Show a colored status dot before the label */
  dot?: boolean;
}

const statusLabels: Record<StatusBadgeStatus, string> = {
  neutral: 'Neutral',
  info: 'Info',
  success: 'Success',
  warning: 'Warning',
  error: 'Error',
  pending: 'Pending',
  'in-progress': 'In progress',
  inactive: 'Inactive',
  completed: 'Completed',
  locked: 'Locked',
};

/**
 * StatusBadge — semantic status pill, shared across Skyfall kits.
 *
 * Accessibility:
 * - Always displays text label alongside color (no color-only meaning)
 * - Use `label` to override the default label per status
 */
export function StatusBadge({
  status,
  label,
  size = 'md',
  dot = false,
  className,
  ...props
}: StatusBadgeProps) {
  return (
    <span
      className={cn(styles.badge, styles[status], styles[size], className)}
      {...props}
    >
      {dot && <span className={styles.dot} aria-hidden="true" />}
      {label ?? statusLabels[status]}
    </span>
  );
}
