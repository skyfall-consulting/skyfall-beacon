import { type ReactNode } from 'react';
import { cn } from '../../utils/cn';
import styles from './SideNav.module.css';

export interface SideNavItem {
  /** Display label */
  label: string;
  /** Optional URL */
  href?: string;
  /** Optional click handler */
  onClick?: () => void;
  /** Optional icon element */
  icon?: ReactNode;
  /** Whether this item is the active/current page */
  active?: boolean;
  /** Nested child items */
  children?: SideNavItem[];
}

export interface SideNavProps {
  /** Navigation items */
  items: SideNavItem[];
  /** Whether the sidebar is collapsed to icon-only mode */
  collapsed?: boolean;
  /** Callback when collapse state changes */
  onCollapse?: (collapsed: boolean) => void;
  /** Additional className */
  className?: string;
}

function NavItem({ item, collapsed, depth = 0 }: { item: SideNavItem; collapsed?: boolean; depth?: number }) {
  const hasChildren = item.children && item.children.length > 0;

  const content = (
    <>
      {item.icon && (
        <span className={styles.icon} aria-hidden="true">
          {item.icon}
        </span>
      )}
      {!collapsed && <span className={styles.label}>{item.label}</span>}
    </>
  );

  const commonProps = {
    className: cn(
      styles.navItem,
      item.active && styles.active,
      collapsed && styles.iconOnly,
      depth > 0 && styles.nested,
    ),
    ...(item.active ? { 'aria-current': 'page' as const } : {}),
    ...(collapsed ? { title: item.label } : {}),
  };

  return (
    <li>
      {item.href ? (
        <a href={item.href} onClick={item.onClick} {...commonProps}>
          {content}
        </a>
      ) : (
        <button type="button" onClick={item.onClick} {...commonProps}>
          {content}
        </button>
      )}
      {hasChildren && !collapsed && (
        <ul className={styles.subList}>
          {item.children!.map((child, index) => (
            <NavItem key={index} item={child} collapsed={collapsed} depth={depth + 1} />
          ))}
        </ul>
      )}
    </li>
  );
}

/**
 * SideNav — vertical sidebar navigation for dashboard layouts.
 *
 * Accessibility:
 * - Semantic <nav> with <ul>/<li> structure
 * - aria-current="page" on the active item
 * - Collapse toggle button with aria-label
 * - Title attribute on items when collapsed for tooltip-style labels
 * - Nested items rendered as sub-lists for proper hierarchy
 */
export function SideNav({ items, collapsed = false, onCollapse, className }: SideNavProps) {
  return (
    <nav aria-label="Side navigation" className={cn(styles.sideNav, collapsed && styles.collapsed, className)}>
      {onCollapse && (
        <button
          type="button"
          className={styles.collapseToggle}
          onClick={() => onCollapse(!collapsed)}
          aria-label={collapsed ? 'Expand navigation' : 'Collapse navigation'}
        >
          <svg
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
            {collapsed ? (
              <polyline points="8 4 14 10 8 16" />
            ) : (
              <polyline points="12 4 6 10 12 16" />
            )}
          </svg>
        </button>
      )}
      <ul className={styles.list}>
        {items.map((item, index) => (
          <NavItem key={index} item={item} collapsed={collapsed} />
        ))}
      </ul>
    </nav>
  );
}
