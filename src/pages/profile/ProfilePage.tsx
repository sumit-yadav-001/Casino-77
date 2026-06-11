import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineUser, HiOutlineShieldCheck, HiOutlineLockClosed, HiOutlineIdentification } from 'react-icons/hi';
import { useAppSelector } from '@/hooks/useAppSelector';
import { selectUser } from '@/features/auth/slices/authSlice';
import { ROUTES } from '@/constants/routes';
import { Badge } from '@/components/ui/Badge';
import { formatDate } from '@/utils/formatters';

export const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);

  // Fallback mock details if user logs in on cold start
  const userDetails = user || {
    firstName: 'Sumit',
    lastName: 'Rani',
    username: 'sumitrani555',
    email: 'sumit@rani555.com',
    phone: '9876543210',
    kycStatus: 'pending' as const,
    createdAt: new Date().toISOString(),
  };

  const securityItems = [
    {
      title: 'Update Password',
      desc: 'Modify login passwords regularly to secure account ledger databases.',
      icon: <HiOutlineLockClosed className="h-5 w-5" />,
      actionLabel: 'Change Password',
      onClick: () => navigate(ROUTES.CHANGE_PASSWORD),
    },
    {
      title: 'KYC Document Verification',
      desc: 'Verify legal identities to authorize withdrawals and progressive jackpots.',
      icon: <HiOutlineIdentification className="h-5 w-5" />,
      actionLabel: 'Verify Identity',
      onClick: () => navigate(ROUTES.KYC),
    },
  ];

  return (
    <div className="flex flex-col gap-6 text-left">
      <div className="flex flex-col gap-1.5">
        <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-wider">
          My Profile
        </h2>
        <p className="text-[10px] text-zinc-500 font-semibold uppercase tracking-widest">
          Verify account parameters, review security details and verify KYC status
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start mt-2">
        {/* Profile Details Panel */}
        <div className="lg:col-span-1 bg-zinc-900/40 border border-white/5 p-6 rounded-2xl flex flex-col gap-5.5 relative overflow-hidden">
          <div className="flex items-center gap-4.5">
            <div className="h-14 w-14 rounded-full bg-gold-primary/10 border border-gold-primary/20 flex items-center justify-center text-gold-primary text-xl font-bold uppercase select-none">
              {userDetails.firstName[0]}
              {userDetails.lastName[0]}
            </div>
            <div className="flex flex-col">
              <h3 className="text-sm font-black text-white uppercase tracking-wide">
                {userDetails.firstName} {userDetails.lastName}
              </h3>
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-0.5">
                @{userDetails.username}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-3 border-t border-white/5 pt-4.5">
            <div className="flex justify-between items-center text-xs font-bold">
              <span className="text-zinc-500 uppercase tracking-wider">Email Address</span>
              <span className="text-white tracking-normal font-medium">{userDetails.email}</span>
            </div>
            <div className="flex justify-between items-center text-xs font-bold">
              <span className="text-zinc-500 uppercase tracking-wider">Mobile Number</span>
              <span className="text-white tracking-normal font-medium">+91 {userDetails.phone}</span>
            </div>
            <div className="flex justify-between items-center text-xs font-bold">
              <span className="text-zinc-500 uppercase tracking-wider">KYC Verification</span>
              <Badge variant={userDetails.kycStatus === 'completed' ? 'success' : 'warning'} size="sm">
                {userDetails.kycStatus}
              </Badge>
            </div>
            <div className="flex justify-between items-center text-xs font-bold">
              <span className="text-zinc-500 uppercase tracking-wider">Registered Since</span>
              <span className="text-zinc-400 font-medium">{formatDate(userDetails.createdAt)}</span>
            </div>
          </div>
        </div>

        {/* Security / Action List */}
        <div className="lg:col-span-2 flex flex-col gap-5.5">
          {securityItems.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col sm:flex-row gap-5.5 p-5 bg-zinc-900/40 border border-white/5 hover:border-gold-primary/20 rounded-2xl items-start sm:items-center justify-between transition-all duration-300 relative overflow-hidden group hover:shadow-gold"
            >
              <div className="flex gap-4 items-start sm:items-center">
                <div className="p-3 bg-zinc-800 border border-white/5 rounded-xl text-gold-primary">
                  {item.icon}
                </div>
                <div className="flex flex-col gap-0.5">
                  <h4 className="text-xs font-black text-white uppercase tracking-wide group-hover:text-gold-primary transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-zinc-500 text-[11px] font-medium leading-relaxed max-w-sm mt-0.5">
                    {item.desc}
                  </p>
                </div>
              </div>

              <button
                onClick={item.onClick}
                className="px-4 py-2.5 text-[10px] font-black uppercase tracking-wider bg-white/5 border border-white/8 rounded-lg hover:border-gold-primary/40 text-zinc-300 hover:text-white transition-all cursor-pointer whitespace-nowrap"
              >
                {item.actionLabel}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default ProfilePage;
