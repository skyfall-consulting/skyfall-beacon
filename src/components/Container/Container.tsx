import { forwardRef, type HTMLAttributes, type ElementType } from 'react';
import { cn } from '../../utils/cn';
import styles from './Container.module.css';

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  /** Max-width preset */
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  /** Horizontal padding */
  padding?: 'none' | 'sm' | 'md' | 'lg';
  /** Center the container horizontally */
  centered?: boolean;
  /** Render as a different HTML element */
  as?: ElementType;
}

/**
 * Container — max-width content wrapper with responsive padding.
 *
 * Provides consistent horizontal padding and a constrained max-width
 * for page-level content sections.
 *
 * Accessibility:
 * - Purely presentational — no ARIA roles needed
 * - Use semantic HTML elements via the `as` prop (e.g., main, section)
 */
export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  (
    {
      maxWidth = 'lg',
      padding = 'md',
      centered = true,
      as: Component = 'div',
      className,
      children,
      ...props
    },
    ref,
  ) => (
    <Component
      ref={ref}
      className={cn(
        styles.container,
        styles[`max-${maxWidth}`],
        padding !== 'none' && styles[`pad-${padding}`],
        centered && styles.centered,
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  ),
);

Container.displayName = 'Container';
