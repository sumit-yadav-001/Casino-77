import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineArrowLeft } from 'react-icons/hi';
import { Badge } from '@/components/ui/Badge';
import { formatDate } from '@/utils/formatters';
import { ROUTES } from '@/constants/routes';

const MOCK_TICKETS = [
  { id: 'TKT-1082', subject: 'Deposit not credited - UPI Ref 8829', category: 'deposit', status: 'resolved', date: '2026-06-08T12:00:00Z' },
  { id: 'TKT-1090', subject: 'Withdrawal verification requirements', category: 'withdrawal', status: 'open', date: '2026-06-09T08:30:00Z' },
  { id: 'TKT-1091', subject: 'KYC Aadhaar back side reload failure', category: 'profile', status: 'under-review', date: '2026-06-09T14:45:00Z' },
];

export const TicketsPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-6 text-left">
      <button
        onClick={() => navigate(ROUTES.SUPPORT)}
        className="inline-flex items-center gap-2 text-xs font-bold text-zinc-500 hover:text-white transition-colors self-start uppercase tracking-wider"
      >
        <HiOutlineArrowLeft className="h-4.5 w-4.5" />
        Back to Support
      </button>

      <div className="flex flex-col gap-1.5">
        <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-wider">
          Active Support Tickets
        </h2>
        <p className="text-[10px] text-zinc-500 font-semibold uppercase tracking-widest">
          Track issues submitted to the Rani555 support ledger database
        </p>
      </div>

      <div className="border border-white/5 bg-zinc-950/40 rounded-2xl overflow-hidden mt-2">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-zinc-900/20 text-[10px] font-black uppercase tracking-widest text-zinc-400">
                <th className="px-6 py-4.5">Ticket ID</th>
                <th className="px-6 py-4.5">Submitted Date</th>
                <th className="px-6 py-4.5">Subject</th>
                <th className="px-6 py-4.5">Query Category</th>
                <th className="px-6 py-4.5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs text-zinc-300 font-bold uppercase tracking-wide">
              {MOCK_TICKETS.map((t) => (
                <tr key={t.id} className="hover:bg-white/1.5 transition-colors">
                  <td className="px-6 py-4 font-mono text-white tracking-normal font-medium">{t.id}</td>
                  <td className="px-6 py-4 text-zinc-500 font-medium">{formatDate(t.date)}</td>
                  <td className="px-6 py-4 text-zinc-400 normal-case">{t.subject}</td>
                  <td className="px-6 py-4 text-zinc-500">{t.category}</td>
                  <td className="px-6 py-4">
                    <Badge
                      variant={
                        t.status === 'resolved'
                          ? 'success'
                          : t.status === 'open'
                          ? 'info'
                          : 'warning'
                      }
                      size="sm"
                    >
                      {t.status}
                    </Badge>
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
export default TicketsPage;
