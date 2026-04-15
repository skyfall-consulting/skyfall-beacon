import { forwardRef, useCallback, type InputHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';
import styles from './NumberField.module.css';

export interface NumberFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type' | 'onChange' | 'value' | 'prefix'> {
  /** Current numeric value */
  value?: number;
  /** Change handler */
  onChange?: (value: number) => void;
  /** Minimum allowed value */
  min?: number;
  /** Maximum allowed value */
  max?: number;
  /** Increment step */
  step?: number;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Error state */
  error?: boolean;
  /** Prefix text (e.g., "$") */
  prefix?: string;
  /** Suffix text (e.g., "mg") */
  suffix?: string;
}

/**
 * NumberField — numeric input with increment/decrement buttons.
 *
 * Accessibility:
 * - Uses native input[type="number"] for spinbutton role
 * - Increment/decrement buttons have aria-labels
 * - Buttons are hidden from tab order (input handles keyboard)
 * - min/max constraints are communicated to AT
 */
export const NumberField = forwardRef<HTMLInputElement, NumberFieldProps>(
  (
    {
      value,
      onChange,
      min,
      max,
      step = 1,
      size = 'md',
      error = false,
      disabled = false,
      prefix,
      suffix,
      className,
      ...props
    },
    ref,
  ) => {
    const clamp = useCallback(
      (v: number) => {
        let clamped = v;
        if (min !== undefined) clamped = Math.max(min, clamped);
        if (max !== undefined) clamped = Math.min(max, clamped);
        return clamped;
      },
      [min, max],
    );

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = parseFloat(e.target.value);
        if (!isNaN(raw)) onChange?.(clamp(raw));
      },
      [onChange, clamp],
    );

    const increment = useCallback(() => {
      if (disabled) return;
      const current = value ?? 0;
      onChange?.(clamp(current + step));
    }, [value, step, onChange, clamp, disabled]);

    const decrement = useCallback(() => {
      if (disabled) return;
      const current = value ?? 0;
      onChange?.(clamp(current - step));
    }, [value, step, onChange, clamp, disabled]);

    const atMin = min !== undefined && value !== undefined && value <= min;
    const atMax = max !== undefined && value !== undefined && value >= max;

    return (
      <div
        className={cn(
          styles.wrapper,
          styles[size],
          error && styles.error,
          disabled && styles.disabled,
          className,
        )}
      >
        {prefix && <span className={styles.prefix}>{prefix}</span>}
        <input
          ref={ref}
          type="number"
          className={styles.input}
          value={value ?? ''}
          onChange={handleChange}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          aria-invalid={error || undefined}
          {...props}
        />
        {suffix && <span className={styles.suffix}>{suffix}</span>}
        <div className={styles.buttons}>
          <button
            type="button"
            className={styles.button}
            onClick={increment}
            disabled={disabled || atMax}
            aria-label="Increment"
            tabIndex={-1}
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M2 6.5L5 3.5L8 6.5" />
            </svg>
          </button>
          <button
            type="button"
            className={styles.button}
            onClick={decrement}
            disabled={disabled || atMin}
            aria-label="Decrement"
            tabIndex={-1}
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M2 3.5L5 6.5L8 3.5" />
            </svg>
          </button>
        </div>
      </div>
    );
  },
);

NumberField.displayName = 'NumberField';
