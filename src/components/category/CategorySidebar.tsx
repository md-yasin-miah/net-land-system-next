"use client";

import Link from "next/link";
import { ChevronRight, Play } from "lucide-react";
import { cn } from "@/lib/utils";

const BRANDS = [
  { id: "asus", label: "ASUS", count: 124 },
  { id: "tp-link", label: "TP-Link", count: 98 },
  { id: "netgear", label: "Netgear", count: 64 },
  { id: "ubiquiti", label: "Ubiquiti", count: 42 },
];

const PRICE_PRESETS = [
  { id: "under50", label: "Under ৳5,000" },
  { id: "50-100", label: "৳5,000 - ৳10,000" },
  { id: "100-200", label: "৳10,000 - ৳20,000" },
  { id: "200+", label: "৳20,000+" },
];

const WIFI_STANDARDS = [
  "Wi-Fi 7 (802.11be)",
  "Wi-Fi 6E (802.11ax)",
  "Wi-Fi 6",
  "Wi-Fi 5 (802.11ac)",
];

interface CategorySidebarProps {
  categoryName: string;
  parentCategory?: string;
  parentHref?: string;
  brands?: { id: string; label: string; count: number }[];
  selectedBrands: string[];
  onBrandToggle: (id: string) => void;
  pricePreset: string;
  onPricePresetChange: (id: string) => void;
  priceMin: string;
  priceMax: string;
  onPriceMinChange: (v: string) => void;
  onPriceMaxChange: (v: string) => void;
  wifiSelected: Record<string, boolean>;
  onWifiToggle: (key: string) => void;
  onClearAll: () => void;
}

export default function CategorySidebar({
  categoryName,
  parentCategory = "Networking",
  parentHref = "/categories",
  brands = BRANDS,
  selectedBrands,
  onBrandToggle,
  pricePreset,
  onPricePresetChange,
  priceMin,
  priceMax,
  onPriceMinChange,
  onPriceMaxChange,
  wifiSelected,
  onWifiToggle,
  onClearAll,
}: CategorySidebarProps) {
  return (
    <aside className="w-64 shrink-0 flex flex-col gap-6">
      <nav className="text-[11px] text-slate-500 flex items-center gap-1 flex-wrap">
        <Link href="/" className="hover:underline">
          Home
        </Link>
        <ChevronRight className="size-3 text-slate-400" />
        <Link href={parentHref} className="hover:underline">
          {parentCategory}
        </Link>
        <ChevronRight className="size-3 text-slate-400" />
        <span className="text-slate-900 dark:text-white font-medium">{categoryName}</span>
      </nav>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden">
        <div className="p-4 border-b border-slate-100 dark:border-slate-800">
          <h2 className="font-bold text-sm text-slate-900 dark:text-white flex items-center justify-between">
            Filters
            <button
              type="button"
              onClick={onClearAll}
              className="text-xs text-primary font-normal hover:underline"
            >
              Clear All
            </button>
          </h2>
        </div>

        <div className="p-4 border-b border-slate-100 dark:border-slate-800">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Brand</h3>
          <div className="space-y-2">
            {brands.map((b) => (
              <label
                key={b.id}
                className="flex items-center gap-2 text-sm cursor-pointer hover:text-primary transition-colors text-slate-700 dark:text-slate-300"
              >
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(b.id)}
                  onChange={() => onBrandToggle(b.id)}
                  className="rounded border-slate-300 text-primary focus:ring-primary w-4 h-4"
                />
                {b.label} <span className="text-slate-400 text-xs">({b.count})</span>
              </label>
            ))}
          </div>
        </div>

        <div className="p-4 border-b border-slate-100 dark:border-slate-800">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            Price Range
          </h3>
          <div className="flex items-center gap-2 mb-4">
            <div className="relative flex-1">
              <span className="absolute left-2 top-1.5 text-xs text-slate-400">৳</span>
              <input
                type="text"
                value={priceMin}
                onChange={(e) => onPriceMinChange(e.target.value)}
                placeholder="Min"
                className="w-full pl-7 pr-2 py-1.5 text-sm border border-slate-300 dark:border-slate-600 dark:bg-slate-800 rounded focus:ring-1 focus:ring-primary focus:border-primary outline-none"
              />
            </div>
            <span className="text-slate-400 text-xs">to</span>
            <div className="relative flex-1">
              <span className="absolute left-2 top-1.5 text-xs text-slate-400">৳</span>
              <input
                type="text"
                value={priceMax}
                onChange={(e) => onPriceMaxChange(e.target.value)}
                placeholder="Max"
                className="w-full pl-7 pr-2 py-1.5 text-sm border border-slate-300 dark:border-slate-600 dark:bg-slate-800 rounded focus:ring-1 focus:ring-primary focus:border-primary outline-none"
              />
            </div>
            <button
              type="button"
              className="bg-slate-100 dark:bg-slate-800 p-1.5 rounded hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              aria-label="Apply price filter"
            >
              <Play className="size-4 text-slate-600 dark:text-slate-400" />
            </button>
          </div>
          <div className="space-y-2">
            {PRICE_PRESETS.map((p) => (
              <label
                key={p.id}
                className="flex items-center gap-2 text-xs cursor-pointer hover:text-primary text-slate-600 dark:text-slate-400"
              >
                <input
                  type="radio"
                  name="price"
                  checked={pricePreset === p.id}
                  onChange={() => onPricePresetChange(p.id)}
                  className="text-primary focus:ring-primary w-3 h-3"
                />
                {p.label}
              </label>
            ))}
          </div>
        </div>

        <div className="p-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            Wi-Fi Standard
          </h3>
          <div className="space-y-2">
            {WIFI_STANDARDS.map((w) => (
              <label
                key={w}
                className="flex items-center gap-2 text-sm cursor-pointer hover:text-primary transition-colors text-slate-700 dark:text-slate-300"
              >
                <input
                  type="checkbox"
                  checked={wifiSelected[w] ?? false}
                  onChange={() => onWifiToggle(w)}
                  className="rounded border-slate-300 text-primary focus:ring-primary w-4 h-4"
                />
                {w}
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-lg overflow-hidden bg-linear-to-br from-primary to-blue-700 p-4 text-white shadow-lg">
        <p className="text-[10px] font-bold uppercase tracking-widest opacity-80 mb-1">
          Featured Offer
        </p>
        <h4 className="font-bold text-base leading-tight mb-2">Upgrade to Wi-Fi 7</h4>
        <p className="text-xs opacity-90 mb-4">
          Experience speeds up to 46Gbps with our latest arrivals.
        </p>
        <Link
          href="/?feature=wifi7"
          className="block w-full bg-white text-primary font-bold py-2 rounded text-xs hover:bg-slate-100 transition-colors text-center"
        >
          Shop Now
        </Link>
      </div>
    </aside>
  );
}
