import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../utils/cn';
import styles from './List.module.css';

/* ---------- List ---------- */

export interface ListProps extends HTMLAttributes<HTMLUListElement> {
  /** Show dividers between items */
  divided?: boolean;
  /** Padding inside list items */
  padding?: 'none' | 'sm' | 'md';
}

/**
 * List — composable list container for displaying groups of items.
 *
 * Accessibility:
 * - Uses semantic <ul>/<li> structure
 * - Interactive items rendered as buttons for keyboard access
 * - Disabled items use aria-disabled
 * - Selected items use aria-selected
 */
export const List = forwardRef<HTMLUListElement, ListProps>(
  ({ divided = false, padding = 'md', className, children, ...props }, ref) => {
    return (
      <ul
        ref={ref}
        className={cn(styles.list, divided && styles.divided, styles[`pad-${padding}`], className)}
        {...props}
      >
        {children}
      </ul>
    );
  },
);
List.displayName = 'List';

/* ---------- ListItem ---------- */

export interface ListItemProps extends Omit<HTMLAttributes<HTMLLIElement>, 'prefix'> {
  /** Click handler — makes the item interactive */
  onClick?: () => void;
  /** Whether this item is selected */
  selected?: boolean;
  /** Whether this item is disabled */
  disabled?: boolean;
  /** Leading element (icon, avatar, etc.) */
  prefix?: ReactNode;
  /** Trailing element (badge, action button, etc.) */
  suffix?: ReactNode;
  /** Secondary description text */
  description?: string;
}

export const ListItem = forwardRef<HTMLLIElement, ListItemProps>(
  ({ onClick, selected, disabled, prefix, suffix, description, className, children, ...props }, ref) => {
    const isInteractive = !!onClick;

    const content = (
      <>
        {prefix && <span className={styles.prefix}>{prefix}</span>}
        <span className={styles.content}>
          <span className={styles.primary}>{children}</span>
          {description && <span className={styles.description}>{description}</span>}
        </span>
        {suffix && <span className={styles.suffix}>{suffix}</span>}
      </>
    );

    return (
      <li
        ref={ref}
        className={cn(styles.item, className)}
        {...props}
      >
        {isInteractive ? (
          <button
            type="button"
            className={cn(styles.interactive, selected && styles.selected, disabled && styles.disabled)}
            onClick={onClick}
            disabled={disabled}
            aria-selected={selected || undefined}
            aria-disabled={disabled || undefined}
          >
            {content}
          </button>
        ) : (
          <div className={cn(styles.static, selected && styles.selected, disabled && styles.disabled)}>
            {content}
          </div>
        )}
      </li>
    );
  },
);
ListItem.displayName = 'ListItem';
