import React from 'react';
import { cn } from '@/utils/cn';

export interface LogoProps {
  className?: string;
  onClick?: () => void;
}

export const Logo: React.FC<LogoProps> = ({ className, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        'flex items-center gap-2 select-none cursor-pointer',
        className
      )}
    >
      <div className="relative flex items-center justify-center w-8.5 h-8.5 rounded-lg border border-gold-primary/30 bg-zinc-950 shadow-gold overflow-hidden">
        {/* Crown/Ornate icon */}
        <span className="text-sm font-extrabold text-gold-primary select-none mt-0.5">R</span>
        {/* Shine background effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_3s_infinite]" />
      </div>

      <div className="flex flex-col font-['Outfit']">
        <h1 className="text-sm font-black tracking-[0.18em] uppercase text-white leading-none">
          Rani<span className="text-gold-primary">555</span>
        </h1>
        <span className="text-[7.5px] font-extrabold text-zinc-500 uppercase tracking-[0.25em] leading-none mt-1">
          Premium Casino
        </span>
      </div>
    </div>
  );
};
