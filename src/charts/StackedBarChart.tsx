import { BarChart, type BarChartProps } from './BarChart';

/**
 * Beacon StackedBarChart — convenience wrapper around BarChart with
 * `stacked` enabled by default. Use this when stacking is the default
 * intent (e.g. cohort breakdown over time).
 */
export function StackedBarChart<T extends Record<string, unknown>>(
  props: Omit<BarChartProps<T>, 'stacked'>,
) {
  return <BarChart {...props} stacked />;
}

export type { BarChartProps as StackedBarChartProps } from './BarChart';
