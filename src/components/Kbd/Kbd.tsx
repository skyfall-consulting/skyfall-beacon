import { type HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';
import styles from './Kbd.module.css';

export interface KbdProps extends HTMLAttributes<HTMLElement> {
  /** Size variant */
  size?: 'sm' | 'md';
}

/**
 * Kbd — keyboard shortcut / key indicator.
 *
 * Renders an inline `<kbd>` element styled to look like a physical key.
 * Use to display keyboard shortcuts in menus, tooltips, and documentation.
 *
 * Accessibility:
 * - Uses semantic <kbd> element for screen readers
 * - Screen readers will announce the content as keyboard input
 */
export function Kbd({
  size = 'md',
  className,
  children,
  ...props
}: KbdProps) {
  return (
    <kbd className={cn(styles.kbd, styles[size], className)} {...props}>
      {children}
    </kbd>
  );
}
