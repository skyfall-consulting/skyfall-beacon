import { type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../utils/cn';
import styles from './Timeline.module.css';

export type TimelineItemVariant = 'default' | 'success' | 'warning' | 'error' | 'info';

export interface TimelineItem {
  /** Unique identifier */
  id: string;
  /** Event title */
  title: string;
  /** Optional description */
  description?: string;
  /** Timestamp display string */
  timestamp: string;
  /** Optional icon to replace the default dot */
  icon?: ReactNode;
  /** Visual variant */
  variant?: TimelineItemVariant;
}

export interface TimelineProps extends HTMLAttributes<HTMLOListElement> {
  /** Timeline items in chronological order */
  items: TimelineItem[];
}

/**
 * Timeline — vertical timeline for displaying sequential events.
 *
 * Accessibility:
 * - Uses semantic <ol> for ordered event sequence
 * - Each event is an <li> for proper list semantics
 * - Icons are decorative (aria-hidden)
 */
export function Timeline({ items, className, ...props }: TimelineProps) {
  return (
    <ol className={cn(styles.timeline, className)} {...props}>
      {items.map((item) => (
        <li
          key={item.id}
          className={cn(styles.item, styles[item.variant ?? 'default'])}
        >
          <div className={styles.indicator} aria-hidden="true">
            {item.icon ? (
              <span className={styles.icon}>{item.icon}</span>
            ) : (
              <span className={styles.dot} />
            )}
            <span className={styles.line} />
          </div>
          <div className={styles.content}>
            <p className={styles.title}>{item.title}</p>
            {item.description && (
              <p className={styles.description}>{item.description}</p>
            )}
            <time className={styles.timestamp}>{item.timestamp}</time>
          </div>
        </li>
      ))}
    </ol>
  );
}
