import { type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../utils/cn';
import { Sparkline, type SparklineProps } from './Sparkline';
import styles from './KpiStatCard.module.css';

export type TrendDirection = 'up' | 'down' | 'neutral';

export interface KpiStatCardProps extends HTMLAttributes<HTMLDivElement> {
  /** Metric label (e.g. "Active patients") */
  label: string;
  /** Headline value (e.g. 1284 or "98.2%") */
  value: ReactNode;
  /** Optional unit/suffix shown next to the value */
  unit?: ReactNode;
  /** Percent change (number) — positive renders as up, negative as down */
  change?: number;
  /** Label for the change context (e.g. "vs last 30 days") */
  changeLabel?: string;
  /** Override trend direction (otherwise inferred from `change`) */
  trend?: TrendDirection;
  /**
   * For success-positive metrics, set `inverse` to flip color semantics
   * (e.g. "wait time" — a decrease is good).
   */
  inverse?: boolean;
  /** Optional icon rendered top-right */
  icon?: ReactNode;
  /** Optional sparkline data — when present, renders an inline trend chart */
  sparklineData?: SparklineProps['data'];
  /** Sparkline color override */
  sparklineColor?: string;
  /** Sparkline render variant */
  sparklineVariant?: SparklineProps['variant'];
  /** Density variant */
  density?: 'comfortable' | 'compact';
}

function inferTrend(change?: number): TrendDirection {
  if (change == null || change === 0) return 'neutral';
  return change > 0 ? 'up' : 'down';
}

const trendIcons: Record<TrendDirection, ReactNode> = {
  up: (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M3 11l5-6 5 6H3z" />
    </svg>
  ),
  down: (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M3 5l5 6 5-6H3z" />
    </svg>
  ),
  neutral: (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M3 7h10v2H3z" />
    </svg>
  ),
};

/**
 * KpiStatCard — premium stat card with optional inline sparkline.
 *
 * The chart-aware evolution of StatCard. Use for headline KPIs in
 * dashboards. Pair with `inverse` for metrics where a decrease is positive
 * (e.g. wait time, error rate).
 *
 * Accessibility:
 * - Trend icons are aria-hidden; meaning is conveyed in visible text plus an
 *   sr-only direction phrase.
 * - Sparkline accepts `aria-label` for screen reader trend description.
 */
export function KpiStatCard({
  label,
  value,
  unit,
  change,
  changeLabel,
  trend,
  inverse = false,
  icon,
  sparklineData,
  sparklineColor,
  sparklineVariant = 'area',
  density = 'comfortable',
  className,
  ...props
}: KpiStatCardProps) {
  const direction = trend ?? inferTrend(change);
  const semantic: TrendDirection =
    inverse && direction === 'up' ? 'down' : inverse && direction === 'down' ? 'up' : direction;

  const formattedChange =
    change !== undefined ? `${change > 0 ? '+' : ''}${change}%` : undefined;

  return (
    <div className={cn(styles.card, styles[density], className)} {...props}>
      <div className={styles.header}>
        <span className={styles.label}>{label}</span>
        {icon && (
          <span className={styles.icon} aria-hidden="true">
            {icon}
          </span>
        )}
      </div>

      <div className={styles.valueRow}>
        <span className={styles.value}>{value}</span>
        {unit && <span className={styles.unit}>{unit}</span>}
      </div>

      {(formattedChange || sparklineData) && (
        <div className={styles.footer}>
          {formattedChange && (
            <div className={cn(styles.trend, styles[semantic])}>
              <span className={styles.trendIcon}>{trendIcons[direction]}</span>
              <span className={styles.trendValue}>{formattedChange}</span>
              {changeLabel && <span className={styles.changeLabel}>{changeLabel}</span>}
              <span className={styles.srOnly}>
                {direction === 'up'
                  ? 'increase'
                  : direction === 'down'
                  ? 'decrease'
                  : 'no change'}
              </span>
            </div>
          )}
          {sparklineData && (
            <div className={styles.sparkSlot}>
              <Sparkline
                data={sparklineData}
                color={sparklineColor}
                variant={sparklineVariant}
                width="100%"
                height={40}
                ariaLabel={`${label} trend`}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
