import { redirect } from 'next/navigation';

import { createClient } from '@/lib/supabase/server';
import { LogoutButton } from '@/components/logout-button';

export default async function dashboard() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect('/admin');
  }

  return (
    <div>
      DASHBOARD
      <LogoutButton />
    </div>
  );
}
