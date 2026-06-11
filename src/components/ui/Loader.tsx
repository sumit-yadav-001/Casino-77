import React from 'react';
import { cn } from '@/utils/cn';

export interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  fullScreen?: boolean;
}

export const Loader: React.FC<LoaderProps> = ({ size = 'md', className, fullScreen }) => {
  const loader = (
    <div className={cn('flex flex-col items-center justify-center gap-3', className)}>
      <div
        className={cn(
          'animate-spin rounded-full border-t-2 border-b-2 border-gold-primary',
          {
            'h-6 w-6': size === 'sm',
            'h-10 w-10': size === 'md',
            'h-16 w-16': size === 'lg',
          }
        )}
      />
      <span className="text-[10px] uppercase font-bold tracking-widest text-gold-primary/70 animate-pulse">
        Loading RANI555
      </span>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950">
        {loader}
      </div>
    );
  }

  return loader;
};
