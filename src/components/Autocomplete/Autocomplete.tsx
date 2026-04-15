import { useState, useRef, useCallback, useEffect, useId, type KeyboardEvent } from 'react';
import { cn } from '../../utils/cn';
import styles from './Autocomplete.module.css';

export interface AutocompleteOption {
  value: string;
  label: string;
}

export interface AutocompleteProps {
  /** Available options */
  options: AutocompleteOption[];
  /** Selected value */
  value?: string;
  /** Change handler — receives the selected value */
  onChange?: (value: string) => void;
  /** Callback when the text input changes */
  onInputChange?: (inputValue: string) => void;
  /** Placeholder text */
  placeholder?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Error state */
  error?: boolean;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Show a loading spinner in the dropdown */
  loading?: boolean;
  /** Text shown when no results match */
  noResultsText?: string;
  /** Additional CSS class */
  className?: string;
}

/**
 * Autocomplete — combobox input with filtered suggestions dropdown.
 *
 * Accessibility:
 * - role="combobox" on input with aria-expanded, aria-controls, aria-activedescendant
 * - Dropdown uses role="listbox" with role="option" items
 * - Arrow keys navigate options, Enter selects, Escape closes
 * - Full ARIA combobox pattern per WAI-ARIA 1.2
 */
export function Autocomplete({
  options,
  value,
  onChange,
  onInputChange,
  placeholder = 'Search...',
  disabled = false,
  error = false,
  size = 'md',
  loading = false,
  noResultsText = 'No results found',
  className,
}: AutocompleteProps) {
  const selectedLabel = options.find((o) => o.value === value)?.label ?? '';
  const [inputValue, setInputValue] = useState(selectedLabel);
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listboxId = useId();

  // Sync input with external value changes
  useEffect(() => {
    const label = options.find((o) => o.value === value)?.label ?? '';
    setInputValue(label);
  }, [value, options]);

  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(inputValue.toLowerCase()),
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      setInputValue(val);
      setIsOpen(true);
      setFocusedIndex(-1);
      onInputChange?.(val);
    },
    [onInputChange],
  );

  const selectOption = useCallback(
    (opt: AutocompleteOption) => {
      setInputValue(opt.label);
      onChange?.(opt.value);
      setIsOpen(false);
      setFocusedIndex(-1);
      inputRef.current?.focus();
    },
    [onChange],
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          if (!isOpen) {
            setIsOpen(true);
            setFocusedIndex(0);
          } else {
            setFocusedIndex((prev) => Math.min(prev + 1, filteredOptions.length - 1));
          }
          break;
        case 'ArrowUp':
          e.preventDefault();
          setFocusedIndex((prev) => Math.max(prev - 1, 0));
          break;
        case 'Enter':
          e.preventDefault();
          if (isOpen && focusedIndex >= 0 && filteredOptions[focusedIndex]) {
            selectOption(filteredOptions[focusedIndex]);
          }
          break;
        case 'Escape':
          e.preventDefault();
          setIsOpen(false);
          setFocusedIndex(-1);
          break;
      }
    },
    [isOpen, focusedIndex, filteredOptions, selectOption],
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

  const activeDescendant =
    focusedIndex >= 0 && filteredOptions[focusedIndex]
      ? `${listboxId}-option-${focusedIndex}`
      : undefined;

  return (
    <div ref={wrapperRef} className={cn(styles.wrapper, styles[size], className)}>
      <input
        ref={inputRef}
        type="text"
        className={cn(styles.input, error && styles.error)}
        value={inputValue}
        onChange={handleInputChange}
        onFocus={() => setIsOpen(true)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls={listboxId}
        aria-activedescendant={activeDescendant}
        aria-autocomplete="list"
        aria-invalid={error || undefined}
        autoComplete="off"
      />

      {isOpen && (
        <ul id={listboxId} className={styles.dropdown} role="listbox">
          {loading && (
            <li className={styles.message} aria-live="polite">Loading...</li>
          )}
          {!loading && filteredOptions.length === 0 && (
            <li className={styles.message}>{noResultsText}</li>
          )}
          {!loading &&
            filteredOptions.map((opt, i) => (
              <li
                key={opt.value}
                id={`${listboxId}-option-${i}`}
                className={cn(
                  styles.option,
                  i === focusedIndex && styles.optionFocused,
                  opt.value === value && styles.optionSelected,
                )}
                role="option"
                aria-selected={opt.value === value}
                onClick={() => selectOption(opt)}
              >
                {opt.label}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}
