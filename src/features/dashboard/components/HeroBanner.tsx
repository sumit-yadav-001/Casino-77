import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineGift, HiOutlineArrowRight } from 'react-icons/hi';
import { Button } from '@/components/ui/Button';

interface BannerSlide {
  id: number;
  title: string;
  subtitle: string;
  badge: string;
  ctaText: string;
  bgColor: string;
}

const SLIDES: BannerSlide[] = [
  {
    id: 1,
    badge: '👑 Welcome Package',
    title: '200% First Deposit Bonus',
    subtitle: 'Get up to INR 100,000 free credits plus 50 free spins instantly.',
    ctaText: 'Claim Bonus Now',
    bgColor: 'linear-gradient(135deg, #181307 0%, #050505 100%)',
  },
  {
    id: 2,
    badge: '🚀 Crash Special',
    title: 'High Multiplier Drops',
    subtitle: 'Play Aviator, Crash Goal, Aero and get up to 5000x multiplier multipliers.',
    ctaText: 'Launch Game Arena',
    bgColor: 'linear-gradient(135deg, #0d1a12 0%, #050505 100%)',
  },
  {
    id: 3,
    badge: '🎰 Slots Jackpot',
    title: 'Weekly INR 10M Prize Pool',
    subtitle: 'Spin premium slots from Pragmatic, Jili, Playtech and rank on the leaderboard.',
    ctaText: 'Spin & Win Jackpot',
    bgColor: 'linear-gradient(135deg, #1c0b0f 0%, #050505 100%)',
  },
];

export const HeroBanner: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = SLIDES[currentSlide];

  return (
    <div
      className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden mb-6 border border-white/5 shadow-2xl"
      style={{ background: slide.bgColor }}
    >
      {/* Decorative patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gold-primary/10 via-transparent to-transparent pointer-events-none" />

      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 p-6 md:p-12 flex flex-col justify-center text-left"
        >
          <div className="flex flex-col gap-3 max-w-lg md:max-w-xl">
            <span className="text-[10px] font-black text-gold-primary bg-gold-primary/10 border border-gold-primary/25 px-2.5 py-1 rounded-full self-start uppercase tracking-widest">
              {slide.badge}
            </span>
            <h2 className="text-2xl md:text-4xl font-black text-white uppercase tracking-wide leading-tight">
              {slide.title}
            </h2>
            <p className="text-xs md:text-sm text-zinc-400 font-medium">
              {slide.subtitle}
            </p>
            <div className="mt-4 flex items-center gap-4">
              <Button
                variant="gold"
                size="md"
                className="text-xs font-bold uppercase tracking-wider py-3 flex items-center gap-1.5 cursor-pointer"
              >
                <HiOutlineGift className="h-4.5 w-4.5" />
                {slide.ctaText}
              </Button>
              <button className="text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-white transition-colors duration-200 flex items-center gap-1 cursor-pointer">
                <span>View Promotion Details</span>
                <HiOutlineArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Slide Indicators */}
      <div className="absolute bottom-5 right-6 flex items-center gap-2">
        {SLIDES.map((s, idx) => (
          <button
            key={s.id}
            onClick={() => setCurrentSlide(idx)}
            className={`w-2.5 h-1 rounded-full transition-all duration-300 ${
              idx === currentSlide ? 'bg-gold-primary w-6' : 'bg-zinc-700'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
