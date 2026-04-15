import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';
import styles from './Checkbox.module.css';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** Label text displayed next to the checkbox */
  label?: string;
  /** Error state */
  error?: boolean;
}

/**
 * Checkbox — boolean toggle with label.
 *
 * Accessibility:
 * - Uses native <input type="checkbox"> for full keyboard/screen reader support
 * - Checkmark is CSS-only, no JS required for visual state
 * - Label is clickable and linked to input
 * - 44px minimum touch target maintained via padding
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error = false, className, id, ...props }, ref) => {
    const inputId = id || (label ? `checkbox-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined);

    return (
      <label className={cn(styles.wrapper, error && styles.error, className)}>
        <input
          ref={ref}
          type="checkbox"
          className={styles.input}
          id={inputId}
          aria-invalid={error || undefined}
          {...props}
        />
        <span className={styles.control} aria-hidden="true">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2.5 6L5 8.5L9.5 3.5" />
          </svg>
        </span>
        {label && <span className={styles.label}>{label}</span>}
      </label>
    );
  },
);

Checkbox.displayName = 'Checkbox';
