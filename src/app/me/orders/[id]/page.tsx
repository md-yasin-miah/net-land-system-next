import OrderDetailsContent from "@/components/me/OrderDetailsContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Order Details | Net Land System",
  description: "View order status, items, and shipping details.",
};

interface OrderDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function OrderDetailPage({ params }: OrderDetailPageProps) {
  const { id } = await params;
  return <OrderDetailsContent orderId={id} />;
}
