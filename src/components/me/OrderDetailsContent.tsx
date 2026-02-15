"use client";

import Link from "next/link";
import {
  ChevronRight,
  Check,
  Truck,
  Receipt,
  Wallet,
  Download,
  Star,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Routes } from "@/lib/routes";

const STEPS = [
  { label: "Ordered", time: "Oct 24, 10:45 AM" },
  { label: "Processed", time: "Oct 24, 02:30 PM" },
  { label: "Shipped", time: "Oct 25, 09:15 AM" },
  { label: "Out for Delivery", time: "Oct 26, 08:00 AM" },
  { label: "Delivered", time: "Oct 26, 02:20 PM", current: true },
];

const ORDER_ITEMS = [
  {
    name: "NetLink Catalyst 24-Port Managed Switch",
    sku: "NL-SW-1024",
    tags: ["L3 Managed", "PoE+"],
    qty: 1,
    subtotal: "$850.00",
    image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=200&h=200&fit=crop",
  },
  {
    name: "NetLink Core AX6000 Wi-Fi 6 Router",
    sku: "NL-RT-AX6",
    tags: ["Dual Band", "Gigabit"],
    qty: 1,
    subtotal: "$390.00",
    image: "https://images.unsplash.com/photo-1606904825846-647eb07f5be2?w=200&h=200&fit=crop",
  },
];

interface OrderDetailsContentProps {
  orderId: string;
}

export default function OrderDetailsContent({ orderId }: OrderDetailsContentProps) {
  return (
    <div className="mx-auto max-w-6xl w-full space-y-6 p-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm">
        <Link href={Routes.me.dashboard} className="font-medium text-slate-500 hover:text-primary">
          Dashboard
        </Link>
        <ChevronRight className="size-4 text-slate-400" />
        <Link href={Routes.me.orders} className="font-medium text-slate-500 hover:text-primary">
          Order History
        </Link>
        <ChevronRight className="size-4 text-slate-400" />
        <span className="font-bold text-slate-900 dark:text-white">#{orderId}</span>
      </nav>

      {/* Order Status Card */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="mb-1 flex items-center gap-3">
              <h1 className="text-3xl font-black text-slate-900 dark:text-white">
                Order #{orderId}
              </h1>
              <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400">
                Delivered
              </span>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Placed on <span className="font-medium text-slate-900 dark:text-white">Oct 24, 2023 at 10:45 AM</span>
              {" • "}
              <span className="font-medium text-slate-900 dark:text-white">2 Items</span>
            </p>
          </div>
          <div className="text-right">
            <p className="mb-1 text-sm font-medium text-slate-500">Total Amount</p>
            <p className="text-3xl font-black text-primary">$1,240.00</p>
          </div>
        </div>

        {/* Progress Tracker */}
        <div className="relative py-4">
          <div className="absolute left-0 top-[3.25rem] -z-10 h-1 w-full bg-slate-100 dark:bg-slate-800" />
          <div className="absolute left-0 top-[3.25rem] -z-10 h-1 w-full bg-primary" />
          <div className="relative z-10 flex justify-between">
            {STEPS.map((step, i) => (
              <div key={step.label} className="flex flex-col items-center gap-3">
                <div
                  className={`flex size-10 items-center justify-center rounded-full shadow-md ${
                    step.current ? "bg-primary ring-4 ring-primary/20" : "bg-primary text-white"
                  }`}
                >
                  {step.current && i === STEPS.length - 1 ? (
                    <Truck className="size-5 text-white" />
                  ) : (
                    <Check className="size-5 text-white" />
                  )}
                </div>
                <div className="text-center">
                  <p className="text-xs font-bold text-slate-900 dark:text-white">{step.label}</p>
                  <p className="text-[10px] font-medium text-slate-500">{step.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Order Items */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="border-b border-slate-100 bg-slate-50/50 px-6 py-4 dark:border-slate-800 dark:bg-slate-800/50">
          <h3 className="font-bold text-slate-900 dark:text-white">Order Items</h3>
        </div>
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {ORDER_ITEMS.map((item) => (
            <div key={item.sku} className="flex flex-wrap items-center gap-6 p-6">
              <div className="size-24 shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-slate-100 dark:border-slate-700 dark:bg-slate-800">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white">{item.name}</h4>
                <p className="mb-1 text-sm font-medium text-slate-500">SKU: {item.sku}</p>
                <div className="mt-2 flex gap-4">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="px-4 text-center">
                <p className="mb-1 text-xs font-bold uppercase text-slate-400">Qty</p>
                <p className="text-lg font-bold text-slate-900 dark:text-white">0{item.qty}</p>
              </div>
              <div className="min-w-[120px] text-right">
                <p className="mb-1 text-xs font-bold uppercase text-slate-400">Subtotal</p>
                <p className="text-xl font-black text-slate-900 dark:text-white">{item.subtotal}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-end gap-12 border-t border-slate-100 bg-slate-50 px-6 py-4 dark:border-slate-800 dark:bg-slate-800/50">
          <div className="text-right">
            <p className="text-xs font-medium text-slate-500">Subtotal</p>
            <p className="font-bold text-slate-900 dark:text-white">$1,240.00</p>
          </div>
          <div className="text-right">
            <p className="text-xs font-medium text-slate-500">Tax (Included)</p>
            <p className="font-bold text-slate-900 dark:text-white">$0.00</p>
          </div>
          <div className="text-right">
            <p className="text-xs font-medium text-slate-500">Shipping</p>
            <p className="font-bold text-emerald-600">FREE</p>
          </div>
        </div>
      </div>

      {/* Shipping, Billing, Payment */}
      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-4 flex items-center gap-2">
            <Truck className="size-5 text-primary" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Shipping Address
            </h3>
          </div>
          <div className="space-y-1 text-sm">
            <p className="font-bold text-slate-900 dark:text-white">Alex Rivera</p>
            <p className="text-slate-600 dark:text-slate-400">123 Tech Lane, Suite 400</p>
            <p className="text-slate-600 dark:text-slate-400">Silicon Valley, CA 94025</p>
            <p className="text-slate-600 dark:text-slate-400">United States</p>
            <p className="pt-2 text-slate-600 dark:text-slate-400">+1 (555) 012-3456</p>
          </div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-4 flex items-center gap-2">
            <Receipt className="size-5 text-primary" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Billing Details
            </h3>
          </div>
          <div className="space-y-1 text-sm">
            <p className="font-bold text-slate-900 dark:text-white">NetLink Solutions LLC</p>
            <p className="text-slate-600 dark:text-slate-400">456 Enterprise Way</p>
            <p className="text-slate-600 dark:text-slate-400">San Francisco, CA 94103</p>
            <p className="text-slate-600 dark:text-slate-400">United States</p>
            <p className="pt-2 text-slate-600 dark:text-slate-400">VAT: US123456789</p>
          </div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-4 flex items-center gap-2">
            <Wallet className="size-5 text-primary" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Payment Method
            </h3>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3">
              <div className="rounded bg-slate-100 px-2 py-1 text-[10px] font-black text-slate-500 dark:bg-slate-800">
                SSL
              </div>
              <div>
                <p className="font-bold leading-none text-slate-900 dark:text-white">SSLCommerz Gateway</p>
                <p className="text-xs font-medium text-slate-500">Secured Transaction</p>
              </div>
            </div>
            <div className="rounded-lg border border-slate-100 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-800/50">
              <p className="mb-1 text-[10px] font-bold uppercase text-slate-400">Transaction ID</p>
              <p className="font-mono text-sm font-bold text-slate-700 dark:text-slate-300">TXN_99283-884X</p>
            </div>
            <p className="text-xs font-medium italic text-slate-500">Paid on Oct 24, 10:46 AM</p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-12 pt-4">
        <div className="flex gap-3">
          <Button variant="outline" size="default" className="gap-2">
            <Download className="size-5" />
            Download Invoice
          </Button>
          <Button variant="outline" size="default" className="gap-2">
            <Star className="size-5" />
            Submit Review
          </Button>
        </div>
        <Button className="gap-2 shadow-md" size="lg">
          <RotateCcw className="size-5" />
          Buy Again
        </Button>
      </div>
    </div>
  );
}
