import { type HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';
import styles from './Spinner.module.css';

export interface SpinnerProps extends HTMLAttributes<HTMLSpanElement> {
  /** Size */
  size?: 'sm' | 'md' | 'lg';
  /** Accessible label */
  label?: string;
}

/**
 * Spinner / LoadingIndicator — visual loading state.
 *
 * Accessibility:
 * - role="status" with aria-label for screen reader announcement
 * - aria-live="polite" so loading state is announced without interrupting
 * - Healthcare note: in clinical workflows, always pair with text
 *   context ("Loading patient records...") so users understand what
 *   they are waiting for
 */
export function Spinner({ size = 'md', label = 'Loading', className, ...props }: SpinnerProps) {
  const sizeMap = { sm: 16, md: 24, lg: 32 };
  const s = sizeMap[size];

  return (
    <span
      className={cn(styles.spinner, className)}
      role="status"
      aria-label={label}
      aria-live="polite"
      {...props}
    >
      <svg
        width={s}
        height={s}
        viewBox="0 0 24 24"
        fill="none"
        className={styles.svg}
        aria-hidden="true"
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.2"
        />
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="50"
          strokeDashoffset="35"
        />
      </svg>
    </span>
  );
}
