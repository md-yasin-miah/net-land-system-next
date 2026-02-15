import WarrantyReturnsContent from "@/components/support/WarrantyReturnsContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Warranty & Returns | Net Land System Bangladesh",
  description:
    "Warranty and returns policy for Cisco, Mikrotik, Ubiquiti and TP-Link hardware in Bangladesh. Check warranty status and RMA process.",
};

export default function WarrantyReturnsPage() {
  return <WarrantyReturnsContent />;
}
