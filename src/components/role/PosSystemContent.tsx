"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Search,
  Filter,
  ShoppingCart,
  UserPlus,
  Users,
  Pencil,
  PlusCircle,
  X,
  Plus,
  Minus,
  Printer,
  Check,
  Ban,
  Wallet,
  CreditCard,
  Smartphone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  { id: "all", label: "All Products", active: true },
  { id: "electronics", label: "Electronics", active: false },
  { id: "hardware", label: "Hardware", active: false },
  { id: "networking", label: "Networking", active: false },
  { id: "cables", label: "Cables", active: false },
  { id: "services", label: "Services", active: false },
  { id: "software", label: "Software", active: false },
];

type StockStatus = "in_stock" | "low_stock" | "out_of_stock";

const PRODUCTS = [
  {
    id: "1",
    name: "Network Router AX6000",
    sku: "NET-AX-001",
    price: 120,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAhSGV8zhco_72SY1zDxUSBAdXWsUnPfZWsTFgMBuXEUd_GTn-1f0NVJpG9-GQIZ2v3MInXYboyP4XLs5o-7bDn0bKnPrrLMq9eHGHl7hShTajS7-B5HPKtjeZucDznaLPcaIBUSoB-d_MKpUet3qCpXlRxPbLEC1ByshyNaov0KAOomwnYtN-QlVUGg0L8PkuSp5pA2lD_eaSCiUtI0zxD-Ris2fSxTHaVtLca5-xZ9JNhc_nbKzWNTzi_JwibjeHqhlRltoynkRI",
    stockStatus: "in_stock" as StockStatus,
    stockQty: 14,
  },
  {
    id: "2",
    name: "Fiber Cable 10m Cat6",
    sku: "CAB-FIB-10",
    price: 15,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBBI6cejtFymEQK8TTo0qNFkbvgYJpGKzjZcsX0Hw3zRVFWGxtRZRx7pcGIvp2iRwXe6uzRMM7t2wGySPRkfu7wzJqDhPF1qxDABnFwMVBJGJ7daBA8MXCJ-tT8jSM_Mv0RUTMHNxQN_BBq1gGQrZY9WaHkwK-a1hpEhsXoMFbvOZOz8mjvZfNjMF_ptdU-4VouI2yqVPuVdDKINTUzMhrt_Zdm7pwzR71vK_C62mitA-HmIZYYOeH1i-6K2tuWbtZA3ZEwbFXyMPg",
    stockStatus: "in_stock" as StockStatus,
    stockQty: 50,
  },
  {
    id: "3",
    name: "Enterprise Server Rack 42U",
    sku: "SRV-RCK-42",
    price: 450,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAna0055WzK_gw3G4OlSiG4BRjwtLlZUI_n_PIrlVinAhc61wvXFiWMsA-Uc3mhuv4KMaKffjd1m2WhyQ1rsbbuxYIKfn8TwPEW5WpD7P8Gjk3kNUp6kjjgSgS_2-rPpDxA9jLQS1lbZqjl9qhF9xHCx6gyqJOr3xoNhfleky53PanFafE9gRsQWe7e2guf0WeN2XYOrpD9sFX3Gcif_jCuKHykCyiQEyDFFtBcdSeVaOMSoNTD4S1lq7b5cwlxhdsVg721pIQNBZc",
    stockStatus: "low_stock" as StockStatus,
    stockQty: 2,
  },
  {
    id: "4",
    name: "Managed Switch 24 Port",
    sku: "NET-SW-24M",
    price: 210,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBnlTu2PlAZD4IgZXdz8nD3ma0YuI2KSzOnmXGtOpxnIXQgAaEe2JdjmKfn43Q4B5Vsjx9Jds9rSmp4_0ekY_CPqRLxC1t5OndkqTPxoLzruXuopEK9KuSrj-q1cUiK059pNV-_tapNBTgYEoy2dfseqZD7yBbsxm6_1HjirMZ9FVuxndBQ5pGrImf7pXdnhtQCz4tJzyklKnWldO8ZKAYXNXkASz51OPW-t7gtzomkZopKw66kIDQo2WcNr-af6xZT7SOIjkzUXcM",
    stockStatus: "in_stock" as StockStatus,
    stockQty: 8,
  },
  {
    id: "5",
    name: "RJ45 Patch Panel 48P",
    sku: "NET-PP-48",
    price: 85,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCHDWovJ4ccvUSdmVRcczFMASGkALtzpGzhyyys0zHzm3zRZ9O-T6wio5IdVRBPDPbm835Pg1xK8RUHyhyuZeakgfWLWnMZTuJHYg-MoOFMDdfjn2S4O5r21Qetydtyl6EUm2ym3kAffnEo6GNlXAkUb8SZwJkAlwUt6X1PBMGEUkDCN758Hcs4gVFbihIYOi0NIWFaSekz1ze6sYyo5L6549QCvYK7idWLk3fFy_WPsr2xVD5rNM2QJDa2s0DaQfCoYKNjCYb4y7E",
    stockStatus: "in_stock" as StockStatus,
    stockQty: 22,
  },
  {
    id: "6",
    name: "Crimping Tool Set",
    sku: "TOL-CRM-01",
    price: 12,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDppXesyQywD8w2t0nsmIyZvHNObH8vzFvsdln0WNfE8TvP-gYet_Tk7jLVi8ZjC7Sc5_YetQzrorlqXRmzPa_hn0_DnCfzO5SBmvuEJ0iF3A5nA3xP_XmqsFzDRrSxqDYr7Tf_l01cgVSQKM0oMgC4zNp2yE6HnwHrF3u-iSuXObvIAPyByJD_Bxn-SWId2gtbc6YBvN7DvmQtWOPovpUoxE603AgyIyXh70yUosMqQLI2FCHZlThzEWt2Wzkg7Z6IO558wGvuCbA",
    stockStatus: "out_of_stock" as StockStatus,
    stockQty: 0,
  },
];

type CartItem = {
  id: string;
  productId: string;
  name: string;
  image: string;
  price: number;
  qty: number;
};

const TAX_RATE = 0.08;
const INITIAL_CART: CartItem[] = [
  {
    id: "c1",
    productId: "1",
    name: "Network Router AX6000",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBI4ct-oHUq5LUyUGNpIp5chMYpL9YwRWV4je0zuBp_OROXQQ7eaCCXCAAV2KHyOBndkSiSR9OuhLfK5aEu0Rgs7XSgyZFtJ0K7M1HEjTEiu8-r04gG0q8V6Khtt37MCW_kxef9Vh5-mA_Fcld2P0FcVS1hp6ZjU1IgAbVuPZv_Ggf0JoJKg5UWLsTIDg_Y4GfC1qtJixOni_xbRLY_5v5w3iq4g3JRPo75SeHVewK5OvZhqHKC_CpXIJoztgKgTefEkPINbrlO4Q8",
    price: 120,
    qty: 1,
  },
  {
    id: "c2",
    productId: "2",
    name: "Fiber Cable 10m Cat6",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAAFQ6f8AkDX8b9P5aeaR8LIDHUPJomCd-p02kgTGowachjSSptGE374lwMq3h8AVd-hgj5Gc7FeJt2U7GhiWCSnM6zMuu8GXQhftvp2eWpuLHOr0yRQBsv-dnwFDMXhprKHV-L89bNVSNrfR2Ygz4L2YLZcS8rWExIAqvkogTyYvIG9XeRfbaSudt4fr1PggE7tAp_PHyUrrCjW8x3gdvL-prC9r2hp_qyVWvicAgnq2M8R7MUewMfl32sV3kZnSjmBkPhK4ptcnk",
    price: 15,
    qty: 3,
  },
];

export default function PosSystemContent() {
  const [cart, setCart] = useState<CartItem[]>(INITIAL_CART);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "card" | "mobile">("cash");
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "short",
          day: "numeric",
        }) +
          " | " +
          now.toLocaleTimeString("en-US", { hour12: false })
      );
    };
    updateTime();
    const id = setInterval(updateTime, 1000);
    return () => clearInterval(id);
  }, []);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const taxAmount = subtotal * TAX_RATE;
  const discount = 0;
  const total = subtotal + taxAmount - discount;

  const addToCart = (product: (typeof PRODUCTS)[0]) => {
    if (product.stockStatus === "out_of_stock") return;
    const existing = cart.find((c) => c.productId === product.id);
    if (existing) {
      setCart(
        cart.map((c) =>
          c.productId === product.id
            ? { ...c, qty: Math.min(c.qty + 1, product.stockQty) }
            : c
        )
      );
    } else {
      setCart([
        ...cart,
        {
          id: `c${Date.now()}`,
          productId: product.id,
          name: product.name,
          image: product.image,
          price: product.price,
          qty: 1,
        },
      ]);
    }
  };

  const updateQty = (cartId: string, delta: number) => {
    setCart(
      cart
        .map((c) => {
          if (c.id !== cartId) return c;
          const newQty = Math.max(0, c.qty + delta);
          return { ...c, qty: newQty };
        })
        .filter((c) => c.qty > 0)
    );
  };

  const removeFromCart = (cartId: string) => {
    setCart(cart.filter((c) => c.id !== cartId));
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      {/* POS-specific top bar - compact since RolePanelLayout has header */}
      <div className="mb-4 flex items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-primary">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10">
              <ShoppingCart className="size-5 text-primary" />
            </div>
            <h1 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
              Net Land <span className="text-primary">POS</span>
            </h1>
          </div>
          <div className="h-6 w-px bg-slate-200 dark:bg-slate-700" />
          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Invoice Number
            </span>
            <span className="text-sm font-semibold text-primary">
              #INV-2023-0892
            </span>
          </div>
        </div>
      </div>

      {/* Main: Products + Cart */}
      <div className="flex min-h-0 flex-1 gap-0 overflow-hidden rounded-lg border border-slate-200 dark:border-slate-800">
        {/* Left Panel: Products */}
        <section className="flex min-w-0 flex-1 flex-col overflow-hidden bg-slate-50 dark:bg-slate-950">
          <div className="flex flex-col gap-4 border-b border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search product name, SKU or scan barcode..."
                  className="w-full rounded-lg border-none bg-slate-100 py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary dark:bg-slate-800"
                />
              </div>
              <Button
                variant="outline"
                className="flex items-center gap-2"
              >
                <Filter className="size-4" />
                Filters
              </Button>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={cn(
                    "whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-semibold transition-colors",
                    selectedCategory === cat.id
                      ? "bg-primary text-white"
                      : "border border-slate-200 bg-white text-slate-600 hover:border-primary dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                  )}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
              {PRODUCTS.map((product) => {
                const outOfStock = product.stockStatus === "out_of_stock";
                return (
                  <div
                    key={product.id}
                    className={cn(
                      "group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white transition-all dark:border-slate-800 dark:bg-slate-900",
                      outOfStock
                        ? "cursor-default opacity-75 grayscale"
                        : "cursor-pointer hover:border-primary/50 hover:shadow-lg"
                    )}
                  >
                    <div className="relative aspect-square overflow-hidden bg-slate-100">
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={200}
                        height={200}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      {outOfStock ? (
                        <div className="absolute inset-0 flex items-center justify-center bg-slate-900/40">
                          <span className="rounded bg-red-600 px-3 py-1 text-xs font-bold uppercase text-white">
                            Out of Stock
                          </span>
                        </div>
                      ) : (
                        <span
                          className={cn(
                            "absolute right-2 top-2 rounded px-2 py-1 text-[10px] font-bold uppercase text-white",
                            product.stockStatus === "low_stock"
                              ? "bg-amber-500"
                              : "bg-green-500"
                          )}
                        >
                          {product.stockStatus === "low_stock"
                            ? `Low Stock: ${product.stockQty}`
                            : `In Stock: ${product.stockQty}`}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col p-3">
                      <h3 className="mb-1 line-clamp-1 text-sm font-semibold text-slate-900 dark:text-white">
                        {product.name}
                      </h3>
                      <p className="mb-2 text-xs text-slate-500">
                        SKU: {product.sku}
                      </p>
                      <div className="mt-auto flex items-center justify-between">
                        <span
                          className={cn(
                            "text-lg font-bold",
                            outOfStock ? "text-slate-400" : "text-primary"
                          )}
                        >
                          ${product.price.toFixed(2)}
                        </span>
                        <button
                          type="button"
                          disabled={outOfStock}
                          onClick={() => addToCart(product)}
                          className={cn(
                            "flex size-8 items-center justify-center rounded-lg transition-colors",
                            outOfStock
                              ? "cursor-not-allowed bg-slate-200 text-slate-400"
                              : "bg-primary/10 text-primary hover:bg-primary hover:text-white"
                          )}
                        >
                          {outOfStock ? (
                            <Ban className="size-4" />
                          ) : (
                            <Plus className="size-4" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Right Panel: Cart */}
        <aside className="flex w-[420px] shrink-0 flex-col bg-white shadow-2xl dark:bg-slate-900">
          <div className="border-b border-slate-200 p-4 dark:border-slate-800">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">
                Current Sale
              </h2>
              <button
                type="button"
                className="flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
              >
                <UserPlus className="size-3" />
                New Customer
              </button>
            </div>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                defaultValue="Guest Customer"
                placeholder="Select customer or walk-in..."
                className="w-full rounded-lg border-none bg-slate-100 py-2 pl-10 pr-4 text-sm dark:bg-slate-800"
              />
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4">
            {cart.map((item) => (
              <div key={item.id} className="flex gap-3">
                <div className="size-14 shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-slate-100 dark:border-slate-800">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={56}
                    height={56}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex items-start justify-between">
                    <h4 className="truncate text-sm font-medium text-slate-900 dark:text-white">
                      {item.name}
                    </h4>
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      className="text-slate-400 transition-colors hover:text-red-500"
                    >
                      <X className="size-4" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => updateQty(item.id, -1)}
                        className="flex size-6 items-center justify-center rounded border border-slate-200 text-slate-500 transition-colors hover:bg-slate-50 dark:border-slate-700"
                      >
                        <Minus className="size-3" />
                      </button>
                      <span className="w-8 text-center text-sm font-semibold">
                        {item.qty}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQty(item.id, 1)}
                        className="flex size-6 items-center justify-center rounded border border-slate-200 text-slate-500 transition-colors hover:bg-slate-50 dark:border-slate-700"
                      >
                        <Plus className="size-3" />
                      </button>
                    </div>
                    <span className="text-sm font-bold">
                      ${(item.price * item.qty).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            <div className="mt-4 flex flex-1 flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 py-8 text-slate-400 dark:border-slate-800">
              <PlusCircle className="mb-2 size-8" />
              <p className="text-xs font-medium uppercase tracking-widest">
                Add more items
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4 border-t border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900/50">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-slate-500">Tax (8%)</span>
                  <Pencil className="size-3.5 text-slate-400" />
                </div>
                <span className="font-medium">${taxAmount.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-primary">
                  <span className="font-medium">Discount</span>
                  <PlusCircle className="size-3.5" />
                </div>
                <span className="font-medium text-primary">
                  -${discount.toFixed(2)}
                </span>
              </div>
              <div className="my-2 h-px bg-slate-200 dark:bg-slate-700" />
              <div className="flex items-end justify-between">
                <span className="text-base font-bold text-slate-900 dark:text-white">
                  Total Amount
                </span>
                <span className="text-3xl font-black text-primary">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="mt-2 flex flex-col gap-2">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                Select Payment Method
              </p>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "cash" as const, icon: Wallet, label: "Cash" },
                  { id: "card" as const, icon: CreditCard, label: "Card" },
                  { id: "mobile" as const, icon: Smartphone, label: "Mobile" },
                ].map((opt) => {
                  const Icon = opt.icon;
                  const isSelected = paymentMethod === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setPaymentMethod(opt.id)}
                      className={cn(
                        "flex flex-col items-center justify-center rounded-lg border-2 py-3 transition-colors",
                        isSelected
                          ? "border-primary bg-primary/5 text-primary"
                          : "border-slate-200 text-slate-500 hover:border-primary dark:border-slate-700"
                      )}
                    >
                      <Icon className="size-5" />
                      <span className="mt-1 text-[10px] font-bold uppercase">
                        {opt.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-2 flex gap-2">
              <Button
                variant="outline"
                size="icon"
                className="size-14 shrink-0"
                title="Print Receipt"
              >
                <Printer className="size-6" />
              </Button>
              <Button
                className="flex-1 gap-3 py-6 text-lg font-bold shadow-lg shadow-primary/20"
              >
                <Check className="size-6" />
                Complete Sale
              </Button>
            </div>
          </div>
        </aside>
      </div>

      {/* Bottom Status Bar */}
      <footer className="mt-4 flex h-8 items-center justify-between rounded-lg bg-slate-900 px-6 text-[11px] font-medium uppercase tracking-widest text-slate-400">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1">
            <span className="size-2 rounded-full bg-green-500" /> System Online
          </span>
          <span>Database: master_v2.04</span>
        </div>
        <div className="flex items-center gap-6">
          <span>Last Sync: 2 mins ago</span>
          <span>{currentTime || "Loading..."}</span>
        </div>
      </footer>
    </div>
  );
}
