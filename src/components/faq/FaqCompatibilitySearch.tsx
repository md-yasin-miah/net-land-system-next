"use client";

import { useState } from "react";
import { Database } from "lucide-react";
import { cn } from "@/lib/utils";

export default function FaqCompatibilitySearch() {
  const [value, setValue] = useState("");

  return (
    <div>
      <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-2 ml-1">
        Compatibility Search
      </label>
      <div className="flex items-stretch rounded-lg shadow-sm border-2 border-primary/20 focus-within:border-primary transition-all overflow-hidden bg-white dark:bg-slate-900">
        <div className="flex items-center justify-center pl-4 pr-2 text-slate-400">
          <Database className="size-5" />
        </div>
        <input
          type="search"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search by model number (e.g. C9200L)..."
          className="flex-1 py-3 px-2 border-none focus:ring-0 focus:outline-none text-slate-900 dark:text-white bg-transparent text-base font-medium placeholder:text-slate-400 placeholder:font-normal"
        />
        <button
          type="button"
          className="bg-primary text-white px-6 font-bold text-sm uppercase tracking-wide hover:bg-primary/90 transition-colors"
        >
          Search
        </button>
      </div>
    </div>
  );
}
