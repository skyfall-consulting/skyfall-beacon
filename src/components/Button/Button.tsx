import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../utils/cn';
import styles from './Button.module.css';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual variant */
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  /** Size of the button */
  size?: 'sm' | 'md' | 'lg';
  /** Full width */
  fullWidth?: boolean;
  /** Loading state — disables interaction and shows spinner */
  loading?: boolean;
  /** Icon before the label */
  iconLeft?: ReactNode;
  /** Icon after the label */
  iconRight?: ReactNode;
}

/**
 * Button — primary interactive element.
 *
 * Accessibility:
 * - Uses native <button> for keyboard and screen reader support
 * - aria-disabled used during loading to maintain focusability
 * - aria-busy signals loading state to assistive technology
 * - Minimum 44px touch target on md/lg sizes
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      loading = false,
      disabled = false,
      iconLeft,
      iconRight,
      children,
      className,
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        className={cn(
          styles.button,
          styles[variant],
          styles[size],
          fullWidth && styles.fullWidth,
          loading && styles.loading,
          className,
        )}
        disabled={isDisabled}
        aria-disabled={isDisabled || undefined}
        aria-busy={loading || undefined}
        {...props}
      >
        {loading && (
          <span className={styles.spinner} aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="28" strokeDashoffset="8" />
            </svg>
          </span>
        )}
        {iconLeft && <span className={styles.iconLeft} aria-hidden="true">{iconLeft}</span>}
        <span className={styles.label}>{children}</span>
        {iconRight && <span className={styles.iconRight} aria-hidden="true">{iconRight}</span>}
      </button>
    );
  },
);

Button.displayName = 'Button';
