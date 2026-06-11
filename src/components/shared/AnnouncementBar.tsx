import React from 'react';
import { HiOutlineGift } from 'react-icons/hi';
import { cn } from '@/utils/cn';

export interface AnnouncementBarProps {
  className?: string;
  text?: string;
}

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({
  className,
  text = 'With a range of trusted payment options, our platform ensures swift and secure deposits and withdrawals, letting you focus on the gaming action. Enjoy 24/7 client support and elite VIP rewards!',
}) => {
  return (
    <div
      className={cn(
        'announcement-bar relative w-full h-8 overflow-hidden flex items-center px-4.5 rounded-lg mb-6 backdrop-blur-md',
        className
      )}
    >
      <div className="absolute left-3.5 z-10 flex items-center justify-center text-gold-primary pr-2.5 bg-gradient-to-r from-zinc-950 via-zinc-950/90 to-transparent h-full">
        <HiOutlineGift className="h-4 w-4 animate-bounce" />
      </div>

      <div className="w-full overflow-hidden flex items-center relative pl-7">
        <div className="marquee whitespace-nowrap flex gap-16 text-[10px] font-bold uppercase tracking-widest text-zinc-300">
          <span>{text}</span>
          <span>{text}</span>
        </div>
      </div>
    </div>
  );
};
