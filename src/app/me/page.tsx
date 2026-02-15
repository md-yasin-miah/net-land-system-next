import { Routes } from '@/lib/routes';
import { redirect } from 'next/navigation';

const MePage = () => {
  // redirect to dashboard
  redirect(Routes.me.dashboard);
  return null;
};

export default MePage;