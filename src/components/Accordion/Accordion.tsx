import { useState, useCallback, useRef, useEffect, type ReactNode } from 'react';
import { cn } from '../../utils/cn';
import styles from './Accordion.module.css';

export interface AccordionItem {
  /** Unique identifier */
  id: string;
  /** Header title */
  title: string;
  /** Panel content */
  content: ReactNode;
}

export interface AccordionProps {
  /** Accordion items */
  items: AccordionItem[];
  /** Allow multiple panels to be open simultaneously */
  allowMultiple?: boolean;
  /** IDs of panels open by default */
  defaultOpenIds?: string[];
  /** Additional className */
  className?: string;
}

function AccordionPanel({
  item,
  isOpen,
  onToggle,
}: {
  item: AccordionItem;
  isOpen: boolean;
  onToggle: (id: string) => void;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | undefined>(isOpen ? undefined : 0);

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

  const triggerId = `accordion-trigger-${item.id}`;
  const panelId = `accordion-panel-${item.id}`;

  return (
    <div className={cn(styles.item, isOpen && styles.open)}>
      <h3 className={styles.heading}>
        <button
          type="button"
          id={triggerId}
          className={styles.trigger}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={() => onToggle(item.id)}
        >
          <span className={styles.triggerLabel}>{item.title}</span>
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
            <polyline points="6 8 10 12 14 8" />
          </svg>
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        className={styles.panel}
        style={{ height: height !== undefined ? `${height}px` : 'auto' }}
        hidden={!isOpen && height === 0}
      >
        <div ref={contentRef} className={styles.panelContent}>
          {item.content}
        </div>
      </div>
    </div>
  );
}

/**
 * Accordion — expandable/collapsible content sections.
 *
 * Accessibility:
 * - Button triggers with aria-expanded and aria-controls
 * - Content panels have role="region" and aria-labelledby
 * - Animated expand/collapse with proper height transitions
 * - Supports single or multiple open panels
 */
export function Accordion({ items, allowMultiple = false, defaultOpenIds = [], className }: AccordionProps) {
  const [openIds, setOpenIds] = useState<Set<string>>(new Set(defaultOpenIds));

  const handleToggle = useCallback(
    (id: string) => {
      setOpenIds((prev) => {
        const next = new Set(prev);
        if (next.has(id)) {
          next.delete(id);
        } else {
          if (!allowMultiple) {
            next.clear();
          }
          next.add(id);
        }
        return next;
      });
    },
    [allowMultiple],
  );

  return (
    <div className={cn(styles.accordion, className)}>
      {items.map((item) => (
        <AccordionPanel
          key={item.id}
          item={item}
          isOpen={openIds.has(item.id)}
          onToggle={handleToggle}
        />
      ))}
    </div>
  );
}
