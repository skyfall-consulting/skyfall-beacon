import { type HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';
import styles from './Skeleton.module.css';

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  /** Shape variant */
  variant?: 'text' | 'circular' | 'rectangular';
  /** Width (CSS value) */
  width?: string | number;
  /** Height (CSS value) */
  height?: string | number;
  /** Number of text lines (only for text variant) */
  lines?: number;
}

/**
 * Skeleton — placeholder loading indicator with shimmer animation.
 *
 * Accessibility:
 * - aria-hidden="true" since it is purely decorative
 * - Healthcare note: use Skeleton loaders in clinical dashboards to
 *   indicate data is loading, reducing perceived wait time
 */
export function Skeleton({
  variant = 'text',
  width,
  height,
  lines = 1,
  className,
  style,
  ...props
}: SkeletonProps) {
  if (variant === 'text' && lines > 1) {
    return (
      <div className={cn(styles.group, className)} aria-hidden="true" {...props}>
        {Array.from({ length: lines }, (_, i) => (
          <div
            key={i}
            className={cn(styles.skeleton, styles.text)}
            style={{
              width: i === lines - 1 ? '75%' : width ?? '100%',
              height: height ?? undefined,
              ...style,
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(styles.skeleton, styles[variant], className)}
      aria-hidden="true"
      style={{
        width: width ?? (variant === 'circular' ? 40 : '100%'),
        height: height ?? (variant === 'circular' ? 40 : variant === 'rectangular' ? 120 : undefined),
        ...style,
      }}
      {...props}
    />
  );
}
