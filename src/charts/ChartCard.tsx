import { type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../utils/cn';
import styles from './ChartCard.module.css';

export type ChartCardState = 'ready' | 'loading' | 'empty' | 'error';

export interface ChartCardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Card title (e.g. "30-day patient adherence") */
  title?: ReactNode;
  /** Optional subtitle / explanation */
  subtitle?: ReactNode;
  /** Headline metric displayed prominently in the header */
  metric?: ReactNode;
  /** Trend chip beside the metric (use the Beacon Badge or any node) */
  trend?: ReactNode;
  /** Optional actions (filters, export, etc.) rendered in the header */
  actions?: ReactNode;
  /** Footer content rendered below the chart body */
  footer?: ReactNode;
  /** Visual padding density */
  density?: 'comfortable' | 'compact';
  /** Render state — controls whether children, loader, empty, or error renders */
  state?: ChartCardState;
  /** Custom empty-state node */
  emptyState?: ReactNode;
  /** Custom loading-state node */
  loadingState?: ReactNode;
  /** Custom error-state node */
  errorState?: ReactNode;
  /** Optional aria-label for the chart region */
  ariaLabel?: string;
}

const defaultEmpty = (
  <div className={styles.placeholder}>
    <div className={styles.placeholderTitle}>No data available</div>
    <div className={styles.placeholderText}>
      There&apos;s nothing to display for the selected range.
    </div>
  </div>
);

const defaultLoading = (
  <div className={styles.placeholder}>
    <div className={styles.skeletonBars} aria-hidden="true">
      <span />
      <span />
      <span />
      <span />
      <span />
    </div>
    <div className={styles.placeholderText}>Loading chart…</div>
  </div>
);

const defaultError = (
  <div className={styles.placeholder} role="alert">
    <div className={styles.placeholderTitle}>Unable to load chart</div>
    <div className={styles.placeholderText}>
      Something went wrong while loading this data. Try again in a moment.
    </div>
  </div>
);

/**
 * ChartCard — the unifying shell for every Beacon chart component.
 *
 * Provides a consistent header (title, subtitle, headline metric, trend chip,
 * actions), body slot, footer slot, and built-in loading / empty / error states.
 *
 * Every chart component in Beacon composes this card so the system feels
 * cohesive and developers get visual states for free.
 */
export function ChartCard({
  title,
  subtitle,
  metric,
  trend,
  actions,
  footer,
  density = 'comfortable',
  state = 'ready',
  emptyState,
  loadingState,
  errorState,
  ariaLabel,
  className,
  children,
  ...props
}: ChartCardProps) {
  const showHeader = title || subtitle || metric || trend || actions;

  return (
    <section
      className={cn(styles.card, styles[density], className)}
      aria-label={ariaLabel}
      {...props}
    >
      {showHeader && (
        <header className={styles.header}>
          <div className={styles.headerText}>
            {title && <h3 className={styles.title}>{title}</h3>}
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
            {(metric || trend) && (
              <div className={styles.metricRow}>
                {metric && <span className={styles.metric}>{metric}</span>}
                {trend && <span className={styles.trendSlot}>{trend}</span>}
              </div>
            )}
          </div>
          {actions && <div className={styles.actions}>{actions}</div>}
        </header>
      )}

      <div className={styles.body}>
        {state === 'loading' && (loadingState ?? defaultLoading)}
        {state === 'empty' && (emptyState ?? defaultEmpty)}
        {state === 'error' && (errorState ?? defaultError)}
        {state === 'ready' && children}
      </div>

      {footer && <footer className={styles.footer}>{footer}</footer>}
    </section>
  );
}
