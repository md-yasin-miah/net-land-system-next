"use client";

import Image from "next/image";
import {
  Download,
  PlusCircle,
  Filter,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Pencil,
  Trash2,
  TrendingUp,
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
import { cn } from "@/lib/utils";

const STATS = [
  { label: "Total Products", value: "1,284", sub: "+12%", subColor: "text-green-600" },
  { label: "Out of Stock", value: "18", sub: "Critical", subColor: "text-red-500" },
  { label: "Stock Value", value: "$142.5k", sub: "USD", subColor: "text-slate-400" },
  { label: "Avg. Margin", value: "34.2%", sub: null, icon: TrendingUp, subColor: "text-green-500" },
];

type ProductStatus = "active" | "out_of_stock" | "draft";
type StockLevel = "ok" | "low" | "empty";

const PRODUCTS = [
  {
    id: "1",
    name: "iPhone 15 Pro Max",
    variant: "Natural Titanium, 256GB",
    sku: "SKU-9901-T",
    category: "Electronics",
    price: 1199,
    cost: 899,
    stock: 45,
    stockMax: 75,
    stockLevel: "ok" as StockLevel,
    status: "active" as ProductStatus,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC6RuUyMLSCh5GGxXoo1bMW1jvP2aK_nkWxE9KSmOA1ojqrykBhc39CHnn-ZdBNiqimoQnLX65q9Q0XiaZ1DJb7FqLSzxuZU_dPhOs-Vt1La37KSXj08AulZbIoQz64f6slScDfaUd3RVQ3Ik318hLeFCACF4pvZ1CJTvn5eDd2OavznUDe6Rwz8U3wzHzFAMXGJ_7D7qbTfQIAeUqKG1HZ47ze3KnrNKZ7yNRuTcTZktqxkVXB9hW3llCyXIhGEhhcuW1lpuoxIq8",
  },
  {
    id: "2",
    name: "ErgoComfort Pro Chair",
    variant: "Mesh Office, Onyx Black",
    sku: "SKU-4421-E",
    category: "Furniture",
    price: 349.99,
    cost: 120,
    stock: 8,
    stockMax: 40,
    stockLevel: "low" as StockLevel,
    status: "active" as ProductStatus,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDrFSVZeoaXnI3vHcT6XqpFDF__7H2fiecfavhZ_1hg7gxnj9U4VaLS45OW1vZx3M3Y5zjEHvfY7a_F2k-S9Uw3lRMp3R-B9tzGaznhdnqfpK7tw_cmlKliDWnUbTTGjdkxASok__HxE2Aj7EQIbwTTq_-V55f5L0qLw5oxufcO4cbBfsodAN2gsjKJKEVwjNzTb4Y_qaPZw_VHJ_flgboKsHu0Dk6-B1063MUEzQKtZaixhqj2gpTXSG7bY2M0dZjzGwrgFlcBOec",
  },
  {
    id: "3",
    name: "RapidClick Wireless",
    variant: "Ergonomic Mouse",
    sku: "SKU-8832-M",
    category: "Electronics",
    price: 65,
    cost: 35,
    stock: 0,
    stockMax: 50,
    stockLevel: "empty" as StockLevel,
    status: "out_of_stock" as ProductStatus,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAyAiJAJlgIHXAnZYqSw5-S0JxmdFhvJ82ntB0l2X3_defGLez1GN-Y5o1IM3YWzp-ho55-FH-kgsmiAgoJHl0PEY7-igYg7j70NCaoxTR7odaZH7fio_LoPwN7YFAd91cDbr0Gv1ZwEs3eLUgdvkm7lA7jV6j5g5xYgkp9v8LW-NSwKyWtAAAriB7CE1OJpLJ0fuiaZmk8wjXuO49LtthTpd7WSLD4Ad6Oag2hHfY6zGrWCQzoI9h2zMa_ASFXTxe9wygSmsEL0HM",
  },
  {
    id: "4",
    name: "Ceramic White Minimalist Vase",
    variant: "Handcrafted 12\" Decorative",
    sku: "SKU-1102-V",
    category: "Home & Kitchen",
    price: 12,
    cost: 2.5,
    stock: 3,
    stockMax: 20,
    stockLevel: "low" as StockLevel,
    status: "draft" as ProductStatus,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDB_MfVZL6zJ8xJNLSL47PI9DtYFgVv6-OUKu8jL1biMp0DSOm-fPN-tqqmpSzymY20FdnuN1FWjM4DyagdJH5SjHDIZJrzTAMJCRveRjgytL41h81Fv1IrPvw7yZGGLaBei8RGnWeLYCRDoeokRHzBiUhlceUM7csVbMFYvB-Vxo7tIKgyxOIy4o8QXVZWhe1iDBuPA0uYedVQDMQaBHYqFqfWNIbyOUI6ItojZz03eRsy97Zc9PyoKJeIRQeKufX0eGFmyi4gWOM",
  },
];

function StockCell({ product }: { product: (typeof PRODUCTS)[0] }) {
  const pct = product.stockMax ? Math.min(100, (product.stock / product.stockMax) * 100) : 0;
  const barColor =
    product.stockLevel === "empty"
      ? "bg-slate-300"
      : product.stockLevel === "low"
        ? "bg-amber-500"
        : "bg-green-500";
  const textColor =
    product.stockLevel === "empty"
      ? "text-red-600"
      : product.stockLevel === "low"
        ? "text-amber-600"
        : "";

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2">
        <span className={cn("text-sm font-bold", textColor)}>
          {product.stock} units
        </span>
        {product.stockLevel === "low" && product.stock > 0 && (
          <span className="rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-black uppercase tracking-tighter text-amber-700 dark:bg-amber-900/50 dark:text-amber-400">
            Low Stock
          </span>
        )}
      </div>
      <div className="h-1.5 w-24 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
        <div
          className={cn("h-full rounded-full", barColor)}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: ProductStatus }) {
  const config = {
    active: {
      className:
        "bg-green-100 text-green-700 border-green-200 dark:bg-green-500/10 dark:text-green-500 dark:border-green-500/20",
      dot: "bg-green-500",
      pulse: true,
      label: "Active",
    },
    out_of_stock: {
      className:
        "bg-red-100 text-red-700 border-red-200 dark:bg-red-500/10 dark:text-red-500 dark:border-red-500/20",
      dot: "",
      pulse: false,
      label: "Out of Stock",
    },
    draft: {
      className:
        "bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:border-slate-600",
      dot: "",
      pulse: false,
      label: "Draft",
    },
  };
  const c = config[status];
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-bold",
        c.className
      )}
    >
      {c.dot && (
        <span
          className={cn("mr-1.5 size-1.5 rounded-full", c.dot, c.pulse && "animate-pulse")}
        />
      )}
      {c.label}
    </span>
  );
}

export default function ProductsContent() {
  return (
    <div className="space-y-8">
      {/* Hero Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
            Products Inventory
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Manage, track, and update your global inventory across all channels.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="flex items-center gap-2 font-semibold"
          >
            <Download className="size-5" />
            Export
          </Button>
          <Button className="flex items-center gap-2 font-bold shadow-lg shadow-primary/20">
            <PlusCircle className="size-5" />
            Add Product
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900"
          >
            <p className="mb-1 text-xs font-medium uppercase tracking-widest text-slate-500">
              {stat.label}
            </p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-900 dark:text-white">
                {stat.value}
              </span>
              {stat.sub && (
                <span className={cn("text-xs font-medium", stat.subColor)}>
                  {stat.sub}
                </span>
              )}
              {stat.icon && (
                <stat.icon className={cn("size-4", stat.subColor)} />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Filters Bar */}
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 rounded-lg border border-transparent bg-slate-100 px-3 py-1.5 text-sm text-slate-600 dark:bg-slate-800 dark:text-slate-400">
              <Filter className="size-4" />
              <span className="font-medium">Filters:</span>
            </div>
            <div className="relative">
              <select className="min-w-[160px] appearance-none rounded-lg border border-slate-200 bg-slate-50 pl-4 pr-10 py-2 text-sm focus:border-primary focus:ring-primary dark:border-slate-700 dark:bg-slate-800">
                <option>Category: All</option>
                <option>Electronics</option>
                <option>Furniture</option>
                <option>Home &amp; Kitchen</option>
                <option>Fashion</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-5 -translate-y-1/2 text-slate-400" />
            </div>
            <div className="relative">
              <select className="min-w-[160px] appearance-none rounded-lg border border-slate-200 bg-slate-50 pl-4 pr-10 py-2 text-sm focus:border-primary focus:ring-primary dark:border-slate-700 dark:bg-slate-800">
                <option>Status: All</option>
                <option>Active</option>
                <option>Draft</option>
                <option>Out of Stock</option>
                <option>Archived</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-5 -translate-y-1/2 text-slate-400" />
            </div>
            <button
              type="button"
              className="rounded-lg px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/5"
            >
              Clear Filters
            </button>
          </div>
          <div className="flex items-center gap-2">
            <p className="whitespace-nowrap text-xs font-medium text-slate-500">
              Sort by:
            </p>
            <select className="cursor-pointer border-none bg-transparent text-sm font-semibold text-slate-700 focus:ring-0 dark:text-slate-300">
              <option>Latest Created</option>
              <option>Stock: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <TableContainer>
          <Table>
            <TableHeader>
              <TableRow className="border-b border-slate-200 dark:border-slate-800">
                <TableHead className="w-16 text-center">
                  <input
                    type="checkbox"
                    className="rounded border-slate-300 text-primary focus:ring-primary"
                  />
                </TableHead>
                <TableHead className="min-w-[280px] uppercase tracking-widest">
                  Product Information
                </TableHead>
                <TableHead className="hidden uppercase tracking-widest lg:table-cell">
                  SKU
                </TableHead>
                <TableHead className="uppercase tracking-widest">Category</TableHead>
                <TableHead className="uppercase tracking-widest">Financials</TableHead>
                <TableHead className="uppercase tracking-widest">Stock</TableHead>
                <TableHead className="uppercase tracking-widest">Status</TableHead>
                <TableHead className="text-right uppercase tracking-widest">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {PRODUCTS.map((product) => (
                <TableRow key={product.id} className="group">
                  <TableCell className="text-center">
                    <input
                      type="checkbox"
                      className="rounded border-slate-300 text-primary focus:ring-primary"
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-4">
                      <div className="size-12 shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-slate-100 dark:border-slate-700">
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={48}
                          height={48}
                          className={cn(
                            "h-full w-full object-cover",
                            product.status === "out_of_stock" && "opacity-60 grayscale"
                          )}
                        />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 transition-colors group-hover:text-primary dark:text-white">
                          {product.name}
                        </p>
                        <p className="mt-0.5 text-xs italic text-slate-500">
                          {product.variant}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <span className="rounded bg-slate-100 px-2 py-1 font-mono text-xs text-slate-500 dark:bg-slate-800">
                      {product.sku}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                      {product.category}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <p className="font-semibold text-slate-900 dark:text-white">
                        ${product.price.toFixed(2)}
                      </p>
                      <p className="mt-0.5 text-[10px] text-slate-400">
                        Cost: ${product.cost.toFixed(2)}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <StockCell product={product} />
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={product.status} />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-slate-400 hover:bg-primary/10 hover:text-primary"
                        title="Edit"
                      >
                        <Pencil className="size-5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-slate-400 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-950/50"
                        title="Delete"
                      >
                        <Trash2 className="size-5" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div className="flex items-center justify-between border-t border-slate-200 bg-white px-6 py-4 dark:border-slate-800 dark:bg-slate-900">
          <p className="text-sm text-slate-500">
            Showing <span className="font-semibold">1 - 4</span> of{" "}
            <span className="font-semibold">1,284</span> results
          </p>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="text-slate-400 hover:text-primary disabled:pointer-events-none disabled:opacity-30"
              disabled
            >
              <ChevronLeft className="size-5" />
            </Button>
            <button className="flex size-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-white">
              1
            </button>
            <button className="flex size-8 items-center justify-center rounded-lg text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800">
              2
            </button>
            <button className="flex size-8 items-center justify-center rounded-lg text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800">
              3
            </button>
            <span className="mx-1 text-slate-400">...</span>
            <button className="flex size-8 items-center justify-center rounded-lg text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800">
              321
            </button>
            <Button
              variant="ghost"
              size="icon"
              className="text-slate-400 hover:text-primary"
            >
              <ChevronRight className="size-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
