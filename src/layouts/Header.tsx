import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { HiMenuAlt2, HiOutlineUser, HiOutlineCreditCard } from 'react-icons/hi';
import { useAppDispatch, useAppSelector } from '@/hooks/useAppSelector';
import { logout, selectAuth } from '@/features/auth/slices/authSlice';
import { selectBalance } from '@/features/wallet/slices/walletSlice';
import { toggleMobileDrawer } from '@/features/settings/slices/uiSlice';
import { ROUTES } from '@/constants/routes';
import { HEADER_NAV } from '@/constants/navigation';
import { Button } from '@/components/ui/Button';
import { SearchInput } from '@/components/ui/SearchInput';
import { Dropdown, type DropdownItem } from '@/components/ui/Dropdown';
import { Logo } from '@/components/shared/Logo';
import { formatCurrency } from '@/utils/formatters';
import { cn } from '@/utils/cn';

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuthenticated, user } = useAppSelector(selectAuth);
  const balance = useAppSelector(selectBalance);

  const [search, setSearch] = useState('');

  const handleSearchSubmit = (val: string) => {
    setSearch(val);
    if (val) {
      navigate(`${ROUTES.CASINO}?search=${encodeURIComponent(val)}`);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate(ROUTES.LOGIN);
  };

  const profileDropdownItems: DropdownItem[] = [
    { id: 'profile', label: 'My Profile', onClick: () => navigate(ROUTES.PROFILE), icon: <HiOutlineUser className="h-4.5 w-4.5 text-zinc-400" /> },
    { id: 'wallet', label: 'Wallet Ledger', onClick: () => navigate(ROUTES.WALLET), icon: <HiOutlineCreditCard className="h-4.5 w-4.5 text-zinc-400" /> },
    { id: 'div1', label: '', divider: true },
    { id: 'logout', label: 'Logout Session', onClick: handleLogout },
  ];

  const categoriesDropdownItems: DropdownItem[] = [
    { id: 'live', label: 'Live Casino', onClick: () => navigate(ROUTES.LIVE_CASINO) },
    { id: 'slots', label: 'Slot Games', onClick: () => navigate(ROUTES.SLOTS) },
    { id: 'crash', label: 'Crash Games', onClick: () => navigate(ROUTES.CASINO) },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-zinc-950/95 border-b border-white/5 backdrop-blur-md">
      {/* Upper Header: Brand / Search / Auth Actions */}
      <div className="h-16 px-4 md:px-8 flex items-center justify-between gap-4">
        {/* Left Side: Hamburger (Mobile) + Search Bar */}
        <div className="flex items-center gap-3.5 flex-1 max-w-sm md:max-w-xs">
          <button
            onClick={() => dispatch(toggleMobileDrawer())}
            className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 md:hidden cursor-pointer"
          >
            <HiMenuAlt2 className="h-6 w-6" />
          </button>

          <SearchInput
            value={search}
            onChange={handleSearchSubmit}
            placeholder="Search games..."
            className="hidden md:flex"
          />
        </div>

        {/* Center: Brand Logo on mobile */}
        <div className="md:hidden flex-1 flex justify-center">
          <NavLink to="/">
            <Logo />
          </NavLink>
        </div>

        {/* Right Side: Wallet details or Auth Buttons */}
        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              {/* Wallet Widget */}
              <div
                onClick={() => navigate(ROUTES.WALLET)}
                className="hidden sm:flex items-center gap-2.5 bg-zinc-900 border border-white/5 px-3 py-1.5 rounded-lg cursor-pointer hover:border-gold-primary/20 transition-all duration-300"
              >
                <div className="text-gold-primary flex items-center">
                  <HiOutlineCreditCard className="h-4 w-4" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[8.5px] font-bold text-zinc-500 uppercase tracking-widest">
                    Available Balance
                  </span>
                  <span className="text-xs font-black text-white leading-none mt-0.5">
                    {formatCurrency(balance.total, balance.currency)}
                  </span>
                </div>
              </div>

              {/* Deposit Quick Action */}
              <Button
                variant="gold"
                size="sm"
                onClick={() => navigate(ROUTES.DEPOSIT)}
                className="text-[10px] font-black uppercase tracking-wider px-3.5 py-2 cursor-pointer"
              >
                Deposit
              </Button>

              {/* Profile Dropdown */}
              <Dropdown
                placement="bottom-right"
                trigger={
                  <button className="h-9.5 w-9.5 rounded-full bg-zinc-900 border border-white/8 hover:border-gold-primary/30 flex items-center justify-center text-zinc-300 hover:text-white transition-all duration-200 cursor-pointer">
                    <HiOutlineUser className="h-4.5 w-4.5" />
                  </button>
                }
                items={profileDropdownItems}
              />
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate(ROUTES.LOGIN)}
                className="text-[10px] font-bold uppercase tracking-widest px-4 cursor-pointer"
              >
                Log In
              </Button>
              <Button
                variant="gold"
                size="sm"
                onClick={() => navigate(ROUTES.SIGNUP)}
                className="text-[10px] font-black uppercase tracking-widest px-4 cursor-pointer"
              >
                Sign Up
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Lower Header: Nav Tabs Links */}
      <div className="h-11 px-4 md:px-8 border-t border-white/5 flex items-center">
        <nav className="flex items-center gap-6 h-full">
          {HEADER_NAV.map((nav) => {
            if (nav.hasDropdown) {
              return (
                <Dropdown
                  key={nav.label}
                  placement="bottom-left"
                  trigger={
                    <button className="flex items-center gap-1.5 h-full text-xs font-black uppercase tracking-wider text-zinc-400 hover:text-white transition-all cursor-pointer">
                      <span>{nav.label}</span>
                      <svg className="h-3 w-3 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  }
                  items={categoriesDropdownItems}
                />
              );
            }

            return (
              <NavLink
                key={nav.label}
                to={nav.path}
                className={({ isActive }) =>
                  cn(
                    'flex items-center h-full text-xs font-black uppercase tracking-wider text-zinc-400 hover:text-white border-b-2 border-transparent transition-all py-3.5',
                    {
                      'text-gold-primary border-gold-primary': isActive,
                    }
                  )
                }
              >
                {nav.label}
              </NavLink>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
