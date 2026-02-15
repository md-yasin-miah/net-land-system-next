"use client";

import { Routes } from "@/lib/routes";
import { useAppSelector } from "@/store/hooks";
import { redirect } from "next/navigation";

const RoleIndexPage = () => {
  const user = useAppSelector((s) => s.auth.user);
  redirect(user ? Routes.role(user.role).dashboard : Routes.home);
  return null;
};

export default RoleIndexPage;
