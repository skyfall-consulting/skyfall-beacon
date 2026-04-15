import { useState, useCallback, forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../utils/cn';
import styles from './TreeView.module.css';

export interface TreeNode {
  /** Unique identifier */
  id: string;
  /** Display label */
  label: string;
  /** Optional icon */
  icon?: ReactNode;
  /** Child nodes */
  children?: TreeNode[];
  /** Whether the node is disabled */
  disabled?: boolean;
}

export interface TreeViewProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  /** Tree data */
  data: TreeNode[];
  /** IDs of initially expanded nodes (uncontrolled) */
  defaultExpanded?: string[];
  /** IDs of expanded nodes (controlled) */
  expanded?: string[];
  /** Called when a node is expanded/collapsed */
  onExpandChange?: (expanded: string[]) => void;
  /** Currently selected node ID */
  selected?: string | null;
  /** Called when a node is selected */
  onSelect?: (nodeId: string, node: TreeNode) => void;
  /** Size variant */
  size?: 'sm' | 'md';
  /** Show connecting lines between levels */
  showLines?: boolean;
}

const ChevronIcon = ({ expanded }: { expanded: boolean }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn(styles.chevron, expanded && styles.chevronExpanded)}
    aria-hidden="true"
  >
    <polyline points="6 4 10 8 6 12" />
  </svg>
);

interface TreeNodeItemProps {
  node: TreeNode;
  level: number;
  expanded: string[];
  selected: string | null;
  onToggle: (id: string) => void;
  onSelect: (id: string, node: TreeNode) => void;
  size: 'sm' | 'md';
  showLines: boolean;
}

function TreeNodeItem({ node, level, expanded, selected, onToggle, onSelect, size, showLines }: TreeNodeItemProps) {
  const hasChildren = node.children && node.children.length > 0;
  const isExpanded = expanded.includes(node.id);
  const isSelected = selected === node.id;

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (node.disabled) return;
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onSelect(node.id, node);
      } else if (e.key === 'ArrowRight' && hasChildren && !isExpanded) {
        e.preventDefault();
        onToggle(node.id);
      } else if (e.key === 'ArrowLeft' && hasChildren && isExpanded) {
        e.preventDefault();
        onToggle(node.id);
      }
    },
    [node, hasChildren, isExpanded, onToggle, onSelect],
  );

  return (
    <li role="treeitem" aria-expanded={hasChildren ? isExpanded : undefined} aria-selected={isSelected} aria-disabled={node.disabled || undefined}>
      <div
        className={cn(
          styles.node,
          styles[size],
          isSelected && styles.selected,
          node.disabled && styles.disabled,
          showLines && level > 0 && styles.lined,
        )}
        style={{ paddingLeft: `${level * (size === 'sm' ? 16 : 20)}px` }}
        onClick={() => {
          if (node.disabled) return;
          if (hasChildren) onToggle(node.id);
          onSelect(node.id, node);
        }}
        onKeyDown={handleKeyDown}
        tabIndex={node.disabled ? -1 : 0}
      >
        <span className={styles.toggle}>
          {hasChildren ? <ChevronIcon expanded={isExpanded} /> : <span className={styles.leaf} />}
        </span>
        {node.icon && <span className={styles.icon}>{node.icon}</span>}
        <span className={styles.label}>{node.label}</span>
      </div>
      {hasChildren && isExpanded && (
        <ul role="group" className={styles.group}>
          {node.children!.map((child) => (
            <TreeNodeItem
              key={child.id}
              node={child}
              level={level + 1}
              expanded={expanded}
              selected={selected}
              onToggle={onToggle}
              onSelect={onSelect}
              size={size}
              showLines={showLines}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

/**
 * TreeView — hierarchical data display with expand/collapse.
 *
 * Renders nested tree data with keyboard navigation, selection,
 * and optional connecting guide lines.
 *
 * Accessibility:
 * - Uses tree/treeitem/group ARIA roles
 * - Arrow keys expand/collapse nodes
 * - Enter/Space selects nodes
 * - aria-expanded on branch nodes
 */
export const TreeView = forwardRef<HTMLDivElement, TreeViewProps>(
  (
    {
      data,
      defaultExpanded = [],
      expanded: controlledExpanded,
      onExpandChange,
      selected = null,
      onSelect,
      size = 'md',
      showLines = false,
      className,
      ...props
    },
    ref,
  ) => {
    const [uncontrolledExpanded, setUncontrolledExpanded] = useState<string[]>(defaultExpanded);
    const expanded = controlledExpanded ?? uncontrolledExpanded;

    const handleToggle = useCallback(
      (id: string) => {
        const next = expanded.includes(id)
          ? expanded.filter((e) => e !== id)
          : [...expanded, id];

        if (controlledExpanded === undefined) {
          setUncontrolledExpanded(next);
        }
        onExpandChange?.(next);
      },
      [expanded, controlledExpanded, onExpandChange],
    );

    const handleSelect = useCallback(
      (id: string, node: TreeNode) => {
        onSelect?.(id, node);
      },
      [onSelect],
    );

    return (
      <div ref={ref} className={cn(styles.tree, className)} {...props}>
        <ul role="tree">
          {data.map((node) => (
            <TreeNodeItem
              key={node.id}
              node={node}
              level={0}
              expanded={expanded}
              selected={selected}
              onToggle={handleToggle}
              onSelect={handleSelect}
              size={size}
              showLines={showLines}
            />
          ))}
        </ul>
      </div>
    );
  },
);

TreeView.displayName = 'TreeView';
