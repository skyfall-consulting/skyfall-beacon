import { type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../utils/cn';
import { Typography } from '../Typography/Typography';
import styles from './AchievementBadge.module.css';

export type AchievementTone = 'reward' | 'milestone' | 'streak' | 'mastery';
export type AchievementSize = 'sm' | 'md' | 'lg';

export interface AchievementBadgeProps extends HTMLAttributes<HTMLDivElement> {
  /** Title of the achievement, e.g. "Module 3 Complete" */
  title: string;
  /** Optional supporting text, e.g. "Earned April 12" */
  description?: string;
  /** Visual tone */
  tone?: AchievementTone;
  /** Size variant */
  size?: AchievementSize;
  /** Whether the achievement has been earned (default: true) */
  earned?: boolean;
  /** Custom icon (defaults to a star/check by tone) */
  icon?: ReactNode;
  /** Show subtle glow ring around the medallion */
  glow?: boolean;
}

const defaultIcons: Record<AchievementTone, ReactNode> = {
  reward: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2l2.6 6.3 6.8.6-5.2 4.5 1.6 6.6L12 16.8 6.2 20l1.6-6.6L2.6 8.9l6.8-.6L12 2z" />
    </svg>
  ),
  milestone: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M5 3v18h2v-7h12l-2-4 2-4H7V3H5z" />
    </svg>
  ),
  streak: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2c-1 4 1 5 3 7 3 3 4 6 4 8a7 7 0 11-14 0c0-2 1-4 3-5-1 2 0 4 2 4 0-3 2-5 2-9V2z" />
    </svg>
  ),
  mastery: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2l3 6 6 1-4.5 4.5L18 20l-6-3-6 3 1.5-6.5L3 9l6-1 3-6z" />
      <circle cx="12" cy="12" r="2.5" fill="#FFFFFF" />
    </svg>
  ),
};

const sizeMap: Record<AchievementSize, { medallion: number; icon: number }> = {
  sm: { medallion: 40, icon: 22 },
  md: { medallion: 56, icon: 30 },
  lg: { medallion: 72, icon: 38 },
};

/**
 * AchievementBadge — earned badge / milestone / mastery / streak indicator.
 *
 * Beacon learning surface — supports learner motivation patterns: lesson
 * completion rewards, streak counters, mastery medals, milestone markers.
 *
 * Accessibility:
 * - Uses role="img" with aria-label combining title + earned state
 * - Unearned state visually muted; conveyed via aria-label, not color alone
 */
export function AchievementBadge({
  title,
  description,
  tone = 'reward',
  size = 'md',
  earned = true,
  icon,
  glow = false,
  className,
  ...props
}: AchievementBadgeProps) {
  const { medallion, icon: iconSize } = sizeMap[size];
  const iconNode = icon ?? defaultIcons[tone];

  return (
    <div
      className={cn(
        styles.wrapper,
        styles[size],
        !earned && styles.unearned,
        className,
      )}
      role="img"
      aria-label={`${title}${earned ? ' — earned' : ' — not yet earned'}`}
      {...props}
    >
      <div
        className={cn(styles.medallion, styles[tone], earned && glow && styles.glow)}
        style={{ width: medallion, height: medallion }}
      >
        <span
          className={styles.icon}
          style={{ width: iconSize, height: iconSize }}
        >
          {iconNode}
        </span>
      </div>
      <div className={styles.text}>
        <Typography variant="label-lg" weight="semibold" as="span">{title}</Typography>
        {description && (
          <Typography variant="caption" color="muted" as="span">{description}</Typography>
        )}
      </div>
    </div>
  );
}
