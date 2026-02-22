"use client";

/**
 * Expense & OPEX Tracking - uses page-specific primary color #ec5b13
 */

import { useRef, useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  BarController,
  DoughnutController,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import {
  Plus,
  CreditCard,
  Clock,
  Landmark,
  PiggyBank,
  TrendingUp,
  CheckCircle2,
  Filter,
  Download,
  ChevronLeft,
  ChevronRight,
  Badge,
  Building,
  Laptop,
  Zap,
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  BarController,
  DoughnutController,
  Title,
  Tooltip,
  Legend,
);

const PRIMARY = "#ec5b13";

// Dummy data for charts
const EXPENSE_DATA_6_MONTHS = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  values: [36000, 51000, 27000, 42000, 54000, 33000],
};

const EXPENSE_DATA_12_MONTHS = {
  labels: [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ],
  values: [
    36000, 51000, 27000, 42000, 54000, 33000,
    48000, 39000, 52000, 44000, 38000, 45280,
  ],
};

const CATEGORY_DATA = {
  labels: ["Payroll", "Rent", "Utilities", "Hardware"],
  values: [45, 25, 15, 15],
  colors: [
    PRIMARY,
    "rgba(236, 91, 19, 0.6)",
    "rgba(236, 91, 19, 0.3)",
    "#94a3b8",
  ],
};

type Status = "paid" | "pending" | "overdue";

const TRANSACTIONS = [
  {
    id: "1",
    title: "Payroll - June Q2",
    subtitle: "Employee Salaries",
    category: "Payroll",
    vendor: "Automatic Disbursement",
    date: "Jun 24, 2024",
    status: "paid" as Status,
    amount: "$32,500.00",
    icon: Badge,
  },
  {
    id: "2",
    title: "Monthly Office Rent",
    subtitle: "HQ - Building A",
    category: "Rent",
    vendor: "Skyline Estates",
    date: "Jun 20, 2024",
    status: "paid" as Status,
    amount: "$8,200.00",
    icon: Building,
  },
  {
    id: "3",
    title: "MacBook Pro M3 (x3)",
    subtitle: "Engineering Team",
    category: "Hardware",
    vendor: "Apple Business",
    date: "Jun 18, 2024",
    status: "pending" as Status,
    amount: "$7,497.00",
    icon: Laptop,
  },
  {
    id: "4",
    title: "Electric & Water",
    subtitle: "Utilities - May Cycle",
    category: "Utilities",
    vendor: "City Power Grid",
    date: "Jun 15, 2024",
    status: "overdue" as Status,
    amount: "$1,450.32",
    icon: Zap,
  },
];

function StatusBadge({ status }: { status: Status }) {
  const config = {
    paid: {
      className: "text-emerald-500",
      dot: "bg-emerald-500",
      label: "Paid",
    },
    pending: {
      className: "text-amber-500",
      dot: "bg-amber-500",
      label: "Pending",
    },
    overdue: {
      className: "text-rose-500",
      dot: "bg-rose-500",
      label: "Overdue",
    },
  };
  const c = config[status];
  return (
    <div className={`flex items-center gap-1.5 ${c.className}`}>
      <span className={`size-1.5 rounded-full ${c.dot}`} />
      <span className="text-xs font-bold">{c.label}</span>
    </div>
  );
}

export default function ExpenseOpexTrackingContent() {
  const barChartRef = useRef<HTMLCanvasElement>(null);
  const doughnutChartRef = useRef<HTMLCanvasElement>(null);
  const [dateRange, setDateRange] = useState<"6" | "12">("6");

  useEffect(() => {
    if (!barChartRef.current) return;
    const barData =
      dateRange === "6" ? EXPENSE_DATA_6_MONTHS : EXPENSE_DATA_12_MONTHS;
    const peaks = dateRange === "6" ? [1, 4] : [5, 9];
    const chart = new ChartJS(barChartRef.current, {
      type: "bar",
      data: {
        labels: barData.labels,
        datasets: [
          {
            label: "Expense ($)",
            data: barData.values,
            backgroundColor: barData.labels.map((_, i) =>
              peaks.includes(i) ? PRIMARY : "rgba(236, 91, 19, 0.2)",
            ),
            borderRadius: 6,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) => `$${Number(ctx.raw).toLocaleString()}`,
            },
          },
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { font: { size: 11 } },
          },
          y: {
            beginAtZero: true,
            grid: { color: "rgba(148,163,184,0.2)" },
            ticks: {
              callback: (v) => `$${Number(v) / 1000}k`,
              font: { size: 10 },
            },
          },
        },
      },
    });
    return () => chart.destroy();
  }, [dateRange]);

  useEffect(() => {
    if (!doughnutChartRef.current) return;
    const chart = new ChartJS(doughnutChartRef.current, {
      type: "doughnut",
      data: {
        labels: CATEGORY_DATA.labels,
        datasets: [
          {
            data: CATEGORY_DATA.values,
            backgroundColor: CATEGORY_DATA.colors,
            borderWidth: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        cutout: "65%",
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) => `${ctx.label}: ${ctx.raw}%`,
            },
          },
        },
      },
    });
    return () => chart.destroy();
  }, []);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
            Expense & OPEX Tracking
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Track operational costs and manage budgets across departments.
          </p>
        </div>
        <Button className="flex items-center gap-2 bg-[#ec5b13] font-bold text-white hover:bg-[#ec5b13]/90">
          <Plus className="size-5" />
          Add Expense
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/5 dark:bg-slate-900/50">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
              Total Spend
            </span>
            <div className="rounded-lg bg-[#ec5b13]/10 p-1.5">
              <CreditCard className="size-4 text-[#ec5b13]" />
            </div>
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">
            $45,280.00
          </p>
          <p className="mt-1 flex items-center gap-1 text-sm font-medium text-emerald-500">
            <TrendingUp className="size-4" />
            +5.2% vs last month
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/5 dark:bg-slate-900/50">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
              Pending Approvals
            </span>
            <div className="rounded-lg bg-amber-500/10 p-1.5">
              <Clock className="size-4 text-amber-500" />
            </div>
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">
            12 Items
          </p>
          <p className="mt-1 text-sm font-medium text-slate-500 dark:text-slate-400">
            Value: $4,120.50
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/5 dark:bg-slate-900/50">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
              Budget Remaining
            </span>
            <div className="rounded-lg bg-[#ec5b13]/10 p-1.5">
              <Landmark className="size-4 text-[#ec5b13]" />
            </div>
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">
            $12,400.00
          </p>
          <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-white/10">
            <div
              className="h-full rounded-full bg-[#ec5b13]"
              style={{ width: "78%" }}
            />
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/5 dark:bg-slate-900/50">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
              Savings Goal
            </span>
            <div className="rounded-lg bg-emerald-500/10 p-1.5">
              <PiggyBank className="size-4 text-emerald-500" />
            </div>
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">
            $2,850.00
          </p>
          <p className="mt-1 flex items-center gap-1 text-sm font-medium text-emerald-500">
            <CheckCircle2 className="size-4" />
            Target reached
          </p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Monthly Trends */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/5 dark:bg-slate-900/50 lg:col-span-2">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Monthly Expense Trends
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Total operational costs across all departments
              </p>
            </div>
            <Select value={dateRange} onValueChange={(v) => setDateRange(v as "6" | "12")}>
              <SelectTrigger className="h-9 w-full border-none bg-slate-100 py-1.5 focus:ring-2 focus:ring-[#ec5b13]/30 dark:bg-white/5 sm:w-[160px]">
                <SelectValue placeholder="Select range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="6">Last 6 Months</SelectItem>
                <SelectItem value="12">Last Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="h-[300px]">
            <canvas ref={barChartRef} />
          </div>
        </div>

        {/* Spend by Category */}
        <div className="flex flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/5 dark:bg-slate-900/50">
          <h3 className="mb-6 text-lg font-bold text-slate-900 dark:text-white">
            Spend by Category
          </h3>
          <div className="relative mx-auto flex h-44 w-44 items-center justify-center">
            <canvas ref={doughnutChartRef} className="absolute inset-0" />
            <div className="relative z-10 text-center">
              <p className="text-2xl font-bold leading-none text-slate-900 dark:text-white">
                $45.2k
              </p>
              <p className="mt-1 text-[10px] uppercase tracking-widest text-slate-500">
                Total
              </p>
            </div>
          </div>
          <div className="mt-6 space-y-3">
            {CATEGORY_DATA.labels.map((name, i) => (
              <div
                key={name}
                className="flex items-center justify-between text-sm"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="size-2 rounded-full"
                    style={{ backgroundColor: CATEGORY_DATA.colors[i] }}
                  />
                  <span className="text-slate-600 dark:text-slate-400">
                    {name}
                  </span>
                </div>
                <span className="font-bold text-slate-900 dark:text-white">
                  {CATEGORY_DATA.values[i]}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-white/5 dark:bg-slate-900/50">
        <div className="flex flex-col gap-4 border-b border-slate-200 p-6 dark:border-white/5 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Recent Transactions
          </h3>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-2 bg-slate-100 font-medium hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10"
            >
              <Filter className="size-4" />
              Filter
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-2 bg-slate-100 font-medium hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10"
            >
              <Download className="size-4" />
              Export
            </Button>
          </div>
        </div>
        <TableContainer>
          <Table>
            <TableHeader>
              <TableRow className="border-b border-slate-200 bg-slate-50/50 dark:border-white/5 dark:bg-white/[0.02]">
                <TableHead className="uppercase tracking-wider">
                  Transaction Details
                </TableHead>
                <TableHead className="uppercase tracking-wider">
                  Category
                </TableHead>
                <TableHead className="uppercase tracking-wider">
                  Vendor
                </TableHead>
                <TableHead className="uppercase tracking-wider">Date</TableHead>
                <TableHead className="uppercase tracking-wider">
                  Status
                </TableHead>
                <TableHead className="text-right uppercase tracking-wider">
                  Amount
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-slate-200 dark:divide-white/5">
              {TRANSACTIONS.map((tx) => (
                <TableRow
                  key={tx.id}
                  className="transition-colors hover:bg-slate-50 dark:hover:bg-white/[0.02]"
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex size-9 items-center justify-center rounded-lg bg-slate-100 text-slate-500 dark:bg-white/5">
                        <tx.icon className="size-5" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900 dark:text-white">
                          {tx.title}
                        </p>
                        <p className="text-xs text-slate-500">{tx.subtitle}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="rounded-lg bg-[#ec5b13]/10 px-2 py-1 text-xs font-bold uppercase tracking-wider text-[#ec5b13]">
                      {tx.category}
                    </span>
                  </TableCell>
                  <TableCell className="text-sm font-medium">
                    {tx.vendor}
                  </TableCell>
                  <TableCell className="text-sm text-slate-500">
                    {tx.date}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={tx.status} />
                  </TableCell>
                  <TableCell className="text-right text-sm font-bold">
                    {tx.amount}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div className="flex flex-col gap-4 border-t border-slate-200 bg-slate-50/50 p-4 dark:border-white/5 dark:bg-white/[0.02] sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-slate-500">
            Showing 1-10 of 258 transactions
          </p>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="size-8 rounded-lg disabled:opacity-50"
              disabled
            >
              <ChevronLeft className="size-5" />
            </Button>
            <button
              type="button"
              className="flex size-8 items-center justify-center rounded-lg bg-[#ec5b13] text-xs font-bold text-white"
            >
              1
            </button>
            <button
              type="button"
              className="flex size-8 items-center justify-center rounded-lg text-xs font-medium transition-colors hover:bg-slate-200 dark:hover:bg-white/10"
            >
              2
            </button>
            <button
              type="button"
              className="flex size-8 items-center justify-center rounded-lg text-xs font-medium transition-colors hover:bg-slate-200 dark:hover:bg-white/10"
            >
              3
            </button>
            <Button
              variant="ghost"
              size="icon"
              className="size-8 rounded-lg transition-colors hover:bg-slate-200 dark:hover:bg-white/10"
            >
              <ChevronRight className="size-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
