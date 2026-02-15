import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Support Tickets | Net Land System",
  description: "View and manage your support tickets.",
};

export default function MeTicketsPage() {
  return (
    <div className="mx-auto max-w-7xl p-8">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Support Tickets</h1>
      <p className="mt-2 text-slate-500">Your support tickets will appear here.</p>
    </div>
  );
}
