import { type ReactNode } from 'react';
import { cn } from '../../utils/cn';
import styles from './Breadcrumbs.module.css';

export interface BreadcrumbItem {
  /** Display label */
  label: string;
  /** Optional URL for link items */
  href?: string;
  /** Optional click handler */
  onClick?: () => void;
}

export interface BreadcrumbsProps {
  /** Breadcrumb path items */
  items: BreadcrumbItem[];
  /** Separator between items */
  separator?: ReactNode;
  /** Additional className */
  className?: string;
}

/**
 * Breadcrumbs — navigational aid showing the current location within a hierarchy.
 *
 * Accessibility:
 * - Wrapped in <nav> with aria-label="Breadcrumb"
 * - Uses semantic <ol>/<li> list structure
 * - Last item has aria-current="page" to indicate current location
 * - Separator is aria-hidden so screen readers skip it
 */
export function Breadcrumbs({ items, separator = '/', className }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn(styles.nav, className)}>
      <ol className={styles.list}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className={styles.item}>
              {index > 0 && (
                <span className={styles.separator} aria-hidden="true">
                  {separator}
                </span>
              )}
              {isLast ? (
                <span className={styles.current} aria-current="page">
                  {item.label}
                </span>
              ) : item.href ? (
                <a href={item.href} className={styles.link} onClick={item.onClick}>
                  {item.label}
                </a>
              ) : (
                <button
                  type="button"
                  className={styles.link}
                  onClick={item.onClick}
                >
                  {item.label}
                </button>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
