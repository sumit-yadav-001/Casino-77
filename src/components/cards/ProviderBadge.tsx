import React from 'react';
import { cn } from '@/utils/cn';

export interface ProviderBadgeProps {
  name: string;
  icon: string;
  gamesCount?: number;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
}

export const ProviderBadge: React.FC<ProviderBadgeProps> = ({
  name,
  icon,
  gamesCount,
  isActive,
  onClick,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'provider-badge flex items-center justify-between gap-3 text-left w-full sm:w-auto',
        {
          'border-gold-primary bg-gold-primary/5 text-gold-primary': isActive,
        },
        className
      )}
    >
      <div className="flex items-center gap-2">
        <span className="text-base select-none leading-none">{icon}</span>
        <span className="font-bold text-[11px] uppercase tracking-wider text-zinc-100 group-hover:text-white">
          {name}
        </span>
      </div>
      {gamesCount !== undefined && (
        <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-white/5 border border-white/5 text-zinc-500">
          {gamesCount}
        </span>
      )}
    </button>
  );
};
