import { type ReactNode, useId } from 'react';
import { cn } from '../../utils/cn';
import { Label } from '../Label';
import { HelperText } from '../HelperText';
import styles from './FormField.module.css';

export interface FormFieldProps {
  /** Label text for the field */
  label?: string;
  /** HTML for attribute to associate label with input */
  htmlFor?: string;
  /** Mark field as required */
  required?: boolean;
  /** Error message string — renders HelperText in error state */
  error?: string;
  /** Helper text displayed below the input */
  helperText?: string;
  /** The form control element (Input, Select, Textarea, etc.) */
  children: ReactNode;
  /** Disabled state — visually dims the field */
  disabled?: boolean;
  /** Additional CSS class */
  className?: string;
}

/**
 * FormField — composable wrapper that renders Label + input + HelperText/error.
 *
 * Accessibility:
 * - Generates aria-describedby linking between input and helper/error text
 * - Error messages use role="alert" via HelperText
 * - Required indicator on Label
 * - Disabled state dims the entire field
 */
export function FormField({
  label,
  htmlFor,
  required,
  error,
  helperText,
  children,
  disabled,
  className,
}: FormFieldProps) {
  const generatedId = useId();
  const descriptionId = `${generatedId}-description`;
  const hasDescription = Boolean(error || helperText);

  return (
    <div className={cn(styles.formField, disabled && styles.disabled, className)}>
      {label && (
        <Label htmlFor={htmlFor} required={required}>
          {label}
        </Label>
      )}
      <div className={styles.control} data-describedby={hasDescription ? descriptionId : undefined}>
        {children}
      </div>
      {(error || helperText) && (
        <HelperText id={descriptionId} error={Boolean(error)}>
          {error || helperText}
        </HelperText>
      )}
    </div>
  );
}
