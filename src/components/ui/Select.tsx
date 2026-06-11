import React from 'react';
import { cn } from '@/utils/cn';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: SelectOption[];
  containerClassName?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, options, containerClassName, placeholder, ...props }, ref) => {
    return (
      <div className={cn('w-full flex flex-col gap-1.5', containerClassName)}>
        {label && (
          <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            className={cn(
              'w-full bg-zinc-900 border border-zinc-800 text-sm text-white px-4 py-3 rounded-lg focus:outline-none transition-all duration-300 appearance-none cursor-pointer',
              'placeholder:text-zinc-600 focus:border-gold-primary/60 focus:ring-1 focus:ring-gold-primary/20',
              {
                'border-red-500/60 focus:border-red-500 focus:ring-red-500/10': !!error,
              },
              className
            )}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-zinc-950 text-white">
                {opt.label}
              </option>
            ))}
          </select>
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500">
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
        {error && <span className="text-xs text-red-500 font-medium mt-0.5">{error}</span>}
      </div>
    );
  }
);

Select.displayName = 'Select';
