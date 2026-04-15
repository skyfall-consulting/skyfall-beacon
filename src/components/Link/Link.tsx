import { forwardRef, type AnchorHTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../utils/cn';
import styles from './Link.module.css';

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Visual variant */
  variant?: 'default' | 'subtle' | 'standalone';
  /** Color */
  color?: 'primary' | 'secondary' | 'inherit';
  /** Whether to show an external indicator */
  external?: boolean;
  /** Icon slot (leading) */
  startIcon?: ReactNode;
  /** Disabled state (prevents navigation) */
  disabled?: boolean;
}

const ExternalIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ marginLeft: 2, flexShrink: 0 }}>
    <path d="M9 3L3 9" />
    <path d="M4 3h5v5" />
  </svg>
);

/**
 * Link — styled anchor primitive for navigation.
 *
 * Variants:
 * - `default` — underlined inline link
 * - `subtle` — underline on hover only
 * - `standalone` — no underline, bolder weight, for navigation items
 *
 * Accessibility:
 * - Uses native <a> element for full keyboard + screen reader support
 * - External links get target="_blank" with rel="noopener noreferrer"
 * - aria-disabled prevents interaction without removing from tab order
 */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      variant = 'default',
      color = 'primary',
      external = false,
      startIcon,
      disabled = false,
      className,
      children,
      ...props
    },
    ref,
  ) => (
    <a
      ref={ref}
      className={cn(
        styles.link,
        styles[variant],
        styles[`color-${color}`],
        disabled && styles.disabled,
        className,
      )}
      aria-disabled={disabled || undefined}
      tabIndex={disabled ? -1 : undefined}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...props}
    >
      {startIcon && <span className={styles.startIcon} aria-hidden="true">{startIcon}</span>}
      {children}
      {external && <ExternalIcon />}
    </a>
  ),
);

Link.displayName = 'Link';
