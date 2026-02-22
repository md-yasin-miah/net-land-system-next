"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useState } from "react";
import {
  Search,
  Bell,
  MessageCircle,
  HeadphonesIcon,
  ChevronDown,
  ChevronRight,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  getRoleSidebarNav,
  RoleSidebarNav,
  RoleSidebarNavItem,
  isNestedNavItem,
} from "@/lib/menu";
import type { Role } from "@/lib/mockData";
import type { RoleSidebarNavItemGroup } from "@/lib/menu";
import Logo from "../common/Logo";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleSidebar } from "@/store/sidebarSlice";

// ─── Nested nav group ─────────────────────────────────────────────────────────

function NestedNavGroup({
  item,
  pathname,
  collapsed,
}: {
  item: RoleSidebarNavItemGroup;
  pathname: string;
  collapsed: boolean;
}) {
  const [isOpen, setIsOpen] = useState(() =>
    item.items.some(
      (sub) => pathname === sub.href || pathname.startsWith(`${sub.href}/`)
    )
  );
  const Icon = item.icon;
  const isGroupActive = item.items.some(
    (sub) => pathname === sub.href || pathname.startsWith(`${sub.href}/`)
  );

  if (collapsed) {
    return (
      <div className="relative group/nested">
        <button
          type="button"
          title={item.label}
          className={cn(
            "flex w-full items-center justify-center rounded-lg p-2.5 transition-colors",
            isGroupActive
              ? "bg-primary/10 text-primary"
              : "text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800"
          )}
        >
          <Icon className="size-5 shrink-0" />
        </button>
        {/* Flyout on hover when collapsed */}
        <div className="absolute left-full top-0 z-50 ml-2 hidden min-w-[180px] rounded-lg border border-slate-200 bg-white py-1 shadow-lg group-hover/nested:block dark:border-slate-700 dark:bg-slate-900">
          <p className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
            {item.label}
          </p>
          {item.items.map((sub) => {
            const isActive =
              pathname === sub.href || pathname.startsWith(`${sub.href}/`);
            const SubIcon = sub.icon;
            return (
              <Link
                key={sub.href}
                href={sub.href}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800"
                )}
              >
                <SubIcon className="size-4 shrink-0" />
                {sub.label}
              </Link>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-0.5">
      <button
        type="button"
        onClick={() => setIsOpen((o) => !o)}
        className={cn(
          "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
          "text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800"
        )}
      >
        <Icon className="size-5 shrink-0" />
        <span className="flex-1 text-left">{item.label}</span>
        <ChevronRight
          className={cn(
            "size-4 shrink-0 transition-transform",
            isOpen && "rotate-90"
          )}
        />
      </button>
      {isOpen && (
        <div className="ml-6 space-y-0.5 border-l border-slate-200 pl-2 dark:border-slate-700">
          {item.items.map((sub) => {
            const isActive =
              pathname === sub.href || pathname.startsWith(`${sub.href}/`);
            const SubIcon = sub.icon;
            return (
              <Link
                key={sub.href}
                href={sub.href}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary border-l-2 border-primary -ml-[2px] pl-[10px]"
                    : "text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800"
                )}
              >
                <SubIcon className="size-4 shrink-0" />
                {sub.label}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── Main layout ──────────────────────────────────────────────────────────────

export default function RolePanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const pathname = usePathname();
  const role = (params?.role as Role) ?? "admin";
  const roleSidebarNav = getRoleSidebarNav(role);

  const dispatch = useAppDispatch();
  const collapsed = useAppSelector((state) => state.sidebar.collapsed);

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 text-slate-900 antialiased dark:bg-slate-950 dark:text-slate-100">
      {/* Sidebar */}
      <aside
        className={cn(
          "flex h-full shrink-0 flex-col border-r border-slate-200 bg-white transition-all duration-300 ease-in-out dark:border-slate-800 dark:bg-slate-900",
          collapsed ? "w-[60px]" : "w-64"
        )}
      >
        {/* Logo + toggle */}
        <div
          className={cn(
            "flex shrink-0 items-center border-b border-slate-100 dark:border-slate-800",
            collapsed ? "justify-center px-0 py-3" : "justify-between px-4 py-2"
          )}
        >
          {!collapsed && (
            <div className="flex items-center gap-3 overflow-hidden">
              <Logo width={134} height={100} />
            </div>
          )}
          <button
            type="button"
            onClick={() => dispatch(toggleSidebar())}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className="flex size-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-300"
          >
            {collapsed ? (
              <PanelLeftOpen className="size-[18px]" />
            ) : (
              <PanelLeftClose className="size-[18px]" />
            )}
          </button>
        </div>

        {/* Nav */}
        <nav className="min-h-0 flex-1 space-y-0.5 overflow-y-auto py-4">
          {roleSidebarNav.map((section: RoleSidebarNav) => (
            <div key={section.label} className={cn("pb-2", collapsed ? "px-1.5" : "px-3")}>
              {!collapsed && (
                <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  {section.label}
                </p>
              )}
              {collapsed && (
                <div className="mb-1 h-px bg-slate-100 dark:bg-slate-800" />
              )}
              {section.items.map((item: RoleSidebarNavItem) => {
                if (isNestedNavItem(item)) {
                  return (
                    <NestedNavGroup
                      key={item.label}
                      item={item}
                      pathname={pathname}
                      collapsed={collapsed}
                    />
                  );
                }

                const href = item.href;
                const isActive =
                  pathname === href || pathname.startsWith(`${href}/`);
                const Icon = item.icon;

                if (collapsed) {
                  return (
                    <Link
                      key={href}
                      href={href}
                      title={item.label}
                      className={cn(
                        "flex items-center justify-center rounded-lg p-2.5 transition-colors",
                        isActive
                          ? "bg-primary/10 text-primary"
                          : "text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800"
                      )}
                    >
                      <Icon className="size-5 shrink-0" />
                    </Link>
                  );
                }

                return (
                  <Link
                    key={href}
                    href={href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "border-r-[3px] border-primary bg-primary/10 text-primary shadow-sm"
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

        {/* Footer */}
        <div
          className={cn(
            "shrink-0 border-t border-slate-100 bg-slate-50 dark:border-slate-800 dark:bg-slate-950",
            collapsed ? "p-2" : "p-4"
          )}
        >
          {collapsed ? (
            <div
              title="Help Center"
              className="flex items-center justify-center"
            >
              <div className="flex size-9 items-center justify-center rounded-full bg-primary/20 text-primary">
                <HeadphonesIcon className="size-5" />
              </div>
            </div>
          ) : (
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
          )}
        </div>
      </aside>

      {/* Main */}
      <main className="flex flex-1 flex-col overflow-hidden">
        <header className="z-10 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-8 dark:border-slate-800 dark:bg-slate-900">
          <div className="w-full max-w-xl">
            <div className="group relative">
              <Search className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-primary" />
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
