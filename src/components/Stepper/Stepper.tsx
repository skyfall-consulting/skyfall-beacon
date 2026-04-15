import { cn } from '../../utils/cn';
import styles from './Stepper.module.css';

export interface StepperStep {
  label: string;
  description?: string;
}

export interface StepperProps {
  /** Array of step definitions */
  steps: StepperStep[];
  /** Currently active step (0-indexed) */
  activeStep: number;
  /** Layout orientation */
  orientation?: 'horizontal' | 'vertical';
  /** Callback when a step is clicked */
  onStepClick?: (stepIndex: number) => void;
  /** Additional CSS class */
  className?: string;
}

/**
 * Stepper — multi-step form progress indicator.
 *
 * Accessibility:
 * - Uses role="navigation" with aria-label
 * - Each step is a button (when clickable) or div with aria-current="step"
 * - Completed steps indicated via visual checkmark and sr-only text
 * - Step descriptions provide additional context
 */
export function Stepper({
  steps,
  activeStep,
  orientation = 'horizontal',
  onStepClick,
  className,
}: StepperProps) {
  return (
    <nav
      className={cn(styles.stepper, styles[orientation], className)}
      aria-label="Progress"
    >
      <ol className={styles.list}>
        {steps.map((step, index) => {
          const isCompleted = index < activeStep;
          const isCurrent = index === activeStep;
          const isClickable = Boolean(onStepClick);

          const stepContent = (
            <>
              <span
                className={cn(
                  styles.indicator,
                  isCompleted && styles.indicatorCompleted,
                  isCurrent && styles.indicatorCurrent,
                )}
              >
                {isCompleted ? (
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M3 7l3 3 5-5" />
                  </svg>
                ) : (
                  <span aria-hidden="true">{index + 1}</span>
                )}
              </span>
              <span className={styles.content}>
                <span className={cn(styles.label, isCurrent && styles.labelCurrent)}>
                  {step.label}
                </span>
                {step.description && (
                  <span className={styles.description}>{step.description}</span>
                )}
              </span>
              {isCompleted && <span className={styles.srOnly}>(completed)</span>}
              {isCurrent && <span className={styles.srOnly}>(current step)</span>}
            </>
          );

          return (
            <li key={index} className={cn(styles.step, index < steps.length - 1 && styles.stepWithConnector)}>
              {isClickable ? (
                <button
                  type="button"
                  className={styles.stepButton}
                  onClick={() => onStepClick?.(index)}
                  aria-current={isCurrent ? 'step' : undefined}
                >
                  {stepContent}
                </button>
              ) : (
                <div
                  className={styles.stepButton}
                  aria-current={isCurrent ? 'step' : undefined}
                >
                  {stepContent}
                </div>
              )}
              {index < steps.length - 1 && (
                <span
                  className={cn(styles.connector, isCompleted && styles.connectorCompleted)}
                  aria-hidden="true"
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
