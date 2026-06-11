import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { HiOutlineHeart } from 'react-icons/hi';
import { useAppDispatch, useAppSelector } from '@/hooks/useAppSelector';
import { toggleFavorite, selectFavorites } from '@/features/games/slices/gameSlice';
import { CRASH_GAMES } from '@/constants/categories';
import { GameCard } from '@/components/cards/GameCard';
import { EmptyState } from '@/components/feedback/EmptyState';
import { Button } from '@/components/ui/Button';
import { ROUTES } from '@/constants/routes';

// Mock list of all searchable games to find favourites
const ALL_GAMES = [
  ...CRASH_GAMES,
  { id: 'slot-1', name: 'Gates of Rani', provider: 'Pragmatic Play', thumbnail: '' },
  { id: 'slot-2', name: 'Sweet Bonanza', provider: 'Pragmatic Play', thumbnail: '' },
  { id: 'slot-3', name: 'Book of Dead', provider: 'Play\'n GO', thumbnail: '' },
  { id: 'slot-4', name: 'Starburst Extreme', provider: 'NetEnt', thumbnail: '' },
  { id: 'live-1', name: 'Lightning Roulette VIP', provider: 'Evolution Gaming', thumbnail: '' },
  { id: 'live-2', name: 'Infinite Blackjack', provider: 'Evolution Gaming', thumbnail: '' },
  { id: 'live-3', name: 'Andar Bahar Live', provider: 'Ezugi', thumbnail: '' },
  { id: 'live-4', name: 'Crazy Time', provider: 'Evolution Gaming', thumbnail: '' },
];

export const FavoritesPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(selectFavorites);

  const favoritedGames = ALL_GAMES.filter((g) => favorites.includes(g.id));

  const handleFavoriteToggle = (id: string, name: string) => {
    dispatch(toggleFavorite(id));
    toast.success(`${name} removed from favorites.`);
  };

  return (
    <div className="flex flex-col gap-6 text-left">
      <div className="flex flex-col gap-1.5">
        <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-wider">
          My Favorites
        </h2>
        <p className="text-[10px] text-zinc-500 font-semibold uppercase tracking-widest">
          Quickly access your highly-rated VIP casino games
        </p>
      </div>

      {favoritedGames.length > 0 ? (
        <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4.5">
          {favoritedGames.map((game) => (
            <GameCard
              key={game.id}
              id={game.id}
              name={game.name}
              thumbnail={game.thumbnail || ''}
              provider={game.provider}
              isFavorite={true}
              onFavoriteToggle={() => handleFavoriteToggle(game.id, game.name)}
              onPlay={() => toast.success(`Launching ${game.name}...`)}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No Favorites Saved"
          description="Build your personalized casino arena by tapping the heart icon on any game card in the lobby."
          icon={<HiOutlineHeart className="h-6 w-6 text-zinc-500" />}
          action={
            <Button
              variant="gold"
              onClick={() => navigate(ROUTES.CASINO)}
              className="text-xs uppercase font-extrabold tracking-widest px-6"
            >
              Open Lobby
            </Button>
          }
          className="mt-4"
        />
      )}
    </div>
  );
};
export default FavoritesPage;
