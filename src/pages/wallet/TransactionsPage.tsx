import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineArrowLeft } from 'react-icons/hi';
import { Badge } from '@/components/ui/Badge';
import { formatCurrency, formatDate } from '@/utils/formatters';

const MOCK_TRANSACTIONS = [
  { id: 'tx-100', type: 'deposit', amount: 50000, status: 'completed', description: 'UPI Deposit Topup', date: '2026-06-09T14:30:00Z', ref: 'R555DTX8829' },
  { id: 'tx-101', type: 'withdraw', amount: 12000, status: 'pending', description: 'Bank Payout Cashout', date: '2026-06-09T10:15:00Z', ref: 'R555WTX3992' },
  { id: 'tx-102', type: 'bonus', amount: 10000, status: 'completed', description: 'Welcome Offer Rewards', date: '2026-06-08T09:00:00Z', ref: 'R555BTX0021' },
  { id: 'tx-103', type: 'withdraw', amount: 25000, status: 'completed', description: 'UPI Payout Cashout', date: '2026-06-07T18:45:00Z', ref: 'R555WTX1120' },
  { id: 'tx-104', type: 'deposit', amount: 10000, status: 'failed', description: 'UPI Deposit Topup', date: '2026-06-06T12:00:00Z', ref: 'R555DTX0492' },
];

export const TransactionsPage: React.FC = () => {
  const navigate = useNavigate();
  const [filterType, setFilterType] = useState<'all' | 'deposit' | 'withdraw' | 'bonus'>('all');

  const filteredTxs = MOCK_TRANSACTIONS.filter(
    (tx) => filterType === 'all' || tx.type === filterType
  );

  return (
    <div className="flex flex-col gap-6 text-left">
      <button
        onClick={() => navigate('/wallet')}
        className="inline-flex items-center gap-2 text-xs font-bold text-zinc-500 hover:text-white transition-colors self-start uppercase tracking-wider"
      >
        <HiOutlineArrowLeft className="h-4.5 w-4.5" />
        Back to Ledger
      </button>

      <div className="flex flex-col gap-1.5">
        <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-wider">
          Transaction Logs
        </h2>
        <p className="text-[10px] text-zinc-500 font-semibold uppercase tracking-widest">
          Verify and audit all deposit, withdrawal, and bonus logs credited to this profile
        </p>
      </div>

      {/* Tabs list */}
      <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
        {(['all', 'deposit', 'withdraw', 'bonus'] as const).map((type) => (
          <button
            key={type}
            onClick={() => setFilterType(type)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider border transition-all ${
              filterType === type
                ? 'border-gold-primary bg-gold-primary/5 text-gold-primary'
                : 'border-white/5 bg-zinc-900 text-zinc-400 hover:text-white'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Table grid */}
      <div className="border border-white/5 bg-zinc-950/40 rounded-2xl overflow-hidden mt-2">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-zinc-900/20 text-[10px] font-black uppercase tracking-widest text-zinc-400">
                <th className="px-6 py-4.5">Reference ID</th>
                <th className="px-6 py-4.5">Initiated At</th>
                <th className="px-6 py-4.5">Description</th>
                <th className="px-6 py-4.5">Log Type</th>
                <th className="px-6 py-4.5">Status</th>
                <th className="px-6 py-4.5 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs text-zinc-300 font-bold uppercase tracking-wide">
              {filteredTxs.map((tx) => (
                <tr key={tx.id} className="hover:bg-white/1.5 transition-colors">
                  <td className="px-6 py-4 font-mono text-white tracking-normal font-medium">{tx.ref}</td>
                  <td className="px-6 py-4 text-zinc-500 font-medium">{formatDate(tx.date)}</td>
                  <td className="px-6 py-4 text-zinc-400">{tx.description}</td>
                  <td className="px-6 py-4">
                    <span className="text-[10px] text-zinc-500 font-extrabold">{tx.type}</span>
                  </td>
                  <td className="px-6 py-4">
                    <Badge
                      variant={
                        tx.status === 'completed'
                          ? 'success'
                          : tx.status === 'pending'
                          ? 'warning'
                          : 'danger'
                      }
                      size="sm"
                    >
                      {tx.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-right font-black text-white">
                    {formatCurrency(tx.amount, 'INR')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default TransactionsPage;
