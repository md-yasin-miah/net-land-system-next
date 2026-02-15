"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingCart,
  ShieldCheck,
  MessageSquare,
  Settings,
  MapPin,
  Search,
  Bell,
  HelpCircle,
} from "lucide-react";
import { Routes } from "@/lib/routes";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: Routes.me.dashboard, label: "Dashboard", icon: LayoutDashboard },
  { href: Routes.me.orders, label: "My Orders", icon: ShoppingCart },
  { href: Routes.me.warranty, label: "Warranty & RMA", icon: ShieldCheck },
  { href: Routes.me.tickets, label: "Support Tickets", icon: MessageSquare },
] as const;

const SETTINGS_ITEMS = [
  { href: Routes.me.settings, label: "Account Settings", icon: Settings },
  { href: Routes.me.addresses, label: "Addresses", icon: MapPin },
] as const;

export default function UserPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-50 flex h-full w-64 flex-col border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center gap-3 p-6">
          <Link
            href={Routes.home}
            className="flex size-8 items-center justify-center rounded bg-primary text-white"
          >
            <span className="text-lg font-bold">NL</span>
          </Link>
          <h2 className="text-lg font-bold leading-none tracking-tight text-slate-900 dark:text-white">
            Net Land
          </h2>
        </div>
        <nav className="flex-1 space-y-1 px-4 py-2">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800"
                )}
              >
                <Icon className="size-5 shrink-0" />
                {item.label}
              </Link>
            );
          })}
          <div className="pb-2 pt-4">
            <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Settings
            </p>
          </div>
          {SETTINGS_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800"
                )}
              >
                <Icon className="size-5 shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-slate-200 p-4 dark:border-slate-800">
          <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-2 dark:bg-slate-800/50">
            <div className="flex size-9 items-center justify-center overflow-hidden rounded-full bg-primary/20 font-bold text-primary">
              <span className="text-sm">AJ</span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-bold text-slate-900 dark:text-white">
                Alex Johnson
              </p>
              <p className="truncate text-[10px] text-slate-500">Pro Account</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex min-h-screen flex-1 flex-col pl-64">
        {/* Top Bar */}
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-slate-200 bg-white/80 px-8 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
              <input
                type="search"
                placeholder="Search orders, tickets, or hardware..."
                className="w-80 rounded-lg border-none bg-slate-100 py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-400"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="relative rounded-full p-2 text-slate-500 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Notifications"
            >
              <Bell className="size-5" />
              <span className="absolute right-2 top-2 size-2 rounded-full border-2 border-white bg-red-500 dark:border-slate-900" />
            </button>
            <Link
              href={Routes.support.index}
              className="rounded-full p-2 text-slate-500 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Help"
            >
              <HelpCircle className="size-5" />
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1">{children}</div>
      </main>
    </div>
  );
}
