import type { TooltipProps } from 'recharts';
import { defaultValueFormatter, type ValueFormatter } from './chartTheme';
import styles from './ChartTooltip.module.css';

export interface ChartTooltipProps extends TooltipProps<number, string> {
  /** Optional formatter for displayed values */
  valueFormatter?: ValueFormatter;
  /** Optional formatter for the tooltip label (e.g. axis category) */
  labelFormatter?: (label: string) => string;
}

/**
 * Beacon-styled tooltip used by every chart in the system.
 *
 * Pass directly to Recharts `<Tooltip content={<ChartTooltip />} />`.
 */
export function ChartTooltip({
  active,
  payload,
  label,
  valueFormatter = defaultValueFormatter,
  labelFormatter,
}: ChartTooltipProps) {
  if (!active || !payload || payload.length === 0) return null;

  const displayLabel = labelFormatter && label != null ? labelFormatter(String(label)) : label;

  return (
    <div className={styles.tooltip} role="tooltip">
      {displayLabel != null && <div className={styles.label}>{displayLabel}</div>}
      <ul className={styles.list}>
        {payload.map((entry, index) => (
          <li key={`${entry.dataKey}-${index}`} className={styles.row}>
            <span
              className={styles.swatch}
              style={{ backgroundColor: entry.color }}
              aria-hidden="true"
            />
            <span className={styles.name}>{entry.name}</span>
            <span className={styles.value}>
              {entry.value != null ? valueFormatter(entry.value as number) : '—'}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
