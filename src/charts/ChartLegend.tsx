import type { LegendProps } from 'recharts';
import styles from './ChartLegend.module.css';

/**
 * Beacon-styled chart legend. Pass to Recharts via:
 *   <Legend content={<ChartLegend />} />
 */
export function ChartLegend({ payload }: LegendProps) {
  if (!payload || payload.length === 0) return null;

  return (
    <ul className={styles.legend}>
      {payload.map((entry, index) => (
        <li key={`${entry.value}-${index}`} className={styles.item}>
          <span
            className={styles.swatch}
            style={{ backgroundColor: entry.color }}
            aria-hidden="true"
          />
          <span className={styles.label}>{entry.value}</span>
        </li>
      ))}
    </ul>
  );
}
