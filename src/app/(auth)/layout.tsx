"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { Routes } from "@/lib/routes";
import Image from "next/image";
import { useTheme } from "@/components/theme-provider";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme } = useTheme();
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4 py-8 dark:bg-slate-950 sm:px-6 lg:px-8">
      {/* Theme toggle - top right */}
      <div className="absolute right-4 top-4 sm:right-6 sm:top-6">
        <ThemeToggle />
      </div>

      {/* Back to home */}
      <Link
        href={Routes.home}
        className="absolute left-4 top-4 text-sm font-medium text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-primary sm:left-6 sm:top-6"
      >
        ← Home
      </Link>

      {/* Logo */}
      <Link
        href={Routes.home}
        className="mb-8 flex items-center gap-3 sm:mb-10"
      >
        <Image
          src={theme === "light" ? "/logo-black.png" : "/logo-white.png"}
          alt="Net Land System Logo"
          width={200}
          height={150}
        />
      </Link>

      {/* Card */}
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
        {children}
      </div>

      <p className="mt-8 text-center text-xs text-slate-500 dark:text-slate-400">
        © Net Land System. All rights reserved.
      </p>
    </div>
  );
}
