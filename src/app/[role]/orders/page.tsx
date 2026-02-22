"use client";

import { Routes } from "@/lib/routes";
import { useAppSelector } from "@/store/hooks";
import { redirect } from "next/navigation";

const OrdersPage = () => {
  const user = useAppSelector((s) => s.auth.user);
  redirect(user ? Routes.role(user.role).orders.list : Routes.home);
  return null;
}

export default OrdersPage;