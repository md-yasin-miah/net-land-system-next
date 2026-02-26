"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Search,
  FileDown,
  FileText,
  Filter,
  CreditCard,
  Receipt,
  Wallet,
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
import { useParams } from "next/navigation";
import { Routes } from "@/lib/routes";
import type { Role } from "@/lib/mockData";

const STATS = [
  {
    label: "Total Purchases",
    value: "$125,400.00",
    badge: "+12.5%",
    badgeStyle: "bg-green-50 text-green-600 dark:bg-green-900/30",
    iconBg: "bg-blue-50 text-primary dark:bg-blue-900/20",
    icon: Receipt,
  },
  {
    label: "Total Paid",
    value: "$98,250.00",
    badge: "-5.2%",
    badgeStyle: "bg-red-50 text-red-600 dark:bg-red-900/30",
    iconBg: "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20",
    icon: Wallet,
  },
  {
    label: "Outstanding Payable",
    value: "$27,150.00",
    badge: "Outstanding",
    badgeStyle: "bg-primary/10 text-primary",
    iconBg: "bg-primary/10 text-primary",
    icon: CreditCard,
    highlight: true,
  },
];

const TRANSACTIONS = [
  {
    id: "1",
    date: "12 Oct 2023",
    txId: "#PO-9921",
    description: "Bulk Order - AX3000 Routers (50 units)",
    debit: "12,500.00",
    credit: null,
    balance: "27,150.00",
  },
  {
    id: "2",
    date: "05 Oct 2023",
    txId: "#PAY-8821",
    description: "Partial Payment for Inv #PO-9870",
    debit: null,
    credit: "5,000.00",
    balance: "14,650.00",
    isPayment: true,
  },
  {
    id: "3",
    date: "28 Sep 2023",
    txId: "#PO-9870",
    description: "Inventory Stock: Mechanical Keyboards",
    debit: "8,200.00",
    credit: null,
    balance: "19,650.00",
  },
  {
    id: "4",
    date: "15 Sep 2023",
    txId: "#PAY-8750",
    description: "Wire Transfer: Full Settlement PO-9820",
    debit: null,
    credit: "11,450.00",
    balance: "11,450.00",
    isPayment: true,
  },
];

export default function SupplierLedgerContent() {
  const params = useParams();
  const role = (params?.role as Role) ?? "admin";
  const routes = Routes.role(role);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-center gap-4">
        <Link
          href={routes.suppliers}
          className="flex items-center text-sm font-medium text-slate-500 transition-colors hover:text-primary"
        >
          <ArrowLeft className="size-4" />
          <span className="ml-1">Back to Suppliers</span>
        </Link>
        <div className="h-4 w-px bg-slate-200 dark:bg-slate-700" />
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
          Supplier Ledger
        </h2>
      </div>

      {/* Supplier Profile Info */}
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            Global Electronics Ltd.
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
            <span className="flex items-center gap-1">
              <span className="font-mono text-xs">ID: SUP-10293</span>
            </span>
            <span className="flex items-center gap-1">
              contact@globalelectronics.com
            </span>
            <span className="flex items-center gap-1">Shenzhen, CN</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="font-semibold">
            Edit Profile
          </Button>
          <Button className="font-semibold">New Purchase Order</Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {STATS.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className={`rounded-xl border shadow-sm ${
                stat.highlight
                  ? "border-2 border-primary bg-white dark:border-primary dark:bg-slate-900"
                  : "border-primary/10 bg-white dark:border-slate-800 dark:bg-slate-900"
              }`}
            >
              <div className="p-6">
                <div className="mb-4 flex items-start justify-between">
                  <div
                    className={`flex items-center justify-center rounded-lg p-2 ${stat.iconBg}`}
                  >
                    <Icon className="size-5" />
                  </div>
                  <span
                    className={`rounded px-2 py-1 text-xs font-bold ${stat.badgeStyle}`}
                  >
                    {stat.badge}
                  </span>
                </div>
                <p className="mb-1 text-sm font-medium text-slate-500 dark:text-slate-400">
                  {stat.label}
                </p>
                <p
                  className={`text-2xl font-extrabold ${
                    stat.highlight
                      ? "text-primary"
                      : "text-slate-900 dark:text-white"
                  }`}
                >
                  {stat.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Table Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-primary/10 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center gap-3">
          <div className="flex items-center overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700">
            <div className="border-r border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-500 dark:border-slate-700 dark:bg-slate-800">
              FROM
            </div>
            <input
              type="date"
              defaultValue="2023-01-01"
              className="border-none bg-transparent px-3 py-2 text-sm focus:ring-0 dark:text-white"
            />
          </div>
          <div className="flex items-center overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700">
            <div className="border-r border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-500 dark:border-slate-700 dark:bg-slate-800">
              TO
            </div>
            <input
              type="date"
              defaultValue="2023-12-31"
              className="border-none bg-transparent px-3 py-2 text-sm focus:ring-0 dark:text-white"
            />
          </div>
          <Button
            variant="outline"
            size="icon"
            className="bg-primary/10 text-primary hover:bg-primary/20"
          >
            <Filter className="size-5" />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2 font-medium">
            <FileDown className="size-4" />
            PDF
          </Button>
          <Button variant="outline" size="sm" className="gap-2 font-medium">
            <FileText className="size-4" />
            CSV
          </Button>
          <div className="mx-1 h-6 w-px bg-slate-200 dark:bg-slate-700" />
          <Button size="sm" className="gap-2 font-bold shadow-sm">
            <CreditCard className="size-4" />
            Record Payment
          </Button>
        </div>
      </div>

      {/* Ledger Table */}
      <div className="overflow-hidden rounded-xl border border-primary/10 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <TableContainer>
          <Table>
            <TableHeader>
              <TableRow className="border-b border-primary/10 dark:border-slate-800">
                <TableHead className="uppercase tracking-wider">Date</TableHead>
                <TableHead className="uppercase tracking-wider">
                  Transaction ID
                </TableHead>
                <TableHead className="uppercase tracking-wider">
                  Description
                </TableHead>
                <TableHead className="text-right uppercase tracking-wider">
                  Debit (+)
                </TableHead>
                <TableHead className="text-right uppercase tracking-wider">
                  Credit (-)
                </TableHead>
                <TableHead className="text-right uppercase tracking-wider">
                  Balance
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {TRANSACTIONS.map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="text-sm font-medium text-slate-900 dark:text-slate-200">
                    {row.date}
                  </TableCell>
                  <TableCell className="text-sm font-bold text-primary hover:underline">
                    {row.txId}
                  </TableCell>
                  <TableCell className="text-sm text-slate-600 dark:text-slate-400">
                    {row.description}
                  </TableCell>
                  <TableCell className="text-right text-sm font-medium text-slate-900 dark:text-slate-200">
                    {row.debit ? `$${row.debit}` : "-"}
                  </TableCell>
                  <TableCell
                    className={`text-right text-sm ${row.credit ? "font-medium text-emerald-600" : "text-slate-400"}`}
                  >
                    {row.credit ? `$${row.credit}` : "-"}
                  </TableCell>
                  <TableCell className="bg-slate-50/30 text-right text-sm font-bold text-slate-900 dark:bg-slate-800/30 dark:text-white">
                    ${row.balance}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-primary/5 px-6 py-4 dark:border-slate-800">
          <p className="text-xs text-slate-500">
            Showing 1 to 4 of 128 transactions
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button size="sm">1</Button>
            <Button variant="outline" size="sm">
              2
            </Button>
            <Button variant="outline" size="sm">
              3
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
