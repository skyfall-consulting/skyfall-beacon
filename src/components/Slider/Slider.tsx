import { forwardRef, useId, type InputHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';
import styles from './Slider.module.css';

export interface SliderProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type' | 'onChange' | 'value'> {
  /** Current value */
  value?: number;
  /** Change handler */
  onChange?: (value: number) => void;
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Step increment */
  step?: number;
  /** Disabled state */
  disabled?: boolean;
  /** Size variant */
  size?: 'sm' | 'md';
  /** Accessible label text */
  label?: string;
  /** Show current value next to the slider */
  showValue?: boolean;
  /** Additional CSS class */
  className?: string;
}

/**
 * Slider — range input with custom styling.
 *
 * Accessibility:
 * - Uses native input[type="range"] for full keyboard and AT support
 * - Label linked via htmlFor/id
 * - aria-valuemin, aria-valuemax, aria-valuenow communicated natively
 * - showValue provides visual readout of current value
 */
export const Slider = forwardRef<HTMLInputElement, SliderProps>(
  (
    {
      value,
      onChange,
      min = 0,
      max = 100,
      step = 1,
      disabled = false,
      size = 'md',
      label,
      showValue = false,
      className,
      id,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const inputId = id || generatedId;

    // Calculate fill percentage for the track
    const current = value ?? min;
    const percentage = ((current - min) / (max - min)) * 100;

    return (
      <div className={cn(styles.wrapper, styles[size], disabled && styles.disabled, className)}>
        {label && (
          <div className={styles.header}>
            <label htmlFor={inputId} className={styles.label}>
              {label}
            </label>
            {showValue && (
              <span className={styles.value} aria-hidden="true">
                {current}
              </span>
            )}
          </div>
        )}
        {!label && showValue && (
          <span className={styles.value} aria-hidden="true">
            {current}
          </span>
        )}
        <input
          ref={ref}
          id={inputId}
          type="range"
          className={styles.input}
          value={value}
          onChange={(e) => onChange?.(Number(e.target.value))}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          style={{ '--slider-fill': `${percentage}%` } as React.CSSProperties}
          {...props}
        />
      </div>
    );
  },
);

Slider.displayName = 'Slider';
