import DashboardContent from "@/components/me/DashboardContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | My Account | Net Land System",
  description: "Your account dashboard. View orders, tickets, warranty, and network insights.",
};

export default function UserDashboardPage() {
  return <DashboardContent />;
}
