import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineArrowUp, HiOutlineArrowDown, HiOutlineShieldCheck, HiOutlineReceiptTax } from 'react-icons/hi'; // all valid
import { useAppSelector } from '@/hooks/useAppSelector';
import { selectBalance } from '@/features/wallet/slices/walletSlice';
import { WalletCard } from '@/components/cards/WalletCard';
import { StatsCard } from '@/components/cards/StatsCard';
import { ROUTES } from '@/constants/routes';
import { formatCurrency } from '@/utils/formatters';

export const WalletPage: React.FC = () => {
  const navigate = useNavigate();
  const balance = useAppSelector(selectBalance);

  // Mock static stats
  const stats = [
    { title: 'Total Deposits', value: '₹4,52,000.00', icon: <HiOutlineArrowUp className="h-5 w-5" /> },
    { title: 'Total Withdrawals', value: '₹2,98,000.00', icon: <HiOutlineArrowDown className="h-5 w-5" /> },
    { title: 'Rolling Bets', value: '₹12,40,500.00', icon: <HiOutlineShieldCheck className="h-5 w-5" /> },
    { title: 'Unclaimed Cashback', value: '₹1,500.00', icon: <HiOutlineReceiptTax className="h-5 w-5" /> },
  ];

  return (
    <div className="flex flex-col gap-6 text-left">
      <div className="flex flex-col gap-1.5">
        <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-wider">
          Wallet Ledger
        </h2>
        <p className="text-[10px] text-zinc-500 font-semibold uppercase tracking-widest">
          Manage deposit gateways, withdrawal accounts and review logs
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start mt-2">
        {/* Wallet Balance Card */}
        <div className="lg:col-span-1">
          <WalletCard
            balance={balance}
            onDepositClick={() => navigate(ROUTES.DEPOSIT)}
            onWithdrawClick={() => navigate(ROUTES.WITHDRAW)}
          />
        </div>

        {/* Balance Metrics Grid */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-5.5">
          {stats.map((stat, i) => (
            <StatsCard key={i} title={stat.title} value={stat.value} icon={stat.icon} />
          ))}
        </div>
      </div>

      {/* Security note */}
      <div className="border border-white/5 bg-zinc-950/40 p-4.5 rounded-xl flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl select-none">🔒</span>
          <div className="flex flex-col">
            <h4 className="text-xs font-bold text-white uppercase tracking-wide">
              SSL Encrypted Transactions
            </h4>
            <span className="text-[9.5px] font-semibold text-zinc-500 uppercase tracking-widest mt-0.5">
              Secure payment gateway processing
            </span>
          </div>
        </div>
        <button
          onClick={() => navigate(ROUTES.TRANSACTIONS)}
          className="text-xs font-black uppercase tracking-wider text-gold-primary hover:text-gold-secondary transition-colors cursor-pointer"
        >
          View Transaction Logs
        </button>
      </div>
    </div>
  );
};
export default WalletPage;
