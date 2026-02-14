"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search } from "lucide-react";
import { Routes } from "@/lib/routes";
import { cn } from "@/lib/utils";

interface FaqSearchFormProps {
  className?: string;
  placeholder?: string;
  size?: "default" | "large";
  defaultQuery?: string;
}

export default function FaqSearchForm({
  className,
  placeholder = "Search for hardware support or shipping info...",
  size = "default",
  defaultQuery = "",
}: FaqSearchFormProps) {
  const router = useRouter();
  const [query, setQuery] = useState(defaultQuery);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    if (q) router.push(`${Routes.faq.search}?q=${encodeURIComponent(q)}`);
  };

  return (
    <form onSubmit={handleSubmit} className={cn("flex", className)}>
      <div className="flex-1 flex items-center px-4">
        <Search className="size-5 text-slate-400 mr-2 shrink-0" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full border-none focus:ring-0 focus:outline-none text-slate-900 dark:text-slate-100 placeholder:text-slate-400 bg-transparent py-3"
        />
      </div>
      <button
        type="submit"
        className="bg-primary hover:bg-primary/90 text-white font-bold px-6 md:px-8 py-3 rounded-lg transition-all shadow-lg active:scale-95 shrink-0"
      >
        Search
      </button>
    </form>
  );
}
