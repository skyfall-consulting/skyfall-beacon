import { useState, type HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';
import styles from './Avatar.module.css';

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
  /** Image source URL */
  src?: string;
  /** Alt text for the image */
  alt?: string;
  /** Full name used to generate initials fallback */
  name?: string;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Optional status dot overlay */
  status?: 'active' | 'inactive' | 'busy' | 'away';
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0) return '';
  if (parts.length === 1) return parts[0][0]?.toUpperCase() ?? '';
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/**
 * Avatar — circular user image with initials fallback and optional status.
 *
 * Accessibility:
 * - Image includes alt text when src is provided
 * - Initials fallback uses aria-label with the full name
 * - Status dot includes a visually-hidden label
 * - Healthcare note: use avatars to identify care team members,
 *   patients, and providers in clinical workflows
 */
export function Avatar({
  src,
  alt,
  name,
  size = 'md',
  status,
  className,
  ...props
}: AvatarProps) {
  const [imgError, setImgError] = useState(false);
  const showImage = src && !imgError;
  const initials = name ? getInitials(name) : '';

  return (
    <span
      className={cn(styles.avatar, styles[size], className)}
      role="img"
      aria-label={alt ?? name ?? 'Avatar'}
      {...props}
    >
      {showImage ? (
        <img
          src={src}
          alt={alt ?? name ?? 'Avatar'}
          className={styles.image}
          onError={() => setImgError(true)}
        />
      ) : (
        <span className={styles.initials} aria-hidden="true">
          {initials}
        </span>
      )}
      {status && (
        <span className={cn(styles.status, styles[`status-${status}`])} aria-hidden="true">
          <span className={styles.srOnly}>{status}</span>
        </span>
      )}
    </span>
  );
}
