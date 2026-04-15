import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';
import styles from './Switch.module.css';

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** Label text */
  label?: string;
}

/**
 * Switch — on/off toggle control.
 *
 * Accessibility:
 * - Uses role="switch" with native checkbox for AT support
 * - aria-checked reflects state
 * - Label is clickable and linked
 * - Healthcare note: use for non-critical preferences only.
 *   For high-risk toggles (e.g., medication alerts), prefer explicit
 *   confirmation patterns instead.
 */
export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ label, className, checked, defaultChecked, ...props }, ref) => (
    <label className={cn(styles.wrapper, className)}>
      <input
        ref={ref}
        type="checkbox"
        role="switch"
        className={styles.input}
        checked={checked}
        defaultChecked={defaultChecked}
        aria-checked={checked}
        {...props}
      />
      <span className={styles.track} aria-hidden="true">
        <span className={styles.thumb} />
      </span>
      {label && <span className={styles.label}>{label}</span>}
    </label>
  ),
);

Switch.displayName = 'Switch';
