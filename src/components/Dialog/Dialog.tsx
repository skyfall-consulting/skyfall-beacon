import { useEffect, useRef, type ReactNode } from 'react';
import { cn } from '../../utils/cn';
import styles from './Dialog.module.css';

export interface DialogProps {
  /** Whether the dialog is open */
  open: boolean;
  /** Called when the user confirms */
  onConfirm: () => void;
  /** Called when the user cancels */
  onCancel: () => void;
  /** Dialog title */
  title: string;
  /** Message or content */
  message: string | ReactNode;
  /** Confirm button label */
  confirmLabel?: string;
  /** Cancel button label */
  cancelLabel?: string;
  /** Visual variant */
  variant?: 'default' | 'danger';
  /** Show loading state on confirm button */
  loading?: boolean;
  /** Additional class name */
  className?: string;
}

/**
 * Dialog — confirmation dialog built on native <dialog>.
 *
 * Accessibility:
 * - Uses native <dialog> for built-in focus trapping and Escape handling
 * - aria-labelledby links to the title
 * - aria-describedby links to the message
 * - Focus moves to cancel button on open (safe default)
 * - Escape key closes the dialog
 * - Backdrop click cancels
 */
export function Dialog({
  open,
  onConfirm,
  onCancel,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  variant = 'default',
  loading = false,
  className,
}: DialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const cancelRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
      cancelRef.current?.focus();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => onCancel();
    dialog.addEventListener('close', handleClose);
    return () => dialog.removeEventListener('close', handleClose);
  }, [onCancel]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) {
      onCancel();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      className={cn(styles.dialog, className)}
      aria-labelledby="beacon-dialog-title"
      aria-describedby="beacon-dialog-message"
      onClick={handleBackdropClick}
    >
      <div className={styles.content}>
        {variant === 'danger' && (
          <div className={styles.dangerIcon} aria-hidden="true">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0a12 12 0 110 24 12 12 0 010-24zm0 15a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5zm0-9a1 1 0 00-1 1v5.5a1 1 0 102 0V7a1 1 0 00-1-1z" />
            </svg>
          </div>
        )}
        <h2 id="beacon-dialog-title" className={styles.title}>{title}</h2>
        <div id="beacon-dialog-message" className={styles.message}>
          {typeof message === 'string' ? <p>{message}</p> : message}
        </div>
        <div className={styles.actions}>
          <button
            ref={cancelRef}
            className={styles.cancelButton}
            onClick={onCancel}
            type="button"
            disabled={loading}
          >
            {cancelLabel}
          </button>
          <button
            className={cn(styles.confirmButton, styles[variant])}
            onClick={onConfirm}
            type="button"
            disabled={loading}
            aria-busy={loading}
          >
            {loading ? 'Loading...' : confirmLabel}
          </button>
        </div>
      </div>
    </dialog>
  );
}
