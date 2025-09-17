'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/store/useAppStore';

export default function Home() {
  const router = useRouter();
  const { switchUserRole } = useAppStore();

  useEffect(() => {
    // Set default company user and redirect to company dashboard
    switchUserRole('company', 'comp-1');
    router.push('/dashboard/company');
  }, [router, switchUserRole]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-muted-foreground">Loading IT Transfer Market...</p>
      </div>
    </div>
  );
}
