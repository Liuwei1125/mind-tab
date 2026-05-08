import React from 'react';
import { cn } from '@mindtab/shared';
import { Tooltip } from './Tooltip';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'ghost';
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  label,
  size = 'md',
  variant = 'default',
  className,
  ...props
}) => {
  const sizeStyles = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-11 h-11',
  };

  const variantStyles = {
    default: 'bg-canvas border border-hairline text-muted hover:bg-surface-soft hover:text-ink',
    ghost: 'bg-transparent text-muted hover:bg-surface-soft hover:text-ink',
  };

  const iconSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  const button = (
    <button
      type="button"
      className={cn(
        'inline-flex items-center justify-center rounded-full transition-colors duration-150',
        'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        sizeStyles[size],
        variantStyles[variant],
        className
      )}
      {...props}
    >
      <span className={iconSizes[size]}>{icon}</span>
    </button>
  );

  if (label) {
    return <Tooltip content={label}>{button}</Tooltip>;
  }

  return button;
};
