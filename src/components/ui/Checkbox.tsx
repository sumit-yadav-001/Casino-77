import React from 'react';
import { cn } from '@/utils/cn';

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  error?: string;
  containerClassName?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, error, containerClassName, ...props }, ref) => {
    return (
      <div className={cn('flex flex-col gap-1', containerClassName)}>
        <label className="inline-flex items-start gap-2.5 cursor-pointer select-none">
          <input
            ref={ref}
            type="checkbox"
            className={cn(
              'mt-1 h-4.5 w-4.5 rounded border border-zinc-800 bg-zinc-900 text-gold-primary transition-all duration-300 focus:ring-0 focus:ring-offset-0 accent-gold-primary cursor-pointer',
              className
            )}
            {...props}
          />
          {label && (
            <span className="text-xs text-zinc-400 font-medium select-none pt-0.5 leading-relaxed">
              {label}
            </span>
          )}
        </label>
        {error && <span className="text-xs text-red-500 font-medium ml-7">{error}</span>}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
