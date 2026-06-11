import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GAME_PROVIDERS, PROVIDER_ICONS } from '@/constants/providers';
import { ProviderBadge } from '@/components/cards/ProviderBadge';
import { ROUTES } from '@/constants/routes';

export const ProvidersPage: React.FC = () => {
  const navigate = useNavigate();

  const handleProviderSelect = (slug: string) => {
    navigate(`${ROUTES.CASINO}?provider=${slug}`);
  };

  return (
    <div className="flex flex-col gap-6 text-left">
      <div className="flex flex-col gap-1.5">
        <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-wider">
          Game Providers
        </h2>
        <p className="text-[10px] text-zinc-500 font-semibold uppercase tracking-widest">
          Discover games powered by our trusted industry gaming developers
        </p>
      </div>

      <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3.5 mt-2">
        {GAME_PROVIDERS.map((provider) => (
          <div
            key={provider.id}
            className="flex flex-col justify-between p-4.5 bg-zinc-900/40 border border-white/5 hover:border-gold-primary/25 rounded-2xl transition-all duration-300 relative overflow-hidden group hover:shadow-gold"
          >
            <div className="flex items-center gap-3.5 mb-6">
              <span className="text-3xl select-none leading-none">
                {PROVIDER_ICONS[provider.slug] || '🎮'}
              </span>
              <div className="flex flex-col">
                <h4 className="text-xs font-black text-white uppercase tracking-wide truncate group-hover:text-gold-primary transition-colors">
                  {provider.name}
                </h4>
                <span className="text-[9.5px] font-bold text-zinc-500 uppercase tracking-widest mt-0.5">
                  Partner Certified
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between mt-auto">
              <span className="text-[10px] font-black uppercase text-zinc-400 bg-white/5 border border-white/8 px-2.5 py-1 rounded-full">
                {provider.gamesCount} Games
              </span>
              <button
                onClick={() => handleProviderSelect(provider.slug)}
                className="text-xs font-extrabold uppercase tracking-wider text-gold-primary hover:text-gold-secondary transition-colors cursor-pointer"
              >
                Launch Lobby
              </button>
            </div>

            {/* Decorative background glow */}
            <div className="absolute -right-4 -bottom-4 w-14 h-14 bg-gold-primary/5 rounded-full blur-xl pointer-events-none group-hover:bg-gold-primary/10 transition-colors" />
          </div>
        ))}
      </div>
    </div>
  );
};
export default ProvidersPage;
