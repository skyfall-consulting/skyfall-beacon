import { useEffect, useRef, type ReactNode } from 'react';
import { cn } from '../../utils/cn';
import styles from './Modal.module.css';

export interface ModalProps {
  /** Additional className */
  className?: string;
  /** Whether the modal is visible */
  open: boolean;
  /** Called when the modal should close */
  onClose: () => void;
  /** Modal title (rendered in header) */
  title: ReactNode;
  /** Max width */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Footer actions */
  footer?: ReactNode;
}

/**
 * Modal / Dialog — overlay dialog for focused interactions.
 *
 * Accessibility:
 * - Uses native <dialog> element for built-in focus trapping and Escape handling
 * - aria-labelledby links to the title
 * - Focus is moved into the dialog on open
 * - Escape key closes the dialog
 * - Scrim click closes the dialog
 * - Healthcare note: for destructive actions (e.g., cancel appointment,
 *   delete record), always include clear confirmation language in the
 *   dialog and use danger-variant buttons
 */
export function Modal({ open, onClose, title, size = 'md', footer, className, children }: ModalProps & { children?: ReactNode }) {
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
      className={cn(styles.dialog, styles[size], className)}
      aria-labelledby="beacon-modal-title"
      onClick={handleBackdropClick}
    >
      <div className={styles.content}>
        <header className={styles.header}>
          <h2 id="beacon-modal-title" className={styles.title}>{title}</h2>
          <button
            className={styles.close}
            onClick={onClose}
            aria-label="Close dialog"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
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
