import React from 'react';
import { cn } from '@/utils/cn';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'gold' | 'outline' | 'ghost' | 'danger' | 'glass';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, variant = 'gold', size = 'md', isLoading, disabled, style, ...props }, ref) => {
    const goldStyle =
      variant === 'gold'
        ? {
            background: 'linear-gradient(180deg, #F4C542 0%, #D4A017 100%)',
            ...style,
          }
        : style;

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        style={goldStyle}
        className={cn(
          'relative inline-flex items-center justify-center font-semibold transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:pointer-events-none focus:outline-none cursor-pointer select-none',
          {
            'text-black hover:brightness-110 rounded-lg': variant === 'gold',
            'border border-white/10 hover:border-yellow-500/40 text-white hover:text-yellow-400 hover:bg-yellow-500/5 rounded-lg': variant === 'outline',
            'text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg': variant === 'ghost',
            'bg-red-600 hover:bg-red-700 text-white rounded-lg': variant === 'danger',
            'bg-white/5 backdrop-blur-md border border-white/8 hover:bg-white/10 text-white rounded-lg': variant === 'glass',
          },
          {
            'px-3 py-1.5 text-xs': size === 'sm',
            'px-5 py-2.5 text-sm': size === 'md',
            'px-6 py-3.5 text-base': size === 'lg',
            'h-10 w-10 p-0': size === 'icon',
          },
          className
        )}
        {...props}
      >
        {isLoading && (
          <svg
            className={cn(
              'animate-spin h-4 w-4 mr-2 shrink-0',
              variant === 'gold' ? 'text-black/70' : 'text-yellow-500'
            )}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
