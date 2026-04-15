import { useState, useRef, type ReactNode } from 'react';
import { cn } from '../../utils/cn';
import styles from './Tooltip.module.css';

export interface TooltipProps {
  /** Tooltip content */
  content: ReactNode;
  /** Trigger element */
  children: ReactNode;
  /** Placement */
  placement?: 'top' | 'bottom';
  /** Delay before showing (ms) */
  delay?: number;
  /** Additional className */
  className?: string;
}

/**
 * Tooltip — supplementary text on hover/focus.
 *
 * Accessibility:
 * - Shows on both hover and keyboard focus
 * - Uses role="tooltip" with aria-describedby linking
 * - Respects reduced motion preferences (no animation)
 * - Healthcare note: never put critical information in tooltips alone.
 *   Use for supplementary context only, since tooltips are easy to miss
 *   and not accessible on touch devices.
 */
export function Tooltip({ content, children, placement = 'top', delay = 200, className }: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const tooltipId = useRef(`tooltip-${Math.random().toString(36).slice(2, 9)}`).current;

  const show = () => {
    timeoutRef.current = setTimeout(() => setVisible(true), delay);
  };

  const hide = () => {
    clearTimeout(timeoutRef.current);
    setVisible(false);
  };

  return (
    <div
      className={cn(styles.wrapper, className)}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      <div aria-describedby={visible ? tooltipId : undefined}>
        {children}
      </div>
      {visible && (
        <div
          id={tooltipId}
          role="tooltip"
          className={cn(styles.tooltip, styles[placement])}
        >
          {content}
        </div>
      )}
    </div>
  );
}
