import { type HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';
import styles from './HelperText.module.css';

export interface HelperTextProps extends HTMLAttributes<HTMLParagraphElement> {
  /** Render as error message */
  error?: boolean;
}

/**
 * HelperText — descriptive or error text beneath a form field.
 *
 * Accessibility:
 * - Link to input via aria-describedby on the input, matching this element's id
 * - Error messages use role="alert" for immediate screen reader announcement
 * - Error state uses both color and icon (not color alone)
 */
export function HelperText({ error = false, className, children, ...props }: HelperTextProps) {
  return (
    <p
      className={cn(styles.helperText, error && styles.error, className)}
      role={error ? 'alert' : undefined}
      {...props}
    >
      {error && (
        <svg className={styles.icon} width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true">
          <path d="M7 0a7 7 0 110 14A7 7 0 017 0zm0 9.5a.75.75 0 100 1.5.75.75 0 000-1.5zM7 3a.75.75 0 00-.75.75v4a.75.75 0 001.5 0v-4A.75.75 0 007 3z" />
        </svg>
      )}
      {children}
    </p>
  );
}
