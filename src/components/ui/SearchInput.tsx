import React from 'react';
import { HiOutlineSearch, HiOutlineX } from 'react-icons/hi';
import { cn } from '@/utils/cn';

export interface SearchInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  value: string;
  onChange: (value: string) => void;
  onClear?: () => void;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  className,
  value,
  onChange,
  onClear,
  placeholder = 'Search games...',
  ...props
}) => {
  return (
    <div className={cn('relative w-full flex items-center', className)}>
      <div className="absolute left-3.5 text-zinc-500 pointer-events-none">
        <HiOutlineSearch className="h-4 w-4" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-zinc-900 border border-zinc-800 focus:border-gold-primary/60 focus:ring-1 focus:ring-gold-primary/20 text-xs font-medium text-white pl-10 pr-10 py-2.5 rounded-lg focus:outline-none transition-all duration-300 placeholder:text-zinc-500"
        {...props}
      />
      {value && (
        <button
          type="button"
          onClick={() => {
            onChange('');
            if (onClear) onClear();
          }}
          className="absolute right-3.5 text-zinc-500 hover:text-white transition-colors duration-200 cursor-pointer"
        >
          <HiOutlineX className="h-4.5 w-4.5" />
        </button>
      )}
    </div>
  );
};
