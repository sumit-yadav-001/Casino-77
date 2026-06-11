import React from 'react';
import { Skeleton } from '../ui/Skeleton';
import { cn } from '@/utils/cn';

export interface SkeletonLoaderProps {
  variant?: 'game-grid' | 'provider-list' | 'transactions-table';
  count?: number;
  className?: string;
}

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  variant = 'game-grid',
  count = 6,
  className,
}) => {
  if (variant === 'game-grid') {
    return (
      <div
        className={cn(
          'grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-4.5',
          className
        )}
      >
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="bg-zinc-900/40 border border-white/5 rounded-xl overflow-hidden p-0 flex flex-col"
          >
            <Skeleton className="w-full aspect-square rounded-none mb-3" />
            <div className="p-3 flex flex-col gap-2">
              <Skeleton className="w-4/5 h-3.5" />
              <Skeleton className="w-1/2 h-2.5" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (variant === 'provider-list') {
    return (
      <div className={cn('flex flex-wrap gap-3.5', className)}>
        {Array.from({ length: count }).map((_, i) => (
          <Skeleton key={i} className="h-10 w-28 rounded-full" />
        ))}
      </div>
    );
  }

  if (variant === 'transactions-table') {
    return (
      <div className={cn('flex flex-col gap-3', className)}>
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="flex gap-4 p-4 bg-zinc-900/20 border border-white/5 rounded-xl">
            <Skeleton className="w-12 h-4" />
            <Skeleton className="flex-1 h-4" />
            <Skeleton className="w-20 h-4" />
            <Skeleton className="w-24 h-4" />
          </div>
        ))}
      </div>
    );
  }

  return null;
};
