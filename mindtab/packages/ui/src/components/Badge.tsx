import React from 'react';
import { cn } from '@mindtab/shared';

type BadgeVariant = 'default' | 'coral' | 'teal' | 'amber';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'default',
  className,
  children,
  ...props
}) => {
  const variantStyles: Record<BadgeVariant, string> = {
    default: 'bg-surface-card text-muted',
    coral: 'bg-primary text-on-primary',
    teal: 'bg-accent-teal text-white',
    amber: 'bg-accent-amber text-white',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 text-xs font-medium rounded-full',
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
