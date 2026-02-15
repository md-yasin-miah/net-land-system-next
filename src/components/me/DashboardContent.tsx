"use client";

import Link from "next/link";
import {
  Package,
  Ticket,
  ShieldCheck,
  Truck,
  Star,
  CheckCircle2,
  Info,
  MoreVertical,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { DataTableColumn } from "@/components/ui/table";
import { DataTable } from "@/components/ui/table";
import { Routes } from "@/lib/routes";
import { cn } from "@/lib/utils";

const STATS = [
  {
    label: "Active Orders",
    value: "03",
    icon: Package,
    iconBg: "bg-primary/10 text-primary",
  },
  {
    label: "Open Tickets",
    value: "01",
    icon: Ticket,
    iconBg: "bg-amber-500/10 text-amber-500",
  },
  {
    label: "Warranty Items",
    value: "12",
    icon: ShieldCheck,
    iconBg: "bg-emerald-500/10 text-emerald-500",
  },
];

const QUICK_ACTIONS = [
  {
    icon: Truck,
    title: "Track Order",
    description: "Real-time status of your shipments.",
    href: Routes.support.tracking,
  },
  {
    icon: Star,
    title: "Submit Review",
    description: "Share your feedback on hardware.",
    href: Routes.products.list,
  },
  {
    icon: ShieldCheck,
    title: "Check Warranty",
    description: "Validate coverage for your devices.",
    href: Routes.support.warrantyReturns,
  },
];

type RecentOrderRow = {
  id: string;
  date: string;
  status: string;
  statusStyle: string;
  total: string;
};

const RECENT_ORDERS: RecentOrderRow[] = [
  { id: "NL-89230", date: "Oct 24, 2023", status: "DELIVERED", statusStyle: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400", total: "$1,429.00" },
  { id: "NL-89215", date: "Oct 21, 2023", status: "SHIPPED", statusStyle: "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400", total: "$842.50" },
  { id: "NL-89198", date: "Oct 18, 2023", status: "PROCESSING", statusStyle: "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400", total: "$2,104.99" },
  { id: "NL-89102", date: "Oct 12, 2023", status: "DELIVERED", statusStyle: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400", total: "$315.00" },
];

const RECENT_ORDERS_COLUMNS: DataTableColumn<RecentOrderRow>[] = [
  {
    key: "id",
    header: "Order ID",
    headerClassName: "text-[10px]",
    render: (_, row) => <p className="font-bold text-slate-900 dark:text-white">#{row.id}</p>,
  },
  {
    key: "date",
    header: "Date",
    headerClassName: "text-[10px]",
    render: (_, row) => <p className="text-slate-500">{row.date}</p>,
  },
  {
    key: "status",
    header: "Status",
    headerClassName: "text-[10px]",
    render: (_, row) => (
      <span className={cn("inline-flex items-center rounded px-2 py-0.5 text-[10px] font-bold", row.statusStyle)}>
        {row.status}
      </span>
    ),
  },
  {
    key: "total",
    header: "Total",
    headerClassName: "text-[10px]",
    render: (_, row) => <p className="font-bold text-slate-900 dark:text-white">{row.total}</p>,
  },
  {
    key: "actions",
    header: "",
    headerClassName: "w-0",
    cellClassName: "text-right",
    align: "right",
    render: () => (
      <button type="button" className="text-slate-400 transition-colors hover:text-primary" aria-label="More options">
        <MoreVertical className="size-5" />
      </button>
    ),
  },
];

export default function DashboardContent() {
  return (
    <div className="mx-auto w-full max-w-7xl p-8">
      {/* Welcome */}
      <div className="mb-8">
        <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
          Welcome back, Alex
        </h1>
        <p className="mt-1 text-slate-500">
          Here&apos;s what&apos;s happening with your networking fleet today.
        </p>
      </div>

      {/* Stats */}
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        {STATS.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
            >
              <div>
                <p className="mb-1 text-xs font-bold uppercase tracking-wider text-slate-400">
                  {stat.label}
                </p>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                  {stat.value}
                </h3>
              </div>
              <div
                className={cn(
                  "flex size-12 items-center justify-center rounded-lg",
                  stat.iconBg
                )}
              >
                <Icon className="size-6" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="mb-10">
        <h2 className="mb-4 flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
          Quick Actions
          <span className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {QUICK_ACTIONS.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.title}
                href={action.href}
                className="group flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-5 text-left shadow-sm transition-all hover:border-primary dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="flex size-10 items-center justify-center rounded-lg bg-slate-100 text-slate-600 transition-colors group-hover:bg-primary group-hover:text-white dark:bg-slate-800 dark:text-slate-400">
                  <Icon className="size-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">
                    {action.title}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    {action.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Recent Orders + Widgets */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Recent Orders Table */}
        <div className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:col-span-2">
          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 dark:border-slate-800">
            <h3 className="font-bold text-slate-900 dark:text-white">
              Recent Orders
            </h3>
            <Link
              href={Routes.me.orders}
              className="text-xs font-bold text-primary hover:underline"
            >
              View All
            </Link>
          </div>
          <DataTable<RecentOrderRow>
            columns={RECENT_ORDERS_COLUMNS}
            data={RECENT_ORDERS}
            keyExtractor={(row) => row.id}
          />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Active Support Ticket */}
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="border-b border-slate-100 px-5 py-4 dark:border-slate-800">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Active Support Ticket
              </h3>
            </div>
            <div className="p-5">
              <div className="mb-3 flex items-start justify-between">
                <span className="text-[10px] font-bold uppercase text-slate-400">
                  #TK-4421
                </span>
                <span className="size-2 animate-pulse rounded-full bg-amber-500" />
              </div>
              <p className="text-sm font-bold leading-snug text-slate-900 dark:text-white">
                Configuration issues with S-5000 Core Switch
              </p>
              <p className="mt-2 line-clamp-2 text-xs italic text-slate-500">
                &quot;Latest update: We are reviewing your log files...&quot;
              </p>
              <div className="mt-4 flex items-center justify-between border-t border-slate-50 pt-4 dark:border-slate-800">
                <div className="flex -space-x-2">
                  <div className="size-6 rounded-full border-2 border-white bg-slate-200 dark:border-slate-900 dark:bg-slate-700" />
                  <div className="flex size-6 items-center justify-center rounded-full border-2 border-white bg-slate-100 text-[8px] font-bold text-slate-500 dark:border-slate-900 dark:bg-slate-800">
                    +1
                  </div>
                </div>
                <Link href={Routes.support.liveChat}>
                  <Button size="sm" className="text-[10px] font-bold">
                    Open Chat
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Network Insights */}
          <div className="rounded-xl bg-slate-900 p-5 text-white dark:bg-slate-950">
            <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-400">
              Network Insights
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="size-5 text-emerald-400" />
                  <p className="text-xs font-medium">Core Router Status</p>
                </div>
                <p className="text-xs font-bold text-emerald-400">Online</p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="size-5 text-emerald-400" />
                  <p className="text-xs font-medium">Access Points (12/12)</p>
                </div>
                <p className="text-xs font-bold text-emerald-400">100%</p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Info className="size-5 text-blue-400" />
                  <p className="text-xs font-medium">Firmware Updates</p>
                </div>
                <p className="text-xs font-bold text-blue-400">2 Available</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="mt-6 w-full border-white/10 bg-white/10 font-bold text-white hover:bg-white/20"
            >
              Launch Fleet Manager
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
