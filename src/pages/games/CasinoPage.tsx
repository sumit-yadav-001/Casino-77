import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAppDispatch, useAppSelector } from '@/hooks/useAppSelector';
import { toggleFavorite, selectFavorites } from '@/features/games/slices/gameSlice';
import { GAME_PROVIDERS } from '@/constants/providers';
import { CRASH_GAMES } from '@/constants/categories';
import { GameCard } from '@/components/cards/GameCard';
import { SearchInput } from '@/components/ui/SearchInput';

// Mock some slots and live games for richer gameplay list
const MOCK_GAMES = [
  ...CRASH_GAMES,
  { id: 'slot-1', name: 'Gates of Rani', thumbnail: '', provider: 'Pragmatic Play', category: 'slots' },
  { id: 'slot-2', name: 'Sweet Bonanza', thumbnail: '', provider: 'Pragmatic Play', category: 'slots' },
  { id: 'slot-3', name: 'Book of Dead', thumbnail: '', provider: 'Play\'n GO', category: 'slots' },
  { id: 'slot-4', name: 'Starburst Extreme', thumbnail: '', provider: 'NetEnt', category: 'slots' },
  { id: 'live-1', name: 'Lightning Roulette VIP', thumbnail: '', provider: 'Evolution Gaming', category: 'live-casino' },
  { id: 'live-2', name: 'Infinite Blackjack', thumbnail: '', provider: 'Evolution Gaming', category: 'live-casino' },
  { id: 'live-3', name: 'Andar Bahar Live', thumbnail: '', provider: 'Ezugi', category: 'live-casino' },
  { id: 'live-4', name: 'Crazy Time', thumbnail: '', provider: 'Evolution Gaming', category: 'live-casino' },
];

export const CasinoPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(selectFavorites);

  const searchVal = searchParams.get('search') || '';
  const providerFilter = searchParams.get('provider') || 'all';

  const handleFavoriteToggle = (id: string, name: string) => {
    dispatch(toggleFavorite(id));
    const isNowFavorite = !favorites.includes(id);
    if (isNowFavorite) {
      toast.success(`${name} added to favorites`);
    } else {
      toast.success(`${name} removed from favorites`);
    }
  };

  const handleSearch = (val: string) => {
    if (val) {
      setSearchParams({ search: val, provider: providerFilter });
    } else {
      setSearchParams({ provider: providerFilter });
    }
  };

  const handleProviderSelect = (slug: string) => {
    if (slug === 'all') {
      if (searchVal) setSearchParams({ search: searchVal });
      else setSearchParams({});
    } else {
      if (searchVal) setSearchParams({ search: searchVal, provider: slug });
      else setSearchParams({ provider: slug });
    }
  };

  // Filter games based on search query and provider
  const filteredGames = MOCK_GAMES.filter((game) => {
    const matchesSearch = game.name.toLowerCase().includes(searchVal.toLowerCase()) ||
                          game.provider.toLowerCase().includes(searchVal.toLowerCase());
    const matchesProvider = providerFilter === 'all' || game.provider.toLowerCase().includes(providerFilter.replace('-', ' ').toLowerCase());
    return matchesSearch && matchesProvider;
  });

  return (
    <div className="flex flex-col gap-6 text-left">
      <div className="flex flex-col gap-1.5">
        <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-wider">
          Games Lobby
        </h2>
        <p className="text-[10px] text-zinc-500 font-semibold uppercase tracking-widest">
          Find your next big win across slots, live tables and crash arenas
        </p>
      </div>

      {/* Filter panel */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between border border-white/5 bg-zinc-950/40 p-4 rounded-xl">
        <div className="w-full sm:max-w-xs">
          <SearchInput value={searchVal} onChange={handleSearch} placeholder="Filter by name/provider..." />
        </div>

        <div className="w-full sm:w-auto flex gap-2 overflow-x-auto hide-scrollbar pb-1 sm:pb-0">
          <button
            onClick={() => handleProviderSelect('all')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider border transition-all ${
              providerFilter === 'all'
                ? 'border-gold-primary bg-gold-primary/5 text-gold-primary'
                : 'border-white/5 bg-zinc-900 text-zinc-400 hover:text-white'
            }`}
          >
            All Providers
          </button>
          {GAME_PROVIDERS.slice(0, 5).map((p) => (
            <button
              key={p.id}
              onClick={() => handleProviderSelect(p.slug)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider border transition-all whitespace-nowrap ${
                providerFilter === p.slug
                  ? 'border-gold-primary bg-gold-primary/5 text-gold-primary'
                  : 'border-white/5 bg-zinc-900 text-zinc-400 hover:text-white'
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      {/* Games list grid */}
      {filteredGames.length > 0 ? (
        <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4.5">
          {filteredGames.map((game) => (
            <GameCard
              key={game.id}
              id={game.id}
              name={game.name}
              thumbnail={game.thumbnail}
              provider={game.provider}
              isFavorite={favorites.includes(game.id)}
              onFavoriteToggle={() => handleFavoriteToggle(game.id, game.name)}
              onPlay={() => toast.success(`Launching ${game.name}...`)}
            />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center border border-white/5 bg-zinc-900/10 rounded-2xl flex flex-col items-center justify-center">
          <span className="text-4xl mb-4">🎰</span>
          <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-1">No Games Found</h3>
          <p className="text-zinc-500 text-xs">Try adjusting your filters or search queries.</p>
        </div>
      )}
    </div>
  );
};
export default CasinoPage;
