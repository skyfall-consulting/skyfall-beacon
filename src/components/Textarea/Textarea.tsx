import { forwardRef, type TextareaHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';
import styles from './Textarea.module.css';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Error state */
  error?: boolean;
  /** Full width */
  fullWidth?: boolean;
  /** Allow vertical resize */
  resize?: 'none' | 'vertical' | 'both';
}

/**
 * Textarea — multi-line text input.
 *
 * Accessibility:
 * - Associate with Label via htmlFor/id
 * - Link to HelperText via aria-describedby
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ error = false, fullWidth = false, resize = 'vertical', className, style, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        styles.textarea,
        error && styles.error,
        fullWidth && styles.fullWidth,
        className,
      )}
      aria-invalid={error || undefined}
      style={{ ...style, resize }}
      {...props}
    />
  ),
);

Textarea.displayName = 'Textarea';
