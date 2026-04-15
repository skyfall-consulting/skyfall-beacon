import { forwardRef, type SelectHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';
import styles from './Select.module.css';

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  /** Size */
  size?: 'sm' | 'md' | 'lg';
  /** Error state */
  error?: boolean;
  /** Full width */
  fullWidth?: boolean;
}

/**
 * Select — native dropdown select.
 *
 * Accessibility:
 * - Uses native <select> for full keyboard and screen reader support
 * - Associate with Label via htmlFor/id
 * - Custom chevron is decorative (aria-hidden on the icon)
 */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ size = 'md', error = false, fullWidth = false, className, children, ...props }, ref) => (
    <div className={cn(styles.wrapper, fullWidth && styles.fullWidth)}>
      <select
        ref={ref}
        className={cn(
          styles.select,
          styles[size],
          error && styles.error,
          fullWidth && styles.fullWidth,
          className,
        )}
        aria-invalid={error || undefined}
        {...props}
      >
        {children}
      </select>
      <span className={styles.chevron} aria-hidden="true">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 6l4 4 4-4" />
        </svg>
      </span>
    </div>
  ),
);

Select.displayName = 'Select';
