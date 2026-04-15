import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';
import styles from './Radio.module.css';

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** Label text */
  label?: string;
  /** Error state */
  error?: boolean;
}

/**
 * Radio — single-selection option within a group.
 *
 * Accessibility:
 * - Uses native <input type="radio">
 * - Wrap multiple Radios in a fieldset with legend for group labeling
 * - Arrow keys navigate between radios within the same name group
 */
export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ label, error = false, className, id, ...props }, ref) => {
    const inputId = id || (label ? `radio-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined);

    return (
      <label className={cn(styles.wrapper, error && styles.error, className)}>
        <input
          ref={ref}
          type="radio"
          className={styles.input}
          id={inputId}
          aria-invalid={error || undefined}
          {...props}
        />
        <span className={styles.control} aria-hidden="true">
          <span className={styles.dot} />
        </span>
        {label && <span className={styles.label}>{label}</span>}
      </label>
    );
  },
);

Radio.displayName = 'Radio';
