import { type LabelHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';
import styles from './Label.module.css';

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  /** Mark the field as required — adds visual indicator */
  required?: boolean;
}

/**
 * Label — form field label.
 *
 * Accessibility:
 * - Always associate with an input via htmlFor
 * - Required indicator uses both visual (*) and sr-only text
 */
export function Label({ required, className, children, ...props }: LabelProps) {
  return (
    <label className={cn(styles.label, className)} {...props}>
      {children}
      {required && (
        <>
          <span className={styles.required} aria-hidden="true"> *</span>
          <span className={styles.srOnly}> (required)</span>
        </>
      )}
    </label>
  );
}
