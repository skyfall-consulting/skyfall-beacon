import { useEffect, useRef, type ReactNode } from 'react';
import { cn } from '../../utils/cn';
import styles from './Drawer.module.css';

export interface DrawerProps {
  /** Additional className */
  className?: string;
  /** Whether the drawer is visible */
  open: boolean;
  /** Called when the drawer should close */
  onClose: () => void;
  /** Drawer title */
  title: ReactNode;
  /** Width preset */
  size?: 'sm' | 'md' | 'lg';
  /** Which side the drawer slides from */
  position?: 'left' | 'right';
  /** Footer actions */
  footer?: ReactNode;
  /** Drawer body content */
  children?: ReactNode;
}

/**
 * Drawer — side panel overlay for detail views and forms.
 *
 * Accessibility:
 * - Uses native <dialog> element for focus trapping
 * - Escape key closes the drawer
 * - aria-labelledby links to the title
 * - Scrim click closes the drawer
 * - Healthcare note: use drawers for patient detail views, order entry,
 *   and contextual forms that don't require full-page navigation
 */
export function Drawer({
  open,
  onClose,
  title,
  size = 'md',
  position = 'right',
  footer,
  className,
  children,
}: DrawerProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => onClose();
    dialog.addEventListener('close', handleClose);
    return () => dialog.removeEventListener('close', handleClose);
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) {
      onClose();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      className={cn(styles.dialog, styles[position], styles[size], className)}
      aria-labelledby="beacon-drawer-title"
      onClick={handleBackdropClick}
    >
      <div className={styles.panel}>
        <header className={styles.header}>
          <h2 id="beacon-drawer-title" className={styles.title}>{title}</h2>
          <button
            className={styles.close}
            onClick={onClose}
            aria-label="Close drawer"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" aria-hidden="true">
              <line x1="5" y1="5" x2="15" y2="15" />
              <line x1="15" y1="5" x2="5" y2="15" />
            </svg>
          </button>
        </header>
        <div className={styles.body}>{children}</div>
        {footer && <footer className={styles.footer}>{footer}</footer>}
      </div>
    </dialog>
  );
}
