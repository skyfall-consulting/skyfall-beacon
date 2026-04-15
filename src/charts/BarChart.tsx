import {
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { ChartCard, type ChartCardProps } from './ChartCard';
import { ChartLegend } from './ChartLegend';
import { ChartTooltip } from './ChartTooltip';
import {
  beaconChartTheme,
  defaultValueFormatter,
  getSeriesColor,
  type ChartSeries,
  type ValueFormatter,
} from './chartTheme';

export interface BarChartProps<T extends Record<string, unknown>>
  extends Omit<ChartCardProps, 'children'> {
  data: T[];
  xKey: keyof T & string;
  series: ChartSeries<T>[];
  height?: number;
  showLegend?: boolean;
  showGrid?: boolean;
  /** Stack bars (renders as a stacked bar chart) */
  stacked?: boolean;
  /** Render bars horizontally */
  horizontal?: boolean;
  valueFormatter?: ValueFormatter;
  referenceLines?: { value: number; label?: string }[];
}

/**
 * Beacon BarChart — for categorical comparisons.
 *
 * Set `stacked` for stacked bars, `horizontal` for horizontal layout
 * (better for long category labels).
 */
export function BarChart<T extends Record<string, unknown>>({
  data,
  xKey,
  series,
  height = 280,
  showLegend,
  showGrid = true,
  stacked = false,
  horizontal = false,
  valueFormatter = defaultValueFormatter,
  referenceLines,
  state,
  ...cardProps
}: BarChartProps<T>) {
  const effectiveState = state ?? (data.length === 0 ? 'empty' : 'ready');
  const showLegendFinal = showLegend ?? series.length > 1;

  return (
    <ChartCard state={effectiveState} {...cardProps}>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsBarChart
          data={data}
          layout={horizontal ? 'vertical' : 'horizontal'}
          margin={{ top: 8, right: 16, left: 0, bottom: 0 }}
          barCategoryGap="22%"
        >
          {showGrid && (
            <CartesianGrid
              vertical={horizontal}
              horizontal={!horizontal}
              stroke={beaconChartTheme.grid.stroke}
              strokeDasharray={beaconChartTheme.grid.strokeDasharray}
            />
          )}
          {horizontal ? (
            <>
              <XAxis
                type="number"
                stroke={beaconChartTheme.axis.stroke}
                tick={{
                  fill: beaconChartTheme.axis.tickColor,
                  fontSize: beaconChartTheme.axis.fontSize,
                }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => valueFormatter(v as number)}
              />
              <YAxis
                type="category"
                dataKey={xKey}
                stroke={beaconChartTheme.axis.stroke}
                tick={{
                  fill: beaconChartTheme.axis.tickColor,
                  fontSize: beaconChartTheme.axis.fontSize,
                }}
                tickLine={false}
                axisLine={{ stroke: beaconChartTheme.grid.stroke }}
                width={96}
              />
            </>
          ) : (
            <>
              <XAxis
                dataKey={xKey}
                stroke={beaconChartTheme.axis.stroke}
                tick={{
                  fill: beaconChartTheme.axis.tickColor,
                  fontSize: beaconChartTheme.axis.fontSize,
                }}
                tickLine={false}
                axisLine={{ stroke: beaconChartTheme.grid.stroke }}
              />
              <YAxis
                stroke={beaconChartTheme.axis.stroke}
                tick={{
                  fill: beaconChartTheme.axis.tickColor,
                  fontSize: beaconChartTheme.axis.fontSize,
                }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => valueFormatter(v as number)}
                width={48}
              />
            </>
          )}
          <Tooltip
            cursor={{ fill: 'var(--beacon-state-hover-overlay)' }}
            content={<ChartTooltip valueFormatter={valueFormatter} />}
          />
          {showLegendFinal && <Legend content={<ChartLegend />} />}
          {referenceLines?.map((ref, i) => (
            <ReferenceLine
              key={`ref-${i}`}
              {...(horizontal ? { x: ref.value } : { y: ref.value })}
              stroke={beaconChartTheme.reference.stroke}
              strokeDasharray={beaconChartTheme.reference.strokeDasharray}
              label={
                ref.label
                  ? {
                      value: ref.label,
                      position: 'insideTopRight',
                      fill: beaconChartTheme.tooltip.muted,
                      fontSize: 11,
                    }
                  : undefined
              }
            />
          ))}
          {series.map((s, index) => {
            const color = getSeriesColor(index, s.color);
            return (
              <Bar
                key={s.dataKey}
                dataKey={s.dataKey}
                name={s.label ?? s.dataKey}
                fill={color}
                radius={[4, 4, 0, 0]}
                stackId={stacked ? 'beacon-stack' : undefined}
                isAnimationActive={false}
              />
            );
          })}
        </RechartsBarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
