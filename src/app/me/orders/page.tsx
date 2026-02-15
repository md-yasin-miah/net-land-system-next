import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Orders | Net Land System",
  description: "View and track your orders.",
};

export default function MeOrdersPage() {
  return (
    <div className="mx-auto max-w-7xl p-8">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white">My Orders</h1>
      <p className="mt-2 text-slate-500">Your order history will appear here.</p>
    </div>
  );
}
