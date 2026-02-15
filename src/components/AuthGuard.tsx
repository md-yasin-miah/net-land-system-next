"use client";
import React from "react";
import { InitialLoadingScreen } from "./InitialLoadingScreen";
import { useAppSelector } from "@/store/hooks";
import { Routes } from "@/lib/routes";
import { redirect } from "next/navigation";
import { Role } from "@/lib/mockData";
import { toast } from "sonner";

const AuthGuard = ({ children, roles }: { children: React.ReactNode, roles?: Role[] }) => {
  const user = useAppSelector((s) => s.auth.user);
  const isHydrated = useAppSelector((s) => s.auth.isHydrated);
  if (!isHydrated) {
    return <InitialLoadingScreen />;
  }
  if (!user) {
    return redirect(Routes.auth.login);
  }
  if (roles && !roles.includes(user.role as Role)) {
    toast.error("You are not authorized to access this page.");
    return redirect(Routes.home);
  }
  return children;
};

export default AuthGuard;
