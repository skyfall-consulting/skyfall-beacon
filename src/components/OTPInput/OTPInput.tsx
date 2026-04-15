import { useCallback, useRef, useEffect, type KeyboardEvent, type ClipboardEvent } from 'react';
import { cn } from '../../utils/cn';
import styles from './OTPInput.module.css';

export interface OTPInputProps {
  /** Number of OTP digits */
  length?: number;
  /** Current value string */
  value?: string;
  /** Change handler — receives the full OTP string */
  onChange?: (value: string) => void;
  /** Error state */
  error?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Auto-focus first input on mount */
  autoFocus?: boolean;
  /** Additional CSS class */
  className?: string;
}

/**
 * OTPInput — code/OTP input with separate boxes that auto-advance.
 *
 * Accessibility:
 * - Each digit input has aria-label describing its position
 * - Supports keyboard navigation (Backspace moves to previous)
 * - Paste support fills all boxes at once
 * - Error state communicated via aria-invalid
 */
export function OTPInput({
  length = 6,
  value = '',
  onChange,
  error = false,
  disabled = false,
  autoFocus = false,
  className,
}: OTPInputProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (autoFocus && inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [autoFocus]);

  const focusInput = useCallback((index: number) => {
    if (index >= 0 && index < length) {
      inputRefs.current[index]?.focus();
      inputRefs.current[index]?.select();
    }
  }, [length]);

  const updateValue = useCallback(
    (newValue: string) => {
      onChange?.(newValue.slice(0, length));
    },
    [onChange, length],
  );

  const handleInput = useCallback(
    (index: number, digit: string) => {
      if (!/^\d$/.test(digit)) return;

      const chars = value.split('');
      // Fill any gaps with empty strings
      while (chars.length < length) chars.push('');
      chars[index] = digit;
      updateValue(chars.join(''));

      // Auto-advance to next input
      if (index < length - 1) {
        focusInput(index + 1);
      }
    },
    [value, length, updateValue, focusInput],
  );

  const handleKeyDown = useCallback(
    (index: number, e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Backspace') {
        e.preventDefault();
        const chars = value.split('');
        while (chars.length < length) chars.push('');

        if (chars[index]) {
          chars[index] = '';
          updateValue(chars.join(''));
        } else if (index > 0) {
          chars[index - 1] = '';
          updateValue(chars.join(''));
          focusInput(index - 1);
        }
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        focusInput(index - 1);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        focusInput(index + 1);
      }
    },
    [value, length, updateValue, focusInput],
  );

  const handlePaste = useCallback(
    (e: ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
      if (pasted) {
        updateValue(pasted);
        focusInput(Math.min(pasted.length, length - 1));
      }
    },
    [length, updateValue, focusInput],
  );

  return (
    <div className={cn(styles.wrapper, error && styles.error, disabled && styles.disabled, className)} role="group" aria-label="One-time password">
      {Array.from({ length }, (_, i) => (
        <input
          key={i}
          ref={(el) => { inputRefs.current[i] = el; }}
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={1}
          className={styles.digit}
          value={value[i] || ''}
          onChange={(e) => {
            const v = e.target.value;
            if (v.length <= 1) handleInput(i, v);
          }}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={handlePaste}
          onFocus={(e) => e.target.select()}
          disabled={disabled}
          aria-label={`Digit ${i + 1} of ${length}`}
          aria-invalid={error || undefined}
        />
      ))}
    </div>
  );
}
