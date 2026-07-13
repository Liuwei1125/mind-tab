import React from 'react';
import { cn } from '@mindtab/shared';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, leftIcon, rightIcon, className, id, ...props }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="block text-caption text-muted mb-1.5">
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-soft">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              'w-full h-10 px-3.5 bg-canvas text-ink text-base rounded-md border transition-colors duration-150',
              'placeholder:text-muted-soft',
              'focus:outline-none focus:ring-2',
              error
                ? 'border-error focus:border-error focus:ring-error/15'
                : 'border-hairline focus:border-primary focus:ring-primary/15',
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              className
            )}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-soft">
              {rightIcon}
            </div>
          )}
        </div>
        {(error || hint) && (
          <p className={cn('mt-1.5 text-xs', error ? 'text-error' : 'text-muted-soft')}>
            {error || hint}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
