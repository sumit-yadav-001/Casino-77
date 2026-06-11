import React from 'react';
import { HiOutlineCurrencyRupee, HiOutlinePlusCircle, HiOutlineMinusCircle } from 'react-icons/hi';
import { formatCurrency } from '@/utils/formatters';
import { Button } from '../ui/Button';
import { cn } from '@/utils/cn';

export interface WalletCardProps {
  balance: {
    total: number;
    available: number;
    bonus: number;
    currency: string;
  };
  onDepositClick?: () => void;
  onWithdrawClick?: () => void;
  className?: string;
}

export const WalletCard: React.FC<WalletCardProps> = ({
  balance,
  onDepositClick,
  onWithdrawClick,
  className,
}) => {
  return (
    <div
      className={cn(
        'glass-card p-6 bg-gradient-to-br from-zinc-950/80 via-zinc-950/40 to-zinc-950/80 border border-white/5 relative overflow-hidden',
        className
      )}
    >
      {/* Glow Effect */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-gold-primary/8 rounded-full blur-3xl pointer-events-none" />

      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-xl bg-gold-primary/10 border border-gold-primary/20 flex items-center justify-center text-gold-primary">
          <HiOutlineCurrencyRupee className="h-5 w-5" />
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
            Main Wallet
          </span>
          <span className="text-[11px] font-semibold text-zinc-500">
            Secure Ledger Account
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-1.5 mb-6">
        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
          Total Balance
        </span>
        <h2 className="text-3xl font-black text-white tracking-wide leading-none">
          {formatCurrency(balance.total, balance.currency)}
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-4 border-t border-b border-white/5 py-4 mb-6">
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-0.5">
            Available to Play
          </span>
          <span className="text-sm font-extrabold text-white">
            {formatCurrency(balance.available, balance.currency)}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-0.5">
            Bonus Balance
          </span>
          <span className="text-sm font-extrabold text-gold-primary">
            {formatCurrency(balance.bonus, balance.currency)}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3.5">
        <Button
          variant="gold"
          size="md"
          onClick={onDepositClick}
          className="w-full flex items-center justify-center gap-1.5 cursor-pointer text-xs font-bold uppercase tracking-wider py-3"
        >
          <HiOutlinePlusCircle className="h-4.5 w-4.5 text-black" />
          Deposit
        </Button>
        <Button
          variant="outline"
          size="md"
          onClick={onWithdrawClick}
          className="w-full flex items-center justify-center gap-1.5 cursor-pointer text-xs font-bold uppercase tracking-wider py-3 border-white/10 hover:border-gold-primary/40"
        >
          <HiOutlineMinusCircle className="h-4.5 w-4.5" />
          Withdraw
        </Button>
      </div>
    </div>
  );
};
