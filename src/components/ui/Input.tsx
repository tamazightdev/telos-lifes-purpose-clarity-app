import React from 'react';
import { cn } from '../../utils/cn';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  className,
  ...props
}) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="text-sm font-medium text-white/90">
          {label}
        </label>
      )}
      <input
        className={cn(
          'w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg',
          'text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-violet-400/50',
          'transition-all duration-200',
          error && 'border-red-400/50 focus:ring-red-400/50',
          className
        )}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-400">{error}</p>
      )}
    </div>
  );
};