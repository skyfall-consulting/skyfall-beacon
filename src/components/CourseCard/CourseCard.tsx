import { type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../utils/cn';
import { Card } from '../Card/Card';
import { Badge } from '../Badge/Badge';
import { Typography } from '../Typography/Typography';
import { Progress } from '../Progress/Progress';
import { Chip } from '../Chip/Chip';
import styles from './CourseCard.module.css';

export type CourseLevel = 'beginner' | 'intermediate' | 'advanced';
export type CourseStatus = 'not-started' | 'in-progress' | 'completed';

export interface CourseCardProps extends HTMLAttributes<HTMLDivElement> {
  /** Course title */
  title: string;
  /** Short course description */
  description?: string;
  /** Instructor name */
  instructor?: string;
  /** Total module/lesson count */
  modules?: number;
  /** Estimated duration label, e.g. "6 hrs" */
  duration?: string;
  /** Difficulty level */
  level?: CourseLevel;
  /** Completion status */
  status?: CourseStatus;
  /** Progress percentage (0-100) */
  progress?: number;
  /** Optional category tags (e.g., "Data Science", "Beginner Friendly") */
  tags?: string[];
  /** Visual cover element — image, gradient, or icon slot */
  cover?: ReactNode;
  /** Primary action (typically a Button) */
  action?: ReactNode;
}

const statusBadgeMap: Record<CourseStatus, { status: 'success' | 'info' | 'neutral'; label: string }> = {
  'not-started': { status: 'neutral', label: 'Not started' },
  'in-progress': { status: 'info', label: 'In progress' },
  completed: { status: 'success', label: 'Completed' },
};

const levelLabel: Record<CourseLevel, string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
};

/**
 * CourseCard — summary card for a course, module, or learning track.
 *
 * Composes: Card, Badge, Typography, Progress, Chip
 *
 * Beacon learning surface — pairs a cover, identity, and a visible progress
 * footer to make momentum legible at a glance. Use in catalogs, dashboards,
 * and "continue learning" surfaces.
 */
export function CourseCard({
  title,
  description,
  instructor,
  modules,
  duration,
  level,
  status = 'not-started',
  progress,
  tags = [],
  cover,
  action,
  className,
  ...props
}: CourseCardProps) {
  const badge = statusBadgeMap[status];
  const progressValue = typeof progress === 'number' ? Math.round(progress) : undefined;
  const isComplete = status === 'completed';
  const showProgress = typeof progressValue === 'number' && status !== 'not-started';

  return (
    <Card
      elevation="raised"
      padding="none"
      className={cn(styles.card, isComplete && styles.complete, className)}
      role="region"
      aria-label={`Course: ${title}`}
      {...props}
    >
      {cover && <div className={styles.cover} aria-hidden="true">{cover}</div>}
      <div className={styles.body}>
        <div className={styles.headerRow}>
          <Badge status={badge.status}>{badge.label}</Badge>
          {level && (
            <Typography variant="caption" color="muted" as="span">
              {levelLabel[level]}
            </Typography>
          )}
        </div>

        <Typography variant="heading-sm" as="h3" className={styles.title}>{title}</Typography>

        {description && (
          <Typography variant="body-sm" color="secondary" as="p" className={styles.description}>
            {description}
          </Typography>
        )}

        <div className={styles.meta}>
          {instructor && (
            <Typography variant="caption" color="muted" as="span">
              By {instructor}
            </Typography>
          )}
          {(modules !== undefined || duration) && (
            <Typography variant="caption" color="muted" as="span">
              {modules !== undefined && `${modules} ${modules === 1 ? 'module' : 'modules'}`}
              {modules !== undefined && duration && ' · '}
              {duration}
            </Typography>
          )}
        </div>

        {tags.length > 0 && (
          <div className={styles.tags}>
            {tags.map((tag) => (
              <Chip key={tag} size="sm" variant="outlined">{tag}</Chip>
            ))}
          </div>
        )}

        {showProgress && (
          <div className={styles.progressBlock}>
            <Progress
              value={progressValue}
              size="sm"
              variant={isComplete ? 'success' : 'default'}
              label={isComplete ? 'Complete' : 'Progress'}
              showValue
            />
          </div>
        )}

        {action && <div className={styles.action}>{action}</div>}
      </div>
    </Card>
  );
}
