import { useCallback } from 'react';
import { cn } from '../../utils/cn';
import { Radio } from '../Radio';
import { HelperText } from '../HelperText';
import styles from './RadioGroup.module.css';

export interface RadioGroupOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface RadioGroupProps {
  /** Group label rendered as fieldset legend */
  label: string;
  /** Shared name attribute for all radios */
  name: string;
  /** Array of radio options */
  options: RadioGroupOption[];
  /** Currently selected value */
  value?: string;
  /** Change handler — receives the selected value */
  onChange?: (value: string) => void;
  /** Error message */
  error?: string;
  /** Layout direction */
  orientation?: 'vertical' | 'horizontal';
  /** Disabled state for all radios */
  disabled?: boolean;
  /** Additional CSS class */
  className?: string;
}

/**
 * RadioGroup — group of radio buttons with fieldset/legend for accessibility.
 *
 * Accessibility:
 * - Uses <fieldset> and <legend> for semantic grouping
 * - Arrow keys navigate between radios within the group
 * - Error message rendered with role="alert"
 */
export function RadioGroup({
  label,
  name,
  options,
  value,
  onChange,
  error,
  orientation = 'vertical',
  disabled = false,
  className,
}: RadioGroupProps) {
  const handleChange = useCallback(
    (optionValue: string) => {
      onChange?.(optionValue);
    },
    [onChange],
  );

  return (
    <fieldset
      className={cn(styles.fieldset, className)}
      disabled={disabled}
    >
      <legend className={styles.legend}>{label}</legend>
      <div className={cn(styles.options, styles[orientation])}>
        {options.map((opt) => (
          <Radio
            key={opt.value}
            name={name}
            label={opt.label}
            value={opt.value}
            checked={value === opt.value}
            onChange={() => handleChange(opt.value)}
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
