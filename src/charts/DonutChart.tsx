import { Cell, Pie, PieChart as RechartsPieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { ChartCard, type ChartCardProps } from './ChartCard';
import { ChartTooltip } from './ChartTooltip';
import { defaultValueFormatter, getSeriesColor, type ValueFormatter } from './chartTheme';
import styles from './DonutChart.module.css';

export interface DonutChartDatum {
  /** Display label for the slice */
  name: string;
  /** Numeric value */
  value: number;
  /** Optional explicit color (defaults to Beacon palette) */
  color?: string;
}

export interface DonutChartProps extends Omit<ChartCardProps, 'children'> {
  data: DonutChartDatum[];
  /** Center label (e.g. total value) */
  centerLabel?: string;
  /** Center sublabel (e.g. "patients") */
  centerSublabel?: string;
  /** Render as full pie instead of donut */
  variant?: 'donut' | 'pie';
  /** Chart height (defaults to 280) */
  height?: number;
  /** Format slice values in tooltip */
  valueFormatter?: ValueFormatter;
  /** Show legend list to the right of the chart */
  showLegend?: boolean;
}

/**
 * Beacon DonutChart — for distribution / part-to-whole comparisons.
 *
 * Center label/sublabel slots support headline metrics inside the donut.
 * For pie semantics, set `variant="pie"`.
 */
export function DonutChart({
  data,
  centerLabel,
  centerSublabel,
  variant = 'donut',
  height = 280,
  valueFormatter = defaultValueFormatter,
  showLegend = true,
  state,
  ...cardProps
}: DonutChartProps) {
  const effectiveState = state ?? (data.length === 0 ? 'empty' : 'ready');
  const total = data.reduce((sum, d) => sum + d.value, 0);

  return (
    <ChartCard state={effectiveState} {...cardProps}>
      <div className={styles.layout}>
        <div className={styles.chartWrap} style={{ height }}>
          <ResponsiveContainer width="100%" height="100%">
            <RechartsPieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={variant === 'donut' ? '64%' : 0}
                outerRadius="92%"
                paddingAngle={variant === 'donut' ? 2 : 0}
                stroke="var(--beacon-color-surface-default)"
                strokeWidth={2}
                isAnimationActive={false}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getSeriesColor(index, entry.color)} />
                ))}
              </Pie>
              <Tooltip content={<ChartTooltip valueFormatter={valueFormatter} />} />
            </RechartsPieChart>
          </ResponsiveContainer>
          {variant === 'donut' && (centerLabel || centerSublabel) && (
            <div className={styles.center} aria-hidden="true">
              {centerLabel && <div className={styles.centerLabel}>{centerLabel}</div>}
              {centerSublabel && <div className={styles.centerSub}>{centerSublabel}</div>}
            </div>
          )}
        </div>
        {showLegend && (
          <ul className={styles.legend}>
            {data.map((entry, index) => {
              const color = getSeriesColor(index, entry.color);
              const pct = total > 0 ? (entry.value / total) * 100 : 0;
              return (
                <li key={`${entry.name}-${index}`} className={styles.legendItem}>
                  <span
                    className={styles.swatch}
                    style={{ backgroundColor: color }}
                    aria-hidden="true"
                  />
                  <span className={styles.legendLabel}>{entry.name}</span>
                  <span className={styles.legendValue}>
                    {valueFormatter(entry.value)}
                    <span className={styles.legendPct}>{pct.toFixed(0)}%</span>
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </ChartCard>
  );
}
