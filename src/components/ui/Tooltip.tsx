import React, { useState } from 'react';
import { cn } from '@/utils/cn';

export interface TooltipProps {
  content: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = 'top',
  className,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div
          className={cn(
            'absolute z-50 px-2 py-1 text-[10px] font-bold text-black bg-gold-primary rounded shadow-md whitespace-nowrap pointer-events-none transition-all duration-200',
            {
              'bottom-full left-1/2 -translate-x-1/2 mb-2': position === 'top',
              'top-full left-1/2 -translate-x-1/2 mt-2': position === 'bottom',
              'right-full top-1/2 -translate-y-1/2 mr-2': position === 'left',
              'left-full top-1/2 -translate-y-1/2 ml-2': position === 'right',
            },
            className
          )}
        >
          {content}
          {/* Arrow */}
          <div
            className={cn('absolute w-1.5 h-1.5 bg-gold-primary rotate-45', {
              'top-full left-1/2 -translate-x-1/2 -translate-y-1/2': position === 'top',
              'bottom-full left-1/2 -translate-x-1/2 translate-y-1/2': position === 'bottom',
              'left-full top-1/2 -translate-x-1/2 -translate-y-1/2': position === 'left',
              'right-full top-1/2 translate-x-1/2 -translate-y-1/2': position === 'right',
            })}
          />
        </div>
      )}
    </div>
  );
};
