"use client";

/**
 * Create New Sales Order - primary color #ec5b13
 */

import { useState } from "react";
import {
  ChevronRight,
  UserSearch,
  Package,
  ScanBarcode,
  ClipboardList,
  Send,
  Plus,
  Trash2,
  CheckCircle2,
  Pencil,
  Info,
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

const PRIMARY = "#ec5b13";
type Product = {
  id: string;
  name: string;
  sku: string;
  stock: number;
  stockLabel: string;
  stockStyle: string;
  unitPrice: number;
  qty: number;
};

const INITIAL_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Workstation Z9 Pro",
    sku: "SKU-WS-Z9P-001",
    stock: 42,
    stockLabel: "42 units",
    stockStyle:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",
    unitPrice: 2499,
    qty: 2,
  },
  {
    id: "2",
    name: "NVIDIA RTX 4090 Bulk",
    sku: "SKU-GPU-NV4090-B",
    stock: 5,
    stockLabel: "5 low stock",
    stockStyle:
      "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
    unitPrice: 1599,
    qty: 3,
  },
];

const VALIDATED_SERIALS = [
  { serial: "SN-W9-882193-X", item: "Workstation Z9 Pro" },
  { serial: "SN-W9-882194-X", item: "Workstation Z9 Pro" },
  { serial: "SN-RTX-B-44021", item: "NVIDIA RTX 4090 Bulk" },
  { serial: "SN-RTX-B-44022", item: "NVIDIA RTX 4090 Bulk" },
  { serial: "SN-RTX-B-44023", item: "NVIDIA RTX 4090 Bulk" },
];

export default function CreateOrderContent() {
  const [activeStep, setActiveStep] = useState(1);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [autoScan, setAutoScan] = useState(true);
  const [billingSame, setBillingSame] = useState(true);

  const subtotal = products.reduce((s, p) => s + p.unitPrice * p.qty, 0);
  const tax = subtotal * 0.085;
  const discount = subtotal * 0.05;
  const total = subtotal + tax - discount;

  function updateQty(id: string, qty: number) {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, qty: Math.max(1, qty) } : p)),
    );
  }

  function removeProduct(id: string) {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }

  return (
    <div className="space-y-6">
      {/* Breadcrumb & Header */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
          <span className="hover:text-orange-600 cursor-pointer transition-colors">
            Sales
          </span>
          <ChevronRight className="size-4" />
          <span className="hover:text-orange-600 cursor-pointer transition-colors">
            Orders
          </span>
          <ChevronRight className="size-4" />
          <span className="font-medium text-slate-900 dark:text-white">
            New Order
          </span>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
              Create New Sales Order
            </h1>
            <p className="mt-1 text-slate-500 dark:text-slate-400">
              Order #SO-2023-0892 • Drafted by Admin
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="font-bold">
              Save Draft
            </Button>
            <Button className="gap-2 bg-orange-600 font-bold text-white shadow-lg shadow-orange-600/20 hover:bg-orange-600/90">
              <Send className="size-[18px]" />
              Submit for Approval
            </Button>
          </div>
        </div>
      </div>

      {/* Main layout */}
      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Left: Form Sections */}
        <div className="flex-1 space-y-6">
          {/* Section 1: Customer & Shipping */}
          <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/50 px-5 py-4 dark:border-slate-800 dark:bg-slate-800/50">
              <div className="flex items-center gap-2">
                <UserSearch className="size-5 text-orange-600" />
                <h3 className="font-bold text-slate-800 dark:text-white">
                  1. Customer &amp; Shipping Info
                </h3>
              </div>
              <span className="text-xs font-medium text-slate-400">
                Step 1 of 4
              </span>
            </div>
            <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2">
              {/* Customer */}
              <div className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Select Customer
                  </label>
                  <Input
                    placeholder="Search by name, email or ID..."
                    defaultValue="Global Tech Solutions Inc."
                    className="focus:border-orange-600 focus:ring-orange-600/20"
                  />
                </div>
                <div className="space-y-2 rounded-lg border border-orange-600/20 bg-orange-600/5 p-4">
                  <p className="text-xs font-bold uppercase text-orange-600">
                    Customer Details
                  </p>
                  <p className="text-sm font-bold dark:text-white">
                    Global Tech Solutions Inc.
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    ID: #CUS-9821 | VIP Tier | Net 30 Terms
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    contact@globaltech.com
                  </p>
                </div>
              </div>
              {/* Shipping */}
              <div className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Shipping Address
                  </label>
                  <textarea
                    rows={3}
                    defaultValue={`4521 Innovation Way, Suite 100\nSan Francisco, CA 94105\nUnited States`}
                    placeholder="Full street address, city, state, zip"
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-sm transition-colors focus:border-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-600/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <input
                    id="billing-same"
                    type="checkbox"
                    checked={billingSame}
                    onChange={(e) => setBillingSame(e.target.checked)}
                    className="rounded border-slate-300 text-orange-600 focus:ring-orange-600"
                  />
                  <label
                    htmlFor="billing-same"
                    className="text-xs font-medium text-slate-600 dark:text-slate-400"
                  >
                    Billing address same as shipping
                  </label>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Product Selection */}
          <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/50 px-5 py-4 dark:border-slate-800 dark:bg-slate-800/50">
              <div className="flex items-center gap-2">
                <Package className="size-5 text-orange-600" />
                <h3 className="font-bold text-slate-800 dark:text-white">
                  2. Product Selection
                </h3>
              </div>
              <button
                type="button"
                className="flex items-center gap-1 text-xs font-bold text-orange-600 hover:underline"
              >
                <Plus className="size-4" />
                Add Row
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-800/50">
                    {[
                      "Product / SKU",
                      "In Stock",
                      "Unit Price",
                      "Qty",
                      "Total",
                      "",
                    ].map((h, i) => (
                      <th
                        key={i}
                        className={`px-6 py-3 text-[11px] font-bold uppercase tracking-wider text-slate-500 ${
                          i === 1 ? "text-center" : i === 4 ? "text-right" : ""
                        }`}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {products.map((p) => (
                    <tr key={p.id}>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-sm font-bold dark:text-white">
                            {p.name}
                          </span>
                          <span className="text-[11px] text-slate-400">
                            {p.sku}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span
                          className={`inline-flex items-center rounded px-2 py-0.5 text-[11px] font-bold uppercase ${p.stockStyle}`}
                        >
                          {p.stockLabel}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium dark:text-slate-200">
                        ${p.unitPrice.toLocaleString()}.00
                      </td>
                      <td className="px-6 py-4">
                        <input
                          type="number"
                          min={1}
                          value={p.qty}
                          onChange={(e) =>
                            updateQty(p.id, parseInt(e.target.value) || 1)
                          }
                          className="h-8 w-20 rounded border border-slate-200 bg-white px-2 text-sm focus:border-orange-600 focus:outline-none focus:ring-1 focus:ring-orange-600/30 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                        />
                      </td>
                      <td className="px-6 py-4 text-right text-sm font-bold dark:text-white">
                        ${(p.unitPrice * p.qty).toLocaleString()}.00
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          type="button"
                          onClick={() => removeProduct(p.id)}
                          className="text-slate-400 transition-colors hover:text-red-500"
                        >
                          <Trash2 className="size-[18px]" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="bg-slate-50/30 p-4 dark:bg-slate-800/20">
              <button
                type="button"
                className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-slate-200 py-2 text-sm font-bold text-slate-400 transition-all hover:border-orange-600/50 hover:text-orange-600 dark:border-slate-700 dark:text-slate-500"
              >
                <Plus className="size-5" />
                Click or press F2 to add more products
              </button>
            </div>
          </section>

          {/* Section 3: Serial Number Assignment */}
          <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/50 px-5 py-4 dark:border-slate-800 dark:bg-slate-800/50">
              <div className="flex items-center gap-2">
                <ScanBarcode className="size-5 text-orange-600" />
                <h3 className="font-bold text-slate-800 dark:text-white">
                  3. Serial Number Assignment
                </h3>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold uppercase text-slate-400">
                  Auto-Scan Mode
                </span>
                <button
                  type="button"
                  onClick={() => setAutoScan((v) => !v)}
                  className="relative h-4 w-8 rounded-full transition-colors"
                  style={{ backgroundColor: autoScan ? PRIMARY : "#cbd5e1" }}
                  aria-label="Toggle auto-scan"
                >
                  <div
                    className={`absolute top-0.5 h-3 w-3 rounded-full bg-white shadow transition-transform ${
                      autoScan ? "translate-x-4" : "translate-x-0.5"
                    }`}
                  />
                </button>
              </div>
            </div>
            <div className="space-y-6 p-6">
              <div className="flex flex-col items-end gap-4 md:flex-row">
                <div className="flex-1">
                  <label className="mb-1.5 block text-[11px] font-bold uppercase text-slate-500">
                    Scanning Input
                  </label>
                  <Input
                    placeholder="Scan or type serial number..."
                    className="border-orange-600/30 bg-orange-600/5 font-mono focus:border-orange-600 focus:ring-orange-600/20 dark:border-orange-600/50 dark:bg-orange-600/10"
                  />
                </div>
                <div className="flex-1">
                  <label className="mb-1.5 block text-[11px] font-bold uppercase text-slate-500">
                    Assign to Item
                  </label>
                  <Select defaultValue="line1">
                    <SelectTrigger className="focus:ring-orange-600/20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="line1">
                        Workstation Z9 Pro (Line 1)
                      </SelectItem>
                      <SelectItem value="line2">
                        NVIDIA RTX 4090 Bulk (Line 2)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="h-10 bg-orange-600 font-bold text-white hover:bg-orange-600/90">
                  Validate
                </Button>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2 text-xs font-bold text-slate-500 dark:border-slate-800">
                  <span>
                    Validated Serials ({VALIDATED_SERIALS.length}/
                    {VALIDATED_SERIALS.length})
                  </span>
                  <span className="text-emerald-600">Ready for dispatch</span>
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
                  {VALIDATED_SERIALS.map((s) => (
                    <div
                      key={s.serial}
                      className="flex items-center justify-between rounded border border-slate-200 bg-slate-100 p-2 dark:border-slate-700 dark:bg-slate-800"
                    >
                      <span className="font-mono text-xs dark:text-slate-300">
                        {s.serial}
                      </span>
                      <CheckCircle2 className="size-4 shrink-0 text-emerald-500" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Right: Summary Sidebar */}
        <div className="w-full space-y-6 lg:w-80">
          {/* Order Summary */}
          <div className="sticky top-24 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50/50 px-5 py-4 dark:border-slate-800 dark:bg-slate-800/50">
              <ClipboardList className="size-5 text-orange-600" />
              <h3 className="font-bold text-slate-800 dark:text-white">
                4. Order Summary
              </h3>
            </div>
            <div className="space-y-4 p-6">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500 dark:text-slate-400">
                  Subtotal ({products.reduce((s, p) => s + p.qty, 0)} items)
                </span>
                <span className="font-bold dark:text-white">
                  $
                  {subtotal.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500 dark:text-slate-400">
                  Tax (8.5%)
                </span>
                <div className="flex items-center gap-2">
                  <span className="font-bold dark:text-white">
                    ${tax.toFixed(2)}
                  </span>
                  <button
                    type="button"
                    className="text-orange-600"
                    aria-label="Edit tax"
                  >
                    <Pencil className="size-4" />
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500 dark:text-slate-400">
                  Discount (VIP-5)
                </span>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-emerald-600">
                    -${discount.toFixed(2)}
                  </span>
                  <button
                    type="button"
                    className="text-orange-600"
                    aria-label="Edit discount"
                  >
                    <Pencil className="size-4" />
                  </button>
                </div>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500 dark:text-slate-400">
                  Shipping
                </span>
                <span className="text-[11px] font-bold uppercase text-emerald-600">
                  Free Shipping
                </span>
              </div>
              <div className="flex items-end justify-between border-t border-slate-100 pt-4 dark:border-slate-800">
                <span className="text-sm font-bold text-slate-900 dark:text-white">
                  Total Amount
                </span>
                <div className="text-right">
                  <span
                    className="block text-2xl font-black"
                    style={{ color: PRIMARY }}
                  >
                    $
                    {total.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                    })}
                  </span>
                  <span className="text-[10px] uppercase tracking-tighter text-slate-400">
                    Currency: USD
                  </span>
                </div>
              </div>
            </div>
            <div className="space-y-3 px-6 pb-6">
              <div>
                <label className="mb-1.5 block text-[11px] font-bold uppercase text-slate-500">
                  Internal Order Notes
                </label>
                <textarea
                  rows={2}
                  placeholder="Notes for fulfillment team..."
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs transition-colors focus:border-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-600/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>
              <Button className="w-full bg-orange-600 py-3 text-sm font-black uppercase tracking-wide text-white shadow-lg shadow-orange-600/20 hover:bg-orange-600/90">
                Submit For Approval
              </Button>
              <p className="text-center text-[10px] text-slate-400">
                By submitting, you trigger a notification to the Sales Manager
                for approval workflow.
              </p>
            </div>
          </div>

          {/* Sales Policy */}
          <div className="rounded-xl border border-slate-200 bg-slate-100/50 p-4 dark:border-slate-700 dark:bg-slate-800/50">
            <div className="mb-2 flex items-center gap-2">
              <Info className="size-[18px] text-slate-400" />
              <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
                Sales Policy
              </span>
            </div>
            <p className="text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">
              Orders above $5,000 require manual sign-off by a Director.
              Estimated fulfillment lead time: 3–5 business days.
            </p>
          </div>
        </div>
      </div>

      {/* Mobile sticky footer */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 lg:hidden">
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col">
            <span className="text-xs text-slate-500">Total Due</span>
            <span className="text-lg font-black" style={{ color: PRIMARY }}>
              ${total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </span>
          </div>
          <Button className="bg-orange-600 font-bold text-white hover:bg-orange-600/90">
            Submit Order
          </Button>
        </div>
      </div>
    </div>
  );
}
