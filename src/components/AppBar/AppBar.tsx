import { type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../utils/cn';
import styles from './AppBar.module.css';

export interface AppBarProps extends HTMLAttributes<HTMLElement> {
  /** Logo or brand element */
  logo?: ReactNode;
  /** Navigation items (center/left area) */
  children?: ReactNode;
  /** Action elements on the right (profile, notifications, etc.) */
  actions?: ReactNode;
}

/**
 * AppBar — horizontal top navigation bar for application headers.
 *
 * Accessibility:
 * - Uses <header> with <nav> for semantic structure
 * - Navigation items should be provided as links or buttons
 * - Fixed height with clean horizontal layout
 */
export function AppBar({ logo, children, actions, className, ...props }: AppBarProps) {
  return (
    <header className={cn(styles.appBar, className)} {...props}>
      <div className={styles.inner}>
        {logo && <div className={styles.logo}>{logo}</div>}
        {children && (
          <nav aria-label="Main navigation" className={styles.nav}>
            {children}
          </nav>
        )}
        {actions && <div className={styles.actions}>{actions}</div>}
      </div>
    </header>
  );
}
