import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';
import styles from './SearchField.module.css';

export interface SearchFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /** Size of the search control */
  size?: 'sm' | 'md' | 'lg';
  /** Error state */
  error?: boolean;
  /** Full width */
  fullWidth?: boolean;
  /** Callback when clear button is clicked */
  onClear?: () => void;
  /** Show the clear button when input has a value */
  showClearButton?: boolean;
}

/**
 * SearchField — search input with magnifying glass icon and optional clear button.
 *
 * Accessibility:
 * - Uses role="searchbox" for semantic search intent
 * - Clear button has aria-label for screen readers
 * - Search icon is decorative (aria-hidden)
 */
export const SearchField = forwardRef<HTMLInputElement, SearchFieldProps>(
  (
    {
      size = 'md',
      error = false,
      fullWidth = false,
      onClear,
      showClearButton = true,
      className,
      value,
      defaultValue,
      ...props
    },
    ref,
  ) => {
    const hasValue = Boolean(value || defaultValue);

    return (
      <div className={cn(styles.wrapper, styles[size], fullWidth && styles.fullWidth, className)}>
        <svg
          className={styles.searchIcon}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="6.5" cy="6.5" r="5.5" />
          <path d="M11 11l4 4" />
        </svg>
        <input
          ref={ref}
          type="search"
          role="searchbox"
          className={cn(styles.input, error && styles.error)}
          value={value}
          defaultValue={defaultValue}
          aria-invalid={error || undefined}
          {...props}
        />
        {showClearButton && hasValue && onClear && (
          <button
            type="button"
            className={styles.clearButton}
            onClick={onClear}
            aria-label="Clear search"
            tabIndex={-1}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M3 3l8 8M11 3l-8 8" />
            </svg>
          </button>
        )}
      </div>
    );
  },
);

SearchField.displayName = 'SearchField';
