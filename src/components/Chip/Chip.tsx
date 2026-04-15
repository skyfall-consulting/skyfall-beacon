import { forwardRef, type HTMLAttributes, type ReactNode, type MouseEvent } from 'react';
import { cn } from '../../utils/cn';
import styles from './Chip.module.css';

export interface ChipProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'onClick'> {
  /** Visual color variant */
  color?: 'neutral' | 'primary' | 'success' | 'warning' | 'error' | 'info';
  /** Size */
  size?: 'sm' | 'md';
  /** Chip style */
  variant?: 'filled' | 'outlined';
  /** Icon or avatar slot (leading) */
  icon?: ReactNode;
  /** Whether the chip is clickable */
  onClick?: (e: MouseEvent<HTMLSpanElement>) => void;
  /** Show a delete/dismiss button */
  onDelete?: (e: MouseEvent<HTMLButtonElement>) => void;
  /** Disabled state */
  disabled?: boolean;
}

const DeleteIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" aria-hidden="true">
    <line x1="4" y1="4" x2="10" y2="10" />
    <line x1="10" y1="4" x2="4" y2="10" />
  </svg>
);

/**
 * Chip — compact interactive element for tags, filters, and selections.
 *
 * Distinct from Badge: Chip is interactive (clickable, deletable) and
 * larger; Badge is a read-only status label.
 *
 * Accessibility:
 * - Clickable chips render with role="button" and tabIndex
 * - Delete button has an accessible aria-label
 * - Disabled state applies aria-disabled
 * - Healthcare note: useful for allergy tags, condition labels,
 *   insurance plan tags, filter selections
 */
export const Chip = forwardRef<HTMLSpanElement, ChipProps>(
  (
    {
      color = 'neutral',
      size = 'md',
      variant = 'filled',
      icon,
      onClick,
      onDelete,
      disabled = false,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const isClickable = !!onClick && !disabled;

    return (
      <span
        ref={ref}
        className={cn(
          styles.chip,
          styles[color],
          styles[size],
          styles[variant],
          isClickable && styles.clickable,
          disabled && styles.disabled,
          className,
        )}
        role={isClickable ? 'button' : undefined}
        tabIndex={isClickable ? 0 : undefined}
        onClick={isClickable ? onClick : undefined}
        onKeyDown={
          isClickable
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onClick?.(e as any);
                }
              }
            : undefined
        }
        aria-disabled={disabled || undefined}
        {...props}
      >
        {icon && <span className={styles.icon} aria-hidden="true">{icon}</span>}
        <span className={styles.label}>{children}</span>
        {onDelete && (
          <button
            type="button"
            className={styles.deleteButton}
            onClick={(e) => {
              e.stopPropagation();
              if (!disabled) onDelete(e);
            }}
            disabled={disabled}
            aria-label={`Remove ${typeof children === 'string' ? children : ''}`}
            tabIndex={-1}
          >
            <DeleteIcon />
          </button>
        )}
      </span>
    );
  },
);

Chip.displayName = 'Chip';
