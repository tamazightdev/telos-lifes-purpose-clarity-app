import React from 'react';
import { cn } from '../../utils/cn';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const TextArea: React.FC<TextAreaProps> = ({
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
      <textarea
        className={cn(
          'w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg',
          'text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-violet-400/50',
          'transition-all duration-200 resize-none',
          error && 'border-red-400/50 focus:ring-red-400/50',
          className
        )}
        rows={4}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-400">{error}</p>
      )}
    </div>
  );
};