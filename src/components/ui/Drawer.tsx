import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { HiOutlineX } from 'react-icons/hi';
import { cn } from '@/utils/cn';

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  placement?: 'left' | 'right';
  className?: string;
}

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  title,
  children,
  placement = 'left',
  className,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const slideTransition = {
    type: 'tween',
    duration: 0.35,
    ease: 'easeInOut',
  };

  const drawerVariants = {
    hidden: { x: placement === 'left' ? '-100%' : '100%' },
    visible: { x: 0 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-sm"
          />

          {/* Drawer Body */}
          <motion.div
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={slideTransition}
            className={cn(
              'relative flex flex-col w-80 max-w-full h-full bg-zinc-950 border-white/5 shadow-2xl z-10',
              {
                'mr-auto border-r': placement === 'left',
                'ml-auto border-l': placement === 'right',
              },
              className
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
              {title ? (
                <h3 className="text-sm font-bold text-white tracking-wide uppercase gold-gradient-text">
                  {title}
                </h3>
              ) : (
                <div />
              )}
              <button
                onClick={onClose}
                className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-all duration-200 cursor-pointer"
              >
                <HiOutlineX className="h-5 w-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-5 hide-scrollbar">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
