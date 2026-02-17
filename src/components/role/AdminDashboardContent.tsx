"use client";

import Link from "next/link";
import {
  TrendingUp,
  ShoppingCart,
  Package,
  UserPlus,
  Wallet,
  CreditCard,
  AlertTriangle,
  Filter,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const KPIS = [
  {
    label: "Total Revenue",
    value: "$842.5k",
    subText: "+12.4%",
    subMuted: "vs last month",
    icon: TrendingUp,
    iconColor: "text-green-500",
  },
  {
    label: "Total Sales",
    value: "12,450",
    subText: "+8.2%",
    subMuted: "orders up",
    icon: ShoppingCart,
    iconColor: "text-primary",
  },
  {
    label: "Total Orders",
    value: "8,920",
    subText: "Monthly goal: 89%",
    icon: Package,
    iconColor: "text-blue-500",
  },
  {
    label: "Total Customers",
    value: "3,120",
    subText: "+5.1%",
    subMuted: "new leads",
    icon: UserPlus,
    iconColor: "text-indigo-500",
  },
  {
    label: "Receivables",
    value: "$15,400",
    subText: "14 pending",
    subMuted: "invoices",
    icon: Wallet,
    iconColor: "text-amber-500",
  },
  {
    label: "Payables",
    value: "$9,200",
    subText: "Due today",
    subMuted: "$1,200",
    icon: CreditCard,
    iconColor: "text-red-500",
  },
];

const LOW_STOCK = [
  { name: "Wireless Mouse Pro", sku: "WM-0012", qty: 3, level: "critical" as const },
  { name: "USB-C Cable 2m", sku: "UC-8890", qty: 12, level: "warning" as const },
  { name: "Gaming Pad RGB", sku: "GP-1122", qty: 8, level: "warning" as const },
];

const RECENT_ACTIVITY = [
  {
    id: "#ORD-99812",
    customer: "John Doe",
    initials: "JD",
    initialsBg: "bg-indigo-100 dark:bg-indigo-900 text-indigo-600",
    product: "Ultra Monitor 27\"",
    amount: "$349.00",
    status: "Paid",
    statusStyle: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-500",
    time: "2 mins ago",
  },
  {
    id: "#ORD-99811",
    customer: "Sarah Miller",
    initials: "SM",
    initialsBg: "bg-pink-100 dark:bg-pink-900 text-pink-600",
    product: "Keyboard Mech G4",
    amount: "$89.50",
    status: "Pending",
    statusStyle: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-500",
    time: "14 mins ago",
  },
  {
    id: "#ORD-99810",
    customer: "Robert Jones",
    initials: "RJ",
    initialsBg: "bg-blue-100 dark:bg-blue-900 text-blue-600",
    product: "Noise-Cancel Headphones",
    amount: "$199.00",
    status: "Paid",
    statusStyle: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-500",
    time: "45 mins ago",
  },
  {
    id: "#ORD-99809",
    customer: "Emily King",
    initials: "EK",
    initialsBg: "bg-emerald-100 dark:bg-emerald-900 text-emerald-600",
    product: "Webcam HD Pro",
    amount: "$59.00",
    status: "Canceled",
    statusStyle: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-500",
    time: "1 hour ago",
  },
];

const TOP_PRODUCTS = [
  { name: "MacBook Air M2", units: 142, change: "12%", up: true },
  { name: "Logitech MX Master", units: 115, change: "8%", up: true },
  { name: "iPhone 15 Pro", units: 98, change: "2%", up: false },
  { name: "Sony WH-1000XM5", units: 87, change: "15%", up: true },
];

export default function AdminDashboardContent() {
  return (
    <div className="space-y-6">
      {/* KPI Row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {KPIS.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div
              key={kpi.label}
              className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="mb-2 flex items-start justify-between">
                <p className="text-xs font-bold uppercase tracking-tight text-slate-500">
                  {kpi.label}
                </p>
                <Icon className={`size-[18px] ${kpi.iconColor}`} />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white">
                {kpi.value}
              </h3>
              <p className="mt-1 text-[10px]">
                {kpi.subMuted ? (
                  <>
                    <span
                      className={
                        kpi.label === "Payables"
                          ? "font-bold text-red-600"
                          : kpi.label === "Receivables"
                            ? "font-bold text-amber-600"
                            : "font-bold text-green-600"
                      }
                    >
                      {kpi.subText}
                    </span>{" "}
                    <span className="ml-1 font-normal text-slate-400">
                      {kpi.subMuted}
                    </span>
                  </>
                ) : (
                  <span className="font-normal text-slate-400">
                    {kpi.subText}
                  </span>
                )}
              </p>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Sales Performance Line Chart */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:col-span-8">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="font-bold text-slate-800 dark:text-white">
                Sales Performance
              </h3>
              <p className="text-xs text-slate-500">
                Monthly revenue compared to previous period
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="flex items-center gap-1 text-[10px] font-bold text-slate-400">
                <span className="size-2 rounded-full bg-primary" /> CURRENT
              </span>
              <span className="flex items-center gap-1 text-[10px] font-bold text-slate-400">
                <span className="size-2 rounded-full bg-slate-200 dark:bg-slate-600" />{" "}
                PREVIOUS
              </span>
              <select className="ml-4 rounded border-none bg-slate-100 py-1 px-3 text-xs font-semibold dark:bg-slate-800">
                <option>Last 6 Months</option>
                <option>Yearly</option>
              </select>
            </div>
          </div>
          <div className="h-64 w-full">
            <svg
              className="h-full w-full"
              viewBox="0 0 800 240"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient
                  id="chartGradient"
                  x1="0"
                  x2="0"
                  y1="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#1152d4" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="#1152d4" stopOpacity={0} />
                </linearGradient>
              </defs>
              <path
                d="M0,200 L100,180 L200,195 L300,150 L400,165 L500,110 L600,130 L700,90 L800,75 L800,240 L0,240 Z"
                fill="url(#chartGradient)"
              />
              <path
                d="M0,200 L100,180 L200,195 L300,150 L400,165 L500,110 L600,130 L700,90 L800,75"
                fill="none"
                stroke="#1152d4"
                strokeLinecap="round"
                strokeWidth={3}
              />
              <path
                d="M0,210 L100,205 L200,215 L300,180 L400,190 L500,160 L600,170 L700,150 L800,140"
                fill="none"
                stroke="#e2e8f0"
                strokeDasharray="4"
                strokeWidth={2}
              />
              <g className="fill-slate-400 text-[10px] font-medium">
                <text x={0} y={235}>JAN</text>
                <text x={100} y={235}>FEB</text>
                <text x={200} y={235}>MAR</text>
                <text x={300} y={235}>APR</text>
                <text x={400} y={235}>MAY</text>
                <text x={500} y={235}>JUN</text>
                <text x={600} y={235}>JUL</text>
                <text x={700} y={235}>AUG</text>
                <text x={760} y={235}>SEP</text>
              </g>
            </svg>
          </div>
        </div>

        {/* Order Status Donut Chart */}
        <div className="flex flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:col-span-4">
          <h3 className="mb-1 font-bold text-slate-800 dark:text-white">
            Order Status
          </h3>
          <p className="mb-6 text-xs text-slate-500">
            Distribution across current week
          </p>
          <div className="flex flex-1 flex-col items-center justify-center">
            <div className="relative size-40">
              <svg
                className="h-full w-full -rotate-90"
                viewBox="0 0 36 36"
              >
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                  stroke="#f1f5f9"
                  strokeWidth={4}
                />
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                  stroke="#1152d4"
                  strokeDasharray="70 100"
                  strokeLinecap="round"
                  strokeWidth={4}
                />
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                  stroke="#10b981"
                  strokeDasharray="20 100"
                  strokeDashoffset={-70}
                  strokeLinecap="round"
                  strokeWidth={4}
                />
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                  stroke="#f59e0b"
                  strokeDasharray="10 100"
                  strokeDashoffset={-90}
                  strokeLinecap="round"
                  strokeWidth={4}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xl font-bold text-slate-800 dark:text-white">
                  8.9k
                </span>
                <span className="text-[10px] font-bold uppercase text-slate-400">
                  Total
                </span>
              </div>
            </div>
            <div className="mt-6 w-full space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-primary" /> Shipped
                </span>
                <span className="font-bold">70%</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-green-500" /> Delivered
                </span>
                <span className="font-bold">20%</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-amber-500" /> Pending
                </span>
                <span className="font-bold">10%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tables Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Low Stock Alert */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:col-span-4">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="flex items-center gap-2 font-bold text-slate-800 dark:text-white">
              <AlertTriangle className="size-5 text-red-500" /> Low Stock Alert
            </h3>
            <Link
              href="#"
              className="text-[10px] font-bold text-primary hover:underline"
            >
              VIEW ALL
            </Link>
          </div>
          <div className="space-y-4">
            {LOW_STOCK.map((item) => (
              <div
                key={item.sku}
                className={`flex items-center justify-between rounded-lg border p-3 ${
                  item.level === "critical"
                    ? "border-red-100 bg-red-50 dark:border-red-900/20 dark:bg-red-900/10"
                    : "border-amber-100 bg-amber-50 dark:border-amber-900/20 dark:bg-amber-900/10"
                }`}
              >
                <div>
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-100">
                    {item.name}
                  </p>
                  <p className="text-[10px] text-slate-500">SKU: {item.sku}</p>
                </div>
                <div className="text-right">
                  <p
                    className={`text-xs font-black ${
                      item.level === "critical"
                        ? "text-red-600"
                        : "text-amber-600"
                    }`}
                  >
                    {item.qty} left
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className={`mt-1 h-6 px-2 text-[9px] font-bold ${
                      item.level === "critical"
                        ? "border-red-200 text-red-600 hover:bg-red-600 hover:text-white dark:border-red-800"
                        : "border-amber-200 text-amber-600 hover:bg-amber-600 hover:text-white dark:border-amber-800"
                    }`}
                  >
                    REORDER
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity Table */}
        <div className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:col-span-8">
          <div className="flex items-center justify-between border-b border-slate-100 p-6 dark:border-slate-800">
            <h3 className="font-bold text-slate-800 dark:text-white">
              Recent Activity
            </h3>
            <button
              type="button"
              className="flex items-center gap-1 text-xs font-bold text-slate-500 transition-colors hover:text-primary"
            >
              <Filter className="size-[18px]" /> Filters
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:bg-slate-800/50">
                <tr>
                  <th className="px-6 py-3">Order ID</th>
                  <th className="px-6 py-3">Customer</th>
                  <th className="px-6 py-3">Product</th>
                  <th className="px-6 py-3">Amount</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {RECENT_ACTIVITY.map((row) => (
                  <tr
                    key={row.id}
                    className="transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/30"
                  >
                    <td className="px-6 py-4 text-xs font-bold text-primary">
                      {row.id}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div
                          className={`flex size-6 items-center justify-center rounded-full text-[10px] font-bold ${row.initialsBg}`}
                        >
                          {row.initials}
                        </div>
                        <span className="text-xs font-medium text-slate-700 dark:text-slate-200">
                          {row.customer}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-600 dark:text-slate-400">
                      {row.product}
                    </td>
                    <td className="px-6 py-4 text-xs font-bold text-slate-800 dark:text-white">
                      {row.amount}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`rounded px-2 py-0.5 text-[10px] font-bold uppercase ${row.statusStyle}`}
                      >
                        {row.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-500">
                      {row.time}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between border-t border-slate-100 p-4 dark:border-slate-800">
            <p className="text-[10px] font-bold text-slate-500">
              SHOWING 1-4 OF 1,245 ORDERS
            </p>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" className="size-9">
                <ChevronLeft className="size-[18px]" />
              </Button>
              <Button variant="ghost" size="icon" className="size-9">
                <ChevronRight className="size-[18px]" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Top Selling Products */}
      <div className="grid grid-cols-1 gap-6 pb-10 lg:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:col-span-4">
          <h3 className="mb-4 font-bold text-slate-800 dark:text-white">
            Top Selling Products
          </h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {TOP_PRODUCTS.map((product) => (
              <div
                key={product.name}
                className="group flex cursor-pointer items-center gap-4"
              >
                <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-slate-100 transition-transform group-hover:scale-105 dark:bg-slate-800">
                  <Package className="size-8 text-slate-400" />
                </div>
                <div>
                  <p className="max-w-[150px] truncate text-xs font-bold text-slate-800 dark:text-white">
                    {product.name}
                  </p>
                  <p className="text-[10px] font-bold text-slate-500">
                    {product.units} Units{" "}
                    <span
                      className={`ml-1 ${product.up ? "text-green-600" : "text-red-600"}`}
                    >
                      {product.up ? "↑" : "↓"} {product.change}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
