import React from 'react';
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi';
import { Button } from './Button';
import { cn } from '@/utils/cn';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className,
}) => {
  if (totalPages <= 1) return null;

  return (
    <div className={cn('flex items-center justify-center gap-2', className)}>
      <Button
        variant="outline"
        size="icon"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="border-white/5 rounded-lg w-9 h-9 flex items-center justify-center cursor-pointer"
      >
        <HiOutlineChevronLeft className="h-4 w-4" />
      </Button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
        const isCurrent = page === currentPage;
        return (
          <Button
            key={page}
            variant={isCurrent ? 'gold' : 'outline'}
            onClick={() => onPageChange(page)}
            className={cn('w-9 h-9 text-xs rounded-lg cursor-pointer font-bold', {
              'border-white/5 text-zinc-400 hover:text-white': !isCurrent,
            })}
          >
            {page}
          </Button>
        );
      })}

      <Button
        variant="outline"
        size="icon"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="border-white/5 rounded-lg w-9 h-9 flex items-center justify-center cursor-pointer"
      >
        <HiOutlineChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};
