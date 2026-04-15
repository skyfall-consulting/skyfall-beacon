import { type HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';
import { Paper } from '../Paper/Paper';
import styles from './Card.module.css';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Elevation level */
  elevation?: 'flat' | 'raised';
  /** Padding size */
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

/**
 * Card — surface container for grouping related content.
 *
 * Composes: Paper
 *
 * Card is a constrained Paper preset with two elevation levels and
 * opinionated padding. Use Paper directly when you need full control
 * over surface, elevation, and radius.
 *
 * Accessibility:
 * - Uses semantic HTML; add role="region" + aria-label when card
 *   represents a distinct content section
 * - Border provides separation independent of shadow (not shadow alone)
 */
export function Card({ elevation = 'flat', padding = 'md', className, children, ...props }: CardProps) {
  return (
    <Paper
      surface="default"
      elevation={elevation === 'raised' ? 2 : 0}
      radius="lg"
      bordered
      padding={padding}
      className={cn(elevation === 'raised' && styles.raised, className)}
      {...props}
    >
      {children}
    </Paper>
  );
}
