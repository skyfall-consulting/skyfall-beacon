import { type ReactNode } from 'react';
import { cn } from '../../utils/cn';
import styles from './InputGroup.module.css';

export interface InputGroupProps {
  /** Content rendered before the input (e.g., icon, label, currency symbol) */
  startAddon?: ReactNode;
  /** Content rendered after the input (e.g., icon, button, unit label) */
  endAddon?: ReactNode;
  /** Size variant — matches TextField sizes */
  size?: 'sm' | 'md' | 'lg';
  /** Error state */
  error?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Additional className */
  className?: string;
  /** Input element */
  children: ReactNode;
}

/**
 * InputGroup — wrapper that adds prefix/suffix addons to an input.
 *
 * Wraps a TextField (or other input) with leading/trailing elements
 * like icons, currency symbols, units, or action buttons.
 *
 * Accessibility:
 * - Addons are presentational and should not duplicate input labels
 * - Use aria-describedby on the input to associate addon context
 */
export function InputGroup({
  startAddon,
  endAddon,
  size = 'md',
  error = false,
  disabled = false,
  className,
  children,
}: InputGroupProps) {
  return (
    <div
      className={cn(
        styles.group,
        styles[size],
        error && styles.error,
        disabled && styles.disabled,
        className,
      )}
    >
      {startAddon && <span className={styles.addon}>{startAddon}</span>}
      <div className={styles.input}>{children}</div>
      {endAddon && <span className={styles.addon}>{endAddon}</span>}
    </div>
  );
}
