import React from 'react';
import { cn } from '@/utils/cn';

export interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon,
  action,
  className,
}) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center py-12 px-6 text-center border border-dashed border-white/5 bg-zinc-950/10 rounded-2xl',
        className
      )}
    >
      {icon && (
        <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center text-zinc-500 mb-5 border border-white/5">
          {icon}
        </div>
      )}
      <h3 className="text-sm font-extrabold text-white uppercase tracking-wider mb-2">
        {title}
      </h3>
      <p className="text-zinc-500 text-xs max-w-sm mb-6 leading-relaxed">
        {description}
      </p>
      {action && <div>{action}</div>}
    </div>
  );
};
