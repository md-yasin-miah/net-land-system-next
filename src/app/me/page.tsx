import { Routes } from '@/lib/routes';
import { redirect } from 'next/navigation';
import React from 'react'

const MePage = () => {
  // redirect to dashboard
  redirect(Routes.me.dashboard);
  return <div>page</div>;
};

export default MePage;