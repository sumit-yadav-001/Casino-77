import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiOutlineChevronDown,
  HiOutlineHome,
  HiOutlineViewGrid,
  HiOutlineBriefcase,
  HiOutlineHeart,
  HiOutlineGift,
  HiOutlineTicket,
  HiOutlineSupport,
} from 'react-icons/hi';
import { SIDEBAR_NAV, type NavItem } from '@/constants/navigation';
import { Logo } from '@/components/shared/Logo';
import { cn } from '@/utils/cn';

interface SidebarProps {
  className?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const { pathname } = useLocation();
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({
    'Categories': true, // Keep categories open by default for rich layout
    'Live Support': false,
  });

  const toggleSubMenu = (label: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  return (
    <aside
      className={cn(
        'w-64 h-screen bg-zinc-950/90 border-r border-white/5 flex flex-col fixed left-0 top-0 z-30 transition-all duration-300 hidden md:flex',
        className
      )}
    >
      {/* Brand logo header */}
      <div className="h-16 flex items-center px-6 border-b border-white/5">
        <NavLink to="/">
          <Logo />
        </NavLink>
      </div>

      {/* Nav List */}
      <nav className="flex-1 overflow-y-auto px-4 py-6 flex flex-col gap-1 hide-scrollbar">
        {SIDEBAR_NAV.map((item) => {
          const hasChildren = item.children && item.children.length > 0;
          const isExpanded = expandedItems[item.label];
          const isActive = pathname === item.path || (hasChildren && item.children?.some(c => pathname === c.path));

          if (hasChildren) {
            return (
              <div key={item.label} className="flex flex-col mb-1.5">
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
                  <HiOutlineChevronDown
                    className={cn('h-4 w-4 transition-transform duration-200', {
                      'rotate-180': isExpanded,
                    })}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: 'easeInOut' }}
                      className="overflow-hidden pl-7 flex flex-col gap-1 mt-1"
                    >
                      {item.children?.map((child) => (
                        <NavLink
                          key={child.label}
                          to={child.path}
                          className={({ isActive: childActive }) =>
                            cn(
                              'flex items-center gap-3 py-2 px-4 text-xs font-bold uppercase tracking-wider text-zinc-500 hover:text-white transition-colors duration-200',
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
              className={({ isActive: itemActive }) =>
                cn(
                  'flex items-center gap-3.5 px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-white rounded-lg hover:bg-white/5 transition-all duration-200 mb-1.5 border border-transparent',
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
    </aside>
  );
};
