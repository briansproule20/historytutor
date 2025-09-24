import React from 'react';
import Image from 'next/image';

import { cn } from '@/lib/utils';

interface LogoProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  containerClassName?: string;
  onClick?: () => void;
  priority?: boolean;
}
export const Logo = React.forwardRef<HTMLDivElement, LogoProps>(
  ({ className, containerClassName, onClick, priority, ...props }, ref) => {
    return (
      <div
        ref={ref}
        onClick={onClick}
        className={containerClassName}
        {...props}
      >
        <Image
          src="/logo/light.svg"
          alt="Merit Systems Logo"
          width={24}
          height={24}
          className={cn('dark:hidden', className)}
          priority={priority}
        />
        <Image
          src="/logo/dark.svg"
          alt="Merit Systems Logo"
          width={24}
          height={24}
          className={cn('hidden dark:block', className)}
          priority={priority}
        />
      </div>
    );
  }
);

Logo.displayName = 'Logo';
