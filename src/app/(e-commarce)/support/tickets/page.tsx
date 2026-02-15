import SupportTicketsContent from "@/components/support/SupportTicketsContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Support Tickets | Net Land System",
  description:
    "Submit a support ticket or search our knowledge base. Track orders, technical support, RMA/warranty, and FAQ.",
};

export default function SupportTicketsPage() {
  return <SupportTicketsContent />;
}
