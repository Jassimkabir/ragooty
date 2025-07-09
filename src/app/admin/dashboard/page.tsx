import { redirect } from 'next/navigation';

import { createClient } from '@/lib/supabase/server';
import DashboardPage from '@/components/pages/dashboard-page';

export default async function dashboard() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect('/admin/login');
  }

  return <DashboardPage />;
}
