import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../utils/cn';
import styles from './IconButton.module.css';

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Accessible label (required — icon-only buttons need text for screen readers) */
  'aria-label': string;
  /** The icon element */
  icon: ReactNode;
  /** Visual variant */
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  /** Size */
  size?: 'sm' | 'md' | 'lg';
}

/**
 * IconButton — icon-only interactive button.
 *
 * Accessibility:
 * - aria-label is required to provide screen reader context
 * - Meets 44px minimum touch target at md/lg sizes
 */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, variant = 'ghost', size = 'md', className, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(styles.iconButton, styles[variant], styles[size], className)}
      {...props}
    >
      <span aria-hidden="true">{icon}</span>
    </button>
  ),
);

IconButton.displayName = 'IconButton';
