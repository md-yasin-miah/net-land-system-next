"use client";

import { useState } from "react";
import {
  ClipboardList,
  Clock,
  DollarSign,
  Gauge,
  PlusCircle,
  Search,
  Calendar,
  Download,
  SlidersHorizontal,
  Eye,
  Pencil,
  Printer,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/table";
import type { DataTableColumn } from "@/components/ui/table";
import { cn } from "@/lib/utils";

const STATUS_STYLES: Record<string, string> = {
  Draft: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
  Sent: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  "Partially Received":
    "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  Received:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
};

type PORow = {
  id: string;
  supplier: string;
  dateCreated: string;
  totalAmount: string;
  expectedDate: string;
  status: keyof typeof STATUS_STYLES;
};

const PO_DATA: PORow[] = [
  {
    id: "PO-2023-4412",
    supplier: "Cisco Global Logistics",
    dateCreated: "Oct 24, 2023",
    totalAmount: "$14,200.00",
    expectedDate: "Nov 02, 2023",
    status: "Sent",
  },
  {
    id: "PO-2023-4411",
    supplier: "Juniper Networks Inc.",
    dateCreated: "Oct 23, 2023",
    totalAmount: "$8,540.00",
    expectedDate: "Oct 28, 2023",
    status: "Received",
  },
  {
    id: "PO-2023-4410",
    supplier: "Ubiquiti Labs S.A.",
    dateCreated: "Oct 22, 2023",
    totalAmount: "$122,000.00",
    expectedDate: "Nov 15, 2023",
    status: "Partially Received",
  },
  {
    id: "PO-2023-4409",
    supplier: "Arista Tech Solutions",
    dateCreated: "Oct 20, 2023",
    totalAmount: "$32,150.00",
    expectedDate: "Oct 25, 2023",
    status: "Draft",
  },
  {
    id: "PO-2023-4408",
    supplier: "NetGear Wholesale",
    dateCreated: "Oct 19, 2023",
    totalAmount: "$5,900.00",
    expectedDate: "Oct 24, 2023",
    status: "Received",
  },
  {
    id: "PO-2023-4407",
    supplier: "Belkin Industrial",
    dateCreated: "Oct 18, 2023",
    totalAmount: "$1,200.00",
    expectedDate: "Oct 23, 2023",
    status: "Sent",
  },
];

const KPI_CARDS = [
  {
    label: "Total POs (Month)",
    value: "1,284",
    trend: "+12.5%",
    trendStyle: "text-green-600 bg-green-50 dark:bg-green-900/30",
    icon: ClipboardList,
    iconBg: "bg-blue-50 dark:bg-blue-900/30 text-blue-600",
  },
  {
    label: "Pending Receipts",
    value: "42",
    trend: "Stable",
    trendStyle: "text-slate-400 bg-slate-100 dark:bg-slate-800",
    icon: Clock,
    iconBg: "bg-amber-50 dark:bg-amber-900/30 text-amber-600",
  },
  {
    label: "Total Committed Cost",
    value: "$842,500",
    trend: "-3.2%",
    trendStyle: "text-red-600 bg-red-50 dark:bg-red-900/30",
    icon: DollarSign,
    iconBg: "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600",
  },
  {
    label: "Avg Lead Time",
    value: "5.2 Days",
    trend: "-0.5d",
    trendStyle: "text-green-600 bg-green-50 dark:bg-green-900/30",
    icon: Gauge,
    iconBg: "bg-purple-50 dark:bg-purple-900/30 text-purple-600",
  },
];

const PO_COLUMNS: DataTableColumn<PORow>[] = [
  {
    key: "id",
    header: "PO Number",
    render: (_, row) => (
      <span className="text-sm font-bold text-slate-900 dark:text-white">
        #{row.id}
      </span>
    ),
  },
  { key: "supplier", header: "Supplier", cellClassName: "font-medium text-slate-700 dark:text-slate-300" },
  { key: "dateCreated", header: "Date Created", cellClassName: "text-slate-500" },
  {
    key: "totalAmount",
    header: "Total Amount",
    cellClassName: "font-bold text-slate-900 dark:text-white",
  },
  { key: "expectedDate", header: "Expected Date", cellClassName: "text-slate-500" },
  {
    key: "status",
    header: "Status",
    render: (_, row) => (
      <span
        className={cn(
          "rounded-full px-2.5 py-1 text-[10px] font-bold uppercase",
          STATUS_STYLES[row.status] ?? STATUS_STYLES.Draft
        )}
      >
        {row.status}
      </span>
    ),
  },
  {
    key: "actions",
    header: "Actions",
    headerClassName: "text-right",
    cellClassName: "text-right",
    align: "right",
    render: (_, row) => (
      <div className="flex justify-end gap-0.5 opacity-0 transition-opacity group-hover:opacity-100">
        <Button variant="ghost" size="icon" className="size-8" aria-label="View">
          <Eye className="size-4 text-slate-500" />
        </Button>
        <Button variant="ghost" size="icon" className="size-8" aria-label="Edit">
          <Pencil className="size-4 text-slate-500" />
        </Button>
        <Button variant="ghost" size="icon" className="size-8" aria-label="Print">
          <Printer className="size-4 text-slate-500" />
        </Button>
      </div>
    ),
  },
];

export default function PurchaseOrdersContent() {
  const [page, setPage] = useState(1);
  const totalPages = 48;
  const totalEntries = 1284;
  const from = (page - 1) * 6 + 1;
  const to = Math.min(page * 6, totalEntries);

  return (
    <div className="space-y-8">
      {/* Header & Action */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Purchase Orders
          </h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Monitor and manage supply chain procurement processes.
          </p>
        </div>
        <Button className="w-fit gap-2 shadow-lg shadow-primary/20">
          <PlusCircle className="size-4" />
          Create Purchase Order
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {KPI_CARDS.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="mb-3 flex items-center justify-between">
                <div
                  className={cn(
                    "rounded-lg p-2",
                    card.iconBg
                  )}
                >
                  <Icon className="size-5" />
                </div>
                <span
                  className={cn(
                    "rounded-full px-2 py-1 text-[10px] font-bold",
                    card.trendStyle
                  )}
                >
                  {card.trend}
                </span>
              </div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                {card.label}
              </p>
              <p className="mt-1 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                {card.value}
              </p>
            </div>
          );
        })}
      </div>

      {/* Table Card */}
      <div className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        {/* Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 p-5 dark:border-slate-800">
          <div className="flex flex-wrap items-center gap-3">
            <select className="rounded-lg border border-slate-200 bg-slate-50 py-2 px-3 text-sm focus:border-primary focus:ring-primary dark:border-slate-700 dark:bg-slate-800 dark:text-white">
              <option>All Statuses</option>
              <option>Draft</option>
              <option>Sent</option>
              <option>Partially Received</option>
              <option>Received</option>
            </select>
            <select className="rounded-lg border border-slate-200 bg-slate-50 py-2 px-3 text-sm focus:border-primary focus:ring-primary dark:border-slate-700 dark:bg-slate-800 dark:text-white">
              <option>All Suppliers</option>
              <option>Cisco Systems</option>
              <option>Juniper Networks</option>
              <option>Arista Tech</option>
              <option>Ubiquiti Inc.</option>
            </select>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Date Range"
                className="w-48 rounded-lg border border-slate-200 bg-slate-50 py-2 pl-10 pr-3 text-sm focus:border-primary focus:ring-primary dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" title="Export CSV">
              <Download className="size-5 text-slate-500" />
            </Button>
            <Button variant="outline" size="icon" title="Table Settings">
              <SlidersHorizontal className="size-5 text-slate-500" />
            </Button>
          </div>
        </div>

        <DataTable
          columns={PO_COLUMNS}
          data={PO_DATA}
          keyExtractor={(row) => row.id}
          tableClassName="text-left"
          headerRowClassName="bg-slate-50 dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800"
          bodyRowClassName="group"
          footer={
            <div className="flex items-center justify-between border-t border-slate-100 p-5 dark:border-slate-800">
              <p className="text-sm text-slate-500">
                Showing{" "}
                <span className="font-bold text-slate-900 dark:text-white">
                  {from}
                </span>{" "}
                to{" "}
                <span className="font-bold text-slate-900 dark:text-white">
                  {to}
                </span>{" "}
                of{" "}
                <span className="font-bold text-slate-900 dark:text-white">
                  {totalEntries}
                </span>{" "}
                entries
              </p>
              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="icon"
                  className="size-9"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                >
                  <ChevronLeft className="size-5 text-slate-500" />
                </Button>
                <Button
                  variant={page === 1 ? "default" : "ghost"}
                  size="icon"
                  className="size-9"
                  onClick={() => setPage(1)}
                >
                  1
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-9"
                  onClick={() => setPage(2)}
                >
                  2
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-9"
                  onClick={() => setPage(3)}
                >
                  3
                </Button>
                <span className="px-2 text-slate-400">...</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-9"
                  onClick={() => setPage(totalPages)}
                >
                  {totalPages}
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="size-9"
                  disabled={page >= totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                >
                  <ChevronRight className="size-5 text-slate-500" />
                </Button>
              </div>
            </div>
          }
        />
      </div>
    </div>
  );
}
