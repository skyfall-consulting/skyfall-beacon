import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';
import styles from './TextField.module.css';

export interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Size of the input control */
  size?: 'sm' | 'md' | 'lg';
  /** Error state */
  error?: boolean;
  /** Full width */
  fullWidth?: boolean;
}

/**
 * TextField — single-line text input.
 *
 * Accessibility:
 * - Use with <Label> and associate via htmlFor/id
 * - Use aria-describedby to link to HelperText or error messages
 * - aria-invalid signals error state to assistive technology
 * - Visible border change + color signals error (not color alone)
 */
export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ size = 'md', error = false, fullWidth = false, className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        styles.textField,
        styles[size],
        error && styles.error,
        fullWidth && styles.fullWidth,
        className,
      )}
      aria-invalid={error || undefined}
      {...props}
    />
  ),
);

TextField.displayName = 'TextField';
