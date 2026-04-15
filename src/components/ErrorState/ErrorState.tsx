import { type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../utils/cn';
import { Typography } from '../Typography/Typography';
import styles from './ErrorState.module.css';

export interface ErrorStateProps extends HTMLAttributes<HTMLDivElement> {
  /** Error title */
  title?: string;
  /** Descriptive message */
  description?: string;
  /** Custom icon (defaults to a warning icon) */
  icon?: ReactNode;
  /** Retry action element (e.g., a button) */
  action?: ReactNode;
  /** Error code or reference for support */
  errorCode?: string;
}

const DefaultErrorIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

/**
 * ErrorState — centered error placeholder with retry action.
 *
 * Composes: Typography
 *
 * Use in place of content when a data fetch fails, a page errors,
 * or a section cannot render. Provides clear messaging, an optional
 * error code for support, and a retry action.
 *
 * Accessibility:
 * - Uses role="alert" to announce the error to screen readers
 * - Action button receives focus for quick retry
 */
export function ErrorState({
  title = 'Something went wrong',
  description,
  icon,
  action,
  errorCode,
  className,
  ...props
}: ErrorStateProps) {
  return (
    <div
      className={cn(styles.container, className)}
      role="alert"
      {...props}
    >
      <div className={styles.icon}>
        {icon ?? <DefaultErrorIcon />}
      </div>
      <Typography variant="heading-sm" as="h3" className={styles.title}>
        {title}
      </Typography>
      {description && (
        <Typography variant="body-md" color="muted" className={styles.description}>
          {description}
        </Typography>
      )}
      {action && <div className={styles.action}>{action}</div>}
      {errorCode && (
        <Typography variant="caption" color="muted" className={styles.errorCode}>
          Error code: {errorCode}
        </Typography>
      )}
    </div>
  );
}
