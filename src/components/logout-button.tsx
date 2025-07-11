'use client';

import { Button } from '@/components/ui/button';
import { createClient } from '@/lib/supabase/client';
import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function LogoutButton() {
  const router = useRouter();

  const logout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/admin/login');
  };

  return (
    <Button variant='outline' onClick={logout}>
      <LogOut className='w-4 h-4' />
      <span className='hidden sm:block'>Logout</span>
    </Button>
  );
}
