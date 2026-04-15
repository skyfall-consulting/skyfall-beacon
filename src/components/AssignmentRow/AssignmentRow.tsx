import { type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../utils/cn';
import { Typography } from '../Typography/Typography';
import { StatusBadge } from '../StatusBadge/StatusBadge';
import styles from './AssignmentRow.module.css';

export type AssignmentStatus =
  | 'not-started'
  | 'in-progress'
  | 'submitted'
  | 'graded'
  | 'overdue';

export interface AssignmentRowProps extends HTMLAttributes<HTMLDivElement> {
  /** Assignment title */
  title: string;
  /** Course or module the assignment belongs to */
  course?: string;
  /** Due-by display label, e.g. "Due Apr 22" */
  dueLabel?: string;
  /** Assignment status */
  status?: AssignmentStatus;
  /** Score display, e.g. "92 / 100" or "A−" — shown when status === "graded" */
  score?: string;
  /** Optional trailing element (action button, menu) */
  trailing?: ReactNode;
}

const statusMap: Record<
  AssignmentStatus,
  { status: 'pending' | 'in-progress' | 'success' | 'completed' | 'error'; label: string }
> = {
  'not-started': { status: 'pending', label: 'Not started' },
  'in-progress': { status: 'in-progress', label: 'In progress' },
  submitted: { status: 'success', label: 'Submitted' },
  graded: { status: 'completed', label: 'Graded' },
  overdue: { status: 'error', label: 'Overdue' },
};

/**
 * AssignmentRow — single assignment line in a tracker, gradebook, or queue.
 *
 * Composes: Typography, StatusBadge
 *
 * Beacon learning surface — used in student dashboards (their assignments)
 * and educator dashboards (cohort submissions). Communicates status, due
 * date, and score in a single scannable row.
 */
export function AssignmentRow({
  title,
  course,
  dueLabel,
  status = 'not-started',
  score,
  trailing,
  className,
  ...props
}: AssignmentRowProps) {
  const cfg = statusMap[status];
  const isOverdue = status === 'overdue';
  const showScore = status === 'graded' && score;

  return (
    <div
      className={cn(styles.row, isOverdue && styles.overdue, className)}
      {...props}
    >
      <div className={styles.identity}>
        <Typography variant="body-md" weight="medium" as="span" className={styles.title}>
          {title}
        </Typography>
        <div className={styles.subline}>
          {course && (
            <Typography variant="caption" color="muted" as="span">{course}</Typography>
          )}
          {dueLabel && (
            <Typography
              variant="caption"
              color={isOverdue ? 'error' : 'muted'}
              weight={isOverdue ? 'semibold' : 'regular'}
              as="span"
            >
              {dueLabel}
            </Typography>
          )}
        </div>
      </div>

      {showScore && (
        <Typography variant="body-md" weight="semibold" as="span" className={styles.score}>
          {score}
        </Typography>
      )}

      <StatusBadge status={cfg.status} label={cfg.label} dot />

      {trailing && <span className={styles.trailing}>{trailing}</span>}
    </div>
  );
}
