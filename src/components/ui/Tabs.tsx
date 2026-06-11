import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

export interface TabItem {
  id: string;
  label: string;
}

export interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
  variant?: 'pills' | 'underline';
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab,
  onChange,
  className,
  variant = 'pills',
}) => {
  return (
    <div
      className={cn(
        'flex items-center',
        variant === 'pills'
          ? 'rounded-full border border-yellow-600/30 p-1 gap-0'
          : 'border-b border-white/5 gap-6',
        className
      )}
      style={variant === 'pills' ? { background: 'rgba(0,0,0,0.4)' } : undefined}
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={cn(
              'relative flex-1 text-center py-2 text-sm font-semibold transition-all duration-300 focus:outline-none cursor-pointer rounded-full',
              variant === 'pills'
                ? isActive
                  ? 'text-black'
                  : 'text-zinc-400 hover:text-zinc-200'
                : isActive
                ? 'text-yellow-500'
                : 'text-zinc-500 hover:text-white'
            )}
          >
            {isActive && variant === 'pills' && (
              <motion.div
                layoutId="auth-tab-pill"
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'linear-gradient(180deg, #F4C542 0%, #D4AF37 100%)',
                }}
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
            {isActive && variant === 'underline' && (
              <motion.div
                layoutId="auth-tab-underline"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-yellow-500"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative z-10">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
};
