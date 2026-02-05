'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';

export default function Page() {
  const { token, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    
    if (token) {
      router.push('/dashboard');
    } else {
      router.push('/login');
    }
  }, [token, loading, router]);

  return null;
}
