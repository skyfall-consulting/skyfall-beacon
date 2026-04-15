import { useEffect, type HTMLAttributes, type MouseEvent } from 'react';
import { cn } from '../../utils/cn';
import styles from './Backdrop.module.css';

export interface BackdropProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /** Whether the backdrop is visible */
  open: boolean;
  /** Called when the backdrop is clicked */
  onClick?: (e: MouseEvent<HTMLDivElement>) => void;
  /** Whether clicking the backdrop should be ignored (e.g. mandatory dialog) */
  disableClick?: boolean;
  /** Whether to lock body scroll while open */
  lockScroll?: boolean;
  /** Visual intensity */
  variant?: 'default' | 'light' | 'opaque';
}

/**
 * Backdrop — fullscreen overlay primitive.
 *
 * Backdrop provides the scrim layer behind Modal, Drawer, and Dialog.
 * It handles body scroll locking, click-to-dismiss, and fade animation.
 *
 * Accessibility:
 * - aria-hidden="true" — the backdrop itself is not interactive content
 * - Focus management is the responsibility of the surface component (Modal, Drawer)
 * - Body scroll lock prevents background content from scrolling under the overlay
 */
export function Backdrop({
  open,
  onClick,
  disableClick = false,
  lockScroll = true,
  variant = 'default',
  className,
  children,
  ...props
}: BackdropProps) {
  useEffect(() => {
    if (!lockScroll) return;

    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open, lockScroll]);

  if (!open) return null;

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    if (disableClick) return;
    if (e.target === e.currentTarget) {
      onClick?.(e);
    }
  };

  return (
    <div
      className={cn(styles.backdrop, styles[variant], className)}
      aria-hidden="true"
      onClick={handleClick}
      {...props}
    >
      {children}
    </div>
  );
}
