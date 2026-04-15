import { forwardRef, type HTMLAttributes, type CSSProperties } from 'react';
import { cn } from '../../utils/cn';
import styles from './Grid.module.css';

export interface GridProps extends HTMLAttributes<HTMLDivElement> {
  /** Number of columns (1-12) or 'auto' for auto-fill */
  columns?: number | 'auto';
  /** Gap between grid items */
  gap?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  /** Minimum item width when columns='auto' */
  minItemWidth?: number;
  /** Align items vertically */
  alignItems?: 'start' | 'center' | 'end' | 'stretch';
}

/**
 * Grid — CSS grid layout primitive.
 *
 * Provides a responsive grid with preset column counts or auto-fill
 * behavior based on minimum item width.
 *
 * Accessibility:
 * - Purely presentational — no ARIA roles needed
 * - Grid layout does not affect reading order for screen readers
 */
export const Grid = forwardRef<HTMLDivElement, GridProps>(
  (
    {
      columns = 'auto',
      gap = 'md',
      minItemWidth = 240,
      alignItems = 'stretch',
      className,
      style,
      children,
      ...props
    },
    ref,
  ) => {
    const gridStyle: CSSProperties = {
      ...style,
      ...(columns === 'auto'
        ? { '--grid-min-item-width': `${minItemWidth}px` } as CSSProperties
        : { '--grid-columns': columns } as CSSProperties),
    };

    return (
      <div
        ref={ref}
        className={cn(
          styles.grid,
          columns === 'auto' ? styles.autoFill : styles.fixed,
          gap !== 'none' && styles[`gap-${gap}`],
          styles[`align-${alignItems}`],
          className,
        )}
        style={gridStyle}
        {...props}
      >
        {children}
      </div>
    );
  },
);

Grid.displayName = 'Grid';
