import TicketDetailContent from "@/components/me/TicketDetailContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ticket Details | Net Land System",
  description: "View and reply to your support ticket.",
};

interface TicketDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function TicketDetailPage({ params }: TicketDetailPageProps) {
  const { id } = await params;
  return <TicketDetailContent ticketId={id} />;
}
