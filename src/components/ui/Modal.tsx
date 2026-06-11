import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { HiOutlineX } from 'react-icons/hi';
import { cn } from '@/utils/cn';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  className?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  className,
}) => {
  // Prevent body scrolling when open
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

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.4 }}
            className={cn(
              'relative w-full max-h-[90vh] flex flex-col bg-zinc-950/90 border border-white/8 rounded-2xl shadow-2xl glass-card overflow-hidden z-10',
              {
                'max-w-md': size === 'sm',
                'max-w-lg': size === 'md',
                'max-w-2xl': size === 'lg',
                'max-w-4xl': size === 'xl',
                'max-w-[95vw] h-[95vh]': size === 'full',
              },
              className
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4.5 border-b border-white/8 bg-black/40">
              {title ? (
                <h3 className="text-base font-bold text-white tracking-wide uppercase gold-gradient-text">
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
            <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
