import { useEffect, type ReactNode } from 'react';
import { cn } from '../../utils/cn';
import styles from './Toast.module.css';

export type ToastStatus = 'info' | 'success' | 'warning' | 'error';

export interface ToastProps {
  /** Toast message */
  message: string;
  /** Optional title */
  title?: string;
  /** Status variant */
  status?: ToastStatus;
  /** Optional action element */
  action?: ReactNode;
  /** Called when toast is closed */
  onClose: () => void;
  /** Auto-dismiss duration in ms (0 to disable) */
  duration?: number;
  /** Additional class name */
  className?: string;
}

const statusIcons: Record<ToastStatus, ReactNode> = {
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
 * Toast — transient notification that auto-dismisses.
 *
 * Accessibility:
 * - Uses role="alert" for error/warning (assertive), role="status" for info/success (polite)
 * - Close button has accessible label
 * - Auto-dismiss can be disabled for important messages
 * - Icon + color + text ensures meaning is communicated multiple ways
 */
export function Toast({
  message,
  title,
  status = 'info',
  action,
  onClose,
  duration = 5000,
  className,
}: ToastProps) {
  useEffect(() => {
    if (duration <= 0) return;
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const isUrgent = status === 'error' || status === 'warning';

  return (
    <div
      className={cn(styles.toast, styles[status], className)}
      role={isUrgent ? 'alert' : 'status'}
    >
      <span className={styles.icon} aria-hidden="true">
        {statusIcons[status]}
      </span>
      <div className={styles.content}>
        {title && <p className={styles.title}>{title}</p>}
        <p className={styles.message}>{message}</p>
      </div>
      {action && <div className={styles.action}>{action}</div>}
      <button
        className={styles.close}
        onClick={onClose}
        aria-label="Dismiss notification"
        type="button"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
          <line x1="4" y1="4" x2="12" y2="12" />
          <line x1="12" y1="4" x2="4" y2="12" />
        </svg>
      </button>
    </div>
  );
}
