import { type HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';
import { Card } from '../Card/Card';
import { Avatar } from '../Avatar/Avatar';
import { Typography } from '../Typography/Typography';
import { ProgressRing } from '../ProgressRing/ProgressRing';
import { StatusBadge, type StatusBadgeStatus } from '../StatusBadge/StatusBadge';
import { Divider } from '../Divider/Divider';
import styles from './LearnerCard.module.css';

export type LearnerStatus = 'active' | 'inactive' | 'in-progress';

export interface LearnerCardProps extends HTMLAttributes<HTMLDivElement> {
  /** Learner full name */
  name: string;
  /** Cohort or program label */
  cohort?: string;
  /** Avatar image URL */
  avatarSrc?: string;
  /** Engagement / activity status */
  status?: LearnerStatus;
  /** Overall course/program progress (0-100) */
  progress?: number;
  /** Active streak in days */
  streakDays?: number;
  /** Number of achievements earned */
  achievements?: number;
}

const statusMap: Record<LearnerStatus, { status: StatusBadgeStatus; label: string }> = {
  active: { status: 'success', label: 'Active' },
  inactive: { status: 'inactive', label: 'Inactive' },
  'in-progress': { status: 'in-progress', label: 'In progress' },
};

/**
 * LearnerCard — summary card for a learner / student profile.
 *
 * Composes: Card, Avatar, Typography, ProgressRing, StatusBadge, Divider
 *
 * Beacon learning surface — used in educator dashboards (cohort lists,
 * intervention surfaces) and in student profile views. Pairs identity with
 * a glanceable progress ring and momentum stats (streak, achievements).
 */
export function LearnerCard({
  name,
  cohort,
  avatarSrc,
  status = 'active',
  progress,
  streakDays,
  achievements,
  className,
  ...props
}: LearnerCardProps) {
  const badge = statusMap[status];

  return (
    <Card
      elevation="raised"
      padding="lg"
      className={cn(styles.card, className)}
      role="region"
      aria-label={`Learner card for ${name}`}
      {...props}
    >
      <div className={styles.header}>
        <Avatar name={name} src={avatarSrc} size="lg" />
        <div className={styles.identity}>
          <Typography variant="heading-sm" as="h3">{name}</Typography>
          {cohort && (
            <Typography variant="caption" color="muted">{cohort}</Typography>
          )}
        </div>
        <StatusBadge status={badge.status} label={badge.label} dot />
      </div>

      {typeof progress === 'number' && (
        <>
          <Divider spacing="sm" />
          <div className={styles.progressRow}>
            <ProgressRing value={progress} size="md" tone="default" showValue />
            <div className={styles.progressMeta}>
              <Typography variant="label-md" color="secondary" as="span">Course progress</Typography>
              <Typography variant="caption" color="muted" as="span">
                {progress >= 100 ? 'Course complete' : 'Keep going — next milestone ahead'}
              </Typography>
            </div>
          </div>
        </>
      )}

      {(streakDays !== undefined || achievements !== undefined) && (
        <>
          <Divider spacing="sm" />
          <div className={styles.stats}>
            {streakDays !== undefined && (
              <div className={styles.stat}>
                <Typography variant="heading-md" weight="semibold" as="span">{streakDays}</Typography>
                <Typography variant="caption" color="muted" as="span">
                  day{streakDays === 1 ? '' : 's'} streak
                </Typography>
              </div>
            )}
            {achievements !== undefined && (
              <div className={styles.stat}>
                <Typography variant="heading-md" weight="semibold" as="span">{achievements}</Typography>
                <Typography variant="caption" color="muted" as="span">
                  achievement{achievements === 1 ? '' : 's'}
                </Typography>
              </div>
            )}
          </div>
        </>
      )}
    </Card>
  );
}
