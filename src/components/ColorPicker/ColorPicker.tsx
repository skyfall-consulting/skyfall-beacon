import { useState, useRef, useEffect, useCallback, forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';
import styles from './ColorPicker.module.css';

export interface ColorPickerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Current color value (hex) */
  value?: string;
  /** Called when color changes */
  onChange?: (color: string) => void;
  /** Predefined color swatches */
  swatches?: string[];
  /** Label */
  label?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Size variant */
  size?: 'sm' | 'md';
}

const defaultSwatches = [
  '#0A2540', '#1A73E8', '#0D9488', '#16A34A', '#EAB308',
  '#F97316', '#EF4444', '#A855F7', '#EC4899', '#6B7280',
  '#374151', '#FFFFFF',
];

/**
 * ColorPicker — color selection input with swatch palette and native picker.
 *
 * Provides a swatch grid for quick selection plus a native `<input type="color">`
 * fallback for custom colors.
 *
 * Accessibility:
 * - Swatch buttons have aria-label with hex value
 * - Selected swatch indicated with aria-pressed
 * - Native color input provides full keyboard + assistive tech support
 */
export const ColorPicker = forwardRef<HTMLDivElement, ColorPickerProps>(
  (
    {
      value = '#0A2540',
      onChange,
      swatches = defaultSwatches,
      label,
      disabled = false,
      size = 'md',
      className,
      ...props
    },
    ref,
  ) => {
    const [currentColor, setCurrentColor] = useState(value);
    const nativeRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      setCurrentColor(value);
    }, [value]);

    const handleChange = useCallback(
      (color: string) => {
        if (disabled) return;
        setCurrentColor(color);
        onChange?.(color);
      },
      [disabled, onChange],
    );

    return (
      <div
        ref={ref}
        className={cn(styles.picker, styles[size], disabled && styles.disabled, className)}
        {...props}
      >
        {label && <span className={styles.label}>{label}</span>}

        <div className={styles.preview}>
          <button
            type="button"
            className={styles.swatch}
            style={{ backgroundColor: currentColor }}
            onClick={() => nativeRef.current?.click()}
            disabled={disabled}
            aria-label={`Selected color: ${currentColor}`}
          />
          <span className={styles.hex}>{currentColor.toUpperCase()}</span>
          <input
            ref={nativeRef}
            type="color"
            className={styles.nativeInput}
            value={currentColor}
            onChange={(e) => handleChange(e.target.value)}
            disabled={disabled}
            tabIndex={-1}
            aria-hidden="true"
          />
        </div>

        {swatches.length > 0 && (
          <div className={styles.swatchGrid} role="listbox" aria-label="Color swatches">
            {swatches.map((color) => (
              <button
                key={color}
                type="button"
                role="option"
                className={cn(
                  styles.swatchOption,
                  currentColor.toLowerCase() === color.toLowerCase() && styles.selected,
                )}
                style={{ backgroundColor: color }}
                onClick={() => handleChange(color)}
                disabled={disabled}
                aria-label={color}
                aria-selected={currentColor.toLowerCase() === color.toLowerCase()}
              />
            ))}
          </div>
        )}
      </div>
    );
  },
);

ColorPicker.displayName = 'ColorPicker';
