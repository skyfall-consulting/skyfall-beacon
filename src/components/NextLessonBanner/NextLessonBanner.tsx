import { type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../utils/cn';
import { Typography } from '../Typography/Typography';
import { Button } from '../Button/Button';
import styles from './NextLessonBanner.module.css';

export type NextLessonTone = 'momentum' | 'milestone' | 'gentle' | 'celebration';

export interface NextLessonBannerProps extends HTMLAttributes<HTMLDivElement> {
  /** Headline, e.g. "Pick up where you left off" */
  headline: string;
  /** Lesson or module title to surface */
  lessonTitle: string;
  /** Optional supporting context, e.g. "Module 3 · 12 min remaining" */
  context?: string;
  /** Banner tone — controls accent and iconography */
  tone?: NextLessonTone;
  /** Primary CTA label, e.g. "Continue lesson" */
  ctaLabel?: string;
  /** Click handler for the primary CTA */
  onCta?: () => void;
  /** Custom illustration / icon slot */
  illustration?: ReactNode;
}

const toneIcon: Record<NextLessonTone, ReactNode> = {
  momentum: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M5 3l14 9-14 9V3z" />
    </svg>
  ),
  milestone: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7l3-7z" />
    </svg>
  ),
  gentle: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 3a9 9 0 100 18 9 9 0 000-18zm-1 5h2v5h-2zm0 7h2v2h-2z" />
    </svg>
  ),
  celebration: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M3 21l5-14 8 8-13 6zm17-9l1-3 3-1-3-1-1-3-1 3-3 1 3 1 1 3z" />
    </svg>
  ),
};

/**
 * NextLessonBanner — guided-growth banner pointing the learner to the
 * next meaningful step (continue lesson, hit milestone, gentle re-engage,
 * celebrate completion).
 *
 * Composes: Typography, Button
 *
 * Beacon learning surface — embodies the "guided growth, visible progress"
 * principle. Use at the top of a student dashboard or course page.
 *
 * Accessibility:
 * - role="region" with aria-label for screen readers
 * - CTA is a real button with proper focus handling
 */
export function NextLessonBanner({
  headline,
  lessonTitle,
  context,
  tone = 'momentum',
  ctaLabel = 'Continue',
  onCta,
  illustration,
  className,
  ...props
}: NextLessonBannerProps) {
  return (
    <div
      role="region"
      aria-label={headline}
      className={cn(styles.banner, styles[tone], className)}
      {...props}
    >
      <div className={styles.inner}>
        <span className={styles.icon} aria-hidden="true">
          {illustration ?? toneIcon[tone]}
        </span>
        <div className={styles.content}>
          <Typography variant="caption" weight="semibold" as="span" className={styles.eyebrow}>
            {headline}
          </Typography>
          <Typography variant="heading-sm" as="h3" className={styles.title}>
            {lessonTitle}
          </Typography>
          {context && (
            <Typography variant="body-sm" color="inherit" as="p" className={styles.context}>
              {context}
            </Typography>
          )}
        </div>
        {onCta && (
          <div className={styles.action}>
            <Button variant="primary" onClick={onCta}>{ctaLabel}</Button>
          </div>
        )}
      </div>
    </div>
  );
}
