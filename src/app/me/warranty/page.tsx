import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Warranty & RMA | Net Land System",
  description: "Manage warranty and RMA claims.",
};

export default function MeWarrantyPage() {
  return (
    <div className="mx-auto max-w-7xl p-8">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Warranty & RMA</h1>
      <p className="mt-2 text-slate-500">Your warranty and RMA information will appear here.</p>
    </div>
  );
}
