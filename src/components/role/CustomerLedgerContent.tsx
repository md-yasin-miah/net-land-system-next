"use client";

import Link from "next/link";
import {
  FileDown,
  FileText,
  ChevronRight,
  User,
  Calendar,
  Filter,
  TrendingUp,
  Wallet,
  Info,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
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
  TableFooter,
} from "@/components/ui/table";
import { useParams } from "next/navigation";
import { Routes } from "@/lib/routes";
import type { Role } from "@/lib/mockData";

const CUSTOMERS = [
  { id: "1", name: "Global Logistics Corp (ID: 99402)" },
  { id: "2", name: "TechFlow Solutions" },
  { id: "3", name: "Apex Properties Ltd" },
  { id: "4", name: "Riverstone Manufacturing" },
];

const TRANSACTIONS = [
  {
    id: "1",
    date: "Oct 24, 2023",
    invoiceNo: "#INV-88210",
    description: "Software Subscription - Pro Plan",
    debit: "1,200.00",
    credit: null,
    balance: "8,250.00",
  },
  {
    id: "2",
    date: "Oct 20, 2023",
    invoiceNo: "#PAY-44102",
    description: "Electronic Payment Received",
    debit: null,
    credit: "5,000.00",
    balance: "7,050.00",
    isPayment: true,
  },
  {
    id: "3",
    date: "Oct 15, 2023",
    invoiceNo: "#INV-88155",
    description: "Consulting Services - Phase 2",
    debit: "4,500.00",
    credit: null,
    balance: "12,050.00",
  },
  {
    id: "4",
    date: "Oct 02, 2023",
    invoiceNo: "#INV-87994",
    description: "Annual Domain Renewal",
    debit: "50.00",
    credit: null,
    balance: "7,550.00",
  },
  {
    id: "5",
    date: "Sep 28, 2023",
    invoiceNo: "#PAY-43900",
    description: "Check Deposit #7702",
    debit: null,
    credit: "2,500.00",
    balance: "7,500.00",
    isPayment: true,
  },
];

const TOTALS = { debit: "5,750.00", credit: "7,500.00", balance: "7,050.00" };

export default function CustomerLedgerContent() {
  const params = useParams();
  const role = (params?.role as Role) ?? "admin";
  const routes = Routes.role(role);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="space-y-1">
          <div className="mb-2 flex items-center gap-2 text-sm text-slate-500">
            <Link href={routes.root} className="hover:text-primary">
              Financials
            </Link>
            <ChevronRight className="size-3" />
            <span className="font-medium text-slate-900 dark:text-slate-300">
              Customer Ledger
            </span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Customer Ledger
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            Detailed accounting record for individual client transactions.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            variant="outline"
            className="flex items-center justify-center gap-2 font-semibold"
          >
            <FileDown className="size-5" />
            Export PDF
          </Button>
          <Button
            variant="outline"
            className="flex items-center justify-center gap-2 font-semibold"
          >
            <FileText className="size-5" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Selector & Filters */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
          <div className="md:col-span-2 lg:col-span-1">
            <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
              Select Customer
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
              <select className="w-full appearance-none rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-800">
                {CUSTOMERS.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
              <ChevronRightIcon className="absolute right-3 top-1/2 size-4 -translate-y-1/2 rotate-90 text-slate-400 pointer-events-none" />
            </div>
          </div>
          <div className="lg:col-span-1">
            <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
              Date Range
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
              <select className="w-full appearance-none rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-800">
                <option>Current Month</option>
                <option>Last 30 Days</option>
                <option>Last 90 Days</option>
                <option>Custom Range</option>
              </select>
              <ChevronRightIcon className="absolute right-3 top-1/2 size-4 -translate-y-1/2 rotate-90 text-slate-400 pointer-events-none" />
            </div>
          </div>
          <div className="hidden lg:block lg:col-span-1">
            <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
              Transaction Type
            </label>
            <select className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-800">
              <option>All Transactions</option>
              <option>Payments Only</option>
              <option>Invoices Only</option>
            </select>
          </div>
          <div className="flex items-end">
            <Button className="w-full gap-2 shadow-md shadow-primary/20">
              <Filter className="size-4" />
              Apply Filter
            </Button>
          </div>
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="relative z-10">
            <p className="mb-1 text-sm font-medium text-slate-500 dark:text-slate-400">
              Total Debit
            </p>
            <div className="flex items-baseline gap-2">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                $142,500.00
              </h3>
              <span className="rounded bg-emerald-100 px-1.5 py-0.5 text-xs font-bold text-emerald-600 dark:bg-emerald-900/30">
                +4.2%
              </span>
            </div>
          </div>
          <TrendingUp className="absolute -bottom-4 -right-4 size-16 text-slate-100 transition-colors group-hover:text-slate-200 dark:text-slate-800/50 dark:group-hover:text-slate-800" />
        </div>
        <div className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="relative z-10">
            <p className="mb-1 text-sm font-medium text-slate-500 dark:text-slate-400">
              Total Credit
            </p>
            <div className="flex items-baseline gap-2">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                $135,450.00
              </h3>
              <span className="rounded bg-emerald-100 px-1.5 py-0.5 text-xs font-bold text-emerald-600 dark:bg-emerald-900/30">
                +1.8%
              </span>
            </div>
          </div>
          <Wallet className="absolute -bottom-4 -right-4 size-16 text-slate-100 transition-colors group-hover:text-slate-200 dark:text-slate-800/50 dark:group-hover:text-slate-800" />
        </div>
        <div className="group relative overflow-hidden rounded-xl border border-primary bg-primary p-6 shadow-lg shadow-primary/20 sm:col-span-2 lg:col-span-1">
          <div className="relative z-10">
            <p className="mb-1 text-sm font-medium text-white/80">
              Outstanding Balance
            </p>
            <h3 className="text-3xl font-black text-white">$7,050.00</h3>
            <p className="mt-2 flex items-center gap-1 text-xs text-white/60">
              <Info className="size-3.5" />
              Next payment due in 12 days
            </p>
          </div>
          <Wallet className="absolute -bottom-4 -right-4 size-20 text-white/10 transition-transform duration-500 group-hover:scale-110" />
        </div>
      </div>

      {/* Ledger Table */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 dark:border-slate-800">
          <h4 className="font-bold text-slate-900 dark:text-white">
            Transaction History
          </h4>
          <span className="text-xs font-medium text-slate-500">
            Showing 12 transactions
          </span>
        </div>
        <TableContainer>
          <Table>
            <TableHeader>
              <TableRow className="border-b border-slate-200 dark:border-slate-800">
                <TableHead className="uppercase tracking-wider">Date</TableHead>
                <TableHead className="uppercase tracking-wider">
                  Invoice No
                </TableHead>
                <TableHead className="uppercase tracking-wider">
                  Description
                </TableHead>
                <TableHead className="text-right uppercase tracking-wider">
                  Debit
                </TableHead>
                <TableHead className="text-right uppercase tracking-wider">
                  Credit
                </TableHead>
                <TableHead className="text-right uppercase tracking-wider">
                  Balance
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {TRANSACTIONS.map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="whitespace-nowrap text-sm font-medium text-slate-600 dark:text-slate-400">
                    {row.date}
                  </TableCell>
                  <TableCell className="text-sm font-semibold text-primary">
                    {row.invoiceNo}
                  </TableCell>
                  <TableCell
                    className={`text-sm text-slate-700 dark:text-slate-300 ${row.isPayment ? "italic" : ""}`}
                  >
                    {row.description}
                  </TableCell>
                  <TableCell className="text-right text-sm text-slate-900 dark:text-white">
                    {row.debit ? `$${row.debit}` : "—"}
                  </TableCell>
                  <TableCell
                    className={`text-right text-sm ${row.credit ? "font-semibold text-emerald-600" : "text-slate-400 dark:text-slate-600"}`}
                  >
                    {row.credit ? `$${row.credit}` : "—"}
                  </TableCell>
                  <TableCell className="text-right text-sm font-bold text-slate-900 dark:text-white">
                    ${row.balance}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow className="font-bold">
                <TableCell
                  className="text-right text-sm text-slate-900 dark:text-white"
                  colSpan={3}
                >
                  Totals for selection
                </TableCell>
                <TableCell className="text-right text-sm text-slate-900 dark:text-white">
                  ${TOTALS.debit}
                </TableCell>
                <TableCell className="text-right text-sm text-emerald-600">
                  ${TOTALS.credit}
                </TableCell>
                <TableCell className="bg-primary/5 text-right text-sm text-primary">
                  ${TOTALS.balance}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
        <div className="flex items-center justify-between border-t border-slate-200 px-6 py-4 dark:border-slate-800">
          <p className="text-sm text-slate-500">
            Showing{" "}
            <span className="font-bold text-slate-900 dark:text-white">
              1-5
            </span>{" "}
            of{" "}
            <span className="font-bold text-slate-900 dark:text-white">12</span>{" "}
            entries
          </p>
          <div className="flex gap-1">
            <Button variant="outline" size="icon" className="size-8">
              <ChevronLeft className="size-4" />
            </Button>
            <Button size="icon" className="size-8">
              1
            </Button>
            <Button variant="outline" size="icon" className="size-8">
              2
            </Button>
            <Button variant="outline" size="icon" className="size-8">
              3
            </Button>
            <Button variant="outline" size="icon" className="size-8">
              <ChevronRightIcon className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
