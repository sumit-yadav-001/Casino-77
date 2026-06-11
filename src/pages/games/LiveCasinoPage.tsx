import React from 'react';
import { toast } from 'react-hot-toast';
import { useAppDispatch, useAppSelector } from '@/hooks/useAppSelector';
import { toggleFavorite, selectFavorites } from '@/features/games/slices/gameSlice';
import { GameCard } from '@/components/cards/GameCard';

const MOCK_LIVE_GAMES = [
  { id: 'live-1', name: 'Lightning Roulette VIP', provider: 'Evolution Gaming', thumbnail: '' },
  { id: 'live-2', name: 'Infinite Blackjack', provider: 'Evolution Gaming', thumbnail: '' },
  { id: 'live-3', name: 'Andar Bahar Live', provider: 'Ezugi', thumbnail: '' },
  { id: 'live-4', name: 'Crazy Time', provider: 'Evolution Gaming', thumbnail: '' },
  { id: 'live-5', name: 'Super Sic Bo Live', provider: 'Evolution Gaming', thumbnail: '' },
  { id: 'live-6', name: 'Teen Patti Live', provider: 'Ezugi', thumbnail: '' },
  { id: 'live-7', name: 'Immersive Roulette', provider: 'Evolution Gaming', thumbnail: '' },
  { id: 'live-8', name: 'Baccarat Squeeze', provider: 'Evolution Gaming', thumbnail: '' },
];

export const LiveCasinoPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(selectFavorites);

  const handleFavoriteToggle = (id: string, name: string) => {
    dispatch(toggleFavorite(id));
    const isNowFavorite = !favorites.includes(id);
    if (isNowFavorite) {
      toast.success(`${name} added to favorites`);
    } else {
      toast.success(`${name} removed from favorites`);
    }
  };

  return (
    <div className="flex flex-col gap-6 text-left">
      <div className="flex flex-col gap-1.5">
        <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-wider">
          Live Casino
        </h2>
        <p className="text-[10px] text-zinc-500 font-semibold uppercase tracking-widest">
          Immerse yourself with real-time dealers and VIP VIP casino lobby tables
        </p>
      </div>

      <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4.5">
        {MOCK_LIVE_GAMES.map((game) => (
          <GameCard
            key={game.id}
            id={game.id}
            name={game.name}
            thumbnail={game.thumbnail}
            provider={game.provider}
            isFavorite={favorites.includes(game.id)}
            onFavoriteToggle={() => handleFavoriteToggle(game.id, game.name)}
            onPlay={() => toast.success(`Launching live casino stream: ${game.name}...`)}
          />
        ))}
      </div>
    </div>
  );
};
export default LiveCasinoPage;
