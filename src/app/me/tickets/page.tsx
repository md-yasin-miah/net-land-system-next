import MeTicketsContent from "@/components/me/MeTicketsContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Support Tickets | Net Land System",
  description: "View and manage your support tickets.",
};

export default function MeTicketsPage() {
  return <MeTicketsContent />;
}
