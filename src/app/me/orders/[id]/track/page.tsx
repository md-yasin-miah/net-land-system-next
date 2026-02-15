import TrackShipmentContent from "@/components/me/TrackShipmentContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Track Shipment | Net Land System",
  description: "Track your order shipment status and delivery timeline.",
};

interface TrackShipmentPageProps {
  params: Promise<{ id: string }>;
}

export default async function TrackShipmentPage({ params }: TrackShipmentPageProps) {
  const { id } = await params;
  return <TrackShipmentContent orderId={id} />;
}
