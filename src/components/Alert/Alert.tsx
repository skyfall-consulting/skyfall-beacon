import { type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../utils/cn';
import styles from './Alert.module.css';

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  /** Semantic status */
  status?: 'info' | 'success' | 'warning' | 'error';
  /** Optional title */
  title?: string;
  /** Optional action element (e.g., a close button) */
  action?: ReactNode;
}

const statusIcons: Record<string, ReactNode> = {
  info: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
      <path d="M10 0a10 10 0 110 20 10 10 0 010-20zm0 8a1 1 0 00-1 1v5a1 1 0 102 0V9a1 1 0 00-1-1zm0-3.5a1 1 0 100 2 1 1 0 000-2z" />
    </svg>
  ),
  success: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
      <path d="M10 0a10 10 0 110 20 10 10 0 010-20zm4.3 7.3a1 1 0 00-1.4-1.4L8.5 10.3 7.1 8.9a1 1 0 10-1.4 1.4l2.1 2.1a1 1 0 001.4 0l5.1-5.1z" />
    </svg>
  ),
  warning: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
      <path d="M10 0a10 10 0 110 20 10 10 0 010-20zm0 13a1 1 0 100 2 1 1 0 000-2zm0-8a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" />
    </svg>
  ),
  error: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
      <path d="M10 0a10 10 0 110 20 10 10 0 010-20zm3.5 6.5a1 1 0 00-1.4 0L10 8.6 7.9 6.5a1 1 0 10-1.4 1.4L8.6 10l-2.1 2.1a1 1 0 101.4 1.4L10 11.4l2.1 2.1a1 1 0 001.4-1.4L11.4 10l2.1-2.1a1 1 0 000-1.4z" />
    </svg>
  ),
};

/**
 * Alert — contextual message banner.
 *
 * Accessibility:
 * - Uses role="alert" for errors/warnings (live region, immediately announced)
 * - Uses role="status" for info/success (polite announcement)
 * - Icon + color + text ensures meaning is communicated multiple ways
 */
export function Alert({ status = 'info', title, action, className, children, ...props }: AlertProps) {
  const isUrgent = status === 'error' || status === 'warning';

  return (
    <div
      className={cn(styles.alert, styles[status], className)}
      role={isUrgent ? 'alert' : 'status'}
      {...props}
    >
      <span className={styles.icon} aria-hidden="true">{statusIcons[status]}</span>
      <div className={styles.content}>
        {title && <p className={styles.title}>{title}</p>}
        {children && <div className={styles.body}>{children}</div>}
      </div>
      {action && <div className={styles.action}>{action}</div>}
    </div>
  );
}
