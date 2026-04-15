import { useState, useRef, useCallback, useEffect, useId, type KeyboardEvent } from 'react';
import { cn } from '../../utils/cn';
import styles from './MultiSelect.module.css';

export interface MultiSelectOption {
  value: string;
  label: string;
}

export interface MultiSelectProps {
  /** Available options */
  options: MultiSelectOption[];
  /** Currently selected values */
  value?: string[];
  /** Change handler — receives updated array of selected values */
  onChange?: (value: string[]) => void;
  /** Placeholder text */
  placeholder?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Error state */
  error?: boolean;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Maximum number of tags visible before showing "+N more" */
  maxDisplayedTags?: number;
  /** Additional CSS class */
  className?: string;
}

/**
 * MultiSelect — multi-value select with tags and dropdown checkboxes.
 *
 * Accessibility:
 * - Uses role="combobox" with aria-expanded
 * - Dropdown uses role="listbox" with role="option" items
 * - Tags are removable via keyboard (Backspace removes last)
 * - Escape closes dropdown, focus remains on control
 */
export function MultiSelect({
  options,
  value = [],
  onChange,
  placeholder = 'Select...',
  disabled = false,
  error = false,
  size = 'md',
  maxDisplayedTags,
  className,
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const listboxId = useId();

  const toggle = useCallback(
    (optionValue: string) => {
      if (!onChange) return;
      const next = value.includes(optionValue)
        ? value.filter((v) => v !== optionValue)
        : [...value, optionValue];
      onChange(next);
    },
    [value, onChange],
  );

  const removeTag = useCallback(
    (optionValue: string) => {
      onChange?.(value.filter((v) => v !== optionValue));
    },
    [value, onChange],
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (disabled) return;

      switch (e.key) {
        case 'Enter':
        case ' ':
          e.preventDefault();
          if (isOpen && focusedIndex >= 0) {
            toggle(options[focusedIndex].value);
          } else {
            setIsOpen(!isOpen);
          }
          break;
        case 'Escape':
          e.preventDefault();
          setIsOpen(false);
          break;
        case 'ArrowDown':
          e.preventDefault();
          if (!isOpen) {
            setIsOpen(true);
            setFocusedIndex(0);
          } else {
            setFocusedIndex((prev) => Math.min(prev + 1, options.length - 1));
          }
          break;
        case 'ArrowUp':
          e.preventDefault();
          setFocusedIndex((prev) => Math.max(prev - 1, 0));
          break;
        case 'Backspace':
          if (value.length > 0) {
            onChange?.(value.slice(0, -1));
          }
          break;
      }
    },
    [disabled, isOpen, focusedIndex, options, value, onChange, toggle],
  );

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isOpen]);

  const selectedLabels = value
    .map((v) => options.find((o) => o.value === v))
    .filter(Boolean) as MultiSelectOption[];

  const displayedTags = maxDisplayedTags
    ? selectedLabels.slice(0, maxDisplayedTags)
    : selectedLabels;
  const hiddenCount = maxDisplayedTags
    ? Math.max(0, selectedLabels.length - maxDisplayedTags)
    : 0;

  return (
    <div ref={wrapperRef} className={cn(styles.wrapper, styles[size], className)}>
      <div
        className={cn(
          styles.control,
          isOpen && styles.open,
          error && styles.error,
          disabled && styles.disabled,
        )}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls={listboxId}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : 0}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
      >
        <div className={styles.tags}>
          {displayedTags.length === 0 && (
            <span className={styles.placeholder}>{placeholder}</span>
          )}
          {displayedTags.map((opt) => (
            <span key={opt.value} className={styles.tag}>
              {opt.label}
              <button
                type="button"
                className={styles.tagRemove}
                onClick={(e) => {
                  e.stopPropagation();
                  removeTag(opt.value);
                }}
                aria-label={`Remove ${opt.label}`}
                tabIndex={-1}
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <path d="M2 2l6 6M8 2l-6 6" />
                </svg>
              </button>
            </span>
          ))}
          {hiddenCount > 0 && (
            <span className={styles.moreTag}>+{hiddenCount} more</span>
          )}
        </div>
        <svg
          className={cn(styles.chevron, isOpen && styles.chevronOpen)}
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <path d="M3 5l4 4 4-4" />
        </svg>
      </div>

      {isOpen && (
        <ul id={listboxId} className={styles.dropdown} role="listbox" aria-multiselectable="true">
          {options.map((opt, i) => {
            const isSelected = value.includes(opt.value);
            const isFocused = i === focusedIndex;
            return (
              <li
                key={opt.value}
                className={cn(styles.option, isFocused && styles.optionFocused)}
                role="option"
                aria-selected={isSelected}
                onClick={() => toggle(opt.value)}
              >
                <span className={cn(styles.checkbox, isSelected && styles.checkboxChecked)} aria-hidden="true">
                  {isSelected && (
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 5l2 2 4-4" />
                    </svg>
                  )}
                </span>
                {opt.label}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
