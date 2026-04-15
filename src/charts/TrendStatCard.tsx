import { type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../utils/cn';
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { ChartTooltip } from './ChartTooltip';
import {
  defaultValueFormatter,
  getSeriesColor,
  type ValueFormatter,
} from './chartTheme';
import styles from './TrendStatCard.module.css';

export type TrendDirection = 'up' | 'down' | 'neutral';

export interface TrendStatCardProps<T extends Record<string, unknown>>
  extends HTMLAttributes<HTMLDivElement> {
  /** Metric label (e.g. "30-day readmissions") */
  label: string;
  /** Headline value */
  value: ReactNode;
  /** Optional unit (e.g. "%", "patients") */
  unit?: ReactNode;
  /** Trend chart data — row-shaped */
  data: T[];
  /** X-axis key on each row */
  xKey: keyof T & string;
  /** Y value key on each row */
  yKey: keyof T & string;
  /** Percent change value */
  change?: number;
  /** Change context label */
  changeLabel?: string;
  /** Inverse semantics — set true when a decrease is "good" */
  inverse?: boolean;
  /** Color override for the trend area */
  color?: string;
  /** Format values shown in tooltip */
  valueFormatter?: ValueFormatter;
  /** Chart height (defaults to 80) */
  chartHeight?: number;
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
 * TrendStatCard — KPI card with a prominent trend chart underneath.
 *
 * Larger than KpiStatCard's inline sparkline, designed to fill more space
 * in dashboard rows where a trend story is the primary message.
 */
export function TrendStatCard<T extends Record<string, unknown>>({
  label,
  value,
  unit,
  data,
  xKey,
  yKey,
  change,
  changeLabel,
  inverse = false,
  color,
  valueFormatter = defaultValueFormatter,
  chartHeight = 80,
  className,
  ...props
}: TrendStatCardProps<T>) {
  const direction = inferTrend(change);
  const semantic: TrendDirection =
    inverse && direction === 'up' ? 'down' : inverse && direction === 'down' ? 'up' : direction;
  const stroke = getSeriesColor(0, color);
  const formattedChange =
    change !== undefined ? `${change > 0 ? '+' : ''}${change}%` : undefined;
  const gradientId = `trend-stat-${String(yKey)}-${Math.random().toString(36).slice(2, 8)}`;

  return (
    <div className={cn(styles.card, className)} {...props}>
      <div className={styles.header}>
        <span className={styles.label}>{label}</span>
        {formattedChange && (
          <span className={cn(styles.chip, styles[semantic])}>
            {trendIcons[direction]}
            <span>{formattedChange}</span>
          </span>
        )}
      </div>
      <div className={styles.valueRow}>
        <span className={styles.value}>{value}</span>
        {unit && <span className={styles.unit}>{unit}</span>}
      </div>
      {changeLabel && <div className={styles.changeLabel}>{changeLabel}</div>}
      <div className={styles.chartWrap} style={{ height: chartHeight }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={stroke} stopOpacity={0.32} />
                <stop offset="100%" stopColor={stroke} stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey={xKey} hide />
            <YAxis hide />
            <Tooltip content={<ChartTooltip valueFormatter={valueFormatter} />} />
            <Area
              type="monotone"
              dataKey={yKey}
              stroke={stroke}
              strokeWidth={2}
              fill={`url(#${gradientId})`}
              isAnimationActive={false}
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
