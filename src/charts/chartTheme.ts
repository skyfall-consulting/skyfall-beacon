/**
 * Skyfall Beacon — Chart Theme
 *
 * Centralized theme tokens for all Recharts-based components.
 * Reads from CSS custom properties so chart visuals stay in sync with
 * the rest of the Beacon design system.
 */

/**
 * The Beacon chart series palette. Order is intentional — earlier colors
 * are used first so simple charts always pull from the most credible,
 * brand-aligned hues before moving into supporting accents.
 */
export const beaconSeriesPalette = [
  'var(--beacon-data-vis-1)',
  'var(--beacon-data-vis-2)',
  'var(--beacon-data-vis-3)',
  'var(--beacon-data-vis-4)',
  'var(--beacon-data-vis-5)',
] as const;

/**
 * Resolve a series color by index, wrapping the palette if more series
 * exist than available colors. Accepts an explicit override.
 */
export function getSeriesColor(index: number, override?: string): string {
  if (override) return override;
  return beaconSeriesPalette[index % beaconSeriesPalette.length];
}

/**
 * Token-driven chart theme. Used to style axes, gridlines, tooltips,
 * legends, etc. so every chart in Beacon feels like part of one system.
 */
export const beaconChartTheme = {
  axis: {
    stroke: 'var(--beacon-data-vis-axis)',
    fontSize: 12,
    fontFamily: 'var(--beacon-font-family-sans)',
    tickColor: 'var(--beacon-color-text-muted)',
  },
  grid: {
    stroke: 'var(--beacon-data-vis-gridline)',
    strokeDasharray: '3 3',
  },
  tooltip: {
    background: 'var(--beacon-color-surface-overlay)',
    border: 'var(--beacon-color-border-default)',
    text: 'var(--beacon-color-text-primary)',
    muted: 'var(--beacon-color-text-secondary)',
  },
  reference: {
    stroke: 'var(--beacon-color-text-muted)',
    strokeDasharray: '4 4',
  },
} as const;

export type ChartSeries<T = Record<string, unknown>> = {
  /** Property key on the data row that holds the series value */
  dataKey: keyof T & string;
  /** Display label for tooltip / legend */
  label?: string;
  /** Optional explicit color (defaults to Beacon palette) */
  color?: string;
};

export type ValueFormatter = (value: number | string) => string;

/** Default number formatter — locale-aware, with sensible compact behavior */
export const defaultValueFormatter: ValueFormatter = (value) => {
  if (typeof value !== 'number') return String(value);
  if (Math.abs(value) >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
  if (Math.abs(value) >= 1_000) return `${(value / 1_000).toFixed(1)}k`;
  return value.toLocaleString();
};
