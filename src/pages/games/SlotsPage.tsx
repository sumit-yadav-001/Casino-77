import React from 'react';
import { toast } from 'react-hot-toast';
import { useAppDispatch, useAppSelector } from '@/hooks/useAppSelector';
import { toggleFavorite, selectFavorites } from '@/features/games/slices/gameSlice';
import { GameCard } from '@/components/cards/GameCard';

const MOCK_SLOT_GAMES = [
  { id: 'slot-1', name: 'Gates of Rani', provider: 'Pragmatic Play', thumbnail: '' },
  { id: 'slot-2', name: 'Sweet Bonanza', provider: 'Pragmatic Play', thumbnail: '' },
  { id: 'slot-3', name: 'Book of Dead', provider: 'Play\'n GO', thumbnail: '' },
  { id: 'slot-4', name: 'Starburst Extreme', provider: 'NetEnt', thumbnail: '' },
  { id: 'slot-5', name: 'Legacy of Dead', provider: 'Play\'n GO', thumbnail: '' },
  { id: 'slot-6', name: 'Gonzo\'s Quest Megaways', provider: 'Red Tiger', thumbnail: '' },
  { id: 'slot-7', name: 'Fire Joker', provider: 'Play\'n GO', thumbnail: '' },
  { id: 'slot-8', name: 'Rise of Olympus', provider: 'Play\'n GO', thumbnail: '' },
];

export const SlotsPage: React.FC = () => {
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
          Slot Games
        </h2>
        <p className="text-[10px] text-zinc-500 font-semibold uppercase tracking-widest">
          Spin 3000+ premium slots featuring massive progressive jackpots
        </p>
      </div>

      <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4.5">
        {MOCK_SLOT_GAMES.map((game) => (
          <GameCard
            key={game.id}
            id={game.id}
            name={game.name}
            thumbnail={game.thumbnail}
            provider={game.provider}
            isFavorite={favorites.includes(game.id)}
            onFavoriteToggle={() => handleFavoriteToggle(game.id, game.name)}
            onPlay={() => toast.success(`Launching slots: ${game.name}...`)}
          />
        ))}
      </div>
    </div>
  );
};
export default SlotsPage;
