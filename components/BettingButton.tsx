'use client';

import { cn } from '@/lib/utils';

interface BettingButtonProps {
  variant: 'primary' | 'secondary';
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function BettingButton({
  variant,
  onClick,
  disabled = false,
  children,
  className = '',
}: BettingButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'px-4 py-2 rounded-md font-medium transition-colors duration-200 text-sm',
        variant === 'primary' && 'bg-primary text-white hover:bg-primary/90',
        variant === 'secondary' && 'bg-surface-light text-text-primary hover:bg-surface-light/80 border border-gray-600',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      {children}
    </button>
  );
}
