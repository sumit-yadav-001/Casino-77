import React from 'react';
import { HiHeart, HiOutlineHeart, HiPlay } from 'react-icons/hi';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

export interface GameCardProps {
  id: string;
  name: string;
  thumbnail: string;
  provider: string;
  isFavorite?: boolean;
  onFavoriteToggle?: (e: React.MouseEvent) => void;
  onPlay?: () => void;
  className?: string;
}

export const GameCard: React.FC<GameCardProps> = ({
  name,
  thumbnail,
  provider,
  isFavorite,
  onFavoriteToggle,
  onPlay,
  className,
}) => {
  return (
    <div
      onClick={onPlay}
      className={cn(
        'group relative flex flex-col bg-zinc-900 border border-white/5 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:border-gold-primary/30 hover:shadow-gold',
        className
      )}
    >
      {/* Thumbnail */}
      <div className="relative aspect-square overflow-hidden bg-zinc-950">
        <img
          src={thumbnail}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            // fallback text-logo if image fails
            (e.target as HTMLImageElement).src = `https://placehold.co/300x300/111/D4AF37?text=${encodeURIComponent(
              name
            )}`;
          }}
        />

        {/* Hover Action Overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <motion.div
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
            className="w-12 h-12 rounded-full bg-gradient-to-b from-gold-secondary to-gold-primary flex items-center justify-center text-black shadow-lg shadow-black/40"
          >
            <HiPlay className="h-6 w-6 ml-0.5" />
          </motion.div>
        </div>

        {/* Favorite Icon */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            if (onFavoriteToggle) onFavoriteToggle(e);
          }}
          className="absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-full bg-black/60 border border-white/5 flex items-center justify-center text-zinc-400 hover:text-red-500 hover:bg-black transition-all duration-200 cursor-pointer"
        >
          {isFavorite ? (
            <HiHeart className="h-4.5 w-4.5 text-red-500" />
          ) : (
            <HiOutlineHeart className="h-4.5 w-4.5" />
          )}
        </button>
      </div>

      {/* Details */}
      <div className="p-3 bg-zinc-950/40 flex flex-col gap-0.5">
        <h4 className="text-xs font-bold text-white truncate group-hover:text-gold-primary transition-colors duration-200">
          {name}
        </h4>
        <span className="text-[10px] font-semibold text-zinc-500 truncate uppercase tracking-wider">
          {provider}
        </span>
      </div>
    </div>
  );
};
