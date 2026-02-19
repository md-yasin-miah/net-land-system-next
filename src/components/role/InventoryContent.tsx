"use client";

import {
  Download,
  PlusCircle,
  Filter,
  ChevronLeft,
  ChevronRight,
  Pencil,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  AlertCircle,
  Router,
  Network,
  Box,
  Cable,
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
import { cn } from "@/lib/utils";

const KPIS = [
  {
    label: "Total Stock Value",
    value: "$1,245,000",
    sub: "+2.4%",
    subColor: "text-green-500",
    icon: TrendingUp,
  },
  {
    label: "Total Units",
    value: "14,200",
    sub: "-1.2%",
    subColor: "text-red-500",
    icon: TrendingDown,
  },
  {
    label: "Low Stock Alerts",
    value: "42",
    icon: AlertTriangle,
    highlight: "primary",
  },
  {
    label: "Out of Stock Items",
    value: "12",
    icon: AlertCircle,
    highlight: "red",
  },
];

type StockStatus = "in_stock" | "low_stock" | "out_of_stock";

const INVENTORY_ITEMS = [
  {
    id: "1",
    name: "Enterprise WiFi 6E Access Point",
    subtitle: "Dual-Band 2.5G PoE+",
    sku: "NL-WIFI-6E",
    warehouse: "US-East (A-4)",
    stock: 24,
    status: "low_stock" as StockStatus,
    icon: Router,
  },
  {
    id: "2",
    name: "Core Switch 48-Port 10G",
    subtitle: "Layer 3 Managed Switch",
    sku: "NL-SW-48-10G",
    warehouse: "EU-West (B-2)",
    stock: 142,
    status: "in_stock" as StockStatus,
    icon: Network,
  },
  {
    id: "3",
    name: "Fiber Optic Transceiver",
    subtitle: "SFP+ 10km Single Mode",
    sku: "NL-FIB-SFP-10",
    warehouse: "US-East (A-4)",
    stock: 0,
    status: "out_of_stock" as StockStatus,
    icon: Box,
  },
  {
    id: "4",
    name: "Edge Router X Series",
    subtitle: "5-Port Gigabit Router",
    sku: "NL-RT-X-5",
    warehouse: "APAC (C-1)",
    stock: 56,
    status: "in_stock" as StockStatus,
    icon: Cable,
  },
];

const TABS = [
  { id: "stock", label: "Stock Levels" },
  { id: "movement", label: "Movement History" },
  { id: "warehouses", label: "Warehouses" },
];

function StatusBadge({ status }: { status: StockStatus }) {
  const config = {
    in_stock: {
      className:
        "bg-green-100 dark:bg-green-900/30 text-green-600 border-green-200 dark:border-green-800",
      dot: "bg-green-600",
      label: "In Stock",
    },
    low_stock: {
      className: "bg-primary/10 text-primary border-primary/20",
      dot: "bg-primary",
      label: "Low Stock",
    },
    out_of_stock: {
      className: "bg-red-100 dark:bg-red-900/30 text-red-600 border-red-200 dark:border-red-800",
      dot: "bg-red-600",
      label: "Out of Stock",
    },
  };
  const c = config[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-bold",
        c.className
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", c.dot)} />
      {c.label}
    </span>
  );
}

export default function InventoryContent() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white mb-1">
            Inventory Management
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Real-time enterprise networking hardware stock tracking.
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex items-center gap-2 rounded-xl border-slate-200 dark:border-slate-700 font-bold shadow-sm"
          >
            <Download className="size-5" />
            Export CSV
          </Button>
          <Button className="flex items-center gap-2 rounded-xl font-bold shadow-lg shadow-primary/20">
            <PlusCircle className="size-5" />
            Manual Adjustment
          </Button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {KPIS.map((kpi) => (
          <div
            key={kpi.label}
            className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800"
          >
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
              {kpi.label}
            </p>
            <div className="flex items-end justify-between">
              <h3
                className={cn(
                  "text-2xl font-black",
                  kpi.highlight === "primary" && "text-primary",
                  kpi.highlight === "red" && "text-red-600",
                  !kpi.highlight && "text-slate-900 dark:text-white"
                )}
              >
                {kpi.value}
              </h3>
              {kpi.sub ? (
                <span
                  className={cn(
                    "flex items-center gap-0.5 text-xs font-bold",
                    kpi.subColor
                  )}
                >
                  {kpi.sub}
                  <kpi.icon className="size-4" />
                </span>
              ) : kpi.highlight ? (
                <div
                  className={cn(
                    "flex size-8 items-center justify-center rounded-lg",
                    kpi.highlight === "primary" && "bg-primary/10",
                    kpi.highlight === "red" && "bg-red-100 dark:bg-red-900/30"
                  )}
                >
                  <kpi.icon
                    className={cn(
                      "size-4",
                      kpi.highlight === "primary" && "text-primary",
                      kpi.highlight === "red" && "text-red-600"
                    )}
                  />
                </div>
              ) : null}
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 mb-6 overflow-x-auto no-scrollbar">
        {TABS.map((tab, i) => (
          <button
            key={tab.id}
            type="button"
            className={cn(
              "whitespace-nowrap px-6 py-4 text-sm font-medium border-b-2 transition-colors",
              i === 0
                ? "border-primary text-primary font-bold"
                : "border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-white"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 lg:flex-row mb-6">
        <div className="flex flex-1 flex-col gap-3 sm:flex-row">
          <div className="min-w-[180px]">
            <select className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-4 pr-10 text-sm focus:border-primary focus:ring-primary dark:border-slate-700 dark:bg-slate-800 dark:text-white">
              <option>All Categories</option>
              <option>Switches</option>
              <option>Routers</option>
              <option>Access Points</option>
              <option>Cabling</option>
            </select>
          </div>
          <div className="min-w-[180px]">
            <select className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-4 pr-10 text-sm focus:border-primary focus:ring-primary dark:border-slate-700 dark:bg-slate-800 dark:text-white">
              <option>All Warehouses</option>
              <option>US - East (A-4)</option>
              <option>EU - West (B-2)</option>
              <option>APAC (C-1)</option>
            </select>
          </div>
          <div className="min-w-[180px]">
            <select className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-4 pr-10 text-sm focus:border-primary focus:ring-primary dark:border-slate-700 dark:bg-slate-800 dark:text-white">
              <option>All Statuses</option>
              <option>In Stock</option>
              <option>Low Stock</option>
              <option>Out of Stock</option>
            </select>
          </div>
        </div>
        <Button
          variant="ghost"
          className="flex items-center justify-center gap-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <Filter className="size-5" />
          More Filters
        </Button>
      </div>

      {/* Inventory Table */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <TableContainer>
          <Table>
            <TableHeader>
              <TableRow className="border-b border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50">
                <TableHead className="uppercase tracking-wider">Product</TableHead>
                <TableHead className="uppercase tracking-wider">SKU</TableHead>
                <TableHead className="uppercase tracking-wider">Warehouse</TableHead>
                <TableHead className="uppercase tracking-wider">Current Stock</TableHead>
                <TableHead className="uppercase tracking-wider">Status</TableHead>
                <TableHead className="text-right uppercase tracking-wider">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-slate-100 dark:divide-slate-700/50">
              {INVENTORY_ITEMS.map((item) => (
                <TableRow
                  key={item.id}
                  className="group transition-colors hover:bg-slate-50 dark:hover:bg-slate-700/30"
                >
                  <TableCell className="whitespace-nowrap">
                    <div className="flex items-center gap-4">
                      <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-700">
                        <item.icon className="size-6 text-slate-400" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900 dark:text-white">
                          {item.name}
                        </p>
                        <p className="text-xs text-slate-500">{item.subtitle}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    <span className="rounded bg-slate-100 px-2 py-1 font-mono text-xs font-bold text-slate-600 dark:bg-slate-700 dark:text-slate-300">
                      {item.sku}
                    </span>
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-sm text-slate-600 dark:text-slate-400">
                    {item.warehouse}
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-sm font-bold text-slate-900 dark:text-white">
                    {item.stock} Units
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    <StatusBadge status={item.status} />
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-slate-400 hover:bg-transparent hover:text-primary"
                      title="Edit"
                    >
                      <Pencil className="size-5" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-slate-100 px-6 py-4 dark:border-slate-700">
          <p className="text-xs font-medium text-slate-500">
            Showing 1 to 4 of 245 products
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="rounded p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-30"
              disabled
            >
              <ChevronLeft className="size-5" />
            </Button>
            <button
              type="button"
              className="flex size-8 items-center justify-center rounded-lg bg-primary text-xs font-bold text-white"
            >
              1
            </button>
            <button
              type="button"
              className="flex size-8 items-center justify-center rounded-lg text-xs font-medium text-slate-500 transition-colors hover:bg-slate-100 dark:hover:bg-slate-700 dark:text-slate-400"
            >
              2
            </button>
            <button
              type="button"
              className="flex size-8 items-center justify-center rounded-lg text-xs font-medium text-slate-500 transition-colors hover:bg-slate-100 dark:hover:bg-slate-700 dark:text-slate-400"
            >
              3
            </button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"
            >
              <ChevronRight className="size-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
