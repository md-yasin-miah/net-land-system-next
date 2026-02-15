import { notFound } from "next/navigation";
import WarrantyResultsContent from "@/components/support/WarrantyResultsContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Warranty Check Results | Net Land System",
  description: "View warranty verification results for your product serial number.",
};

export default async function WarrantyResultsSerialPage({
  params,
}: {
  params: Promise<{ serial: string }>;
}) {
  const { serial } = await params;
  const decoded = decodeURIComponent(serial).trim();
  if (!decoded) notFound();

  return <WarrantyResultsContent serial={decoded} />;
}
