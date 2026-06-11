import React, { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/utils/cn';

export interface DropdownItem {
  id: string;
  label: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  divider?: boolean;
}

export interface DropdownProps {
  trigger: React.ReactNode;
  items: DropdownItem[];
  placement?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
  className?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
  trigger,
  items,
  placement = 'bottom-right',
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative inline-block text-left">
      <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
        {trigger}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className={cn(
              'absolute z-50 mt-2 w-48 rounded-xl bg-zinc-950 border border-white/5 shadow-2xl glass-card overflow-hidden py-1',
              {
                'left-0 origin-top-left': placement === 'bottom-left',
                'right-0 origin-top-right': placement === 'bottom-right',
                'left-0 bottom-full mb-2 origin-bottom-left': placement === 'top-left',
                'right-0 bottom-full mb-2 origin-bottom-right': placement === 'top-right',
              },
              className
            )}
          >
            {items.map((item) => {
              if (item.divider) {
                return <div key={item.id} className="h-px bg-white/5 my-1" />;
              }

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    if (item.onClick) item.onClick();
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold text-zinc-400 hover:text-white hover:bg-white/5 text-left transition-colors duration-200 cursor-pointer"
                >
                  {item.icon && <span className="text-sm">{item.icon}</span>}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
