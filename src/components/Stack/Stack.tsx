import { forwardRef, type HTMLAttributes, type ElementType } from 'react';
import { cn } from '../../utils/cn';
import styles from './Stack.module.css';

export interface StackProps extends HTMLAttributes<HTMLDivElement> {
  /** Stack direction */
  direction?: 'vertical' | 'horizontal';
  /** Gap between items */
  gap?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Align items on the cross axis */
  align?: 'start' | 'center' | 'end' | 'stretch';
  /** Justify items on the main axis */
  justify?: 'start' | 'center' | 'end' | 'between' | 'around';
  /** Whether items should wrap */
  wrap?: boolean;
  /** Render as a different HTML element */
  as?: ElementType;
}

/**
 * Stack — flex layout primitive for vertical or horizontal spacing.
 *
 * The most common layout component: arranges children with consistent
 * gaps. Defaults to a vertical stack (column).
 *
 * Accessibility:
 * - Purely presentational — no ARIA roles needed
 * - Use semantic HTML via `as` prop when appropriate
 */
export const Stack = forwardRef<HTMLDivElement, StackProps>(
  (
    {
      direction = 'vertical',
      gap = 'md',
      align = 'stretch',
      justify = 'start',
      wrap = false,
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
        styles.stack,
        styles[direction],
        gap !== 'none' && styles[`gap-${gap}`],
        styles[`align-${align}`],
        styles[`justify-${justify}`],
        wrap && styles.wrap,
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  ),
);

Stack.displayName = 'Stack';
