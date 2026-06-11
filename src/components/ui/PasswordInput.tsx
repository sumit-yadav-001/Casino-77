import React, { useState } from 'react';
import { HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi';
import { Input, type InputProps } from './Input';

export interface PasswordInputProps extends Omit<InputProps, 'type'> {}

export const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  (props, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <Input
        ref={ref}
        type={showPassword ? 'text' : 'password'}
        suffix={
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-zinc-500 hover:text-white transition-colors duration-200 focus:outline-none cursor-pointer"
          >
            {showPassword ? (
              <HiOutlineEyeOff className="h-5 w-5" />
            ) : (
              <HiOutlineEye className="h-5 w-5" />
            )}
          </button>
        }
        {...props}
      />
    );
  }
);

PasswordInput.displayName = 'PasswordInput';
