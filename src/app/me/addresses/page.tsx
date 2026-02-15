import AddressesContent from "@/components/me/AddressesContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Addresses | Net Land System",
  description: "Manage your saved addresses and account security.",
};

export default function MeAddressesPage() {
  return <AddressesContent />;
}
