import { useState, useCallback, forwardRef, type HTMLAttributes, type KeyboardEvent } from 'react';
import { cn } from '../../utils/cn';
import styles from './Rating.module.css';

export interface RatingProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Current rating value (0 = no rating) */
  value?: number;
  /** Called when rating changes */
  onChange?: (value: number) => void;
  /** Maximum rating value */
  max?: number;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Whether the rating is read-only */
  readOnly?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Label for accessibility */
  label?: string;
  /** Custom icon renderer — receives filled state */
  renderIcon?: (filled: boolean, index: number) => React.ReactNode;
}

const StarIcon = ({ filled }: { filled: boolean }) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill={filled ? 'currentColor' : 'none'}
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

/**
 * Rating — star-based rating input with keyboard navigation.
 *
 * Supports custom max values, read-only display, and custom icon rendering.
 *
 * Accessibility:
 * - Uses radio group pattern with arrow key navigation
 * - Each star has aria-label with its value
 * - Supports keyboard: ArrowLeft/Right to navigate, Enter/Space to select
 */
export const Rating = forwardRef<HTMLDivElement, RatingProps>(
  (
    {
      value = 0,
      onChange,
      max = 5,
      size = 'md',
      readOnly = false,
      disabled = false,
      label = 'Rating',
      renderIcon,
      className,
      ...props
    },
    ref,
  ) => {
    const [hovered, setHovered] = useState<number | null>(null);
    const interactive = !readOnly && !disabled;

    const handleSelect = useCallback(
      (star: number) => {
        if (!interactive) return;
        // Toggle off if clicking same value
        onChange?.(star === value ? 0 : star);
      },
      [interactive, onChange, value],
    );

    const handleKeyDown = useCallback(
      (e: KeyboardEvent<HTMLDivElement>) => {
        if (!interactive) return;

        let next = value;
        if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
          e.preventDefault();
          next = Math.min(value + 1, max);
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
          e.preventDefault();
          next = Math.max(value - 1, 0);
        }

        if (next !== value) {
          onChange?.(next);
        }
      },
      [interactive, value, max, onChange],
    );

    const displayValue = hovered ?? value;

    return (
      <div
        ref={ref}
        className={cn(
          styles.rating,
          styles[size],
          readOnly && styles.readOnly,
          disabled && styles.disabled,
          className,
        )}
        role="radiogroup"
        aria-label={label}
        tabIndex={interactive ? 0 : undefined}
        onKeyDown={interactive ? handleKeyDown : undefined}
        {...props}
      >
        {Array.from({ length: max }, (_, i) => {
          const starValue = i + 1;
          const filled = starValue <= displayValue;

          return (
            <button
              key={starValue}
              type="button"
              role="radio"
              className={cn(styles.star, filled && styles.filled)}
              aria-checked={starValue === value}
              aria-label={`${starValue} of ${max}`}
              tabIndex={-1}
              disabled={disabled || readOnly}
              onClick={() => handleSelect(starValue)}
              onMouseEnter={() => interactive && setHovered(starValue)}
              onMouseLeave={() => interactive && setHovered(null)}
            >
              {renderIcon ? renderIcon(filled, i) : <StarIcon filled={filled} />}
            </button>
          );
        })}
      </div>
    );
  },
);

Rating.displayName = 'Rating';
