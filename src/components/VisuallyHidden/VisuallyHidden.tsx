import { type HTMLAttributes } from 'react';
import styles from './VisuallyHidden.module.css';

export interface VisuallyHiddenProps extends HTMLAttributes<HTMLSpanElement> {
  /** Render as a different element */
  as?: 'span' | 'div' | 'label';
}

/**
 * VisuallyHidden — renders content that is hidden visually but accessible
 * to screen readers and other assistive technology.
 *
 * Use for:
 * - Labels for icon-only buttons
 * - Additional context for screen readers
 * - Skip navigation links
 * - Form labels that are visually unnecessary but needed for a11y
 *
 * This uses the standard screen-reader-only CSS technique that keeps
 * content in the document flow for assistive tech while hiding it
 * from sighted users.
 */
export function VisuallyHidden({
  as: Component = 'span',
  children,
  ...props
}: VisuallyHiddenProps) {
  return (
    <Component className={styles.visuallyHidden} {...props}>
      {children}
    </Component>
  );
}
