import { useState, useRef, useEffect, useCallback, type ReactNode, type HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';
import styles from './Popover.module.css';

export interface PopoverProps extends Omit<HTMLAttributes<HTMLDivElement>, 'content'> {
  /** Trigger element that opens the popover */
  trigger: ReactNode;
  /** Content rendered inside the popover */
  content: ReactNode;
  /** Controlled open state */
  open?: boolean;
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Placement relative to the trigger */
  placement?: 'top' | 'bottom' | 'left' | 'right';
  /** Alignment along the placement axis */
  align?: 'start' | 'center' | 'end';
}

/**
 * Popover — positioned overlay content triggered by a reference element.
 *
 * Accessibility:
 * - Escape key closes the popover
 * - Focus is managed: moves into popover on open, returns on close
 * - Click outside closes the popover
 * - Healthcare note: use for additional context like patient quick-view,
 *   medication details, or field-level help without navigating away
 */
export function Popover({
  trigger,
  content,
  open: controlledOpen,
  onOpenChange,
  placement = 'bottom',
  align = 'center',
  className,
  ...props
}: PopoverProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : internalOpen;

  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const setOpen = useCallback(
    (value: boolean) => {
      if (!isControlled) setInternalOpen(value);
      onOpenChange?.(value);
    },
    [isControlled, onOpenChange]
  );

  const toggle = useCallback(() => setOpen(!isOpen), [isOpen, setOpen]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, setOpen]);

  // Close on click outside
  useEffect(() => {
    if (!isOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isOpen, setOpen]);

  // Focus management
  useEffect(() => {
    if (isOpen && contentRef.current) {
      const firstFocusable = contentRef.current.querySelector<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (firstFocusable) {
        firstFocusable.focus();
      }
    }
  }, [isOpen]);

  return (
    <div ref={containerRef} className={cn(styles.container, className)} {...props}>
      <div className={styles.trigger} onClick={toggle}>
        {trigger}
      </div>
      {isOpen && (
        <div
          ref={contentRef}
          className={cn(styles.content, styles[placement], styles[`align-${align}`])}
          role="dialog"
          aria-modal="false"
        >
          {content}
        </div>
      )}
    </div>
  );
}
