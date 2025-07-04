import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'section' | 'input' | 'suggestion';
  hover?: boolean;
  onClick?: () => void;
}

const variants = {
  default: 'bg-white/8 backdrop-blur-md border-white/15',
  section: 'bg-white/5 backdrop-blur-sm border-white/10',
  input: 'bg-white/3 backdrop-blur-sm border-white/8',
  suggestion: 'bg-white/6 backdrop-blur-sm border-white/12 hover:bg-white/10'
};

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className,
  variant = 'default',
  hover = false,
  onClick
}) => {
  const Component = onClick ? motion.button : motion.div;

  return (
    <Component
      className={cn(
        'border rounded-2xl transition-all duration-300',
        variants[variant],
        hover && 'hover:bg-white/12 hover:border-white/20 hover:shadow-lg',
        onClick && 'cursor-pointer',
        className
      )}
      whileHover={hover ? { y: -2 } : undefined}
      whileTap={onClick ? { scale: 0.98 } : undefined}
      onClick={onClick}
    >
      {children}
    </Component>
  );
};