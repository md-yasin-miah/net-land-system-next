"use client";

/**
 * Promotion & Coupon Management - primary color: red-600 (#dc2626)
 */

import { useState } from "react";
import {
  Ticket,
  DollarSign,
  TrendingUp,
  Users,
  Plus,
  Pencil,
  Trash2,
  Sparkles,
  Calendar,
  Upload,
  BarChart3,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableContainer,
} from "@/components/ui/table";


const STATS = [
  {
    label: "Active Coupons",
    value: "24",
    badge: "+12%",
    badgeStyle: "bg-emerald-500/10 text-emerald-500",
    icon: Ticket,
  },
  {
    label: "Total Revenue",
    value: "$45,280.50",
    badge: "+8.4%",
    badgeStyle: "bg-emerald-500/10 text-emerald-500",
    icon: DollarSign,
  },
  {
    label: "Best Code",
    value: "SUMMER24",
    badge: "Top Perform",
    badgeStyle: "bg-slate-400/10 text-slate-400",
    icon: TrendingUp,
  },
  {
    label: "Redemption Rate",
    value: "14.8%",
    badge: "-2.1%",
    badgeStyle: "bg-red-500/10 text-red-500",
    icon: Users,
  },
];

type Coupon = {
  id: string;
  code: string;
  description: string;
  used: number;
  limit: number;
  expiry: string;
  expiryLabel: string;
  expiryLabelStyle: string;
  revenue: string;
};

const COUPONS: Coupon[] = [
  {
    id: "1",
    code: "SUMMER24",
    description: "20% Storewide",
    used: 75,
    limit: 100,
    expiry: "Aug 15, 2024",
    expiryLabel: "12 Days Left",
    expiryLabelStyle: "text-amber-500",
    revenue: "$12,450.00",
  },
  {
    id: "2",
    code: "WELCOME10",
    description: "10% First Order",
    used: 450,
    limit: 500,
    expiry: "Dec 31, 2024",
    expiryLabel: "Perpetual",
    expiryLabelStyle: "text-emerald-500",
    revenue: "$8,120.00",
  },
  {
    id: "3",
    code: "FLASH50",
    description: "50% Clearance",
    used: 12,
    limit: 50,
    expiry: "Aug 05, 2024",
    expiryLabel: "Expires Today",
    expiryLabelStyle: "text-red-500",
    revenue: "$2,710.25",
  },
];

const STATUS_TABS = ["Active", "Scheduled", "Expired"];

export default function CouponsPageContent() {
  const [activeTab, setActiveTab] = useState("Active");
  const [couponCode, setCouponCode] = useState("");
  const [discountType, setDiscountType] = useState("percentage");
  const [discountValue, setDiscountValue] = useState("");
  const [minSpend, setMinSpend] = useState("");
  const [totalLimit, setTotalLimit] = useState("");
  const [perCustomer, setPerCustomer] = useState("");
  const [expiryDate, setExpiryDate] = useState("");

  function generateCode() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    setCouponCode(
      Array.from({ length: 8 }, () =>
        chars[Math.floor(Math.random() * chars.length)]
      ).join("")
    );
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Promotion Management
          </h1>
          <p className="mt-1 text-slate-500 dark:text-slate-400">
            Monitor and optimize your store&apos;s active marketing campaigns.
          </p>
        </div>
        <div className="flex items-center gap-1 self-start rounded-xl border border-slate-200 bg-white p-1 dark:border-white/10 dark:bg-white/5">
          {STATUS_TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`rounded-lg px-4 py-1.5 text-sm font-medium transition-colors ${
                activeTab === tab
                  ? "bg-red-600 text-white shadow-sm"
                  : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {STATS.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5"
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="rounded-lg bg-red-600/10 p-2 text-red-600">
                  <Icon className="size-5" />
                </div>
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-bold ${stat.badgeStyle}`}
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

      {/* Table + Form */}
      <div className="grid grid-cols-1 gap-8 xl:grid-cols-3">
        {/* Coupons Table */}
        <div className="space-y-4 xl:col-span-2">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-white/5">
            <div className="flex items-center justify-between border-b border-slate-200 p-6 dark:border-white/10">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Active Discount Codes
              </h2>
              <button
                type="button"
                className="text-sm font-bold text-red-600 hover:underline"
              >
                View All
              </button>
            </div>
            <TableContainer>
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-white/5">
                    {["Coupon Code", "Usage Status", "Expiry Date", "Revenue", ""].map(
                      (h, i) => (
                        <TableHead
                          key={i}
                          className={`px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 ${
                            i === 4 ? "text-right" : ""
                          }`}
                        >
                          {h}
                        </TableHead>
                      )
                    )}
                  </TableRow>
                </TableHeader>
                <TableBody className="divide-y divide-slate-200 dark:divide-white/10">
                  {COUPONS.map((coupon) => {
                    const pct = Math.round((coupon.used / coupon.limit) * 100);
                    return (
                      <TableRow
                        key={coupon.id}
                        className="transition-colors hover:bg-slate-50 dark:hover:bg-white/5"
                      >
                        <TableCell className="px-6 py-4">
                          <div className="flex flex-col">
                            <span className="font-bold text-slate-900 dark:text-white">
                              {coupon.code}
                            </span>
                            <span className="text-xs text-slate-500">
                              {coupon.description}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="px-6 py-4">
                          <div className="w-32 space-y-1.5">
                            <div className="flex justify-between text-[10px] font-bold">
                              <span>
                                {coupon.used}/{coupon.limit}
                              </span>
                              <span>{pct}%</span>
                            </div>
                            <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
                              <div
                                className="h-full rounded-full bg-red-600"
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="px-6 py-4">
                          <div className="flex flex-col">
                            <span className="text-sm">{coupon.expiry}</span>
                            <span
                              className={`text-[10px] font-bold uppercase ${coupon.expiryLabelStyle}`}
                            >
                              {coupon.expiryLabel}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="px-6 py-4 text-sm font-bold">
                          {coupon.revenue}
                        </TableCell>
                        <TableCell className="px-6 py-4 text-right">
                          <button
                            type="button"
                            className="text-slate-400 transition-colors hover:text-red-600"
                            aria-label="Edit"
                          >
                            <Pencil className="size-4" />
                          </button>
                          <button
                            type="button"
                            className="ml-2 text-slate-400 transition-colors hover:text-red-500"
                            aria-label="Delete"
                          >
                            <Trash2 className="size-4" />
                          </button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>

        {/* Create Coupon Form */}
        <div className="space-y-4">
          <div className="sticky top-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
            <h2 className="mb-6 text-lg font-bold text-slate-900 dark:text-white">
              Create New Coupon
            </h2>
            <form
              className="space-y-5"
              onSubmit={(e) => e.preventDefault()}
            >
              {/* Coupon Code */}
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Coupon Code
                </label>
                <div className="flex gap-2">
                  <Input
                    placeholder="e.g. FLASH25"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 border-none bg-slate-100 focus:ring-2 focus:ring-red-600/30 dark:bg-white/5"
                  />
                  <button
                    type="button"
                    onClick={generateCode}
                    title="Auto-generate code"
                    className="rounded-xl bg-slate-200 px-3 transition-colors hover:bg-slate-300 dark:bg-white/10 dark:hover:bg-white/20"
                  >
                    <Sparkles className="size-4" />
                  </button>
                </div>
              </div>

              {/* Discount Type + Value */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Discount Type
                  </label>
                  <Select value={discountType} onValueChange={setDiscountType}>
                    <SelectTrigger className="border-none bg-slate-100 focus:ring-2 focus:ring-red-600/30 dark:bg-white/5">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentage">Percentage</SelectItem>
                      <SelectItem value="fixed">Fixed Amount</SelectItem>
                      <SelectItem value="shipping">Free Shipping</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Value
                  </label>
                  <Input
                    placeholder={discountType === "percentage" ? "25%" : "$25"}
                    value={discountValue}
                    onChange={(e) => setDiscountValue(e.target.value)}
                    className="border-none bg-slate-100 focus:ring-2 focus:ring-red-600/30 dark:bg-white/5"
                  />
                </div>
              </div>

              {/* Minimum Spend */}
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Minimum Spend ($)
                </label>
                <Input
                  type="number"
                  placeholder="50.00"
                  value={minSpend}
                  onChange={(e) => setMinSpend(e.target.value)}
                  className="border-none bg-slate-100 focus:ring-2 focus:ring-red-600/30 dark:bg-white/5"
                />
              </div>

              {/* Total Limit + Per Customer */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Total Limit
                  </label>
                  <Input
                    type="number"
                    placeholder="1000"
                    value={totalLimit}
                    onChange={(e) => setTotalLimit(e.target.value)}
                    className="border-none bg-slate-100 focus:ring-2 focus:ring-red-600/30 dark:bg-white/5"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Per Customer
                  </label>
                  <Input
                    type="number"
                    placeholder="1"
                    value={perCustomer}
                    onChange={(e) => setPerCustomer(e.target.value)}
                    className="border-none bg-slate-100 focus:ring-2 focus:ring-red-600/30 dark:bg-white/5"
                  />
                </div>
              </div>

              {/* Expiry Date */}
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Expiry Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 size-[18px] -translate-y-1/2 text-slate-400" />
                  <Input
                    type="date"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    className="border-none bg-slate-100 pl-10 focus:ring-2 focus:ring-red-600/30 dark:bg-white/5"
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-red-600 py-3 font-bold text-white shadow-lg shadow-red-600/30 transition-all hover:bg-red-700 active:scale-[0.98]"
              >
                <Plus className="size-4" />
                Generate Promotion
              </Button>

              <p className="text-center text-[11px] font-bold uppercase tracking-widest text-slate-500">
                or
              </p>

              <Button
                type="button"
                variant="outline"
                className="w-full gap-2 font-bold"
              >
                <Upload className="size-4" />
                Import Bulk CSV
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Campaign Performance Banner */}
      <div className="flex flex-col items-center justify-between gap-6 rounded-3xl border border-red-600/20 bg-red-600/5 p-8 md:flex-row">
        <div className="flex items-center gap-6">
          <div className="hidden size-16 shrink-0 items-center justify-center rounded-2xl bg-red-600 text-white shadow-xl shadow-red-600/20 sm:flex">
            <BarChart3 className="size-8" />
          </div>
          <div>
            <h4 className="text-xl font-bold text-slate-900 dark:text-white">
              Campaign Performance Boost
            </h4>
            <p className="text-slate-600 dark:text-slate-400">
              Personalized coupons are generating 35% more engagement this
              month.
            </p>
          </div>
        </div>
        <Button className="shrink-0 gap-2 bg-slate-900 font-bold text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100">
          <Download className="size-4" />
          Download Full Report
        </Button>
      </div>
    </div>
  );
}
