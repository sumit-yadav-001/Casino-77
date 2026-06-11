import React from 'react';
import { cn } from '@/utils/cn';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  suffix?: React.ReactNode;
  containerClassName?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', label, error, icon, suffix, containerClassName, ...props }, ref) => {
    return (
      <div className={cn('w-full flex flex-col gap-1.5', containerClassName)}>
        {label && (
          <label className="text-xs font-semibold text-zinc-300 leading-none">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 flex items-center pointer-events-none">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            type={type}
            className={cn(
              'w-full h-[46px] text-sm text-white px-4 rounded-lg',
              'focus:outline-none transition-all duration-200',
              'placeholder:text-zinc-600',
              'focus:border-yellow-500/60 focus:ring-1 focus:ring-yellow-500/20',
              error
                ? 'border border-red-500/60 focus:border-red-500 focus:ring-red-500/10'
                : 'border border-zinc-700/80',
              icon ? 'pl-10' : '',
              suffix ? 'pr-10' : '',
              className
            )}
            style={{
              background: 'rgba(20,12,0,0.8)',
              ...((props.style) ?? {}),
            }}
            {...props}
          />
          {suffix && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center">
              {suffix}
            </div>
          )}
        </div>
        {error && (
          <span className="text-xs text-red-400 font-medium leading-none mt-0.5">{error}</span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
