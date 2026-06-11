import React from 'react';
import { AnnouncementBar } from '@/components/shared/AnnouncementBar';
import { HeroBanner } from '@/features/dashboard/components/HeroBanner';
import { GameCategoriesSection } from '@/features/dashboard/components/GameCategoriesSection';
import { ProvidersSection } from '@/features/dashboard/components/ProvidersSection';
import { CrashSection } from '@/features/dashboard/components/CrashSection';

export const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col w-full">
      {/* Horizontal announcement scrolling text */}
      <AnnouncementBar />

      {/* Main visual carousel banner slider */}
      <HeroBanner />

      {/* Explore Games By Providers */}
      <ProvidersSection />

      {/* Two Large Cards: Live Casino and Slots */}
      <GameCategoriesSection />

      {/* Crash Game shelf */}
      <CrashSection />
    </div>
  );
};
export default HomePage;
