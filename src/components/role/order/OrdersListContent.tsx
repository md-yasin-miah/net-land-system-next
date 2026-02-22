"use client";

import { useRef, useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
  Title,
  Tooltip,
} from "chart.js";
import {
  Receipt,
  Clock,
  Truck,
  DollarSign,
  Download,
  Plus,
  Filter,
  MoreVertical,
  X,
  Printer,
  Package,
  Headphones,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableContainer,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { Routes } from "@/lib/routes";
import { Role } from "@/lib/mockData";
import { useParams } from "next/navigation";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
  Title,
  Tooltip,
);

const PRIMARY = "#ec5b13";

// Dummy data
const ORDER_ACTIVITY_24H = {
  labels: [
    "12a",
    "2a",
    "4a",
    "6a",
    "8a",
    "10a",
    "12p",
    "2p",
    "4p",
    "6p",
    "8p",
    "10p",
  ],
  values: [30, 20, 55, 40, 90, 75, 85, 95, 45, 60, 35, 20],
};

const ORDERS = [
  {
    id: "ORD-9421",
    date: "Oct 24, 2023",
    time: "10:45 AM",
    customer: "Sarah Jenkins",
    email: "sarah.j@example.com",
    total: "$1,240.00",
    payment: "Paid" as const,
    fulfillment: "Processing" as const,
    selected: true,
  },
  {
    id: "ORD-9420",
    date: "Oct 24, 2023",
    time: "09:12 AM",
    customer: "Michael Chen",
    email: "m.chen@outlook.com",
    total: "$89.50",
    payment: "Partial" as const,
    fulfillment: "Pending" as const,
    selected: false,
  },
  {
    id: "ORD-9419",
    date: "Oct 23, 2023",
    time: "04:45 PM",
    customer: "Emma Watson",
    email: "e.watson@gmail.com",
    total: "$455.00",
    payment: "Paid" as const,
    fulfillment: "Shipped" as const,
    selected: true,
  },
  {
    id: "ORD-9418",
    date: "Oct 23, 2023",
    time: "02:30 PM",
    customer: "David Miller",
    email: "dmiller@fastmail.com",
    total: "$2,100.00",
    payment: "Paid" as const,
    fulfillment: "Delivered" as const,
    selected: true,
  },
  {
    id: "ORD-9417",
    date: "Oct 23, 2023",
    time: "11:15 AM",
    customer: "Jessica Alba",
    email: "jess@designco.com",
    total: "$12.99",
    payment: "Unpaid" as const,
    fulfillment: "On Hold" as const,
    selected: false,
  },
];

const PAYMENT_STYLES: Record<string, string> = {
  Paid: "bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400 border-green-200 dark:border-green-500/20",
  Partial:
    "bg-yellow-100 dark:bg-yellow-500/20 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-500/20",
  Unpaid:
    "bg-slate-100 dark:bg-slate-500/20 text-slate-700 dark:text-slate-400 border-slate-200 dark:border-slate-500/20",
};

const FULFILLMENT_STYLES: Record<string, string> = {
  Processing:
    "bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-500/20",
  Pending:
    "bg-slate-100 dark:bg-slate-500/20 text-slate-700 dark:text-slate-400 border-slate-200 dark:border-slate-500/20",
  Shipped:
    "bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-500/20",
  Delivered:
    "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20",
  "On Hold":
    "bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-400 border-red-200 dark:border-red-500/20",
};

const FILTER_TABS = [
  { key: "all", label: "All Orders", active: true },
  { key: "pickup", label: "Pick Up", active: false },
  { key: "pos", label: "POS Sales", active: false },
  { key: "abandoned", label: "Abandoned", active: false },
];

export default function OrdersListContent() {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const [filter, setFilter] = useState("all");
  const selectedCount = ORDERS.filter((o) => o.selected).length;
  const [showBulkBar, setShowBulkBar] = useState(selectedCount > 0);
  const params = useParams();
  const role = (params?.role as Role) ?? "admin";
  useEffect(() => {
    if (!chartRef.current) return;
    const chart = new ChartJS(chartRef.current, {
      type: "bar",
      data: {
        labels: ORDER_ACTIVITY_24H.labels,
        datasets: [
          {
            label: "Orders",
            data: ORDER_ACTIVITY_24H.values,
            backgroundColor: ORDER_ACTIVITY_24H.values.map((_, i) =>
              i === 7 ? PRIMARY : "rgba(236, 91, 19, 0.2)",
            ),
            borderRadius: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { maxTicksLimit: 8, font: { size: 9 } },
          },
          y: {
            beginAtZero: true,
            grid: { color: "rgba(148,163,184,0.15)" },
            ticks: { font: { size: 10 } },
          },
        },
      },
    });
    return () => chart.destroy();
  }, []);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Order Management
          </h2>
          <p className="mt-1 text-slate-500 dark:text-slate-400">
            Manage and fulfill customer orders from all channels.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="gap-2 border-slate-200 dark:border-white/10"
          >
            <Download className="size-5" />
            Export
          </Button>
          <Link href={Routes.role(role).orders.create}>
            <Button className="gap-2 bg-orange-600 font-semibold text-white shadow-lg shadow-orange-600/25 hover:bg-orange-600/90">
              <Plus className="size-5" />
              Create New Order
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-white/5">
          <div className="flex size-12 items-center justify-center rounded-lg bg-orange-600/10 text-orange-600">
            <Receipt className="size-7" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500">Total Orders</p>
            <p className="text-xl font-bold">12,845</p>
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-white/5">
          <div className="flex size-12 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500">
            <Clock className="size-7" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500">
              Pending Processing
            </p>
            <p className="text-xl font-bold">158</p>
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-white/5">
          <div className="flex size-12 items-center justify-center rounded-lg bg-yellow-500/10 text-yellow-600 dark:text-yellow-400">
            <Truck className="size-7" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500">In Transit</p>
            <p className="text-xl font-bold">422</p>
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-white/5">
          <div className="flex size-12 items-center justify-center rounded-lg bg-green-500/10 text-green-600 dark:text-green-400">
            <DollarSign className="size-7" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500">Daily Revenue</p>
            <p className="text-xl font-bold">$24,930</p>
          </div>
        </div>
      </div>

      {/* Filters & Table Card */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-white/5">
        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 px-6 py-4 dark:border-white/10">
          <div className="flex items-center gap-2">
            {FILTER_TABS.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setFilter(tab.key)}
                className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                  filter === tab.key
                    ? "bg-slate-100 dark:bg-white/10"
                    : "text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <button
            type="button"
            className="flex items-center gap-1 text-sm font-medium text-slate-500 transition-colors hover:text-orange-600"
          >
            <Filter className="size-[18px]" />
            Advanced Filters
          </button>
        </div>

        {/* Bulk Action Bar */}
        {showBulkBar && (
          <div className="flex items-center justify-between border-b border-orange-600/20 bg-orange-600/5 px-6 py-3 dark:bg-orange-600/10">
            <div className="flex items-center gap-4">
              <span className="text-sm font-semibold text-orange-600">
                {selectedCount} Orders Selected
              </span>
              <div className="h-4 w-px bg-orange-600/20" />
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  className="h-7 rounded bg-orange-600 px-3 text-xs font-bold uppercase tracking-wider text-white hover:bg-orange-600/90"
                >
                  Mark as Shipped
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 rounded border-orange-600/20 px-3 text-xs font-bold uppercase tracking-wider text-orange-600 hover:bg-orange-600/5"
                >
                  Print Labels
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 rounded border-slate-200 px-3 text-xs font-bold uppercase tracking-wider text-slate-600 hover:bg-red-50 hover:text-red-600 dark:border-white/10 dark:text-slate-300"
                >
                  Cancel
                </Button>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowBulkBar(false)}
              className="rounded p-1 text-slate-400 transition-colors hover:bg-slate-200/50 hover:text-slate-600 dark:hover:bg-white/10 dark:hover:text-slate-300"
            >
              <X className="size-[18px]" />
            </button>
          </div>
        )}

        {/* Table */}
        <TableContainer>
          <Table className="min-w-[1000px]">
            <TableHeader>
              <TableRow className="border-slate-200 dark:border-white/10">
                <TableHead className="w-12 px-6 py-4">
                  <input
                    type="checkbox"
                    className="rounded border-slate-300 text-orange-600 focus:ring-orange-600 dark:border-slate-700"
                    aria-label="Select all"
                  />
                </TableHead>
                <TableHead className="px-4 py-4 text-[11px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                  Order ID
                </TableHead>
                <TableHead className="px-4 py-4 text-[11px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                  Date
                </TableHead>
                <TableHead className="px-4 py-4 text-[11px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                  Customer
                </TableHead>
                <TableHead className="px-4 py-4 text-[11px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                  Total
                </TableHead>
                <TableHead className="px-4 py-4 text-[11px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                  Payment
                </TableHead>
                <TableHead className="px-4 py-4 text-[11px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                  Fulfillment
                </TableHead>
                <TableHead className="px-6 py-4 text-right text-[11px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-slate-200 dark:divide-white/5">
              {ORDERS.map((order) => (
                <TableRow
                  key={order.id}
                  className="transition-colors hover:bg-slate-50 dark:hover:bg-white/5"
                >
                  <TableCell className="px-6 py-4">
                    <input
                      type="checkbox"
                      defaultChecked={order.selected}
                      className="rounded border-slate-300 text-orange-600 focus:ring-orange-600 dark:border-slate-700"
                      aria-label={`Select ${order.id}`}
                    />
                  </TableCell>
                  <TableCell className="px-4 py-4 font-bold text-orange-600">
                    #{order.id}
                  </TableCell>
                  <TableCell className="px-4 py-4 text-sm text-slate-500 dark:text-slate-400">
                    {order.date}{" "}
                    <span className="block text-[10px] opacity-70">
                      {order.time}
                    </span>
                  </TableCell>
                  <TableCell className="px-4 py-4">
                    <div className="font-medium">{order.customer}</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">
                      {order.email}
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-4 text-sm font-semibold">
                    {order.total}
                  </TableCell>
                  <TableCell className="px-4 py-4">
                    <span
                      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
                        PAYMENT_STYLES[order.payment] ?? ""
                      }`}
                    >
                      {order.payment}
                    </span>
                  </TableCell>
                  <TableCell className="px-4 py-4">
                    <span
                      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
                        FULFILLMENT_STYLES[order.fulfillment] ?? ""
                      }`}
                    >
                      {order.fulfillment}
                    </span>
                  </TableCell>
                  <TableCell className="px-6 py-4 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-8 text-slate-400 hover:text-orange-600"
                        >
                          <MoreVertical className="size-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Edit Order</DropdownMenuItem>
                        <DropdownMenuItem>
                          <Link href={Routes.role(role).orders.invoice(order.id)}>
                            Print Invoice
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          Cancel Order
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <div className="flex flex-col gap-4 border-t border-slate-200 px-6 py-4 dark:border-white/10 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <span className="text-xs text-slate-500">
              Showing 1 to 5 of 12,845 orders
            </span>
            <Select defaultValue="10">
              <SelectTrigger className="h-8 w-[100px] border-none bg-slate-100 text-xs font-semibold dark:bg-white/5">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10 Rows</SelectItem>
                <SelectItem value="25">25 Rows</SelectItem>
                <SelectItem value="50">50 Rows</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="size-8 rounded bg-slate-100 text-slate-400 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10"
              disabled
            >
              <ChevronLeft className="size-[18px]" />
            </Button>
            <button
              type="button"
              className="flex size-8 items-center justify-center rounded bg-orange-600 text-xs font-bold text-white"
            >
              1
            </button>
            <button
              type="button"
              className="flex size-8 items-center justify-center rounded bg-slate-100 text-xs font-bold text-slate-600 transition-colors hover:bg-slate-200 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10"
            >
              2
            </button>
            <button
              type="button"
              className="flex size-8 items-center justify-center rounded bg-slate-100 text-xs font-bold text-slate-600 transition-colors hover:bg-slate-200 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10"
            >
              3
            </button>
            <span className="mx-1 text-xs text-slate-400">...</span>
            <button
              type="button"
              className="flex size-8 items-center justify-center rounded bg-slate-100 text-xs font-bold text-slate-600 transition-colors hover:bg-slate-200 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10"
            >
              128
            </button>
            <Button
              variant="ghost"
              size="icon"
              className="size-8 rounded bg-slate-100 text-slate-400 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10"
            >
              <ChevronRight className="size-[18px]" />
            </Button>
          </div>
        </div>
      </div>

      {/* Order Activity & Quick Actions */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Order Activity Chart */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-white/5 lg:col-span-2">
          <h3 className="mb-4 text-lg font-bold text-slate-900 dark:text-white">
            Order Activity (Last 24h)
          </h3>
          <div className="h-48">
            <canvas ref={chartRef} />
          </div>
          <div className="mt-4 flex justify-between px-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">
            <span>12:00 AM</span>
            <span>06:00 AM</span>
            <span>12:00 PM</span>
            <span>06:00 PM</span>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-white/5">
          <h3 className="mb-4 text-lg font-bold text-slate-900 dark:text-white">
            Quick Actions
          </h3>
          <div className="space-y-3">
            <button
              type="button"
              className="group flex w-full items-center justify-between rounded-lg border border-slate-200 p-3 transition-all hover:border-orange-600/50 hover:bg-orange-600/5 dark:border-white/10"
            >
              <div className="flex items-center gap-3">
                <Printer className="size-5 text-slate-400 group-hover:text-orange-600" />
                <span className="text-sm font-medium">
                  Print Daily Picklist
                </span>
              </div>
              <ArrowRight className="size-[18px] text-slate-300 group-hover:text-orange-600" />
            </button>
            <button
              type="button"
              className="group flex w-full items-center justify-between rounded-lg border border-slate-200 p-3 transition-all hover:border-orange-600/50 hover:bg-orange-600/5 dark:border-white/10"
            >
              <div className="flex items-center gap-3">
                <Package className="size-5 text-slate-400 group-hover:text-orange-600" />
                <span className="text-sm font-medium">
                  Restock Low Inventory
                </span>
              </div>
              <ArrowRight className="size-[18px] text-slate-300 group-hover:text-orange-600" />
            </button>
            <button
              type="button"
              className="group flex w-full items-center justify-between rounded-lg border border-slate-200 p-3 transition-all hover:border-orange-600/50 hover:bg-orange-600/5 dark:border-white/10"
            >
              <div className="flex items-center gap-3">
                <Headphones className="size-5 text-slate-400 group-hover:text-orange-600" />
                <span className="text-sm font-medium">
                  Open Support Tickets
                </span>
              </div>
              <span className="rounded-full bg-orange-600 px-2 py-0.5 text-[10px] font-bold text-white">
                12
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
