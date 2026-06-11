import React from 'react';
import { cn } from '@/utils/cn';

export interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  className?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon,
  description,
  trend,
  className,
}) => {
  return (
    <div
      className={cn(
        'glass-card p-5 flex flex-col justify-between border border-white/5 bg-zinc-950/40 relative overflow-hidden',
        className
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
            {title}
          </span>
          <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-wide">
            {value}
          </h3>
        </div>
        <div className="p-3 bg-zinc-900 rounded-xl border border-white/5 text-gold-primary">
          {icon}
        </div>
      </div>

      {(trend || description) && (
        <div className="flex items-center gap-2 mt-auto">
          {trend && (
            <span
              className={cn('text-xs font-bold', {
                'text-emerald-400': trend.isPositive,
                'text-rose-400': !trend.isPositive,
              })}
            >
              {trend.isPositive ? '+' : ''}
              {trend.value}
            </span>
          )}
          {description && <span className="text-[10px] font-medium text-zinc-500">{description}</span>}
        </div>
      )}

      {/* Decorative Glow */}
      <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-gold-primary/5 rounded-full blur-2xl pointer-events-none" />
    </div>
  );
};
