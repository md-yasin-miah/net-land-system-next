import ThankYouContent from "@/components/checkout/ThankYouContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Order Confirmation | Net Land System",
  description: "Thank you for your order. Your order has been confirmed.",
};

export default async function ThankYouPage({
  searchParams,
}: {
  searchParams: Promise<{ orderId?: string }>;
}) {
  const { orderId } = await searchParams;

  return (
    <>
      <ThankYouContent orderId={orderId} />
    </>
  );
}
