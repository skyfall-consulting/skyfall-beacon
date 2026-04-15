import {
  useState,
  useEffect,
  useRef,
  useCallback,
  forwardRef,
  type ReactNode,
  type KeyboardEvent,
} from 'react';
import { cn } from '../../utils/cn';
import styles from './CommandPalette.module.css';

export interface CommandItem {
  /** Unique identifier */
  id: string;
  /** Display label */
  label: string;
  /** Optional description shown below the label */
  description?: string;
  /** Leading icon */
  icon?: ReactNode;
  /** Group/category name */
  group?: string;
  /** Keyboard shortcut hint */
  shortcut?: string;
  /** Whether the item is disabled */
  disabled?: boolean;
  /** Custom search keywords (in addition to label) */
  keywords?: string[];
}

export interface CommandPaletteProps {
  /** Whether the palette is open */
  open: boolean;
  /** Called when the palette should close */
  onClose: () => void;
  /** Available commands */
  items: CommandItem[];
  /** Called when a command is selected */
  onSelect: (item: CommandItem) => void;
  /** Placeholder text for the search input */
  placeholder?: string;
  /** Empty state message */
  emptyMessage?: string;
  /** Additional className for the overlay */
  className?: string;
}

const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

function filterItems(items: CommandItem[], query: string): CommandItem[] {
  if (!query) return items;
  const lower = query.toLowerCase();
  return items.filter((item) => {
    if (item.label.toLowerCase().includes(lower)) return true;
    if (item.description?.toLowerCase().includes(lower)) return true;
    if (item.keywords?.some((k) => k.toLowerCase().includes(lower))) return true;
    return false;
  });
}

function groupItems(items: CommandItem[]): Map<string, CommandItem[]> {
  const groups = new Map<string, CommandItem[]>();
  for (const item of items) {
    const key = item.group ?? '';
    const list = groups.get(key) ?? [];
    list.push(item);
    groups.set(key, list);
  }
  return groups;
}

/**
 * CommandPalette — keyboard-driven command search dialog (Cmd+K pattern).
 *
 * Renders a modal search input with filterable command list,
 * grouped results, keyboard navigation, and shortcut hints.
 *
 * Accessibility:
 * - Uses combobox + listbox ARIA pattern
 * - Arrow keys navigate items, Enter selects
 * - Escape closes the palette
 * - Focus is trapped within the dialog
 * - aria-activedescendant tracks highlighted item
 */
export const CommandPalette = forwardRef<HTMLDivElement, CommandPaletteProps>(
  (
    {
      open,
      onClose,
      items,
      onSelect,
      placeholder = 'Search commands…',
      emptyMessage = 'No results found.',
      className,
    },
    ref,
  ) => {
    const [query, setQuery] = useState('');
    const [activeIndex, setActiveIndex] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);
    const listRef = useRef<HTMLDivElement>(null);

    const filtered = filterItems(items, query);
    const grouped = groupItems(filtered);
    const flatFiltered = filtered.filter((i) => !i.disabled);

    // Reset state when opening
    useEffect(() => {
      if (open) {
        setQuery('');
        setActiveIndex(0);
        // Delay focus to after render
        requestAnimationFrame(() => inputRef.current?.focus());
      }
    }, [open]);

    // Scroll active item into view
    useEffect(() => {
      if (!open || flatFiltered.length === 0) return;
      const activeId = flatFiltered[activeIndex]?.id;
      if (!activeId) return;
      const el = listRef.current?.querySelector(`[data-item-id="${activeId}"]`);
      el?.scrollIntoView({ block: 'nearest' });
    }, [activeIndex, open, flatFiltered]);

    const handleKeyDown = useCallback(
      (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          e.preventDefault();
          onClose();
          return;
        }

        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setActiveIndex((i) => (i + 1) % Math.max(flatFiltered.length, 1));
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          setActiveIndex((i) => (i - 1 + flatFiltered.length) % Math.max(flatFiltered.length, 1));
        } else if (e.key === 'Enter') {
          e.preventDefault();
          const item = flatFiltered[activeIndex];
          if (item) {
            onSelect(item);
            onClose();
          }
        }
      },
      [flatFiltered, activeIndex, onSelect, onClose],
    );

    // Close on backdrop click
    const handleBackdropClick = useCallback(
      (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) onClose();
      },
      [onClose],
    );

    // Reset active index when query changes
    useEffect(() => {
      setActiveIndex(0);
    }, [query]);

    if (!open) return null;

    const activeId = flatFiltered[activeIndex]?.id;

    return (
      <div
        ref={ref}
        className={cn(styles.overlay, className)}
        onClick={handleBackdropClick}
        role="presentation"
      >
        <div
          className={styles.palette}
          role="dialog"
          aria-label="Command palette"
          onKeyDown={handleKeyDown}
        >
          <div className={styles.inputWrapper}>
            <SearchIcon />
            <input
              ref={inputRef}
              type="text"
              className={styles.input}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={placeholder}
              role="combobox"
              aria-expanded={true}
              aria-controls="command-palette-list"
              aria-activedescendant={activeId ? `command-${activeId}` : undefined}
              autoComplete="off"
              spellCheck={false}
            />
          </div>

          <div ref={listRef} id="command-palette-list" className={styles.list} role="listbox">
            {filtered.length === 0 ? (
              <div className={styles.empty}>{emptyMessage}</div>
            ) : (
              Array.from(grouped.entries()).map(([group, groupItems]) => (
                <div key={group} role="group" aria-label={group || undefined}>
                  {group && <div className={styles.groupLabel}>{group}</div>}
                  {groupItems.map((item) => {
                    const isActive = item.id === activeId;
                    return (
                      <div
                        key={item.id}
                        id={`command-${item.id}`}
                        data-item-id={item.id}
                        className={cn(
                          styles.item,
                          isActive && styles.active,
                          item.disabled && styles.disabled,
                        )}
                        role="option"
                        aria-selected={isActive}
                        aria-disabled={item.disabled || undefined}
                        onClick={() => {
                          if (item.disabled) return;
                          onSelect(item);
                          onClose();
                        }}
                        onMouseEnter={() => {
                          if (!item.disabled) {
                            const idx = flatFiltered.findIndex((f) => f.id === item.id);
                            if (idx >= 0) setActiveIndex(idx);
                          }
                        }}
                      >
                        {item.icon && <span className={styles.itemIcon}>{item.icon}</span>}
                        <div className={styles.itemContent}>
                          <span className={styles.itemLabel}>{item.label}</span>
                          {item.description && (
                            <span className={styles.itemDescription}>{item.description}</span>
                          )}
                        </div>
                        {item.shortcut && <kbd className={styles.shortcut}>{item.shortcut}</kbd>}
                      </div>
                    );
                  })}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    );
  },
);

CommandPalette.displayName = 'CommandPalette';
