import { type HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';
import styles from './Progress.module.css';

export interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
  /** Current value (0-100) */
  value: number;
  /** Maximum value (defaults to 100) */
  max?: number;
  /** Size variant */
  size?: 'sm' | 'md';
  /** Color variant */
  variant?: 'default' | 'success' | 'warning' | 'error';
  /** Visible label text */
  label?: string;
  /** Show the numeric value */
  showValue?: boolean;
}

/**
 * Progress — horizontal bar indicating completion or progress.
 *
 * Accessibility:
 * - role="progressbar" with aria-valuenow, aria-valuemin, aria-valuemax
 * - aria-label derived from the label prop
 * - Useful for course progress, lesson completion, multi-step forms,
 *   onboarding flows, and any "X of Y complete" surface
 */
export function Progress({
  value,
  max = 100,
  size = 'md',
  variant = 'default',
  label,
  showValue = false,
  className,
  ...props
}: ProgressProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className={cn(styles.container, className)} {...props}>
      {(label || showValue) && (
        <div className={styles.header}>
          {label && <span className={styles.label}>{label}</span>}
          {showValue && <span className={styles.value}>{Math.round(pct)}%</span>}
        </div>
      )}
      <div
        className={cn(styles.track, styles[size])}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label}
      >
        <div
          className={cn(styles.fill, styles[variant])}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
