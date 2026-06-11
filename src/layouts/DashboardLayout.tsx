import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { MobileDrawer } from './MobileDrawer';
import { ScrollToTop } from '@/components/shared/ScrollToTop';

export const DashboardLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-zinc-950 flex">
      {/* Scroll indicator route listener */}
      <ScrollToTop />

      {/* Desktop Sidebar (Fixed left) */}
      <Sidebar />

      {/* Mobile Sidebar Navigation Drawer */}
      <MobileDrawer />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col md:pl-64 min-h-screen">
        {/* Top Header/Navbar */}
        <Header />

        {/* Content Outlet */}
        <main className="flex-1 p-4 md:p-8 flex flex-col max-w-[1600px] w-full mx-auto">
          <Outlet />
        </main>

        {/* Footer info banner */}
        <footer className="py-6 px-4 md:px-8 border-t border-white/5 text-center text-[10px] font-bold text-zinc-600 uppercase tracking-widest bg-zinc-950">
          © {new Date().getFullYear()} Rani555 Casino. All Rights Reserved. Be Responsible.
        </footer>
      </div>
    </div>
  );
};
