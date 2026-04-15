import { useCallback } from 'react';
import { cn } from '../../utils/cn';
import { Checkbox } from '../Checkbox';
import { HelperText } from '../HelperText';
import styles from './CheckboxGroup.module.css';

export interface CheckboxGroupOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface CheckboxGroupProps {
  /** Group label rendered as fieldset legend */
  label: string;
  /** Shared name attribute for all checkboxes */
  name: string;
  /** Array of checkbox options */
  options: CheckboxGroupOption[];
  /** Currently selected values */
  value?: string[];
  /** Change handler — receives updated array of selected values */
  onChange?: (value: string[]) => void;
  /** Error message */
  error?: string;
  /** Layout direction */
  orientation?: 'vertical' | 'horizontal';
  /** Disabled state for all checkboxes */
  disabled?: boolean;
  /** Additional CSS class */
  className?: string;
}

/**
 * CheckboxGroup — group of checkboxes with fieldset/legend for accessibility.
 *
 * Accessibility:
 * - Uses <fieldset> and <legend> for semantic grouping
 * - Error message linked via role="alert"
 * - Each checkbox is individually focusable
 */
export function CheckboxGroup({
  label,
  name,
  options,
  value = [],
  onChange,
  error,
  orientation = 'vertical',
  disabled = false,
  className,
}: CheckboxGroupProps) {
  const handleChange = useCallback(
    (optionValue: string, checked: boolean) => {
      if (!onChange) return;
      const next = checked
        ? [...value, optionValue]
        : value.filter((v) => v !== optionValue);
      onChange(next);
    },
    [value, onChange],
  );

  return (
    <fieldset
      className={cn(styles.fieldset, className)}
      disabled={disabled}
    >
      <legend className={styles.legend}>{label}</legend>
      <div className={cn(styles.options, styles[orientation])}>
        {options.map((opt) => (
          <Checkbox
            key={opt.value}
            name={name}
            label={opt.label}
            value={opt.value}
            checked={value.includes(opt.value)}
            onChange={(e) => handleChange(opt.value, e.target.checked)}
            disabled={opt.disabled || disabled}
            error={Boolean(error)}
          />
        ))}
      </div>
      {error && (
        <HelperText error>{error}</HelperText>
      )}
    </fieldset>
  );
}
