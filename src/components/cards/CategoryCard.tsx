import React from 'react';
import { HiArrowRight } from 'react-icons/hi';
import { cn } from '@/utils/cn';

export interface CategoryCardProps {
  name: string;
  subtitle: string;
  description: string;
  image: string;
  gamesCount: number;
  onClick?: () => void;
  className?: string;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  name,
  subtitle,
  description,
  image,
  gamesCount,
  onClick,
  className,
}) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        'group relative h-64 md:h-72 rounded-2xl overflow-hidden cursor-pointer border border-white/5 transition-all duration-300 hover:border-gold-primary/30',
        className
      )}
    >
      {/* Background Image */}
      <div className="absolute inset-0 bg-zinc-950">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-60"
          onError={(e) => {
            (e.target as HTMLImageElement).src = `https://placehold.co/800x600/080808/D4AF37?text=${encodeURIComponent(
              name
            )}`;
          }}
        />
        {/* Dark overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-300" />
      </div>

      {/* Content */}
      <div className="absolute inset-0 p-6 flex flex-col justify-end">
        <span className="text-[10px] font-bold text-gold-primary tracking-widest uppercase mb-1.5">
          {subtitle}
        </span>
        <h3 className="text-xl md:text-2xl font-black text-white mb-2 group-hover:text-gold-primary transition-colors duration-200 uppercase tracking-wide">
          {name}
        </h3>
        <p className="text-xs text-zinc-400 line-clamp-2 max-w-md mb-4.5 group-hover:text-zinc-300 transition-colors duration-200">
          {description}
        </p>

        <div className="flex items-center justify-between mt-1">
          <span className="text-[10px] font-bold uppercase tracking-wider bg-white/5 border border-white/8 px-2.5 py-1 rounded-full text-zinc-400">
            {gamesCount.toLocaleString()} Games
          </span>
          <div className="w-8 h-8 rounded-full border border-white/10 group-hover:border-gold-primary group-hover:bg-gold-primary group-hover:text-black flex items-center justify-center text-white transition-all duration-300">
            <HiArrowRight className="h-4 w-4" />
          </div>
        </div>
      </div>
    </div>
  );
};
