import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GAME_CATEGORIES } from '@/constants/categories';
import { CategoryCard } from '@/components/cards/CategoryCard';
import { ROUTES } from '@/constants/routes';

export const GameCategoriesSection: React.FC = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (slug: string) => {
    if (slug === 'live-casino') {
      navigate(ROUTES.LIVE_CASINO);
    } else if (slug === 'slots') {
      navigate(ROUTES.SLOTS);
    } else {
      navigate(ROUTES.CASINO);
    }
  };

  // Filter for the main visual categories: Live Casino and Slots
  const mainCategories = GAME_CATEGORIES.filter(
    (cat) => cat.slug === 'live-casino' || cat.slug === 'slots'
  );

  return (
    <section className="mb-10 w-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex flex-col gap-1.5 text-left">
          <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-wider">
            Game Categories
          </h2>
          <p className="text-[10px] text-zinc-500 font-semibold uppercase tracking-widest">
            Select your preferred gaming genre arena
          </p>
        </div>
      </div>

      {/* Two Large Cards Side-by-Side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mainCategories.map((category) => (
          <CategoryCard
            key={category.id}
            name={category.name}
            subtitle={category.subtitle}
            description={category.description}
            image={category.image}
            gamesCount={category.gamesCount}
            onClick={() => handleCategoryClick(category.slug)}
          />
        ))}
      </div>
    </section>
  );
};
export default GameCategoriesSection;
