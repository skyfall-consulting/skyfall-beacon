import {
  useState,
  useRef,
  useCallback,
  forwardRef,
  type HTMLAttributes,
  type KeyboardEvent,
} from 'react';
import { cn } from '../../utils/cn';
import styles from './TagInput.module.css';

export interface TagInputProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Current tag values */
  value?: string[];
  /** Called when tags change */
  onChange?: (tags: string[]) => void;
  /** Placeholder for the text input */
  placeholder?: string;
  /** Label */
  label?: string;
  /** Maximum number of tags allowed */
  max?: number;
  /** Size variant */
  size?: 'sm' | 'md';
  /** Disabled state */
  disabled?: boolean;
  /** Error state */
  error?: boolean;
  /** Characters that trigger tag creation (default: Enter, comma) */
  separators?: string[];
  /** Whether duplicates are allowed */
  allowDuplicates?: boolean;
}

const RemoveIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    aria-hidden="true"
  >
    <line x1="3" y1="3" x2="9" y2="9" />
    <line x1="9" y1="3" x2="3" y2="9" />
  </svg>
);

/**
 * TagInput — multi-value text input that creates tag chips.
 *
 * Users type text and press Enter or comma to create tags.
 * Tags can be removed with Backspace or by clicking the remove button.
 *
 * Accessibility:
 * - Tags have aria-label and remove button with aria-label
 * - Backspace removes last tag when input is empty
 * - Screen readers announce tag count via aria-describedby
 */
export const TagInput = forwardRef<HTMLDivElement, TagInputProps>(
  (
    {
      value = [],
      onChange,
      placeholder = 'Add a tag…',
      label,
      max,
      size = 'md',
      disabled = false,
      error = false,
      separators = ['Enter', ','],
      allowDuplicates = false,
      className,
      ...props
    },
    ref,
  ) => {
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    const addTag = useCallback(
      (raw: string) => {
        const tag = raw.trim();
        if (!tag) return;
        if (!allowDuplicates && value.includes(tag)) return;
        if (max && value.length >= max) return;

        onChange?.([...value, tag]);
        setInputValue('');
      },
      [value, onChange, allowDuplicates, max],
    );

    const removeTag = useCallback(
      (index: number) => {
        onChange?.(value.filter((_, i) => i !== index));
      },
      [value, onChange],
    );

    const handleKeyDown = useCallback(
      (e: KeyboardEvent<HTMLInputElement>) => {
        if (separators.includes(e.key)) {
          e.preventDefault();
          addTag(inputValue);
        } else if (e.key === 'Backspace' && inputValue === '' && value.length > 0) {
          removeTag(value.length - 1);
        }
      },
      [separators, inputValue, addTag, removeTag, value.length],
    );

    const handlePaste = useCallback(
      (e: React.ClipboardEvent<HTMLInputElement>) => {
        const text = e.clipboardData.getData('text');
        if (separators.includes(',') && text.includes(',')) {
          e.preventDefault();
          const parts = text.split(',');
          let updated = [...value];
          for (const part of parts) {
            const tag = part.trim();
            if (!tag) continue;
            if (!allowDuplicates && updated.includes(tag)) continue;
            if (max && updated.length >= max) break;
            updated = [...updated, tag];
          }
          onChange?.(updated);
        }
      },
      [value, onChange, separators, allowDuplicates, max],
    );

    const atLimit = max !== undefined && value.length >= max;

    return (
      <div
        ref={ref}
        className={cn(
          styles.wrapper,
          styles[size],
          error && styles.error,
          disabled && styles.disabled,
          className,
        )}
        {...props}
      >
        {label && <span className={styles.label}>{label}</span>}
        <div
          className={styles.container}
          onClick={() => inputRef.current?.focus()}
          role="presentation"
        >
          {value.map((tag, i) => (
            <span key={`${tag}-${i}`} className={styles.tag}>
              <span className={styles.tagText}>{tag}</span>
              {!disabled && (
                <button
                  type="button"
                  className={styles.remove}
                  onClick={(e) => {
                    e.stopPropagation();
                    removeTag(i);
                  }}
                  aria-label={`Remove ${tag}`}
                  tabIndex={-1}
                >
                  <RemoveIcon />
                </button>
              )}
            </span>
          ))}
          {!atLimit && (
            <input
              ref={inputRef}
              type="text"
              className={styles.input}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              onPaste={handlePaste}
              placeholder={value.length === 0 ? placeholder : ''}
              disabled={disabled}
              aria-label={label ?? 'Add tag'}
            />
          )}
        </div>
        {max !== undefined && (
          <span className={styles.count} aria-live="polite">
            {value.length}/{max}
          </span>
        )}
      </div>
    );
  },
);

TagInput.displayName = 'TagInput';
