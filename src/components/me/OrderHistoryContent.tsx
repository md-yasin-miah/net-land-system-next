"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  Calendar,
  ChevronLeft,
  ChevronRight,
  EyeIcon,
  TruckIcon,
  MoreVerticalIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { DataTableColumn } from "@/components/ui/table";
import { DataTable } from "@/components/ui/table";
import { Routes } from "@/lib/routes";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const STATUS_STYLES: Record<string, string> = {
  Delivered:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",
  Shipped: "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400",
  Processing:
    "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
  Cancelled: "bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400",
};

type OrderRow = {
  id: string;
  date: string;
  status: "Delivered" | "Shipped" | "Processing" | "Cancelled";
  total: string;
};

const ORDERS: OrderRow[] = [
  {
    id: "ORD-882193",
    date: "Oct 24, 2023",
    status: "Delivered",
    total: "$249.99",
  },
  {
    id: "ORD-993812",
    date: "Oct 26, 2023",
    status: "Shipped",
    total: "$89.50",
  },
  {
    id: "ORD-771625",
    date: "Oct 27, 2023",
    status: "Processing",
    total: "$1,120.00",
  },
  {
    id: "ORD-552431",
    date: "Sep 30, 2023",
    status: "Cancelled",
    total: "$15.99",
  },
  {
    id: "ORD-441092",
    date: "Sep 15, 2023",
    status: "Delivered",
    total: "$452.12",
  },
];

const ORDER_COLUMNS: DataTableColumn<OrderRow>[] = [
  {
    key: "id",
    header: "Order ID",
    cellClassName: "py-5",
    render: (_, row) => (
      <span className="font-bold tracking-tight text-primary">{row.id}</span>
    ),
  },
  {
    key: "date",
    header: "Date",
    cellClassName: "py-5 text-slate-600 dark:text-slate-300",
  },
  {
    key: "status",
    header: "Status",
    cellClassName: "py-5",
    render: (_, row) => (
      <span
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold",
          STATUS_STYLES[row.status] ??
            "bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300",
        )}
      >
        <span
          className={cn(
            "size-1.5 rounded-full",
            row.status === "Delivered" && "bg-emerald-600",
            row.status === "Shipped" && "bg-blue-600",
            row.status === "Processing" && "bg-amber-600",
            row.status === "Cancelled" && "bg-rose-600",
          )}
        />
        {row.status}
      </span>
    ),
  },
  {
    key: "total",
    header: "Total Amount",
    cellClassName: "py-5 font-semibold text-slate-900 dark:text-white",
  },
  {
    key: "action",
    header: "Action",
    headerClassName: "text-right",
    cellClassName: "py-5 text-right",
    align: "right",
    render: (_, row) => {
      const track = ["Shipped", "Processing"].includes(row.status);
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <MoreVerticalIcon className="size-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link
                  href={Routes.me.orderDetail(row.id)}
                  className="flex cursor-pointer items-center gap-2"
                >
                  <EyeIcon className="size-4" />
                  View
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            {track && (
              <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                  <Link
                    href={Routes.me.orderTracking(row.id)}
                    className="flex cursor-pointer items-center gap-2"
                  >
                    <TruckIcon className="size-4" />
                    Track Shipment
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

const STATUS_OPTIONS = [
  "All Statuses",
  "Delivered",
  "Shipped",
  "Processing",
  "Cancelled",
];

export default function OrderHistoryContent() {
  const [search, setSearch] = useState("");
  const [dateRange] = useState("Last 90 Days");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [page, setPage] = useState(1);
  const totalPages = 3;

  return (
    <div className="mx-auto max-w-7xl w-full p-8">
      {/* Breadcrumb */}
      <nav className="mb-4 flex items-center gap-2 text-sm">
        <Link href={Routes.home} className="text-slate-500 hover:text-primary">
          Home
        </Link>
        <span className="text-slate-400">/</span>
        <span className="font-medium text-slate-900 dark:text-white">
          Orders
        </span>
      </nav>
      <div className="mb-8 flex flex-wrap gap-3">
        <div className="min-w-[300px] flex-1">
          <p className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Manage your purchases
          </p>
          <p className="mt-1 text-base text-slate-500 dark:text-slate-400">
            View and track status of all your current and past orders.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-wrap items-end gap-4">
          <div className="min-w-[240px] flex-1">
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500">
              Search Order
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Order ID or product name..."
                className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-10 pr-4 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>
          </div>
          <div className="w-64">
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500">
              Date Range
            </label>
            <div className="flex items-center rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
              <Calendar className="mr-2 size-5 shrink-0 text-slate-400" />
              <span className="flex-1">{dateRange}</span>
              <span className="text-slate-400">▼</span>
            </div>
          </div>
          <div className="w-48">
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500">
              Order Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
            >
              {STATUS_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
          <Button variant="secondary" className="h-[38px] px-5">
            Apply Filters
          </Button>
        </div>
      </div>

      {/* Orders Table */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <DataTable<OrderRow>
          columns={ORDER_COLUMNS}
          data={ORDERS}
          keyExtractor={(row) => row.id}
          footer={
            <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50 px-6 py-4 dark:border-slate-800 dark:bg-slate-800/30">
              <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                Showing 5 of 32 orders
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="size-8"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                >
                  <ChevronLeft className="size-5" />
                </Button>
                {[1, 2, 3].map((n) => (
                  <Button
                    key={n}
                    variant={page === n ? "default" : "outline"}
                    size="icon"
                    className="size-8 text-xs font-bold"
                    onClick={() => setPage(n)}
                  >
                    {n}
                  </Button>
                ))}
                <Button
                  variant="outline"
                  size="icon"
                  className="size-8"
                  disabled={page >= totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                >
                  <ChevronRight className="size-5" />
                </Button>
              </div>
            </div>
          }
        />
      </div>
    </div>
  );
}
