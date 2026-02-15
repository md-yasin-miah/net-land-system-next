"use client";

import Link from "next/link";
import { Mail, Phone, ArrowRight, BookOpen, HelpCircleIcon } from "lucide-react";
import { Routes } from "@/lib/routes";
import { cn } from "@/lib/utils";
import { faqSidebarCategories } from "@/lib/menu";

interface FaqSidebarProps {
  activeSlug?: "general" | "shipping" | "payments" | "support" | "returns";
  showSupportCard?: boolean;
  showResourcesCard?: boolean;
}

export default function FaqSidebar({
  activeSlug = "general",
  showSupportCard = true,
  showResourcesCard = true,
}: FaqSidebarProps) {
  const slugToIndex: Record<string, number> = {
    general: 0,
    shipping: 1,
    payments: 2,
    support: 3,
    returns: 4,
  };
  const activeIndex = slugToIndex[activeSlug] ?? -1;

  return (
    <aside className="hidden lg:flex w-72 flex-col gap-6 p-6 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
      <div>
        <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-4">
          Categories
        </h3>
        <nav className="flex flex-col gap-1">
          {faqSidebarCategories.map((item, i) => {
            const Icon = item.icon;
            const isActive = activeIndex === i;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                )}
              >
                <Icon className={cn("size-5 shrink-0", isActive && "text-primary")} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
      {showSupportCard && (
        <div className="mt-auto p-4 rounded-xl bg-primary/5 border border-primary/10 dark:bg-primary/10 dark:border-primary/20">
          <p className="text-sm font-bold text-primary mb-1">New Policy Update</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            We&apos;ve expanded our weekend delivery zones. Check the updated regions here.
          </p>
          <Link href={Routes.faq.shippingDelivery} className="mt-3 text-xs font-bold text-primary underline block">
            Read more
          </Link>
        </div>
      )}
      {showResourcesCard && (
        <div className="bg-slate-900 dark:bg-slate-800 rounded-xl p-6 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
          <h3 className="text-lg font-bold mb-4 relative z-10">Product Manuals</h3>
          <p className="text-slate-400 text-sm mb-6 relative z-10">
            Download technical data sheets, firmware update guides, and installation manuals.
          </p>
          <Link
            href="#"
            className="inline-flex items-center gap-2 text-primary font-bold hover:underline relative z-10"
          >
            Visit Resource Center
            <ArrowRight className="size-4" />
          </Link>
        </div>
      )}
    </aside>
  );
}

export function FaqSupportCard() {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-sm border border-slate-200 dark:border-slate-700">
      <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
        <HelpCircleIcon className="size-6 text-primary" />
      </div>
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Still need help?</h3>
      <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">
        Our technical engineering team is available for hardware support.
      </p>
      <div className="space-y-4">
        <a
          href="mailto:support@netland.com.bd"
          className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-900/50 hover:bg-primary/5 hover:text-primary transition-all group"
        >
          <Mail className="size-5 text-slate-400 group-hover:text-primary" />
          <span className="text-sm font-medium">support@netland.com.bd</span>
        </a>
        <a
          href="tel:+8801712345678"
          className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-900/50 hover:bg-primary/5 hover:text-primary transition-all group"
        >
          <Phone className="size-5 text-slate-400 group-hover:text-primary" />
          <span className="text-sm font-medium">+880 1712-345678</span>
        </a>
        <Link
          href="/support"
          className="block w-full bg-primary text-white font-bold py-3 rounded-lg shadow-md hover:bg-primary/90 transition-colors text-center text-sm"
        >
          Submit RMA Ticket
        </Link>
      </div>
    </div>
  );
}
