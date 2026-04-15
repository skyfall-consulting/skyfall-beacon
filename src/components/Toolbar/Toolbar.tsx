import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../utils/cn';
import styles from './Toolbar.module.css';

export interface ToolbarProps extends HTMLAttributes<HTMLDivElement> {
  /** Size variant — affects padding and child button sizing */
  size?: 'sm' | 'md';
  /** Visual variant */
  variant?: 'default' | 'outlined';
  /** Toolbar content (buttons, groups, dividers) */
  children: ReactNode;
}

export interface ToolbarGroupProps extends HTMLAttributes<HTMLDivElement> {
  /** Group content */
  children: ReactNode;
}

export interface ToolbarDividerProps extends HTMLAttributes<HTMLDivElement> {}

/**
 * Toolbar — horizontal action bar with grouped controls.
 *
 * Use with ToolbarGroup to visually separate related actions
 * and ToolbarDivider for explicit separators.
 *
 * Accessibility:
 * - Uses toolbar ARIA role
 * - Children should be buttons or controls with labels
 */
export const Toolbar = forwardRef<HTMLDivElement, ToolbarProps>(
  ({ size = 'md', variant = 'default', className, children, ...props }, ref) => (
    <div
      ref={ref}
      role="toolbar"
      className={cn(styles.toolbar, styles[size], styles[variant], className)}
      {...props}
    >
      {children}
    </div>
  ),
);

Toolbar.displayName = 'Toolbar';

export const ToolbarGroup = forwardRef<HTMLDivElement, ToolbarGroupProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} role="group" className={cn(styles.group, className)} {...props}>
      {children}
    </div>
  ),
);

ToolbarGroup.displayName = 'ToolbarGroup';

export const ToolbarDivider = forwardRef<HTMLDivElement, ToolbarDividerProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      role="separator"
      aria-orientation="vertical"
      className={cn(styles.divider, className)}
      {...props}
    />
  ),
);

ToolbarDivider.displayName = 'ToolbarDivider';
