import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Account Settings | Net Land System",
  description: "Manage your account settings.",
};

export default function MeSettingsPage() {
  return (
    <div className="mx-auto max-w-7xl p-8">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Account Settings</h1>
      <p className="mt-2 text-slate-500">Your account settings will appear here.</p>
    </div>
  );
}
