"use client";

import Link from "next/link";
import {
  Download,
  PlusCircle,
  Search,
  Filter,
  Pencil,
  Wallet,
  Trash2,
  Truck,
  BadgeCheck,
  ChevronLeft,
  ChevronRight,
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
    label: "Total Suppliers",
    value: "128",
    badge: "+12%",
    badgeStyle: "bg-green-50 dark:bg-green-900/30 text-green-600",
    iconBg: "bg-primary/10 text-primary",
    icon: Truck,
  },
  {
    label: "Total Outstanding Balance",
    value: "$45,250.00",
    badge: "+5.4%",
    badgeStyle: "bg-red-50 dark:bg-red-900/30 text-red-600",
    iconBg: "bg-amber-100 text-amber-600 dark:bg-amber-900/30",
    icon: Wallet,
  },
  {
    label: "Active Partners",
    value: "118",
    badge: "92%",
    badgeStyle: "bg-green-50 dark:bg-green-900/30 text-green-600",
    iconBg: "bg-green-100 text-green-600 dark:bg-green-900/30",
    icon: BadgeCheck,
  },
];

const SUPPLIERS = [
  {
    id: "1",
    company: "Global Logistics Corp",
    contact: "Jane Doe",
    phone: "+1 555-0199",
    email: "jane@global.com",
    payable: "1,250.00",
    status: "active" as const,
  },
  {
    id: "2",
    company: "TechSupply Solutions",
    contact: "Robert Chen",
    phone: "+1 555-0142",
    email: "contact@techsupply.io",
    payable: "12,400.00",
    status: "active" as const,
  },
  {
    id: "3",
    company: "EcoPackaging Co.",
    contact: "Sarah Miller",
    phone: "+1 555-0821",
    email: "sarah@ecopack.com",
    payable: "0.00",
    status: "inactive" as const,
  },
  {
    id: "4",
    company: "Fast-Track Imports",
    contact: "Marcus Vane",
    phone: "+1 555-0911",
    email: "m.vane@fasttrack.net",
    payable: "3,840.50",
    status: "active" as const,
  },
  {
    id: "5",
    company: "Blue Horizon Goods",
    contact: "Elena Rodriguez",
    phone: "+1 555-0442",
    email: "blue-h@horizon.com",
    payable: "850.00",
    status: "active" as const,
  },
];

export default function SuppliersContent() {
  const params = useParams();
  const role = (params?.role as Role) ?? "admin";
  const routes = Routes.role(role);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
            Suppliers
          </h2>
          <p className="mt-1 text-slate-500 dark:text-slate-400">
            Manage your supply chain partners and tracking payables.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="flex items-center gap-2 font-semibold">
            <Download className="size-5" />
            Export
          </Button>
          <Button className="flex items-center gap-2 font-bold shadow-lg shadow-primary/20">
            <PlusCircle className="size-5" />
            Add Supplier
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {STATS.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="mb-4 flex items-center justify-between">
                <div
                  className={`flex size-10 items-center justify-center rounded-lg ${stat.iconBg}`}
                >
                  <Icon className="size-5" />
                </div>
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-bold ${stat.badgeStyle}`}
                >
                  {stat.badge}
                </span>
              </div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                {stat.label}
              </p>
              <h3 className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
                {stat.value}
              </h3>
            </div>
          );
        })}
      </div>

      {/* Table Section */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        {/* Filters & Search */}
        <div className="flex flex-col gap-4 border-b border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by company or contact person..."
              className="w-full rounded-lg border-none bg-slate-50 py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary dark:bg-slate-800"
            />
          </div>
          <div className="flex w-full items-center gap-3 sm:w-auto">
            <select className="min-w-[140px] rounded-lg border-none bg-slate-50 py-2 px-3 text-sm focus:ring-2 focus:ring-primary dark:bg-slate-800">
              <option value="">All Status</option>
              <option value="active">Active Only</option>
              <option value="inactive">Inactive Only</option>
            </select>
            <Button variant="outline" size="icon">
              <Filter className="size-5" />
            </Button>
          </div>
        </div>

        {/* Data Table */}
        <TableContainer>
          <Table>
            <TableHeader>
              <TableRow className="border-b border-slate-200 dark:border-slate-800">
                <TableHead className="uppercase tracking-wider">Company Name</TableHead>
                <TableHead className="uppercase tracking-wider">Contact Person</TableHead>
                <TableHead className="uppercase tracking-wider">Phone</TableHead>
                <TableHead className="uppercase tracking-wider">Email</TableHead>
                <TableHead className="text-right uppercase tracking-wider">
                  Total Payable
                </TableHead>
                <TableHead className="uppercase tracking-wider">Status</TableHead>
                <TableHead className="text-center uppercase tracking-wider">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {SUPPLIERS.map((row) => (
                <TableRow key={row.id} className="group">
                  <TableCell className="font-semibold text-slate-900 dark:text-white">
                    {row.company}
                  </TableCell>
                  <TableCell className="text-sm">{row.contact}</TableCell>
                  <TableCell className="text-sm text-slate-600 dark:text-slate-400">
                    {row.phone}
                  </TableCell>
                  <TableCell className="text-sm text-slate-600 dark:text-slate-400">
                    {row.email}
                  </TableCell>
                  <TableCell className="text-right text-sm font-bold text-slate-900 dark:text-white">
                    ${row.payable}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        row.status === "active"
                          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                      }`}
                    >
                      {row.status === "active" ? "Active" : "Inactive"}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-8 text-slate-400 hover:text-primary"
                        title="Edit"
                      >
                        <Pencil className="size-4" />
                      </Button>
                      <Link href={routes.supplierLedger}>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-8 text-slate-400 hover:text-primary"
                          title="View Ledger"
                        >
                          <Wallet className="size-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-8 text-slate-400 hover:text-red-500"
                        title="Delete"
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-slate-200 p-4 dark:border-slate-800">
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
            Showing 1 to 5 of 128 suppliers
          </p>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="size-8 text-slate-400">
              <ChevronLeft className="size-5" />
            </Button>
            <Button size="icon" className="size-8">
              1
            </Button>
            <Button variant="ghost" size="icon" className="size-8">
              2
            </Button>
            <Button variant="ghost" size="icon" className="size-8">
              3
            </Button>
            <span className="px-1 text-xs text-slate-400">...</span>
            <Button variant="ghost" size="icon" className="size-8">
              26
            </Button>
            <Button variant="ghost" size="icon" className="size-8 text-slate-400">
              <ChevronRight className="size-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
