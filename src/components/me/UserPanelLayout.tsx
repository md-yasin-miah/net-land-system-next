"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Search, Bell, HelpCircle, LogOut } from "lucide-react";
import { Routes } from "@/lib/routes";
import { cn } from "@/lib/utils";
import { userSidebarNav, userSidebarSettings } from "@/lib/menu";
import Image from "next/image";
import { useTheme } from "../theme-provider";
import { ThemeToggle } from "../theme-toggle";
import { Button } from "../ui/button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { logout } from "@/store/authSlice";
import { toast } from "sonner";

export default function UserPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { theme } = useTheme();
  const router = useRouter();
  const user = useAppSelector((s) => s.auth.user);
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logout());
    router.push(Routes.home);
  };
  useEffect(() => {
    if (!user) {
      router.push(Routes.home);
    }
    if (user?.role !== "customer") {
      toast.error("You are not authorized to access this page.");
      router.back();
    }
  }, [user, router]);
  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-50 flex h-full w-64 flex-col border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center gap-3 p-6">
          <Link href={Routes.home}>
            <Image
              src={theme === "light" ? "/logo-black.png" : "/logo-white.png"}
              alt="Net Land System Logo"
              width={150}
              height={100}
            />
          </Link>
        </div>
        <nav className="flex-1 space-y-1 px-4 py-2">
          {userSidebarNav.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800",
                )}
              >
                <Icon className="size-5 shrink-0" />
                {item.label}
              </Link>
            );
          })}
          <div className="pb-2 pt-4">
            <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Settings
            </p>
          </div>
          {userSidebarSettings.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800",
                )}
              >
                <Icon className="size-5 shrink-0" />
                {item.label}
              </Link>
            );
          })}
          <div className="pb-2 pt-4">
            <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Auth
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-800 w-full cursor-pointer"
          >
            <LogOut className="size-5 shrink-0" />
            Logout
          </button>
        </nav>
        <div className="border-t border-slate-200 p-4 dark:border-slate-800">
          <Link
            href={Routes.me.profile}
            className="flex items-center gap-3 rounded-xl bg-slate-50 p-2 dark:bg-slate-800/50"
          >
            <div className="flex size-9 items-center justify-center overflow-hidden rounded-full bg-primary/20 font-bold text-primary">
              <Avatar>
                <AvatarImage src={user?.avatar} />
                <AvatarFallback className="bg-transparent border border-white/20 text-primary">
                  {user?.name?.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-bold text-slate-900 dark:text-white">
                {user?.name}
              </p>
              <p className="truncate text-[10px] text-slate-500">
                {user?.email}
              </p>
            </div>
          </Link>
        </div>
      </aside>

      {/* Main */}
      <main className="flex min-h-screen flex-1 flex-col pl-64">
        {/* Top Bar */}
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-slate-200 bg-white/80 px-8 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
              <input
                type="search"
                placeholder="Search orders, tickets, or hardware..."
                className="w-80 rounded-lg border-none bg-slate-100 py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-400"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button variant="outline" size="icon" className="relative">
              <Bell className="size-5" />
              <span className="absolute right-2 top-2 size-2 rounded-full border-2 border-white bg-red-500 dark:border-slate-900" />
            </Button>
            <Button variant="outline" size="icon">
              <HelpCircle className="size-5" />
            </Button>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1">{children}</div>
      </main>
    </div>
  );
}
