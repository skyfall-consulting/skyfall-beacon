import { useState, useRef, useCallback, type ReactNode, type KeyboardEvent } from 'react';
import { cn } from '../../utils/cn';
import styles from './Tabs.module.css';

export interface Tab {
  id: string;
  label: string;
  content: ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  /** Tab definitions */
  tabs: Tab[];
  /** Controlled active tab id */
  activeTab?: string;
  /** Callback when tab changes */
  onTabChange?: (id: string) => void;
  /** Additional className for the wrapper */
  className?: string;
}

/**
 * Tabs — tabbed interface for switching between content panels.
 *
 * Accessibility:
 * - Full WAI-ARIA tabs pattern: role="tablist", role="tab", role="tabpanel"
 * - Arrow key navigation between tabs
 * - Home/End keys jump to first/last tab
 * - aria-selected, aria-controls, aria-labelledby for AT relationships
 * - Only active panel is in the tab order (tabIndex=0 on active tab)
 */
export function Tabs({ tabs, activeTab, onTabChange, className }: TabsProps) {
  const [internalActive, setInternalActive] = useState(tabs[0]?.id ?? '');
  const tabListRef = useRef<HTMLDivElement>(null);

  const active = activeTab ?? internalActive;

  const setActive = useCallback(
    (id: string) => {
      if (!activeTab) setInternalActive(id);
      onTabChange?.(id);
    },
    [activeTab, onTabChange],
  );

  const enabledTabs = tabs.filter((t) => !t.disabled);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const currentIndex = enabledTabs.findIndex((t) => t.id === active);
      let nextIndex = currentIndex;

      switch (e.key) {
        case 'ArrowRight':
          nextIndex = (currentIndex + 1) % enabledTabs.length;
          break;
        case 'ArrowLeft':
          nextIndex = (currentIndex - 1 + enabledTabs.length) % enabledTabs.length;
          break;
        case 'Home':
          nextIndex = 0;
          break;
        case 'End':
          nextIndex = enabledTabs.length - 1;
          break;
        default:
          return;
      }

      e.preventDefault();
      const nextTab = enabledTabs[nextIndex];
      setActive(nextTab.id);

      const button = tabListRef.current?.querySelector(`[data-tab-id="${nextTab.id}"]`) as HTMLElement;
      button?.focus();
    },
    [active, enabledTabs, setActive],
  );

  const activePanel = tabs.find((t) => t.id === active);

  return (
    <div className={cn(styles.wrapper, className)}>
      <div
        ref={tabListRef}
        role="tablist"
        className={styles.tabList}
        onKeyDown={handleKeyDown}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            data-tab-id={tab.id}
            id={`tab-${tab.id}`}
            className={cn(styles.tab, tab.id === active && styles.active)}
            aria-selected={tab.id === active}
            aria-controls={`panel-${tab.id}`}
            tabIndex={tab.id === active ? 0 : -1}
            disabled={tab.disabled}
            onClick={() => setActive(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {activePanel && (
        <div
          key={activePanel.id}
          role="tabpanel"
          id={`panel-${activePanel.id}`}
          aria-labelledby={`tab-${activePanel.id}`}
          className={styles.panel}
          tabIndex={0}
        >
          {activePanel.content}
        </div>
      )}
    </div>
  );
}
