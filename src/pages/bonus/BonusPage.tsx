import React from 'react';
import { toast } from 'react-hot-toast';
import { HiOutlineGift, HiOutlineClock } from 'react-icons/hi';
import { Button } from '@/components/ui/Button';

const MOCK_PROMOTIONS = [
  { id: 1, title: '200% Welcome Package', desc: 'Claims up to INR 100,000 extra on your first topup deposits.', code: 'WELCOME200', expires: '2026-12-31' },
  { id: 2, title: '10% Daily Reload Match', desc: 'Top up daily and claim extra rewards instantly.', code: 'DAILY10', expires: '2026-08-30' },
  { id: 3, title: 'VIP Friday Free Spins', desc: 'Get 50 free slot spins on selected game providers.', code: 'FRIDAYSPINS', expires: '2026-07-15' },
];

export const BonusPage: React.FC = () => {
  const handleClaim = (code: string) => {
    toast.success(`Bonus promo code ${code} applied successfully!`);
  };

  return (
    <div className="flex flex-col gap-6 text-left">
      <div className="flex flex-col gap-1.5">
        <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-wider">
          Promotions & Bonuses
        </h2>
        <p className="text-[10px] text-zinc-500 font-semibold uppercase tracking-widest">
          Redeem rewards, matching bonuses, and slot spins package offers
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-2">
        {MOCK_PROMOTIONS.map((promo) => (
          <div
            key={promo.id}
            className="flex flex-col justify-between p-5 bg-zinc-900/40 border border-white/5 hover:border-gold-primary/25 rounded-2xl transition-all duration-300 relative overflow-hidden group hover:shadow-gold"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-zinc-800 border border-white/5 rounded-xl text-gold-primary">
                <HiOutlineGift className="h-5 w-5" />
              </div>
              <div className="flex items-center gap-1 text-[9px] font-bold text-zinc-500 uppercase tracking-widest bg-white/5 px-2 py-0.5 rounded border border-white/5">
                <HiOutlineClock className="h-3 w-3" />
                <span>Expires {promo.expires}</span>
              </div>
            </div>

            <div className="flex flex-col gap-1 mb-6">
              <h4 className="text-sm font-black text-white uppercase tracking-wide">
                {promo.title}
              </h4>
              <p className="text-zinc-400 text-xs mt-1 leading-relaxed">
                {promo.desc}
              </p>
            </div>

            <div className="flex items-center justify-between border-t border-white/5 pt-4.5 mt-auto">
              <div className="flex flex-col">
                <span className="text-[8px] font-bold text-zinc-500 uppercase tracking-widest">
                  Promo Code
                </span>
                <span className="text-xs font-mono font-black text-gold-primary uppercase tracking-wider mt-0.5">
                  {promo.code}
                </span>
              </div>
              <Button
                variant="gold"
                size="sm"
                onClick={() => handleClaim(promo.code)}
                className="text-[10px] font-black uppercase tracking-wider px-4 py-2 cursor-pointer"
              >
                Claim Offer
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default BonusPage;
