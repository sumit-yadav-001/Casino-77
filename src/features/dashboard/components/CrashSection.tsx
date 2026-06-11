import React from 'react';
import { toast } from 'react-hot-toast';
import { useAppDispatch, useAppSelector } from '@/hooks/useAppSelector';
import { toggleFavorite, selectFavorites } from '@/features/games/slices/gameSlice';
import { CRASH_GAMES } from '@/constants/categories';
import { GameCard } from '@/components/cards/GameCard';

export const CrashSection: React.FC = () => {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(selectFavorites);

  const handleFavoriteToggle = (id: string, name: string) => {
    dispatch(toggleFavorite(id));
    const isNowFavorite = !favorites.includes(id);
    if (isNowFavorite) {
      toast.success(`${name} added to favorites!`);
    } else {
      toast.success(`${name} removed from favorites.`);
    }
  };

  const handlePlayGame = (name: string) => {
    toast.error(`Opening ${name} requires session validation. Please complete KYC status.`, {
      icon: '🔒',
    });
  };

  return (
    <section className="mb-10 w-full text-left">
      <div className="flex flex-col gap-2.5 max-w-4xl mb-6">
        <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-wider">
          Crash Special <span className="text-gold-primary">Games</span>
        </h2>
        <p className="text-xs text-zinc-400 font-medium leading-relaxed">
          Crash is one of the most exciting and fast-paced casino games where timing is everything. In this game, a multiplier starts increasing from 1x and keeps rising higher and higher. Your goal is to cash out before the game crashes.
        </p>
      </div>

      {/* Grid of Crash Games */}
      <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-5 gap-4.5">
        {CRASH_GAMES.map((game) => (
          <GameCard
            key={game.id}
            id={game.id}
            name={game.name}
            thumbnail={game.thumbnail}
            provider={game.provider}
            isFavorite={favorites.includes(game.id)}
            onFavoriteToggle={() => handleFavoriteToggle(game.id, game.name)}
            onPlay={() => handlePlayGame(game.name)}
          />
        ))}
      </div>
    </section>
  );
};
export default CrashSection;
