import { type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../utils/cn';
import styles from './ProgressRing.module.css';

export type ProgressRingTone = 'default' | 'success' | 'reward';
export type ProgressRingSize = 'sm' | 'md' | 'lg';

export interface ProgressRingProps extends HTMLAttributes<HTMLDivElement> {
  /** Current value (0-100) */
  value: number;
  /** Maximum value (defaults to 100) */
  max?: number;
  /** Size variant */
  size?: ProgressRingSize;
  /** Visual tone */
  tone?: ProgressRingTone;
  /** Optional label rendered alongside the ring */
  label?: string;
  /** Show the numeric percentage in the center */
  showValue?: boolean;
  /** Custom center content (overrides showValue) */
  centerContent?: ReactNode;
}

const sizeMap: Record<ProgressRingSize, { box: number; stroke: number; font: number }> = {
  sm: { box: 40, stroke: 4, font: 11 },
  md: { box: 64, stroke: 6, font: 14 },
  lg: { box: 96, stroke: 8, font: 18 },
};

/**
 * ProgressRing — circular progress indicator.
 *
 * Beacon learning surface — used in dashboards, course cards, and learner
 * profile summaries to show completion percentage in a glanceable form.
 *
 * Accessibility:
 * - role="progressbar" with aria-valuenow / min / max
 * - When `label` is provided, it's announced via aria-label
 */
export function ProgressRing({
  value,
  max = 100,
  size = 'md',
  tone = 'default',
  label,
  showValue = true,
  centerContent,
  className,
  ...props
}: ProgressRingProps) {
  const { box, stroke, font } = sizeMap[size];
  const radius = (box - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  const dashOffset = circumference * (1 - pct / 100);
  const center = box / 2;

  return (
    <div
      className={cn(styles.wrapper, className)}
      role="progressbar"
      aria-valuenow={Math.round(pct)}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-label={label ?? `${Math.round(pct)} percent complete`}
      {...props}
    >
      <div className={styles.ringBox} style={{ width: box, height: box }}>
        <svg width={box} height={box} className={styles.svg} aria-hidden="true">
          <circle
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={stroke}
            className={styles.track}
            fill="none"
          />
          <circle
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={stroke}
            className={cn(styles.fill, styles[tone])}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            strokeLinecap="round"
            transform={`rotate(-90 ${center} ${center})`}
          />
        </svg>
        <span className={styles.center} style={{ fontSize: font }}>
          {centerContent ?? (showValue ? `${Math.round(pct)}%` : null)}
        </span>
      </div>
      {label && <span className={styles.label}>{label}</span>}
    </div>
  );
}
