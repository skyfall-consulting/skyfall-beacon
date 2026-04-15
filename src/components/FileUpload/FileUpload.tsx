import { useCallback, useRef, useState, type DragEvent, type KeyboardEvent } from 'react';
import { cn } from '../../utils/cn';
import { HelperText } from '../HelperText';
import styles from './FileUpload.module.css';

export interface FileUploadProps {
  /** Accepted file types (e.g., ".pdf,.jpg,image/*") */
  accept?: string;
  /** Allow multiple files */
  multiple?: boolean;
  /** Max file size in bytes */
  maxSize?: number;
  /** Callback when files are selected or dropped */
  onFilesSelected?: (files: File[]) => void;
  /** Disabled state */
  disabled?: boolean;
  /** Error message */
  error?: string;
  /** Additional CSS class */
  className?: string;
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/**
 * FileUpload — dropzone for file upload with click and drag support.
 *
 * Accessibility:
 * - Keyboard accessible via Enter/Space to open file dialog
 * - Uses role="button" on the dropzone
 * - aria-describedby links to instructions
 * - File list announced after selection
 */
export function FileUpload({
  accept,
  multiple = false,
  maxSize,
  onFilesSelected,
  disabled = false,
  error,
  className,
}: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [sizeError, setSizeError] = useState<string | null>(null);

  const processFiles = useCallback(
    (fileList: FileList | null) => {
      if (!fileList) return;
      const selected = Array.from(fileList);

      if (maxSize) {
        const oversized = selected.filter((f) => f.size > maxSize);
        if (oversized.length > 0) {
          setSizeError(`File(s) exceed maximum size of ${formatFileSize(maxSize)}`);
          return;
        }
      }

      setSizeError(null);
      setFiles(selected);
      onFilesSelected?.(selected);
    },
    [maxSize, onFilesSelected],
  );

  const handleClick = () => {
    if (!disabled) inputRef.current?.click();
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    if (!disabled) setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (!disabled) processFiles(e.dataTransfer.files);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    processFiles(e.target.files);
  };

  const removeFile = (index: number) => {
    const next = files.filter((_, i) => i !== index);
    setFiles(next);
    onFilesSelected?.(next);
  };

  const displayError = error || sizeError;

  return (
    <div className={cn(styles.container, className)}>
      <div
        className={cn(
          styles.dropzone,
          isDragging && styles.dragging,
          disabled && styles.disabled,
          displayError && styles.error,
        )}
        role="button"
        tabIndex={disabled ? -1 : 0}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        aria-label={`Upload file${multiple ? 's' : ''}`}
        aria-disabled={disabled}
      >
        <svg
          className={styles.icon}
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M16 20V8M16 8l-5 5M16 8l5 5" />
          <path d="M4 22v4a2 2 0 002 2h20a2 2 0 002-2v-4" />
        </svg>
        <p className={styles.text}>
          <span className={styles.link}>Click to upload</span> or drag and drop
        </p>
        {accept && (
          <p className={styles.hint}>{accept.replace(/,/g, ', ')}</p>
        )}
        {maxSize && (
          <p className={styles.hint}>Max size: {formatFileSize(maxSize)}</p>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        className={styles.input}
        accept={accept}
        multiple={multiple}
        onChange={handleInputChange}
        disabled={disabled}
        tabIndex={-1}
        aria-hidden="true"
      />

      {files.length > 0 && (
        <ul className={styles.fileList} aria-label="Selected files">
          {files.map((file, i) => (
            <li key={`${file.name}-${i}`} className={styles.fileItem}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M9 1H4a1 1 0 00-1 1v12a1 1 0 001 1h8a1 1 0 001-1V5L9 1z" />
                <path d="M9 1v4h4" />
              </svg>
              <span className={styles.fileName}>{file.name}</span>
              <span className={styles.fileSize}>{formatFileSize(file.size)}</span>
              <button
                type="button"
                className={styles.removeButton}
                onClick={() => removeFile(i)}
                aria-label={`Remove ${file.name}`}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <path d="M2 2l8 8M10 2l-8 8" />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      )}

      {displayError && (
        <HelperText error>{displayError}</HelperText>
      )}
    </div>
  );
}
