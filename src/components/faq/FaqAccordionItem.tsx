"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface FaqAccordionItemProps {
  question: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export default function FaqAccordionItem({
  question,
  children,
  defaultOpen = false,
}: FaqAccordionItemProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div
      className={cn(
        "rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden",
        "bg-white dark:bg-slate-800 hover:border-primary/20 transition-colors"
      )}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-50/50 dark:hover:bg-slate-700/50 transition-colors"
      >
        <span className="font-bold text-slate-900 dark:text-white pr-4">{question}</span>
        <ChevronDown
          className={cn("size-5 shrink-0 text-primary transition-transform", open && "rotate-180")}
        />
      </button>
      {open && (
        <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-700 pt-4">
          {children}
        </div>
      )}
    </div>
  );
}
