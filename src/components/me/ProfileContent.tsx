"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ChevronRight,
  Bell,
  User,
  Pencil,
  Calendar,
  Info,
  Lock,
  ShieldCheck,
} from "lucide-react";
import { useAppSelector } from "@/store/hooks";
import { Button } from "@/components/ui/button";
import { Routes } from "@/lib/routes";

const NOTIFICATION_OPTIONS = [
  {
    id: "order-updates",
    label: "Order Updates",
    description: "Receive alerts about order status",
    defaultChecked: true,
  },
  {
    id: "marketing",
    label: "Marketing Emails",
    description: "Product news and weekly digests",
    defaultChecked: false,
  },
  {
    id: "security",
    label: "Security Alerts",
    description: "Login attempts and account changes",
    defaultChecked: true,
  },
];

export default function ProfileContent() {
  const user = useAppSelector((s) => s.auth.user);
  const displayName = user?.name ?? "Alex Johnson";
  const displayEmail = user?.email ?? "alex.johnson@globalcorp.com";
  const roleLabel = user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : "Senior Project Manager";

  return (
    <div className="space-y-8 p-8">
      {/* Profile Header Card */}
      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-6">
            <div className="relative group">
              <div className="flex size-24 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-slate-100 shadow-lg dark:border-slate-900 dark:bg-slate-800">
                {user?.avatar ? (
                  <Image
                    src={user.avatar}
                    alt=""
                    width={96}
                    height={96}
                    className="size-full object-cover"
                  />
                ) : (
                  <User className="size-12 text-slate-400" />
                )}
              </div>
              <button
                type="button"
                className="absolute bottom-0 right-0 rounded-full border-2 border-white bg-primary p-1.5 shadow-md transition-transform hover:scale-105 dark:border-slate-900"
                aria-label="Edit photo"
              >
                <Pencil className="size-3 text-white" />
              </button>
            </div>
            <div className="space-y-1">
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                {displayName}
              </h1>
              <p className="font-medium text-primary">{roleLabel}</p>
              <p className="flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400">
                <Calendar className="size-4" />
                Member since January 2023
              </p>
            </div>
          </div>
          <Button className="w-fit gap-2 shadow-md active:scale-95">
            <Pencil className="size-4" />
            Edit Profile
          </Button>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Personal Information */}
        <div className="space-y-6 lg:col-span-2">
          <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50/50 px-6 py-4 dark:border-slate-800 dark:bg-slate-800/50">
              <h2 className="text-lg font-bold">Personal Information</h2>
              <Info className="size-5 text-slate-400" />
            </div>
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 p-6 md:grid-cols-2">
              <div className="space-y-1">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Full Name
                </p>
                <p className="font-medium text-slate-900 dark:text-white">{displayName}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Job Title
                </p>
                <p className="font-medium text-slate-900 dark:text-white">{roleLabel}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Email Address
                </p>
                <p className="font-medium text-slate-900 dark:text-white">{displayEmail}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Phone Number
                </p>
                <p className="font-medium text-slate-900 dark:text-white">+1 (555) 123-4567</p>
              </div>
              <div className="space-y-1 md:col-span-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Company Name
                </p>
                <p className="font-medium text-slate-900 dark:text-white">Global Solutions Inc.</p>
              </div>
            </div>
          </section>
          <div className="flex items-center gap-6 px-4">
            <Link
              href={Routes.me.settings}
              className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              <Lock className="size-4" />
              Account Security
            </Link>
            <Link
              href="#"
              className="text-sm font-medium text-slate-500 transition-colors hover:text-slate-700 dark:hover:text-slate-300"
            >
              Privacy Policy
            </Link>
          </div>
        </div>

        {/* Notification Preferences + Account Status */}
        <div className="space-y-6">
          <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="border-b border-slate-200 bg-slate-50/50 px-6 py-4 dark:border-slate-800 dark:bg-slate-800/50">
              <h2 className="text-lg font-bold">Notifications</h2>
            </div>
            <div className="space-y-6 p-6">
              {NOTIFICATION_OPTIONS.map((opt) => (
                <div key={opt.id} className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <p className="text-sm font-semibold">{opt.label}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {opt.description}
                    </p>
                  </div>
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input
                      type="checkbox"
                      defaultChecked={opt.defaultChecked}
                      className="peer sr-only"
                    />
                    <div className="relative h-6 w-11 rounded-full bg-slate-200 after:absolute after:start-[2px] after:top-[2px] after:size-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-focus:outline-none dark:bg-slate-700 rtl:peer-checked:after:-translate-x-full" />
                  </label>
                </div>
              ))}
              <div className="pt-4">
                <Button variant="secondary" className="w-full border border-primary/20">
                  Save Preferences
                </Button>
              </div>
            </div>
          </section>

          <div className="rounded-xl border border-primary/20 bg-gradient-to-br from-primary/10 to-transparent p-6">
            <div className="mb-3 flex items-center gap-3">
              <ShieldCheck className="size-5 text-primary" />
              <h3 className="text-sm font-bold">Account Status</h3>
            </div>
            <p className="mb-4 text-xs text-slate-600 dark:text-slate-400">
              Your account is in good standing. 2FA is currently enabled for extra security.
            </p>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
              <div className="h-full w-[85%] rounded-full bg-primary" />
            </div>
            <p className="mt-2 text-[10px] font-bold uppercase tracking-tight text-slate-500">
              Security Score: 85%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
