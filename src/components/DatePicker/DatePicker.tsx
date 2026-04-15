import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';
import styles from './DatePicker.module.css';

export interface DatePickerProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Error state */
  error?: boolean;
  /** Full width */
  fullWidth?: boolean;
  /** Minimum date (ISO format YYYY-MM-DD) */
  min?: string;
  /** Maximum date (ISO format YYYY-MM-DD) */
  max?: string;
}

/**
 * DatePicker — styled native date input for consistent appearance.
 *
 * Accessibility:
 * - Uses native input[type="date"] for built-in AT support
 * - Date picker popup provided by the browser
 * - aria-invalid signals error state
 * - Consistent sizing with other Beacon form controls
 */
export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  ({ size = 'md', error = false, fullWidth = false, className, min, max, ...props }, ref) => (
    <div className={cn(styles.wrapper, styles[size], fullWidth && styles.fullWidth, className)}>
      <input
        ref={ref}
        type="date"
        className={cn(styles.input, error && styles.error)}
        min={min}
        max={max}
        aria-invalid={error || undefined}
        {...props}
      />
      <svg
        className={styles.icon}
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="2" y="3" width="12" height="11" rx="1" />
        <path d="M5 1v3M11 1v3M2 7h12" />
      </svg>
    </div>
  ),
);

DatePicker.displayName = 'DatePicker';
