import {
  Area,
  AreaChart,
  Line,
  LineChart,
  ResponsiveContainer,
} from 'recharts';
import { getSeriesColor } from './chartTheme';

export interface SparklineProps {
  /** Array of numeric values OR row objects */
  data: number[] | Record<string, unknown>[];
  /** Property name when `data` is row-shaped (defaults to "value") */
  dataKey?: string;
  /** Render style */
  variant?: 'line' | 'area';
  /** Width in px (defaults to 120) — accepts any CSS length */
  width?: number | string;
  /** Height in px (defaults to 36) */
  height?: number | string;
  /** Line/area color (defaults to first Beacon series color) */
  color?: string;
  /** Stroke width (defaults to 2) */
  strokeWidth?: number;
  /** Optional accessible label */
  ariaLabel?: string;
}

/**
 * Beacon Sparkline — minimal inline trend chart for KPIs and table cells.
 *
 * Pure visual: no axes, grid, tooltip, or legend. Designed to live inside
 * stat cards, data grid cells, and dense dashboard surfaces.
 */
export function Sparkline({
  data,
  dataKey = 'value',
  variant = 'line',
  width = 120,
  height = 36,
  color,
  strokeWidth = 2,
  ariaLabel,
}: SparklineProps) {
  const normalized: Record<string, number>[] =
    typeof data[0] === 'number'
      ? (data as number[]).map((v, i) => ({ x: i, [dataKey]: v }))
      : (data as Record<string, number>[]);

  const stroke = getSeriesColor(0, color);
  const gradientId = `beacon-spark-${dataKey}-${Math.random().toString(36).slice(2, 8)}`;

  return (
    <div
      style={{ width, height, display: 'inline-block' }}
      role={ariaLabel ? 'img' : undefined}
      aria-label={ariaLabel}
    >
      <ResponsiveContainer width="100%" height="100%">
        {variant === 'area' ? (
          <AreaChart data={normalized} margin={{ top: 2, right: 2, left: 2, bottom: 2 }}>
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={stroke} stopOpacity={0.32} />
                <stop offset="100%" stopColor={stroke} stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey={dataKey}
              stroke={stroke}
              strokeWidth={strokeWidth}
              fill={`url(#${gradientId})`}
              isAnimationActive={false}
              dot={false}
            />
          </AreaChart>
        ) : (
          <LineChart data={normalized} margin={{ top: 2, right: 2, left: 2, bottom: 2 }}>
            <Line
              type="monotone"
              dataKey={dataKey}
              stroke={stroke}
              strokeWidth={strokeWidth}
              dot={false}
              isAnimationActive={false}
            />
          </LineChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}
