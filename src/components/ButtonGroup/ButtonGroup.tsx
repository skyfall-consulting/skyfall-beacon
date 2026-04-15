import { type HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';
import styles from './ButtonGroup.module.css';

export interface ButtonGroupProps extends HTMLAttributes<HTMLDivElement> {
  /** Layout direction */
  orientation?: 'horizontal' | 'vertical';
  /** Size applied to all child buttons */
  size?: 'sm' | 'md' | 'lg';
  /** Whether buttons should share borders (connected style) */
  connected?: boolean;
}

/**
 * ButtonGroup — layout wrapper for grouping related buttons.
 *
 * Renders multiple Button children in a connected or spaced row/column.
 * When connected, adjacent buttons share borders for a toolbar appearance.
 *
 * Accessibility:
 * - Uses role="group" with optional aria-label for grouping context
 * - Individual buttons retain their own keyboard navigation
 */
export function ButtonGroup({
  orientation = 'horizontal',
  size,
  connected = false,
  className,
  children,
  ...props
}: ButtonGroupProps) {
  return (
    <div
      role="group"
      className={cn(
        styles.group,
        styles[orientation],
        connected && styles.connected,
        size && styles[`size-${size}`],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
