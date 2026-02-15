"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ExternalLink,
  MapPin,
  Receipt,
  Package,
  Truck,
  Home,
  CheckCircle2,
  ShoppingBag,
  HelpCircle,
  History,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Routes } from "@/lib/routes";

const MILESTONES = [
  { label: "Order Placed", time: "Oct 20, 10:00 AM", icon: Receipt, active: true },
  { label: "Processed", time: "Oct 21, 09:15 AM", icon: Package, active: true },
  { label: "Shipped", time: "Oct 22, 02:30 PM", icon: Truck, active: true, current: true },
  { label: "Out for Delivery", time: "Oct 24 (Estimated)", icon: Home, active: false },
  { label: "Delivered", time: "Pending", icon: CheckCircle2, active: false },
];

const SHIPMENT_ITEMS = [
  {
    name: "Pro Runner Air Z1",
    detail: "Size: 10.5 | Color: Crimson Red",
    sku: "PR-772-AIR",
    qty: 1,
    price: "$129.00",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=128&h=128&fit=crop",
  },
  {
    name: "Elite Precision Watch",
    detail: "Finish: Matte Silver",
    sku: "EPW-990-MS",
    qty: 1,
    price: "$215.00",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=128&h=128&fit=crop",
  },
  {
    name: "SonicFlow Noise Cancelling",
    detail: "Type: Over-Ear Wireless",
    sku: "SF-NC-202",
    qty: 1,
    price: "$189.99",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=128&h=128&fit=crop",
  },
];

const TRANSIT_HISTORY = [
  { title: "Arrived at Distribution Center", time: "Oct 22, 2023 - 11:42 AM • Chicago, IL", active: true },
  { title: "Departed from Sorting Facility", time: "Oct 21, 2023 - 08:30 PM • Minneapolis, MN", active: true },
  { title: "Shipment Data Received", time: "Oct 20, 2023 - 02:15 PM • E-Commerce Gateway", active: false },
];

interface TrackShipmentContentProps {
  orderId: string;
}

export default function TrackShipmentContent({ orderId }: TrackShipmentContentProps) {
  const [historyOpen, setHistoryOpen] = useState(false);
  const currentStepIndex = MILESTONES.findIndex((m) => m.current) ?? 2;
  const progressPercent = ((currentStepIndex + 0.5) / MILESTONES.length) * 100;

  return (
    <div className="mx-auto max-w-5xl w-full space-y-8 p-8">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <Link
            href={Routes.me.orders}
            className="mb-2 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
          >
            <ArrowLeft className="size-4" />
            Back to Order History
          </Link>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
            Track Shipment: #{orderId}
          </h1>
          <p className="mt-1 text-slate-500 dark:text-slate-400">
            Consignment ID: <span className="font-mono font-medium">LGP-772839910-US</span>
          </p>
        </div>
        <Button variant="secondary" className="w-fit gap-2" asChild>
          <Link href={Routes.me.orderDetail(orderId)}>
            <ExternalLink className="size-4" />
            View Full Order Details
          </Link>
        </Button>
      </div>

      {/* Live Status Banner */}
      <div className="relative overflow-hidden rounded-xl border border-primary/10 bg-white p-6 shadow-sm dark:bg-slate-900">
        <div className="absolute right-0 top-0 p-4">
          <span className="inline-flex items-center rounded-full border border-green-200 bg-green-100 px-2.5 py-0.5 text-xs font-bold text-green-800 dark:border-green-800 dark:bg-green-500/20 dark:text-green-400">
            <span className="mr-2 size-2 animate-pulse rounded-full bg-green-500" />
            Live Updates
          </span>
        </div>
        <div className="flex flex-col items-center gap-8 py-4 lg:flex-row lg:items-center">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <p className="text-sm font-medium uppercase tracking-widest text-slate-500">
              Estimated Delivery
            </p>
            <h2 className="mt-1 text-4xl font-black text-slate-900 dark:text-white">Oct 24, 2023</h2>
            <p className="mt-1 text-sm font-bold text-green-600 dark:text-green-400">
              On Schedule • Standard Ground
            </p>
          </div>
          <div className="hidden h-16 w-px bg-slate-200 dark:bg-slate-700 lg:block" />
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <p className="text-sm font-medium uppercase tracking-widest text-slate-500">
              Current Location
            </p>
            <h2 className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">Chicago, IL Hub</h2>
            <p className="mt-1 text-sm font-medium text-slate-500">Arrived: Oct 22, 11:42 AM</p>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative mt-10">
          <div className="absolute left-0 top-5 h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
            <div
              className="h-full rounded-full bg-primary transition-all duration-1000"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="relative flex justify-between">
            {MILESTONES.map((milestone, i) => {
              const Icon = milestone.icon;
              const isCurrent = milestone.current;
              return (
                <div key={milestone.label} className="flex flex-col items-center">
                  <div
                    className={`z-10 flex size-10 shrink-0 items-center justify-center rounded-full ring-4 ring-white dark:ring-slate-900 ${
                      milestone.active
                        ? "bg-primary text-white"
                        : "bg-slate-200 text-slate-500 dark:bg-slate-800"
                    } ${isCurrent ? "-mt-1 scale-110 ring-8 ring-primary/20" : ""}`}
                  >
                    <Icon className={isCurrent ? "size-6" : "size-5"} />
                  </div>
                  <div className="mt-2 text-center">
                    <p
                      className={`text-xs font-bold ${
                        isCurrent
                          ? "text-primary"
                          : milestone.active
                            ? "text-slate-900 dark:text-white"
                            : "text-slate-400"
                      }`}
                    >
                      {milestone.label}
                    </p>
                    <p className="text-[10px] text-slate-400">{milestone.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Secondary: Items + Sidebar */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          {/* Items in Shipment */}
          <div className="rounded-xl border border-primary/10 bg-white p-6 shadow-sm dark:bg-slate-900">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="flex items-center gap-2 text-lg font-bold">
                <ShoppingBag className="size-5 text-primary" />
                Items in this Shipment ({SHIPMENT_ITEMS.length})
              </h3>
              <span className="text-xs font-medium text-slate-500">Package Weight: 4.2 lbs</span>
            </div>
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {SHIPMENT_ITEMS.map((item) => (
                <div
                  key={item.sku}
                  className="flex items-center gap-4 py-4 first:pt-0 last:pb-0"
                >
                  <div className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-800">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={64}
                      height={64}
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="truncate text-sm font-bold text-slate-900 dark:text-white">
                      {item.name}
                    </h4>
                    <p className="mt-0.5 text-xs text-slate-500">{item.detail}</p>
                    <p className="mt-1 text-xs font-medium text-primary">SKU: {item.sku}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold">Qty: {item.qty}</p>
                    <p className="text-xs text-slate-500">{item.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Map placeholder */}
          <div className="overflow-hidden rounded-xl border border-primary/10 bg-white shadow-sm dark:bg-slate-900">
            <div className="relative h-64 overflow-hidden rounded-lg bg-slate-200 dark:bg-slate-800">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <div className="flex size-8 items-center justify-center rounded-full bg-primary text-white ring-4 ring-white/50 animate-bounce">
                    <MapPin className="size-4" />
                  </div>
                  <div className="absolute -left-12 top-10 whitespace-nowrap rounded bg-white px-3 py-1 text-[10px] font-bold shadow-lg dark:bg-slate-800 dark:text-white">
                    Current Location: Chicago
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="rounded-xl border border-primary/10 bg-white p-6 shadow-sm dark:bg-slate-900">
            <h3 className="mb-4 text-sm font-black uppercase tracking-wider text-slate-900 dark:text-white">
              Delivery Details
            </h3>
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="mt-1.5 size-2 rounded-full bg-primary" />
                <div className="my-1 w-px flex-1 bg-slate-200 dark:bg-slate-700" />
                <div className="size-2 rounded-full bg-slate-400" />
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-[10px] font-bold uppercase text-slate-500">From</p>
                  <p className="text-xs font-medium">Logistics Center North</p>
                  <p className="text-xs text-slate-500">Minneapolis, MN 55401</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase text-slate-500">To</p>
                  <p className="text-xs font-bold">James Richardson</p>
                  <p className="text-xs text-slate-500">4522 Oakwood Dr, Apt 4B</p>
                  <p className="text-xs text-slate-500">Indianapolis, IN 46201</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-primary/10 bg-primary/5 p-6 dark:bg-primary/10">
            <h3 className="mb-4 text-sm font-black uppercase tracking-wider text-slate-900 dark:text-white">
              Carrier Information
            </h3>
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg border border-primary/10 bg-white shadow-sm dark:bg-slate-900">
                <Truck className="size-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-bold">SwiftExpress Logistics</p>
                <p className="text-xs text-slate-500">Ground Delivery Service</p>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-primary/10 pt-4">
              <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
                Proof of Delivery
              </span>
              <span className="text-xs font-bold text-primary">Photo Required</span>
            </div>
          </div>

          <div className="rounded-xl bg-slate-900 p-6 text-center text-white dark:bg-primary/20 dark:text-primary">
            <HelpCircle className="mx-auto size-8" />
            <h4 className="mt-3 font-bold">Need Assistance?</h4>
            <p className="mt-2 text-xs leading-relaxed text-slate-400 dark:text-primary/70">
              Having trouble with your delivery? Our support team is here to help you 24/7.
            </p>
            <Button className="mt-3 w-full" size="sm" asChild>
              <Link href={Routes.support.index}>Contact Support</Link>
            </Button>
            <Link
              href={Routes.support.index}
              className="mt-2 block text-[10px] underline opacity-50 hover:opacity-75"
            >
              Report a delivery problem
            </Link>
          </div>
        </div>
      </div>

      {/* Transit History Accordion */}
      <div className="overflow-hidden rounded-xl border border-primary/10 bg-white shadow-sm dark:bg-slate-900">
        <button
          type="button"
          onClick={() => setHistoryOpen((o) => !o)}
          className="flex w-full items-center justify-between border-b border-primary/10 bg-slate-50 px-6 py-4 transition-colors hover:bg-slate-100 dark:bg-slate-800/50 dark:hover:bg-slate-800"
        >
          <span className="flex items-center gap-2 text-sm font-bold">
            <History className="size-5 text-primary" />
            Detailed Transit History
          </span>
          {historyOpen ? (
            <ChevronUp className="size-5 text-slate-500" />
          ) : (
            <ChevronDown className="size-5 text-slate-500" />
          )}
        </button>
        {historyOpen && (
          <div className="p-6">
            <div className="space-y-6">
              {TRANSIT_HISTORY.map((entry) => (
                <div
                  key={entry.title}
                  className={`relative border-l-2 pl-6 ${
                    entry.active ? "border-primary" : "border-slate-200 dark:border-slate-700"
                  }`}
                >
                  <div
                    className={`absolute -left-[9px] top-0 size-4 rounded-full ring-4 ring-white dark:ring-slate-900 ${
                      entry.active ? "bg-primary" : "bg-slate-300 dark:bg-slate-600"
                    }`}
                  />
                  <p
                    className={
                      entry.active
                        ? "text-sm font-bold"
                        : "text-sm font-medium text-slate-500"
                    }
                  >
                    {entry.title}
                  </p>
                  <p className="text-xs text-slate-500">{entry.time}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
