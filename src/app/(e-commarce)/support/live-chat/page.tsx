import LiveChatContent from "@/components/support/LiveChatContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Live Chat | Net Land System Support",
  description:
    "Chat with Net Land support. Get help with warranty, orders, and technical issues in real time.",
};

export default function LiveChatPage() {
  return <LiveChatContent />;
}
