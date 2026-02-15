import OrderHistoryContent from "@/components/me/OrderHistoryContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Orders | Net Land System",
  description: "View and track your orders.",
};

export default function MeOrdersPage() {
  return <OrderHistoryContent />;
}
