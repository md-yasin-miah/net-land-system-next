"use client";

import { useState } from "react";
import {
  Building2,
  Package,
  Truck,
  Download,
  Plus,
  Search,
  Trash2,
  Send,
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
const SUPPLIERS = [
  "NexGen Solutions Inc.",
  "Cisco Global Distro",
  "FastTrack Fiber Logistics",
  "Aruba Networking Hub",
];

const PRODUCTS = [
  {
    id: "1",
    name: "Cisco Catalyst 9300L",
    subtitle: "24-port Fixed Uplink, 4x10G",
    sku: "C9300L-24T-4X-E",
    stock: "12 units",
    stockLow: false,
    qty: 10,
    unitCost: "3,250.00",
    tax: "8%",
    subtotal: "32,500.00",
  },
  {
    id: "2",
    name: "Ubiquiti UniFi 6 Pro",
    subtitle: "WiFi 6 Enterprise Access Point",
    sku: "U6-PRO-US",
    stock: "2 units",
    stockLow: true,
    qty: 50,
    unitCost: "189.00",
    tax: "8%",
    subtotal: "9,450.00",
  },
];

export default function CreatePurchaseOrderContent() {
  const [products, setProducts] = useState(PRODUCTS);

  const removeProduct = (id: string) => {
    setProducts((p) => p.filter((item) => item.id !== id));
  };

  return (
    <div>

      <div className="mx-auto max-w-6xl space-y-6">
        {/* Section 1: Supplier Selection */}
        <section className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-black/5 dark:bg-slate-900 dark:ring-slate-800">
          <div className="mb-6 flex items-center gap-2">
            <Building2 className="size-5 text-primary" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              1. Supplier Selection
            </h3>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-500 dark:text-slate-400">
                  Select Supplier
                </label>
                <Select defaultValue={SUPPLIERS[0]}>
                  <SelectTrigger className="h-10 w-full rounded-lg border-slate-200 focus:ring-primary dark:border-slate-700 dark:bg-slate-800">
                    <SelectValue placeholder="Select supplier" />
                  </SelectTrigger>
                  <SelectContent>
                    {SUPPLIERS.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="rounded-lg border border-primary/10 bg-primary/5 p-4 dark:border-primary/20 dark:bg-primary/10">
                <h4 className="mb-2 text-xs font-bold uppercase text-primary">
                  Auto-filled Contact Info
                </h4>
                <div className="space-y-1 text-sm">
                  <p className="font-semibold text-slate-800 dark:text-slate-200">
                    Sarah Jenkins
                  </p>
                  <p className="text-slate-500 dark:text-slate-400">
                    Account Manager • B2B Enterprise Dept.
                  </p>
                  <p className="text-slate-500 dark:text-slate-400">
                    s.jenkins@nexgen-solutions.com
                  </p>
                  <p className="text-slate-500 dark:text-slate-400">
                    +1 (555) 234-9871
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="rounded-lg border border-slate-200 p-4 dark:border-slate-700 dark:bg-slate-800/50">
                <h4 className="mb-2 text-xs font-bold uppercase text-slate-500 dark:text-slate-400">
                  Billing Address
                </h4>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  NexGen Solutions Headquarters
                  <br />
                  4428 Industrial Way, Suite 200
                  <br />
                  Austin, TX 78701
                  <br />
                  United States
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-500 dark:text-slate-400">
                    Payment Terms
                  </label>
                  <div className="rounded-lg bg-slate-50 px-3 py-2 text-sm font-medium dark:bg-slate-800">
                    Net 30
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-500 dark:text-slate-400">
                    Currency
                  </label>
                  <div className="rounded-lg bg-slate-50 px-3 py-2 text-sm font-medium dark:bg-slate-800">
                    USD ($)
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Add Products */}
        <section className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-black/5 dark:bg-slate-900 dark:ring-slate-800">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <Package className="size-5 text-primary" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                2. Add Products
              </h3>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-1">
                <Download className="size-4" />
                Import CSV
              </Button>
              <Button size="sm" className="gap-1">
                <Plus className="size-4" />
                Quick Add SKU
              </Button>
            </div>
          </div>
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 size-5 text-slate-400" />
              <Input
                type="text"
                placeholder="Search product name or SKU..."
                className="h-10 pl-10"
              />
            </div>
          </div>
          <TableContainer>
            <Table>
              <TableHeader>
                <TableRow className="border-b border-slate-200 dark:border-slate-700">
                  <TableHead className="pb-3 text-[11px] font-semibold uppercase text-slate-500">
                    Item Details
                  </TableHead>
                  <TableHead className="pb-3 text-[11px] font-semibold uppercase text-slate-500">
                    SKU
                  </TableHead>
                  <TableHead className="pb-3 text-[11px] font-semibold uppercase text-slate-500">
                    Current Stock
                  </TableHead>
                  <TableHead className="w-24 pb-3 text-[11px] font-semibold uppercase text-slate-500">
                    Order Qty
                  </TableHead>
                  <TableHead className="w-32 pb-3 text-[11px] font-semibold uppercase text-slate-500">
                    Unit Cost ($)
                  </TableHead>
                  <TableHead className="pb-3 text-[11px] font-semibold uppercase text-slate-500">
                    Tax (%)
                  </TableHead>
                  <TableHead className="pb-3 text-right text-[11px] font-semibold uppercase text-slate-500">
                    Subtotal
                  </TableHead>
                  <TableHead className="w-10 pb-3" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((row) => (
                  <TableRow key={row.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                    <TableCell className="py-4">
                      <div className="font-semibold text-slate-800 dark:text-slate-200">
                        {row.name}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        {row.subtitle}
                      </div>
                    </TableCell>
                    <TableCell className="py-4 font-mono text-xs">
                      {row.sku}
                    </TableCell>
                    <TableCell
                      className={`py-4 ${row.stockLow ? "font-medium text-orange-600" : "text-slate-600 dark:text-slate-400"}`}
                    >
                      {row.stock}
                    </TableCell>
                    <TableCell className="py-4">
                      <Input
                        type="number"
                        defaultValue={row.qty}
                        className="h-8 w-16 px-2 py-1"
                      />
                    </TableCell>
                    <TableCell className="py-4">
                      <Input
                        type="text"
                        defaultValue={row.unitCost}
                        className="h-8 w-24 px-2 py-1"
                      />
                    </TableCell>
                    <TableCell className="py-4 text-slate-600 dark:text-slate-400">
                      {row.tax}
                    </TableCell>
                    <TableCell className="py-4 text-right font-semibold">
                      ${row.subtotal}
                    </TableCell>
                    <TableCell className="py-4 text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-8 text-slate-400 hover:text-red-500"
                        onClick={() => removeProduct(row.id)}
                        title="Remove"
                      >
                        <Trash2 className="size-5" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </section>

        {/* Section 3: Shipping & Terms */}
        <section className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-black/5 dark:bg-slate-900 dark:ring-slate-800">
          <div className="mb-6 flex items-center gap-2">
            <Truck className="size-5 text-primary" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              3. Shipping & Terms
            </h3>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-500 dark:text-slate-400">
                Shipping Method
              </label>
              <Select defaultValue="standard">
                <SelectTrigger className="h-10 w-full rounded-lg border-slate-200 focus:ring-primary dark:border-slate-700 dark:bg-slate-800">
                  <SelectValue placeholder="Select method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">
                    Standard Freight (5-7 Days)
                  </SelectItem>
                  <SelectItem value="expedited">
                    Expedited Air (2 Days)
                  </SelectItem>
                  <SelectItem value="overnight">
                    Overnight Express
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-500 dark:text-slate-400">
                Expected Delivery
              </label>
              <Input type="date" defaultValue="2023-10-25" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-500 dark:text-slate-400">
                Warehouse Destination
              </label>
              <Select defaultValue="dallas">
                <SelectTrigger className="h-10 w-full rounded-lg border-slate-200 focus:ring-primary dark:border-slate-700 dark:bg-slate-800">
                  <SelectValue placeholder="Select warehouse" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dallas">
                    Main Distribution - Dallas
                  </SelectItem>
                  <SelectItem value="la">West Coast Hub - LA</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="md:col-span-3">
              <label className="mb-1 block text-sm font-medium text-slate-500 dark:text-slate-400">
                Internal Notes (Not visible to supplier)
              </label>
              <textarea
                rows={3}
                placeholder="Enter instructions for warehouse receiving team..."
                className="flex w-full resize-y rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-sm transition-colors placeholder:text-slate-500 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-400"
              />
            </div>
          </div>
        </section>
      </div>

      {/* Sticky Bottom Summary Bar */}
      <footer className="sticky mt-6 -bottom-8 z-10 -mx-8 border-t border-slate-200 bg-white px-8 py-4 shadow-2xl dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-8 sm:gap-12">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Total Est. Weight
              </span>
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                142.5 lbs
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Est. Sales Tax
              </span>
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                $3,356.00
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Total PO Cost
              </span>
              <span className="text-xl font-black text-primary">$45,306.00</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" className="font-bold">
              Save as Draft
            </Button>
            <Button className="gap-2 font-bold shadow-lg shadow-primary/20">
              <Send className="size-5" />
              Send to Supplier
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
}
