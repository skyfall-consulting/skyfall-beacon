import {
  useState,
  useRef,
  useEffect,
  useCallback,
  type HTMLAttributes,
  type ReactNode,
  type KeyboardEvent,
  type MouseEvent,
} from 'react';
import { cn } from '../../utils/cn';
import styles from './Menu.module.css';

/* ------------------------------------------------------------------ */
/* MenuItem                                                            */
/* ------------------------------------------------------------------ */

export interface MenuItemProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /** Leading icon */
  icon?: ReactNode;
  /** Trailing content (shortcut, badge, etc.) */
  trailing?: ReactNode;
  /** Disabled state */
  disabled?: boolean;
  /** Destructive / danger styling */
  danger?: boolean;
  /** Click handler */
  onClick?: (e: MouseEvent<HTMLDivElement>) => void;
}

export function MenuItem({
  icon,
  trailing,
  disabled = false,
  danger = false,
  onClick,
  className,
  children,
  ...props
}: MenuItemProps) {
  return (
    <div
      role="menuitem"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled || undefined}
      className={cn(
        styles.menuItem,
        danger && styles.danger,
        disabled && styles.itemDisabled,
        className,
      )}
      onClick={disabled ? undefined : onClick}
      onKeyDown={(e) => {
        if (disabled) return;
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.(e as any);
        }
      }}
      {...props}
    >
      {icon && <span className={styles.itemIcon} aria-hidden="true">{icon}</span>}
      <span className={styles.itemLabel}>{children}</span>
      {trailing && <span className={styles.itemTrailing}>{trailing}</span>}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* MenuDivider                                                         */
/* ------------------------------------------------------------------ */

export function MenuDivider() {
  return <div role="separator" className={styles.divider} />;
}

/* ------------------------------------------------------------------ */
/* MenuGroup                                                           */
/* ------------------------------------------------------------------ */

export interface MenuGroupProps {
  /** Group label */
  label: string;
  children: ReactNode;
}

export function MenuGroup({ label, children }: MenuGroupProps) {
  return (
    <div role="group" aria-label={label}>
      <div className={styles.groupLabel}>{label}</div>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Menu                                                                */
/* ------------------------------------------------------------------ */

export interface MenuProps extends HTMLAttributes<HTMLDivElement> {
  /** The trigger element — a single React element */
  trigger: ReactNode;
  /** Horizontal alignment relative to trigger */
  align?: 'start' | 'end';
  /** Menu width */
  width?: number | 'trigger';
}

/**
 * Menu — dropdown action menu surface.
 *
 * Composes MenuItem, MenuDivider, and MenuGroup as children.
 *
 * Accessibility:
 * - role="menu" on the dropdown, role="menuitem" on each item
 * - Arrow-key navigation between items
 * - Escape closes the menu
 * - Focus returns to trigger on close
 * - Click outside closes the menu
 * - Healthcare note: ideal for patient action menus, record options,
 *   context menus on rows
 */
export function Menu({
  trigger,
  align = 'start',
  width,
  className,
  children,
  ...props
}: MenuProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    triggerRef.current?.querySelector<HTMLElement>('[tabindex], button, a')?.focus();
  }, []);

  // Close on outside click
  useEffect(() => {
    if (!open) return;

    const handleClick = (e: Event) => {
      if (
        !menuRef.current?.contains(e.target as Node) &&
        !triggerRef.current?.contains(e.target as Node)
      ) {
        close();
      }
    };

    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open, close]);

  // Focus first item on open
  useEffect(() => {
    if (open) {
      const firstItem = menuRef.current?.querySelector<HTMLElement>('[role="menuitem"]:not([aria-disabled])');
      firstItem?.focus();
    }
  }, [open]);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!open) {
      if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setOpen(true);
      }
      return;
    }

    const items = Array.from(
      menuRef.current?.querySelectorAll<HTMLElement>('[role="menuitem"]:not([aria-disabled])') || [],
    );
    const current = document.activeElement as HTMLElement;
    const idx = items.indexOf(current);

    switch (e.key) {
      case 'ArrowDown': {
        e.preventDefault();
        const next = idx < items.length - 1 ? idx + 1 : 0;
        items[next]?.focus();
        break;
      }
      case 'ArrowUp': {
        e.preventDefault();
        const prev = idx > 0 ? idx - 1 : items.length - 1;
        items[prev]?.focus();
        break;
      }
      case 'Escape':
        e.preventDefault();
        close();
        break;
      case 'Tab':
        close();
        break;
    }
  };

  return (
    <div className={cn(styles.menuContainer, className)} onKeyDown={handleKeyDown} {...props}>
      <div
        ref={triggerRef}
        className={styles.trigger}
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        {trigger}
      </div>

      {open && (
        <div
          ref={menuRef}
          role="menu"
          className={cn(styles.menu, styles[`align-${align}`])}
          style={width ? { width: width === 'trigger' ? undefined : width, minWidth: width === 'trigger' ? '100%' : undefined } : undefined}
        >
          {children}
        </div>
      )}
    </div>
  );
}
