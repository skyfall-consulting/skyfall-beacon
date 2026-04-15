import { type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../utils/cn';
import { Typography } from '../Typography/Typography';
import { StatusBadge } from '../StatusBadge/StatusBadge';
import styles from './LessonRow.module.css';

export type LessonStatus = 'locked' | 'available' | 'in-progress' | 'completed';
export type LessonKind = 'video' | 'reading' | 'quiz' | 'project' | 'live';

export interface LessonRowProps extends HTMLAttributes<HTMLDivElement> {
  /** Lesson title */
  title: string;
  /** Display order within a module — e.g. "3" or "3.2" */
  order?: string | number;
  /** Lesson type */
  kind?: LessonKind;
  /** Estimated duration label, e.g. "12 min" */
  duration?: string;
  /** Completion status */
  status?: LessonStatus;
  /** Optional trailing element (e.g., next-step icon) */
  trailing?: ReactNode;
  /** Click handler — when provided, row becomes a button */
  onSelect?: () => void;
}

const statusMap: Record<LessonStatus, { status: 'success' | 'pending' | 'inactive' | 'info'; label: string }> = {
  locked: { status: 'inactive', label: 'Locked' },
  available: { status: 'pending', label: 'Available' },
  'in-progress': { status: 'info', label: 'In progress' },
  completed: { status: 'success', label: 'Completed' },
};

const kindLabel: Record<LessonKind, string> = {
  video: 'Video',
  reading: 'Reading',
  quiz: 'Quiz',
  project: 'Project',
  live: 'Live session',
};

const kindIcon: Record<LessonKind, ReactNode> = {
  video: (
    <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path d="M6 4l10 6-10 6V4z" />
    </svg>
  ),
  reading: (
    <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path d="M3 4h6v12H3V4zm8 0h6v12h-6V4z" />
    </svg>
  ),
  quiz: (
    <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 4a3 3 0 012 5v2h-2v-1a3 3 0 010-6zm0 9a1 1 0 110-2 1 1 0 010 2z" />
    </svg>
  ),
  project: (
    <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path d="M3 5h6l1 2h7v9H3V5z" />
    </svg>
  ),
  live: (
    <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <circle cx="10" cy="10" r="4" />
      <circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
    </svg>
  ),
};

/**
 * LessonRow — single row in a module/lesson list.
 *
 * Composes: Typography, StatusBadge
 *
 * Beacon learning surface — used inside lesson lists, syllabus views, and
 * course outlines. Communicates kind (video/reading/quiz/etc.), duration,
 * and completion status in a scannable line.
 *
 * Accessibility:
 * - Locked lessons receive aria-disabled
 * - Interactive rows render as buttons; non-interactive as <li>-friendly divs
 * - Status communicated via icon + text (not color alone)
 */
export function LessonRow({
  title,
  order,
  kind,
  duration,
  status = 'available',
  trailing,
  onSelect,
  className,
  ...props
}: LessonRowProps) {
  const isLocked = status === 'locked';
  const isComplete = status === 'completed';
  const isInteractive = !!onSelect && !isLocked;
  const badgeConfig = statusMap[status];

  const content = (
    <>
      {order !== undefined && (
        <span className={cn(styles.order, isComplete && styles.orderComplete)} aria-hidden="true">
          {isComplete ? (
            <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor">
              <path d="M16.7 5.3a1 1 0 00-1.4 0L8 12.6l-3.3-3.3a1 1 0 10-1.4 1.4l4 4a1 1 0 001.4 0l8-8a1 1 0 000-1.4z" />
            </svg>
          ) : (
            order
          )}
        </span>
      )}
      <div className={styles.identity}>
        <Typography variant="body-md" weight="medium" as="span" className={styles.title}>
          {title}
        </Typography>
        <div className={styles.subline}>
          {kind && (
            <span className={styles.kind} aria-label={kindLabel[kind]}>
              {kindIcon[kind]}
              <span>{kindLabel[kind]}</span>
            </span>
          )}
          {duration && (
            <Typography variant="caption" color="muted" as="span">{duration}</Typography>
          )}
        </div>
      </div>
      <StatusBadge status={badgeConfig.status} label={badgeConfig.label} />
      {trailing && <span className={styles.trailing}>{trailing}</span>}
    </>
  );

  if (isInteractive) {
    return (
      <button
        type="button"
        onClick={onSelect}
        className={cn(styles.row, styles.interactive, className)}
        {...(props as HTMLAttributes<HTMLButtonElement>)}
      >
        {content}
      </button>
    );
  }

  return (
    <div
      className={cn(styles.row, isLocked && styles.locked, className)}
      aria-disabled={isLocked || undefined}
      {...props}
    >
      {content}
    </div>
  );
}
