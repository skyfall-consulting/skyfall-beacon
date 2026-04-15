import { useState, useEffect, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

export interface PortalProps {
  /** Content to render in the portal */
  children: ReactNode;
  /** Target container element (defaults to document.body) */
  container?: Element | null;
  /** Whether the portal is active (renders inline when false) */
  disabled?: boolean;
}

/**
 * Portal — renders children into a DOM node outside the parent hierarchy.
 *
 * Use for overlays, tooltips, modals, and other floating content that
 * needs to escape stacking context or overflow constraints.
 *
 * Falls back to inline rendering during SSR or when disabled.
 *
 * Accessibility:
 * - Portal does not affect the accessibility tree
 * - Focus management is the responsibility of the portal content
 * - Ensure ARIA relationships (aria-describedby, aria-labelledby)
 *   still work across the portal boundary
 */
export function Portal({ children, container, disabled = false }: PortalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (disabled || !mounted) {
    return <>{children}</>;
  }

  return createPortal(children, container ?? document.body);
}
