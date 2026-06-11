import React from 'react';
import { cn } from '@/utils/cn';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'gold' | 'success' | 'danger' | 'warning' | 'info' | 'zinc';
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = 'zinc',
  size = 'md',
  children,
  ...props
}) => {
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center font-semibold rounded-full select-none border tracking-wide uppercase',
        {
          'bg-gold-primary/10 border-gold-primary/25 text-gold-primary': variant === 'gold',
          'bg-emerald-500/10 border-emerald-500/25 text-emerald-400': variant === 'success',
          'bg-rose-500/10 border-rose-500/25 text-rose-400': variant === 'danger',
          'bg-amber-500/10 border-amber-500/25 text-amber-400': variant === 'warning',
          'bg-cyan-500/10 border-cyan-500/25 text-cyan-400': variant === 'info',
          'bg-zinc-800 border-zinc-700 text-zinc-300': variant === 'zinc',
        },
        {
          'px-2 py-0.5 text-[10px]': size === 'sm',
          'px-2.5 py-1 text-[11px]': size === 'md',
        },
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
