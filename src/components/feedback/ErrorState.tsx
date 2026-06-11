import React from 'react';
import { HiOutlineRefresh } from 'react-icons/hi';
import { Button } from '../ui/Button';
import { cn } from '@/utils/cn';

export interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Failed to Load Content',
  message = 'Please check your connection and try again.',
  onRetry,
  className,
}) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center py-10 px-6 text-center border border-white/5 bg-zinc-950/20 rounded-2xl',
        className
      )}
    >
      <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 mb-5">
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <h3 className="text-sm font-extrabold text-white uppercase tracking-wider mb-1.5">
        {title}
      </h3>
      <p className="text-zinc-500 text-xs max-w-sm mb-5">
        {message}
      </p>
      {onRetry && (
        <Button
          variant="outline"
          onClick={onRetry}
          className="flex items-center gap-1.5 text-xs uppercase font-bold py-2 px-4 border-white/10 hover:border-gold-primary/50 text-white cursor-pointer"
        >
          <HiOutlineRefresh className="h-4 w-4" />
          Retry Request
        </Button>
      )}
    </div>
  );
};
