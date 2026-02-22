"use client";

import { Routes } from '@/lib/routes'
import { useAppSelector } from '@/store/hooks';
import { redirect } from 'next/navigation'

const SettingsPage = () => {
  const user = useAppSelector((s) => s.auth.user);
  redirect(user ? Routes.role(user.role).settings.root : Routes.home);
  return null;
};

export default SettingsPage;