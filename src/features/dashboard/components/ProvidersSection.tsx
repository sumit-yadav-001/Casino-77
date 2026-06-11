import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GAME_PROVIDERS, PROVIDER_ICONS } from '@/constants/providers';
import { ProviderBadge } from '@/components/cards/ProviderBadge';
import { ROUTES } from '@/constants/routes';

export const ProvidersSection: React.FC = () => {
  const navigate = useNavigate();

  const handleProviderClick = (slug: string) => {
    navigate(`${ROUTES.PROVIDERS}?provider=${slug}`);
  };

  return (
    <section className="mb-10 w-full">
      <div className="flex flex-col gap-1.5 mb-6 text-left">
        <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-wider">
          Explore Games From <span className="text-gold-primary">Providers</span>
        </h2>
        <p className="text-[10px] text-zinc-500 font-semibold uppercase tracking-widest">
          Industry leading gaming providers you can always trust
        </p>
      </div>

      {/* Grid of Provider Badges */}
      <div className="grid grid-cols-2 xs:grid-cols-3 sm:flex sm:flex-wrap gap-3">
        {GAME_PROVIDERS.map((provider) => (
          <ProviderBadge
            key={provider.id}
            name={provider.name}
            icon={PROVIDER_ICONS[provider.slug] || '🎮'}
            gamesCount={provider.gamesCount}
            onClick={() => handleProviderClick(provider.slug)}
            className="flex-1 sm:flex-initial"
          />
        ))}
      </div>
    </section>
  );
};
export default ProvidersSection;
