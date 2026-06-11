import React from 'react';
import { Outlet, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { HiArrowLeft } from 'react-icons/hi';
import { useAppSelector } from '@/hooks/useAppSelector';
import { selectIsAuthenticated } from '@/features/auth/slices/authSlice';
import { ROUTES } from '@/constants/routes';
import { ScrollToTop } from '@/components/shared/ScrollToTop';

export const AuthLayout: React.FC = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const location = useLocation();
  const navigate = useNavigate();

  if (isAuthenticated) {
    return <Navigate to={ROUTES.DASHBOARD} state={{ from: location }} replace />;
  }

  return (
    <div className="min-h-screen w-full flex overflow-hidden" style={{ background: '#0a0600' }}>
      <ScrollToTop />

      {/* ── LEFT PANEL: form card ──────────────────────────────── */}
      <div
        className="relative w-full md:w-[380px] lg:w-[400px] min-h-screen flex flex-col justify-center z-20"
        style={{ background: 'rgba(5,3,0,0.92)' }}
      >
        {/* Back button */}
        <button
          type="button"
          onClick={() => navigate(-1)}
          aria-label="Go back"
          className="absolute top-5 left-5 w-9 h-9 rounded-full flex items-center justify-center border border-white/10 bg-black/40 text-white/60 hover:text-white hover:border-white/25 hover:bg-black/60 transition-all duration-200 cursor-pointer z-10"
        >
          <HiArrowLeft className="w-4 h-4" />
        </button>

        {/* RANI555 logo — centered top */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 flex flex-col items-center select-none pointer-events-none">
          <span className="text-2xl leading-none">👑</span>
          <span className="text-lg font-black tracking-widest text-white mt-0.5 font-serif">
            RANI<span className="text-yellow-500">555</span>
          </span>
          <span className="text-[7px] font-semibold tracking-[0.3em] text-yellow-600/60 uppercase mt-0.5">
            Online Casino
          </span>
        </div>

        {/* Form card */}
        <div className="px-6 sm:px-8 pt-20 pb-10 w-full flex-1 flex flex-col justify-center">
          <div
            className="w-full rounded-2xl overflow-hidden"
            style={{
              background: 'rgba(14,9,0,0.85)',
              border: '1px solid rgba(212,175,55,0.2)',
              boxShadow: '0 8px 40px rgba(0,0,0,0.6)',
            }}
          >
            <div className="px-6 py-7 sm:px-7 sm:py-8">
              <Outlet />
            </div>
          </div>
        </div>
      </div>

      {/* ── RIGHT PANEL: casino background image ──────────────── */}
      <div
        className="hidden md:block flex-1 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #1a0e00 0%, #2a1500 30%, #1a0c00 60%, #0d0700 100%)',
        }}
      >
        {/* Warm golden atmospheric glow */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 60% 45%, rgba(200,120,0,0.22) 0%, rgba(212,175,55,0.10) 35%, transparent 65%)',
          }}
        />

        {/* Roulette wheel decorative rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {/* Outer ring */}
          <div
            className="w-[480px] h-[480px] rounded-full border border-yellow-700/20"
            style={{ boxShadow: '0 0 100px rgba(212,175,55,0.07)' }}
          />
          {/* Middle ring */}
          <div className="absolute inset-[50px] rounded-full border border-yellow-600/15" />
          {/* Inner ring */}
          <div className="absolute inset-[100px] rounded-full border border-yellow-500/10" />
          {/* Innermost */}
          <div className="absolute inset-[155px] rounded-full border border-yellow-400/08" />
          {/* Center glow */}
          <div
            className="absolute inset-[190px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%)',
            }}
          />
          {/* Spokes */}
          {Array.from({ length: 16 }).map((_, i) => (
            <div
              key={i}
              className="absolute top-1/2 left-1/2 w-[240px] h-px origin-left"
              style={{
                background: 'linear-gradient(to right, rgba(212,175,55,0.15), transparent)',
                transform: `translateY(-0.5px) rotate(${i * 22.5}deg)`,
              }}
            />
          ))}
        </div>

        {/* Subtle dot grid */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: 'radial-gradient(circle, #D4AF37 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />

        {/* Top + bottom gradients for polish */}
        <div
          className="absolute inset-x-0 top-0 h-28 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.5), transparent)' }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-28 pointer-events-none"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)' }}
        />

        {/* Small decorative chips */}
        <div className="absolute bottom-16 right-[18%] w-14 h-14 rounded-full border border-yellow-700/15 opacity-25" />
        <div className="absolute top-20 right-[38%] w-8 h-8 rounded-full border border-yellow-600/12 opacity-20" />
        <div className="absolute top-[40%] right-[8%] w-6 h-6 rounded-full border border-yellow-500/10 opacity-15" />
      </div>
    </div>
  );
};
