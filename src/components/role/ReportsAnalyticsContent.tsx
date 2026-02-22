"use client";

import { useRef, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Filler,
  Title,
  Tooltip,
  Legend,
  BarController,
  LineController,
  DoughnutController,
} from "chart.js";
import {
  CreditCard,
  PieChart,
  TrendingUp,
  TrendingDown,
  UserPlus,
  RefreshCw,
  Calendar,
  ChevronDown,
  Download,
  FileDown,
  Filter,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Filler,
  Title,
  Tooltip,
  Legend,
  BarController,
  LineController,
  DoughnutController
);

const PRIMARY = "#1152d4";

const KPIS = [
  {
    label: "Total Sales",
    value: "$428,190.00",
    trend: "+12.5%",
    trendUp: true,
    icon: CreditCard,
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
    barWidth: "w-3/4",
    barColor: "bg-primary",
  },
  {
    label: "Net Profit",
    value: "$124,500.00",
    trend: "+4.2%",
    trendUp: true,
    icon: PieChart,
    iconBg: "bg-blue-100 dark:bg-blue-900/30",
    iconColor: "text-blue-500",
    barWidth: "w-1/2",
    barColor: "bg-blue-500",
  },
  {
    label: "Conversion Rate",
    value: "3.42%",
    trend: "-0.8%",
    trendUp: false,
    icon: TrendingDown,
    iconBg: "bg-purple-100 dark:bg-purple-900/30",
    iconColor: "text-purple-500",
    barWidth: "w-2/3",
    barColor: "bg-purple-500",
  },
  {
    label: "Customer Acq. Cost",
    value: "$42.80",
    trend: "+18.1%",
    trendUp: true,
    icon: UserPlus,
    iconBg: "bg-amber-100 dark:bg-amber-900/30",
    iconColor: "text-amber-500",
    barWidth: "w-1/3",
    barColor: "bg-amber-500",
  },
];

const SALES_TRENDS_DATA = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  values: [180, 220, 195, 280, 320, 290, 350, 310, 380, 420, 390, 428],
};

const CUSTOMER_ACQUISITION = [
  { label: "Direct", value: 45, color: PRIMARY },
  { label: "Social Media", value: 30, color: "#3b82f6" },
  { label: "Referral", value: 15, color: "#a855f7" },
  { label: "Other", value: 10, color: "#94a3b8" },
];

const CATEGORY_PERFORMANCE = [
  { name: "Electronics", value: 184200, max: 220000 },
  { name: "Furniture", value: 92400, max: 170000 },
  { name: "Apparel", value: 124800, max: 190000 },
  { name: "Home & Garden", value: 42100, max: 140000 },
];

const PROFIT_MARGINS = {
  weeks: ["W1", "W2", "W3", "W4"],
  revenue: [320, 380, 350, 420],
  profit: [95, 130, 105, 145],
};

const TRANSACTIONS = [
  { id: "#ORD-7721", customer: "Alexander Knight", category: "Electronics", date: "Oct 24, 2023", amount: "$1,299.00", status: "Completed", statusStyle: "emerald" },
  { id: "#ORD-7722", customer: "Sarah Jenkins", category: "Furniture", date: "Oct 24, 2023", amount: "$842.50", status: "Pending", statusStyle: "amber" },
  { id: "#ORD-7723", customer: "Marcus Chen", category: "Apparel", date: "Oct 23, 2023", amount: "$124.00", status: "Completed", statusStyle: "emerald" },
  { id: "#ORD-7724", customer: "Elena Rodriguez", category: "Electronics", date: "Oct 23, 2023", amount: "$2,100.00", status: "Cancelled", statusStyle: "rose" },
];

const STATUS_STYLES: Record<string, string> = {
  Completed: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400",
  Pending: "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400",
  Cancelled: "bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400",
};

export default function ReportsAnalyticsContent() {
  const salesChartRef = useRef<HTMLCanvasElement>(null);
  const doughnutChartRef = useRef<HTMLCanvasElement>(null);
  const profitChartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!salesChartRef.current) return;
    const ctx = salesChartRef.current.getContext("2d");
    if (!ctx) return;

    const chart = new ChartJS(ctx, {
      type: "line",
      data: {
        labels: SALES_TRENDS_DATA.labels,
        datasets: [
          {
            label: "Revenue",
            data: SALES_TRENDS_DATA.values,
            borderColor: PRIMARY,
            backgroundColor: `rgba(17, 82, 212, 0.2)`,
            fill: true,
            tension: 0.4,
            pointRadius: 0,
            pointHoverRadius: 6,
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
            ticks: { font: { size: 11 } },
          },
          y: {
            beginAtZero: true,
            grid: { color: "rgba(148,163,184,0.2)" },
            ticks: {
              callback: (v) => `$${Number(v)}k`,
              font: { size: 10 },
            },
          },
        },
      },
    });
    return () => chart.destroy();
  }, []);

  useEffect(() => {
    if (!doughnutChartRef.current) return;
    const ctx = doughnutChartRef.current.getContext("2d");
    if (!ctx) return;

    const chart = new ChartJS(ctx, {
      type: "doughnut",
      data: {
        labels: CUSTOMER_ACQUISITION.map((d) => d.label),
        datasets: [
          {
            data: CUSTOMER_ACQUISITION.map((d) => d.value),
            backgroundColor: CUSTOMER_ACQUISITION.map((d) => d.color),
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
        },
      },
    });
    return () => chart.destroy();
  }, []);

  useEffect(() => {
    if (!profitChartRef.current) return;
    const ctx = profitChartRef.current.getContext("2d");
    if (!ctx) return;

    const chart = new ChartJS(ctx, {
      type: "bar",
      data: {
        labels: PROFIT_MARGINS.weeks,
        datasets: [
          {
            label: "Gross Revenue",
            data: PROFIT_MARGINS.revenue,
            backgroundColor: "rgba(148,163,184,0.6)",
            borderRadius: 4,
          },
          {
            label: "Net Profit",
            data: PROFIT_MARGINS.profit,
            backgroundColor: PRIMARY,
            borderRadius: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom",
            labels: { font: { size: 11 }, boxWidth: 12 },
          },
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { font: { size: 10 } },
          },
          y: {
            beginAtZero: true,
            grid: { color: "rgba(148,163,184,0.2)" },
            ticks: { font: { size: 10 } },
          },
        },
      },
    });
    return () => chart.destroy();
  }, []);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="mb-2 text-3xl font-black tracking-tight text-slate-900 dark:text-white">
            Detailed Analytics Reports
          </h1>
          <p className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
            <RefreshCw className="size-4" />
            Last synced: 2 minutes ago
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800">
            <div className="flex items-center gap-2 border-r border-slate-200 px-4 py-2 dark:border-slate-700">
              <Calendar className="size-4 text-slate-400" />
              <span className="text-sm font-medium">Oct 1, 2023 - Oct 31, 2023</span>
            </div>
            <button
              type="button"
              className="px-3 py-2 transition-colors hover:bg-slate-50 dark:hover:bg-slate-700"
            >
              <ChevronDown className="size-4 text-slate-500" />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="gap-2 font-bold">
              <Download className="size-4" />
              Export CSV
            </Button>
            <Button className="gap-2 font-bold">
              <FileDown className="size-4" />
              Download PDF
            </Button>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {KPIS.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div
              key={kpi.label}
              className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800"
            >
              <div className="mb-4 flex items-start justify-between">
                <div className={`rounded-lg p-2 ${kpi.iconBg}`}>
                  <Icon className={`size-5 ${kpi.iconColor}`} />
                </div>
                <span
                  className={`flex items-center gap-1 text-xs font-bold ${
                    kpi.trendUp ? "text-emerald-500" : "text-rose-500"
                  }`}
                >
                  {kpi.trendUp ? (
                    <TrendingUp className="size-3" />
                  ) : (
                    <TrendingDown className="size-3" />
                  )}
                  {kpi.trend}
                </span>
              </div>
              <h3 className="mb-1 text-sm font-medium text-slate-500 dark:text-slate-400">
                {kpi.label}
              </h3>
              <p className="text-2xl font-black text-slate-900 dark:text-white">
                {kpi.value}
              </p>
              <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
                <div
                  className={`h-full ${kpi.barWidth} ${kpi.barColor} rounded-full`}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Sales Trends */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800 lg:col-span-2">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Sales Trends
              </h2>
              <p className="text-sm text-slate-500">Monthly revenue performance</p>
            </div>
            <Select defaultValue="current">
              <SelectTrigger className="h-9 w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="current">Current Year</SelectItem>
                <SelectItem value="last">Last Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="h-[300px]">
            <canvas ref={salesChartRef} />
          </div>
        </div>

        {/* Customer Acquisition */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <h2 className="mb-1 text-lg font-bold text-slate-900 dark:text-white">
            Customer Acquisition
          </h2>
          <p className="mb-8 text-sm text-slate-500">Channel distribution</p>
          <div className="relative mx-auto flex h-48 w-48 items-center justify-center">
            <canvas ref={doughnutChartRef} />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-black text-slate-900 dark:text-white">
                2.4k
              </span>
              <span className="text-[10px] font-bold uppercase text-slate-400">
                New Users
              </span>
            </div>
          </div>
          <div className="mt-8 space-y-3">
            {CUSTOMER_ACQUISITION.map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between text-sm"
              >
                <div className="flex items-center gap-2">
                  <div
                    className="size-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span>{item.label}</span>
                </div>
                <span className="font-bold">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Category & Profit Row */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Category Performance */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <h2 className="mb-6 text-lg font-bold text-slate-900 dark:text-white">
            Category Performance
          </h2>
          <div className="space-y-6">
            {CATEGORY_PERFORMANCE.map((cat) => (
              <div key={cat.name}>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="font-medium">{cat.name}</span>
                  <span className="font-bold">
                    ${(cat.value / 1000).toFixed(1)}k
                  </span>
                </div>
                <div className="h-3 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{
                      width: `${(cat.value / cat.max) * 100}%`,
                      opacity: 1 - CATEGORY_PERFORMANCE.indexOf(cat) * 0.15,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Profit Margins */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <h2 className="mb-1 text-lg font-bold text-slate-900 dark:text-white">
            Profit Margins
          </h2>
          <p className="mb-6 text-sm text-slate-500">Revenue vs Net Income</p>
          <div className="h-[200px]">
            <canvas ref={profitChartRef} />
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <div className="flex flex-col gap-4 border-b border-slate-200 p-6 md:flex-row md:items-center md:justify-between dark:border-slate-700">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Recent Transactions
          </h2>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="size-4" />
              Filter
            </Button>
            <Button size="sm" className="font-bold">
              Manage All
            </Button>
          </div>
        </div>
        <TableContainer>
          <Table>
            <TableHeader>
              <TableRow className="border-slate-200 dark:border-slate-700">
                <TableHead className="uppercase text-slate-400">Order ID</TableHead>
                <TableHead className="uppercase text-slate-400">Customer</TableHead>
                <TableHead className="uppercase text-slate-400">Category</TableHead>
                <TableHead className="uppercase text-slate-400">Date</TableHead>
                <TableHead className="uppercase text-slate-400">Amount</TableHead>
                <TableHead className="uppercase text-slate-400">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {TRANSACTIONS.map((row) => (
                <TableRow
                  key={row.id}
                  className="transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50"
                >
                  <TableCell className="text-sm font-medium">{row.id}</TableCell>
                  <TableCell className="text-sm">{row.customer}</TableCell>
                  <TableCell className="text-sm">{row.category}</TableCell>
                  <TableCell className="text-sm text-slate-500">{row.date}</TableCell>
                  <TableCell className="text-sm font-bold">{row.amount}</TableCell>
                  <TableCell>
                    <span
                      className={`rounded-full px-2 py-1 text-[10px] font-bold uppercase ${
                        STATUS_STYLES[row.status] ?? ""
                      }`}
                    >
                      {row.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div className="flex items-center justify-between border-t border-slate-200 p-6 dark:border-slate-700">
          <span className="text-sm text-slate-500">
            Showing 4 of 248 transactions
          </span>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" disabled>
              <ChevronLeft className="size-4" />
            </Button>
            <Button variant="outline" size="icon">
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
