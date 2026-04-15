import { type HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';
import styles from './Divider.module.css';

export interface DividerProps extends HTMLAttributes<HTMLHRElement> {
  /** Spacing above and below */
  spacing?: 'none' | 'sm' | 'md' | 'lg';
}

/**
 * Divider — horizontal rule for visual separation.
 *
 * Accessibility:
 * - Uses semantic <hr> which conveys a thematic break
 * - role="separator" is implicit for <hr>
 */
export function Divider({ spacing = 'md', className, ...props }: DividerProps) {
  return <hr className={cn(styles.divider, styles[spacing], className)} {...props} />;
}
