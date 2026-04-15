import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';
import styles from './Paper.module.css';

export interface PaperProps extends HTMLAttributes<HTMLDivElement> {
  /** Surface background */
  surface?: 'default' | 'subtle' | 'canvas' | 'raised' | 'overlay';
  /** Elevation level (shadow depth) */
  elevation?: 0 | 1 | 2 | 3 | 4;
  /** Border radius preset */
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  /** Whether to render a border */
  bordered?: boolean;
  /** Padding preset */
  padding?: 'none' | 'sm' | 'md' | 'lg';
  /** Render as a different HTML element */
  as?: 'div' | 'section' | 'article' | 'aside' | 'header' | 'footer';
}

/**
 * Paper — the foundational surface primitive.
 *
 * Paper provides a styled surface (background, border, shadow, radius)
 * without any layout opinions. It is the atom from which Card, Modal
 * content areas, Drawer panels, and other surface components compose.
 *
 * Accessibility:
 * - Paper is a visual primitive with no semantic role by default
 * - Use the `as` prop to select the correct semantic element
 * - Add `role` and `aria-label` when the surface represents a landmark
 */
export const Paper = forwardRef<HTMLDivElement, PaperProps>(
  (
    {
      surface = 'default',
      elevation = 0,
      radius = 'md',
      bordered = true,
      padding = 'none',
      as: Component = 'div',
      className,
      children,
      ...props
    },
    ref,
  ) => (
    <Component
      ref={ref as any}
      className={cn(
        styles.paper,
        styles[`surface-${surface}`],
        styles[`elevation-${elevation}`],
        styles[`radius-${radius}`],
        bordered && styles.bordered,
        padding !== 'none' && styles[`pad-${padding}`],
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  ),
);

Paper.displayName = 'Paper';
