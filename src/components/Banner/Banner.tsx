import { type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../utils/cn';
import styles from './Banner.module.css';

export type BannerStatus = 'info' | 'success' | 'warning' | 'error';

export interface BannerProps extends HTMLAttributes<HTMLDivElement> {
  /** Status variant */
  status?: BannerStatus;
  /** Whether the banner can be dismissed */
  dismissible?: boolean;
  /** Called when dismiss button is clicked */
  onDismiss?: () => void;
  /** Optional action element */
  action?: ReactNode;
  /** Banner content */
  children: ReactNode;
}

const statusIcons: Record<BannerStatus, ReactNode> = {
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
 * Banner — full-width banner for page-level messages.
 *
 * Accessibility:
 * - Uses role="alert" for error/warning (assertive announcement)
 * - Uses role="status" for info/success (polite announcement)
 * - Icon + color + text ensures meaning is communicated multiple ways
 * - Dismiss button has accessible label
 */
export function Banner({
  status = 'info',
  dismissible = false,
  onDismiss,
  action,
  children,
  className,
  ...props
}: BannerProps) {
  const isUrgent = status === 'error' || status === 'warning';

  return (
    <div
      className={cn(styles.banner, styles[status], className)}
      role={isUrgent ? 'alert' : 'status'}
      {...props}
    >
      <div className={styles.inner}>
        <span className={styles.icon} aria-hidden="true">
          {statusIcons[status]}
        </span>
        <div className={styles.content}>{children}</div>
        {action && <div className={styles.action}>{action}</div>}
        {dismissible && (
          <button
            className={styles.dismiss}
            onClick={onDismiss}
            aria-label="Dismiss banner"
            type="button"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
              <line x1="4" y1="4" x2="12" y2="12" />
              <line x1="12" y1="4" x2="4" y2="12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
