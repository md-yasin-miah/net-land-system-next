"use client";

import { useCallback, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Grid3X3, List } from "lucide-react";
import ProductCard from "@/components/e-commerce/ProductCard";
import ProductListItem from "./ProductListItem";
import CategorySidebar from "./CategorySidebar";
import { CATEGORY_PRODUCTS_MOCK } from "./categoryProducts";
import { cn } from "@/lib/utils";

const SORT_OPTIONS = [
  { value: "best", label: "Best Match" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "newest", label: "Newest Arrivals" },
  { value: "rating", label: "Customer Rating" },
];

const TOTAL_ITEMS = 450;
const PAGE_SIZE = 8;
const TOTAL_PAGES = Math.ceil(TOTAL_ITEMS / PAGE_SIZE);

export default function CategoryContent() {
  const [selectedBrands, setSelectedBrands] = useState<string[]>(["asus"]);
  const [pricePreset, setPricePreset] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [wifiSelected, setWifiSelected] = useState<Record<string, boolean>>({
    "Wi-Fi 6E (802.11ax)": true,
  });
  const [sort, setSort] = useState("best");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [page, setPage] = useState(1);

  const onBrandToggle = useCallback((id: string) => {
    setSelectedBrands((prev) =>
      prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]
    );
  }, []);

  const onWifiToggle = useCallback((key: string) => {
    setWifiSelected((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const onClearAll = useCallback(() => {
    setSelectedBrands([]);
    setPricePreset("");
    setPriceMin("");
    setPriceMax("");
    setWifiSelected({});
  }, []);

  const products = useMemo(() => {
    let list = CATEGORY_PRODUCTS_MOCK.map((p) => ({ ...p, inStock: true }));
    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [sort]);

  const start = (page - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  const pageProducts = products.slice(0, PAGE_SIZE);
  const showPrev = page > 1;
  const showNext = page < TOTAL_PAGES;

  return (
    <main className="max-w-[1440px] mx-auto px-4 py-4 flex gap-6">
      <CategorySidebar
        categoryName="Routers & Wireless"
        selectedBrands={selectedBrands}
        onBrandToggle={onBrandToggle}
        pricePreset={pricePreset}
        onPricePresetChange={setPricePreset}
        priceMin={priceMin}
        priceMax={priceMax}
        onPriceMinChange={setPriceMin}
        onPriceMaxChange={setPriceMax}
        wifiSelected={wifiSelected}
        onWifiToggle={onWifiToggle}
        onClearAll={onClearAll}
      />

      <div className="flex-1 min-w-0">
        <div className="mb-6">
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-1">
            Routers & Wireless
          </h1>
          <p className="text-slate-500 text-sm">
            High-performance networking for home and office. (Showing {start + 1}–
            {Math.min(end, TOTAL_ITEMS)} of {TOTAL_ITEMS} results)
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg h-12 flex items-center px-4 justify-between mb-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-500 uppercase">Sort By:</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="text-xs border-none bg-transparent focus:ring-0 cursor-pointer font-bold text-slate-900 dark:text-white"
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="h-4 w-px bg-slate-200 dark:bg-slate-700" />
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-500 uppercase">View:</span>
              <div className="flex bg-slate-100 dark:bg-slate-800 rounded p-0.5">
                <button
                  type="button"
                  onClick={() => setView("grid")}
                  className={cn(
                    "p-1.5 rounded transition-colors",
                    view === "grid"
                      ? "bg-white dark:bg-slate-700 shadow-sm text-primary"
                      : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                  )}
                  aria-label="Grid view"
                >
                  <Grid3X3 className="size-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setView("list")}
                  className={cn(
                    "p-1.5 rounded transition-colors",
                    view === "list"
                      ? "bg-white dark:bg-slate-700 shadow-sm text-primary"
                      : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                  )}
                  aria-label="List view"
                >
                  <List className="size-4" />
                </button>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={!showPrev}
              className="w-8 h-8 flex items-center justify-center rounded border border-slate-200 dark:border-slate-700 text-slate-400 cursor-not-allowed disabled:opacity-50 disabled:cursor-not-allowed enabled:cursor-pointer enabled:text-slate-600 enabled:hover:border-slate-300 enabled:hover:bg-slate-50 dark:enabled:hover:bg-slate-800"
            >
              <ChevronLeft className="size-4" />
            </button>
            {[1, 2, 3].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setPage(n)}
                className={cn(
                  "w-8 h-8 flex items-center justify-center rounded font-bold text-xs transition-colors",
                  page === n
                    ? "bg-primary text-white"
                    : "hover:bg-slate-50 dark:hover:bg-slate-800 border border-transparent text-slate-600 dark:text-slate-300"
                )}
              >
                {n}
              </button>
            ))}
            <span className="px-1 text-slate-400">...</span>
            <button
              type="button"
              onClick={() => setPage(TOTAL_PAGES)}
              className="w-8 h-8 flex items-center justify-center rounded hover:bg-slate-50 dark:hover:bg-slate-800 border border-transparent text-slate-600 dark:text-slate-300 font-bold text-xs"
            >
              {TOTAL_PAGES}
            </button>
            <button
              type="button"
              onClick={() => setPage((p) => Math.min(TOTAL_PAGES, p + 1))}
              disabled={!showNext}
              className="w-8 h-8 flex items-center justify-center rounded border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>

        <div
          className={cn(
            view === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
              : "flex flex-col gap-3"
          )}
        >
          {pageProducts.map((product) =>
            view === "list" ? (
              <ProductListItem
                key={product.id}
                {...product}
                inStock={product.inStock ?? true}
              />
            ) : (
              <ProductCard
                key={product.id}
                {...product}
                inStock={product.inStock ?? true}
              />
            )
          )}
        </div>

        <div className="mt-8 flex items-center justify-between border-t border-slate-200 dark:border-slate-800 pt-6">
          <p className="text-xs text-slate-500">
            Showing {start + 1}–{Math.min(end, TOTAL_ITEMS)} of {TOTAL_ITEMS} items
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={!showPrev}
              className="px-3 py-2 text-xs font-bold text-slate-400 border border-slate-200 dark:border-slate-700 rounded cursor-not-allowed disabled:opacity-60 enabled:text-slate-600 enabled:border-slate-300 enabled:cursor-pointer enabled:hover:bg-slate-50 dark:enabled:hover:bg-slate-800"
            >
              PREV
            </button>
            {[1, 2, 3].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setPage(n)}
                className={cn(
                  "w-8 h-8 flex items-center justify-center rounded font-bold text-xs transition-colors",
                  page === n
                    ? "bg-primary text-white"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                )}
              >
                {n}
              </button>
            ))}
            <span className="text-slate-400">...</span>
            <button
              type="button"
              onClick={() => setPage(TOTAL_PAGES)}
              className="w-8 h-8 flex items-center justify-center rounded text-slate-600 dark:text-slate-400 font-bold text-xs hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {TOTAL_PAGES}
            </button>
            <button
              type="button"
              onClick={() => setPage((p) => Math.min(TOTAL_PAGES, p + 1))}
              disabled={!showNext}
              className="px-3 py-2 text-xs font-bold text-primary border border-primary rounded hover:bg-primary hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              NEXT
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
