import { type HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';
import styles from './Pagination.module.css';

export interface PaginationProps extends Omit<HTMLAttributes<HTMLElement>, 'onChange'> {
  /** Current active page (1-based) */
  currentPage: number;
  /** Total number of pages */
  totalPages: number;
  /** Callback when page changes */
  onPageChange: (page: number) => void;
  /** Number of sibling pages to show around the current page */
  siblingCount?: number;
  /** Size variant */
  size?: 'sm' | 'md';
}

function getPageRange(current: number, total: number, siblings: number): (number | 'ellipsis')[] {
  const totalNumbers = siblings * 2 + 3; // siblings + current + 2 boundaries
  const totalBlocks = totalNumbers + 2; // + 2 ellipsis slots

  if (total <= totalBlocks) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const leftSibling = Math.max(current - siblings, 1);
  const rightSibling = Math.min(current + siblings, total);

  const showLeftEllipsis = leftSibling > 2;
  const showRightEllipsis = rightSibling < total - 1;

  if (!showLeftEllipsis && showRightEllipsis) {
    const leftCount = 3 + 2 * siblings;
    const leftRange = Array.from({ length: leftCount }, (_, i) => i + 1);
    return [...leftRange, 'ellipsis', total];
  }

  if (showLeftEllipsis && !showRightEllipsis) {
    const rightCount = 3 + 2 * siblings;
    const rightRange = Array.from({ length: rightCount }, (_, i) => total - rightCount + i + 1);
    return [1, 'ellipsis', ...rightRange];
  }

  const middleRange = Array.from(
    { length: rightSibling - leftSibling + 1 },
    (_, i) => leftSibling + i
  );
  return [1, 'ellipsis', ...middleRange, 'ellipsis', total];
}

/**
 * Pagination — page navigation for paginated data.
 *
 * Accessibility:
 * - Wraps in <nav> with aria-label="Pagination"
 * - Current page indicated with aria-current="page"
 * - Previous/Next buttons disabled at boundaries
 * - Healthcare note: use pagination for patient lists, lab results,
 *   and audit logs to keep pages manageable
 */
export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
  size = 'md',
  className,
  ...props
}: PaginationProps) {
  const pages = getPageRange(currentPage, totalPages, siblingCount);

  if (totalPages <= 1) return null;

  return (
    <nav
      className={cn(styles.pagination, styles[size], className)}
      aria-label="Pagination"
      {...props}
    >
      <button
        className={cn(styles.button, styles.nav)}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        aria-label="Previous page"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polyline points="10 4 6 8 10 12" />
        </svg>
      </button>

      {pages.map((page, idx) =>
        page === 'ellipsis' ? (
          <span key={`ellipsis-${idx}`} className={styles.ellipsis} aria-hidden="true">
            &hellip;
          </span>
        ) : (
          <button
            key={page}
            className={cn(styles.button, page === currentPage && styles.active)}
            onClick={() => onPageChange(page)}
            aria-current={page === currentPage ? 'page' : undefined}
            aria-label={`Page ${page}`}
          >
            {page}
          </button>
        )
      )}

      <button
        className={cn(styles.button, styles.nav)}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        aria-label="Next page"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polyline points="6 4 10 8 6 12" />
        </svg>
      </button>
    </nav>
  );
}
