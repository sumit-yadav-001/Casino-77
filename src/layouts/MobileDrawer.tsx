import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { HiOutlineChevronDown, HiOutlineX } from 'react-icons/hi';
import { useAppDispatch, useAppSelector } from '@/hooks/useAppSelector';
import { selectIsMobileDrawerOpen, setMobileDrawerOpen } from '@/features/settings/slices/uiSlice';
import { Drawer } from '@/components/ui/Drawer';
import { SIDEBAR_NAV } from '@/constants/navigation';
import { Logo } from '@/components/shared/Logo';
import { cn } from '@/utils/cn';

export const MobileDrawer: React.FC = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(selectIsMobileDrawerOpen);
  const { pathname } = useLocation();

  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({
    'Categories': true,
    'Live Support': false,
  });

  const toggleSubMenu = (label: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const handleClose = () => {
    dispatch(setMobileDrawerOpen(false));
  };

  return (
    <Drawer isOpen={isOpen} onClose={handleClose} title="Navigation">
      <div className="flex flex-col gap-5.5 py-2">
        <NavLink to="/" onClick={handleClose} className="flex justify-center py-2.5">
          <Logo />
        </NavLink>

        <nav className="flex flex-col gap-1.5 mt-2">
          {SIDEBAR_NAV.map((item) => {
            const hasChildren = item.children && item.children.length > 0;
            const isExpanded = expandedItems[item.label];
            const isActive = pathname === item.path || (hasChildren && item.children?.some(c => pathname === c.path));

            if (hasChildren) {
              return (
                <div key={item.label} className="flex flex-col">
                  <button
                    type="button"
                    onClick={() => toggleSubMenu(item.label)}
                    className={cn(
                      'w-full flex items-center justify-between px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-white rounded-lg hover:bg-white/5 transition-all duration-200 cursor-pointer',
                      {
                        'text-gold-primary bg-gold-primary/5 border border-gold-primary/10': isActive,
                      }
                    )}
                  >
                    <div className="flex items-center gap-3.5">
                      <item.icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </div>
                    {/* Simple arrow helper */}
                    <span className={cn('text-zinc-500 transition-transform duration-200 text-xs font-black', { 'rotate-180': isExpanded })}>
                      ▼
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden pl-7 flex flex-col gap-1 mt-1"
                      >
                        {item.children?.map((child) => (
                          <NavLink
                            key={child.label}
                            to={child.path}
                            onClick={handleClose}
                            className={({ isActive: childActive }) =>
                              cn(
                                'flex items-center gap-3 py-2.5 px-4 text-xs font-bold uppercase tracking-wider text-zinc-500 hover:text-white transition-colors duration-200',
                                {
                                  'text-gold-primary sidebar-active': childActive,
                                }
                              )
                            }
                          >
                            <span>{child.label}</span>
                          </NavLink>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }

            return (
              <NavLink
                key={item.label}
                to={item.path}
                onClick={handleClose}
                className={({ isActive: itemActive }) =>
                  cn(
                    'flex items-center gap-3.5 px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-white rounded-lg hover:bg-white/5 transition-all duration-200 border border-transparent',
                    {
                      'text-gold-primary bg-gold-primary/5 border-gold-primary/10 sidebar-active': itemActive,
                    }
                  )
                }
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>
    </Drawer>
  );
};
