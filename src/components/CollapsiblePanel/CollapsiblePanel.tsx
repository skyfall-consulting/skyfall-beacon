import { useState, useRef, useEffect, type ReactNode } from 'react';
import { cn } from '../../utils/cn';
import styles from './CollapsiblePanel.module.css';

export interface CollapsiblePanelProps {
  /** Panel title */
  title: string;
  /** Whether panel is open by default (uncontrolled) */
  defaultOpen?: boolean;
  /** Controlled open state */
  open?: boolean;
  /** Callback when open state changes */
  onToggle?: (open: boolean) => void;
  /** Panel content */
  children: ReactNode;
  /** Additional className */
  className?: string;
}

/**
 * CollapsiblePanel — a single collapsible section with animated expand/collapse.
 *
 * Accessibility:
 * - Button trigger with aria-expanded
 * - Content region with aria-labelledby linking to the trigger
 * - Chevron icon rotates on expand/collapse
 * - Supports both controlled and uncontrolled modes
 */
export function CollapsiblePanel({
  title,
  defaultOpen = false,
  open: controlledOpen,
  onToggle,
  children,
  className,
}: CollapsiblePanelProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;

  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | undefined>(isOpen ? undefined : 0);

  const panelId = useRef(`collapsible-panel-${Math.random().toString(36).slice(2, 9)}`).current;
  const triggerId = `${panelId}-trigger`;

  useEffect(() => {
    if (!contentRef.current) return;
    if (isOpen) {
      setHeight(contentRef.current.scrollHeight);
      const timer = setTimeout(() => setHeight(undefined), 200);
      return () => clearTimeout(timer);
    } else {
      setHeight(contentRef.current.scrollHeight);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setHeight(0));
      });
    }
  }, [isOpen]);

  const handleToggle = () => {
    const next = !isOpen;
    if (controlledOpen === undefined) {
      setInternalOpen(next);
    }
    onToggle?.(next);
  };

  return (
    <div className={cn(styles.panel, isOpen && styles.open, className)}>
      <button
        type="button"
        id={triggerId}
        className={styles.trigger}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={handleToggle}
      >
        <svg
          className={styles.chevron}
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="8 4 14 10 8 16" />
        </svg>
        <span className={styles.title}>{title}</span>
      </button>
      <div
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        className={styles.content}
        style={{ height: height !== undefined ? `${height}px` : 'auto' }}
        hidden={!isOpen && height === 0}
      >
        <div ref={contentRef} className={styles.contentInner}>
          {children}
        </div>
      </div>
    </div>
  );
}
