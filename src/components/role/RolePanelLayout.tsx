"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import {
  Search,
  Bell,
  MessageCircle,
  HeadphonesIcon,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { RoleSidebarNav, roleSidebarNav, RoleSidebarNavItem } from "@/lib/menu";



export default function RolePanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const pathname = usePathname();
  const role = (params?.role as string) ?? "admin";
  const base = `/${role}`;

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased">
      {/* Sidebar */}
      <aside className="flex h-full w-64 shrink-0 flex-col overflow-y-auto border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center gap-3 border-b border-slate-100 p-5 dark:border-slate-800">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-white font-bold text-sm">
            NL
          </div>
          <div>
            <h1 className="text-sm font-bold uppercase tracking-tight text-slate-900 dark:text-white">
              NetCorp ERP
            </h1>
            <p className="text-[10px] font-medium tracking-widest text-slate-500">
              PROCUREMENT PRO
            </p>
          </div>
        </div>
        <nav className="flex-1 space-y-0.5 py-4">
          {roleSidebarNav.map((section: RoleSidebarNav) => (
            <div key={section.label} className="px-3 pb-2">
              <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                {section.label}
              </p>
              {section.items.map((item: RoleSidebarNavItem) => {
                const href = `${base}/${item.href}`;
                const isActive =
                  pathname === href || pathname.startsWith(`${href}/`);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-primary/10 text-primary shadow-sm border-r-[3px] border-primary"
                        : "text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800"
                    )}
                  >
                    <Icon className="size-5 shrink-0" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>
        <div className="border-t border-slate-100 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-full bg-primary/20 text-primary">
              <HeadphonesIcon className="size-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800 dark:text-white">
                Help Center
              </p>
              <p className="text-[10px] text-slate-500">v2.4.1 Enterprise</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex flex-1 flex-col overflow-hidden">
        <header className="z-10 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-8 dark:border-slate-800 dark:bg-slate-900">
          <div className="w-full max-w-xl">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" />
              <input
                type="search"
                placeholder="Search POs, Suppliers, or SKUs..."
                className="block w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-10 pr-3 text-sm transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-400"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="size-5 text-slate-500" />
              <span className="absolute right-2 top-2 size-2 rounded-full border-2 border-white bg-red-500 dark:border-slate-900" />
            </Button>
            <Button variant="ghost" size="icon">
              <MessageCircle className="size-5 text-slate-500" />
            </Button>
            <div className="mx-1 h-8 w-px bg-slate-200 dark:bg-slate-700" />
            <button
              type="button"
              className="flex items-center gap-2 rounded-lg p-1 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              <div className="flex size-8 items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-primary/20 font-bold text-primary dark:border-slate-700">
                AS
              </div>
              <div className="hidden text-left md:block">
                <p className="text-xs font-bold leading-tight text-slate-800 dark:text-white">
                  Alex Sterling
                </p>
                <p className="text-[10px] leading-tight text-slate-500">
                  Procurement Manager
                </p>
              </div>
              <ChevronDown className="size-5 text-slate-400" />
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8">{children}</div>
      </main>
    </div>
  );
}
