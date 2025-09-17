'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/store/useAppStore';
import { UserRole } from '@/types';
import { ReactNode } from 'react';

interface RoleSwitchButtonProps {
  role: UserRole;
  userId: string;
  href: string;
  children: ReactNode;
  size?: 'sm' | 'lg' | 'default';
  variant?: 'default' | 'outline' | 'secondary';
  className?: string;
}

export function RoleSwitchButton({ 
  role, 
  userId, 
  href, 
  children, 
  size = 'default',
  variant = 'default',
  className 
}: RoleSwitchButtonProps) {
  const router = useRouter();
  const { switchUserRole } = useAppStore();

  const handleClick = () => {
    switchUserRole(role, userId);
    router.push(href);
  };

  return (
    <Button
      size={size}
      variant={variant}
      className={className}
      onClick={handleClick}
    >
      {children}
    </Button>
  );
}
