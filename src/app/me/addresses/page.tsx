import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Addresses | Net Land System",
  description: "Manage your saved addresses.",
};

export default function MeAddressesPage() {
  return (
    <div className="mx-auto max-w-7xl p-8">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Addresses</h1>
      <p className="mt-2 text-slate-500">Your saved addresses will appear here.</p>
    </div>
  );
}
