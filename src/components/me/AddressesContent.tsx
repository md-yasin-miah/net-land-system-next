"use client";

import { useState } from "react";
import { useAppSelector } from "@/store/hooks";
import { Plus, Pencil, Trash2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const MOCK_ADDRESSES = [
  {
    id: "1",
    type: "Default Shipping",
    tag: "Home",
    name: "Alex Johnson",
    lines: [
      "123 Maple Street, Apartment 4B",
      "Springfield, IL 62704",
      "United States",
    ],
    isDefault: true,
  },
  {
    id: "2",
    type: "Billing Only",
    tag: "Work",
    name: "Alex Johnson",
    lines: ["900 North Michigan Avenue", "Chicago, IL 60611", "United States"],
    isDefault: false,
  },
];

export default function AddressesContent() {
  const user = useAppSelector((s) => s.auth.user);
  const displayEmail = user?.email ?? "alex.johnson@example.com";
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div className="p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Accounts & Addresses
        </h1>
        <p className="mt-2 text-slate-500 dark:text-slate-400">
          Update your personal details and manage where your items are
          delivered.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Left: Address Book */}
        <div className="space-y-6 lg:col-span-2">
          <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 p-6 dark:border-slate-800">
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                  Address Book
                </h2>
                <p className="text-sm text-slate-500">
                  Manage your shipping and billing locations
                </p>
              </div>
              <Button className="gap-2 shadow-sm">
                <Plus className="size-4" />
                Add New Address
              </Button>
            </div>
            <div className="space-y-4 p-6">
              {MOCK_ADDRESSES.map((addr) => (
                <div
                  key={addr.id}
                  className={`flex flex-col gap-5 rounded-xl border p-5 md:flex-row md:items-start ${
                    addr.isDefault
                      ? "border-slate-200 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-800/30"
                      : "border-slate-200 dark:border-slate-800"
                  }`}
                >
                  <div className="min-w-0 flex-1">
                    <div className="mb-2 flex items-center gap-2">
                      <span
                        className={`rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                          addr.isDefault
                            ? "bg-primary/10 text-primary"
                            : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                        }`}
                      >
                        {addr.type}
                      </span>
                      <span className="text-xs font-medium text-slate-400">
                        {addr.tag}
                      </span>
                    </div>
                    <h3 className="font-bold text-slate-900 dark:text-white">
                      {addr.name}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                      {addr.lines.join("\n")}
                    </p>
                  </div>
                  <div className="relative h-24 w-full shrink-0 overflow-hidden rounded-lg bg-slate-200 dark:bg-slate-700 md:h-28 md:w-36">
                    <iframe
                      title={`Map for ${addr.lines.join(", ")}`}
                      src={`https://www.google.com/maps?q=${encodeURIComponent(addr.lines.join(", "))}&output=embed&z=15`}
                      className="absolute inset-0 h-full w-full border-0"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      allowFullScreen
                    />
                  </div>
                  <div className="flex w-full flex-wrap gap-2 md:w-auto md:flex-col">
                    <Button variant="outline" size="sm">
                      <Pencil className="size-3.5!" />
                      Edit
                    </Button>
                    <Button variant="danger" size="sm">
                      <Trash2 className="size-3.5!" />
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right: Account Security + 2FA */}
        <div className="space-y-6">
          <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="border-b border-slate-100 p-6 dark:border-slate-800">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Account Security
              </h2>
              <p className="text-sm text-slate-500">Manage your credentials</p>
            </div>
            <div className="space-y-5 p-6">
              <div>
                <Label className="mb-2 block text-xs font-bold uppercase tracking-widest text-slate-500">
                  Email Address
                </Label>
                <div className="flex items-center gap-2">
                  <div className="flex-1 truncate rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400">
                    {displayEmail}
                  </div>
                  <Button variant="link" className="shrink-0 px-2 font-bold">
                    Change
                  </Button>
                </div>
              </div>
              <div className="border-t border-slate-100 pt-4 dark:border-slate-800">
                <h3 className="mb-4 text-sm font-bold">Update Password</h3>
                <div className="space-y-3">
                  <div>
                    <Label className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-400">
                      Current Password
                    </Label>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <Label className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-400">
                      New Password
                    </Label>
                    <Input
                      type="password"
                      placeholder="Min. 8 characters"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <Label className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-400">
                      Confirm New Password
                    </Label>
                    <Input
                      type="password"
                      placeholder="Repeat new password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full"
                    />
                  </div>
                </div>
                <Button
                  variant="secondary"
                  className="mt-6 w-full border-primary/20 bg-primary/10 font-bold hover:bg-primary hover:text-white"
                >
                  Update Password
                </Button>
              </div>
            </div>
          </section>

          <div className="relative overflow-hidden rounded-xl bg-blue-600 p-6 text-white shadow-lg">
            <div className="relative z-10">
              <h3 className="mb-2 text-lg font-bold">Two-Factor Auth</h3>
              <p className="mb-4 text-sm leading-relaxed text-blue-100">
                Add an extra layer of security to your account by enabling 2FA.
              </p>
              <Button
                variant="secondary"
                size="sm"
                className="bg-white text-blue-600 hover:bg-blue-50"
              >
                Setup Now
              </Button>
            </div>
            <ShieldCheck className="absolute -bottom-4 -right-4 size-32 text-blue-500/30 transition-transform duration-500 group-hover:rotate-0" />
          </div>
        </div>
      </div>
    </div>
  );
}
