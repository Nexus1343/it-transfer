'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  Building2, 
  TrendingUp, 
  Newspaper, 
  Trophy,
  Users,
  ArrowRightLeft,
  Search,
  Bell,
  Settings,
  User
} from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { Company } from '@/types';

export function Navbar() {
  const router = useRouter();
  const [notifications] = useState(3); // Mock notification count
  
  const { currentUser } = useAppStore();

  const getCurrentUserAvatar = () => {
    return (currentUser.data as Company).logo;
  };

  const getCurrentUserName = () => {
    return (currentUser.data as Company).name;
  };

  const navigationItems = [
    { href: '/dashboard/company', label: 'Dashboard', icon: Building2 },
    { href: '/developers', label: 'Browse Developers', icon: Users },
    { href: '/transfers', label: 'Transfer History', icon: ArrowRightLeft },
    { href: '/analytics', label: 'Analytics', icon: TrendingUp },
    { href: '/news', label: 'Market News', icon: Newspaper },
  ];

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <ArrowRightLeft className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">IT Transfer Market</span>
            </Link>
            
            {/* Company Badge */}
            <Badge variant="secondary">
              <Building2 className="mr-1 h-3 w-3" />
              Company
            </Badge>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.href}
                  variant="ghost"
                  asChild
                  className="flex items-center space-x-2"
                >
                  <Link href={item.href}>
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                </Button>
              );
            })}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">

            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-4 w-4" />
              {notifications > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                >
                  {notifications}
                </Badge>
              )}
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage 
                      src={getCurrentUserAvatar()} 
                      alt={getCurrentUserName()} 
                    />
                    <AvatarFallback>
                      {getCurrentUserName().split(' ').map((n: string) => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {getCurrentUserName()}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {(currentUser.data as Company).email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
}
