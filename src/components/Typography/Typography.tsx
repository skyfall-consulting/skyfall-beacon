import { forwardRef, type HTMLAttributes, type ElementType } from 'react';
import { cn } from '../../utils/cn';
import styles from './Typography.module.css';

export type TypographyVariant =
  | 'display-lg'
  | 'display-md'
  | 'heading-xl'
  | 'heading-lg'
  | 'heading-md'
  | 'heading-sm'
  | 'body-lg'
  | 'body-md'
  | 'body-sm'
  | 'label-lg'
  | 'label-md'
  | 'caption'
  | 'data'
  | 'code';

export type TypographyColor =
  | 'primary'
  | 'secondary'
  | 'muted'
  | 'inverse'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'inherit';

export type TypographyWeight = 'regular' | 'medium' | 'semibold' | 'bold';

export type TypographyAlign = 'left' | 'center' | 'right';

/** Default HTML elements for each variant */
const variantElementMap: Record<TypographyVariant, ElementType> = {
  'display-lg': 'h1',
  'display-md': 'h1',
  'heading-xl': 'h2',
  'heading-lg': 'h2',
  'heading-md': 'h3',
  'heading-sm': 'h4',
  'body-lg': 'p',
  'body-md': 'p',
  'body-sm': 'p',
  'label-lg': 'span',
  'label-md': 'span',
  caption: 'span',
  data: 'span',
  code: 'code',
};

export interface TypographyProps extends HTMLAttributes<HTMLElement> {
  /** Typographic scale variant */
  variant?: TypographyVariant;
  /** Text color */
  color?: TypographyColor;
  /** Font weight override */
  weight?: TypographyWeight;
  /** Text alignment */
  align?: TypographyAlign;
  /** Render as a specific HTML element (overrides the variant default) */
  as?: ElementType;
  /** Truncate with ellipsis */
  truncate?: boolean;
  /** Clamp to N lines */
  lineClamp?: number;
}

/**
 * Typography — text rendering primitive.
 *
 * Maps directly to the Beacon type scale tokens and provides a consistent
 * API for rendering text at any level of the hierarchy.
 *
 * Accessibility:
 * - Defaults to the semantically correct HTML element for each variant
 *   (h1–h4 for headings, p for body, code for code, span for labels)
 * - Use `as` to override when the visual style and semantic level differ
 * - `color="inherit"` defers to the parent color
 */
export const Typography = forwardRef<HTMLElement, TypographyProps>(
  (
    {
      variant = 'body-md',
      color = 'primary',
      weight,
      align,
      as,
      truncate = false,
      lineClamp,
      className,
      style,
      children,
      ...props
    },
    ref,
  ) => {
    const Component = as || variantElementMap[variant];

    return (
      <Component
        ref={ref}
        className={cn(
          styles.typography,
          styles[`variant-${variant}`],
          styles[`color-${color}`],
          weight && styles[`weight-${weight}`],
          align && styles[`align-${align}`],
          truncate && styles.truncate,
          !!lineClamp && styles.lineClamp,
          className,
        )}
        style={{
          ...style,
          ...(lineClamp ? { WebkitLineClamp: lineClamp } : undefined),
        }}
        {...props}
      >
        {children}
      </Component>
    );
  },
);

Typography.displayName = 'Typography';
