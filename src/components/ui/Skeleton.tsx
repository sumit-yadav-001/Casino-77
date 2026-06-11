import React from 'react';
import { cn } from '@/utils/cn';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Skeleton: React.FC<SkeletonProps> = ({ className, ...props }) => {
  return (
    <div
      className={cn(
        'skeleton w-full h-4 bg-zinc-900 rounded-md overflow-hidden relative',
        className
      )}
      {...props}
    />
  );
};
