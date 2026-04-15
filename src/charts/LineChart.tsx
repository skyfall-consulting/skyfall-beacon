import {
  CartesianGrid,
  Legend,
  Line,
  LineChart as RechartsLineChart,
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

export interface LineChartProps<T extends Record<string, unknown>>
  extends Omit<ChartCardProps, 'children'> {
  /** Row-shaped data — each row represents one x-axis category */
  data: T[];
  /** Property name on each row used for the x-axis */
  xKey: keyof T & string;
  /** One or more series definitions */
  series: ChartSeries<T>[];
  /** Chart height in pixels (defaults to 280) */
  height?: number;
  /** Show legend (defaults to true when more than one series) */
  showLegend?: boolean;
  /** Show grid (defaults to true) */
  showGrid?: boolean;
  /** Format values in tooltip / axis */
  valueFormatter?: ValueFormatter;
  /** Optional reference line value(s) (e.g. target threshold) */
  referenceLines?: { value: number; label?: string }[];
  /** Smooth curves (defaults to true) */
  smooth?: boolean;
}

/**
 * Beacon LineChart — wraps Recharts with Beacon tokens, shell, and states.
 *
 * Time-series and trend visualization for dashboards. Pair with KpiStatCard
 * for headline metrics or use standalone in a ChartCard layout.
 */
export function LineChart<T extends Record<string, unknown>>({
  data,
  xKey,
  series,
  height = 280,
  showLegend,
  showGrid = true,
  valueFormatter = defaultValueFormatter,
  referenceLines,
  smooth = true,
  state,
  ...cardProps
}: LineChartProps<T>) {
  const effectiveState = state ?? (data.length === 0 ? 'empty' : 'ready');
  const showLegendFinal = showLegend ?? series.length > 1;

  return (
    <ChartCard state={effectiveState} {...cardProps}>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsLineChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
          {showGrid && (
            <CartesianGrid
              vertical={false}
              stroke={beaconChartTheme.grid.stroke}
              strokeDasharray={beaconChartTheme.grid.strokeDasharray}
            />
          )}
          <XAxis
            dataKey={xKey}
            stroke={beaconChartTheme.axis.stroke}
            tick={{ fill: beaconChartTheme.axis.tickColor, fontSize: beaconChartTheme.axis.fontSize }}
            tickLine={false}
            axisLine={{ stroke: beaconChartTheme.grid.stroke }}
          />
          <YAxis
            stroke={beaconChartTheme.axis.stroke}
            tick={{ fill: beaconChartTheme.axis.tickColor, fontSize: beaconChartTheme.axis.fontSize }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v) => valueFormatter(v as number)}
            width={48}
          />
          <Tooltip
            cursor={{ stroke: beaconChartTheme.grid.stroke, strokeWidth: 1 }}
            content={<ChartTooltip valueFormatter={valueFormatter} />}
          />
          {showLegendFinal && <Legend content={<ChartLegend />} />}
          {referenceLines?.map((ref, i) => (
            <ReferenceLine
              key={`ref-${i}`}
              y={ref.value}
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
              <Line
                key={s.dataKey}
                type={smooth ? 'monotone' : 'linear'}
                dataKey={s.dataKey}
                name={s.label ?? s.dataKey}
                stroke={color}
                strokeWidth={2}
                dot={{ r: 0, fill: color }}
                activeDot={{ r: 5, strokeWidth: 0 }}
                isAnimationActive={false}
              />
            );
          })}
        </RechartsLineChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
