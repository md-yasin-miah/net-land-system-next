"use client";

/**
 * Roles & Permissions Management — primary: violet-700/800
 */

import { useState } from "react";
import {
  Plus,
  Search,
  UserPlus,
  MoreVertical,
  ShieldCheck,
  Package,
  ShoppingCart,
  Wallet,
  BarChart2,
  Settings2,
  RotateCcw,
  Save,
  CheckCircle2,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// ─── Data ────────────────────────────────────────────────────────────────────

const ROLES = [
  "Senior Manager",
  "Financial Analyst",
  "Inventory Clerk",
  "Sales Representative",
  "Support Admin",
];

type Permission = {
  view: boolean;
  edit: boolean;
  delete: boolean;
  full: boolean;
};

type ModuleKey =
  | "inventory"
  | "sales"
  | "accounting"
  | "reporting"
  | "settings";

const MODULE_META: Record<
  ModuleKey,
  { label: string; icon: React.ElementType }
> = {
  inventory: { label: "Inventory Management", icon: Package },
  sales: { label: "Sales Records", icon: ShoppingCart },
  accounting: { label: "Accounting & Ledger", icon: Wallet },
  reporting: { label: "Reporting & Analytics", icon: BarChart2 },
  settings: { label: "System Settings", icon: Settings2 },
};

const DEFAULT_PERMISSIONS: Record<ModuleKey, Permission> = {
  inventory: { view: true, edit: true, delete: false, full: false },
  sales: { view: true, edit: true, delete: true, full: true },
  accounting: { view: true, edit: false, delete: false, full: false },
  reporting: { view: true, edit: false, delete: false, full: false },
  settings: { view: false, edit: false, delete: false, full: false },
};

const USERS = [
  { name: "Eleanor Shellstrop", email: "eleanor@enterprise.com", initials: "ES" },
  { name: "Chidi Anagonye", email: "chidi.a@enterprise.com", initials: "CA" },
  { name: "Tahani Al-Jamil", email: "tahani.j@enterprise.com", initials: "TA" },
  { name: "Jason Mendoza", email: "jason.m@enterprise.com", initials: "JM" },
];

// ─── Component ───────────────────────────────────────────────────────────────

export default function RolePermissionsContent() {
  const [activeRole, setActiveRole] = useState(ROLES[0]);
  const [permissions, setPermissions] =
    useState<Record<ModuleKey, Permission>>(DEFAULT_PERMISSIONS);
  const [userSearch, setUserSearch] = useState("");
  const [newRoleName, setNewRoleName] = useState("");
  const [saved, setSaved] = useState(false);

  function toggle(mod: ModuleKey, key: keyof Permission) {
    setPermissions((prev) => ({
      ...prev,
      [mod]: { ...prev[mod], [key]: !prev[mod][key] },
    }));
  }

  function reset() {
    setPermissions(DEFAULT_PERMISSIONS);
  }

  function save() {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  const filteredUsers = USERS.filter(
    (u) =>
      u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.email.toLowerCase().includes(userSearch.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
            Roles &amp; Permissions
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Configure what users can see and do within the application.
          </p>
        </div>
        <Button className="gap-2 bg-violet-700 font-bold text-white shadow-lg shadow-violet-700/20 hover:bg-violet-800">
          <Plus className="size-5" />
          Create New Role
        </Button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        {/* Left: Role Tabs + Permissions Matrix */}
        <div className="flex flex-col gap-6 xl:col-span-8">
          {/* Role Tabs */}
          <div className="flex overflow-x-auto rounded-xl border border-violet-100 bg-white p-1 dark:border-violet-900/30 dark:bg-slate-900">
            {ROLES.map((role) => (
              <button
                key={role}
                type="button"
                onClick={() => setActiveRole(role)}
                className={`min-w-[130px] flex-1 whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  activeRole === role
                    ? "border border-violet-200 bg-violet-50 font-bold text-violet-700 dark:border-violet-800 dark:bg-violet-900/30 dark:text-violet-300"
                    : "text-slate-500 hover:bg-violet-50/50 dark:text-slate-400 dark:hover:bg-violet-900/10"
                }`}
              >
                {role}
              </button>
            ))}
          </div>

          {/* Permissions Matrix */}
          <div className="overflow-hidden rounded-xl border border-violet-100 bg-white dark:border-violet-900/30 dark:bg-slate-900">
            {/* Matrix Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-violet-50 bg-white px-6 py-5 dark:border-violet-900/20 dark:bg-slate-900">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Permissions Matrix
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Define granular access levels for the{" "}
                  <span className="font-semibold text-violet-700 dark:text-violet-400">
                    {activeRole}
                  </span>{" "}
                  role.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={reset}
                  className="flex items-center gap-1.5 text-xs font-semibold text-violet-700 transition-colors hover:text-violet-800 hover:underline dark:text-violet-400"
                >
                  <RotateCcw className="size-3.5" />
                  Reset to Default
                </button>
                <Button
                  size="sm"
                  onClick={save}
                  className="gap-1.5 bg-violet-700 text-xs font-bold text-white shadow-sm hover:bg-violet-800"
                >
                  <Save className="size-3.5" />
                  Save Matrix
                </Button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-b border-violet-50 bg-violet-50/60 dark:border-violet-900/20 dark:bg-violet-900/10">
                    {["Module", "View", "Edit", "Delete", "Full Access"].map(
                      (h, i) => (
                        <th
                          key={h}
                          className={`py-4 px-6 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 ${
                            i > 0 ? "text-center" : ""
                          }`}
                        >
                          {h}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-violet-50 dark:divide-violet-900/10">
                  {(Object.keys(MODULE_META) as ModuleKey[]).map((mod) => {
                    const { label, icon: Icon } = MODULE_META[mod];
                    const perm = permissions[mod];
                    return (
                      <tr
                        key={mod}
                        className="transition-colors hover:bg-violet-50/40 dark:hover:bg-violet-900/5"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <Icon className="size-5 text-violet-400 dark:text-violet-500" />
                            <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                              {label}
                            </span>
                          </div>
                        </td>
                        {(
                          [
                            ["view", false],
                            ["edit", false],
                            ["delete", false],
                            ["full", true],
                          ] as [keyof Permission, boolean][]
                        ).map(([key, isRound]) => (
                          <td key={key} className="px-6 py-4 text-center">
                            <input
                              type="checkbox"
                              checked={perm[key]}
                              onChange={() => toggle(mod, key)}
                              style={{ accentColor: "#6d28d9" }}
                              className={`size-4 cursor-pointer border-violet-200 focus:ring-violet-500 dark:border-violet-700 ${
                                isRound ? "rounded-full" : "rounded"
                              }`}
                            />
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right: Assigned Users */}
        <div className="flex flex-col gap-6 xl:col-span-4">
          <div className="flex h-full flex-col overflow-hidden rounded-xl border border-violet-100 bg-white dark:border-violet-900/30 dark:bg-slate-900">
            {/* Users Header */}
            <div className="border-b border-violet-50 p-6 dark:border-violet-900/20">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Assigned Users
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Total of {USERS.length} users currently in this role.
              </p>
              <div className="mt-4 flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 size-[18px] -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Find user..."
                    value={userSearch}
                    onChange={(e) => setUserSearch(e.target.value)}
                    className="w-full rounded-lg border-none bg-violet-50/80 py-2 pl-9 pr-4 text-xs focus:outline-none focus:ring-2 focus:ring-violet-300 dark:bg-violet-900/20 dark:text-white dark:placeholder:text-slate-500"
                  />
                </div>
                <button
                  type="button"
                  className="flex items-center justify-center rounded-lg bg-violet-50 p-2 text-violet-700 transition-colors hover:bg-violet-100 dark:bg-violet-900/20 dark:text-violet-400"
                  aria-label="Add user"
                >
                  <UserPlus className="size-[18px]" />
                </button>
              </div>
            </div>

            {/* User List */}
            <div className="max-h-[480px] flex-1 overflow-y-auto">
              {filteredUsers.map((user, i) => (
                <div
                  key={user.email}
                  className={`flex items-center justify-between p-4 transition-colors hover:bg-violet-50/40 dark:hover:bg-violet-900/5 ${
                    i < filteredUsers.length - 1
                      ? "border-b border-violet-50 dark:border-violet-900/10"
                      : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-full bg-violet-100 text-xs font-bold text-violet-700 dark:bg-violet-900/40 dark:text-violet-300">
                      {user.initials}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800 dark:text-white">
                        {user.name}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="text-slate-400 transition-colors hover:text-violet-700 dark:hover:text-violet-400"
                    aria-label="More options"
                  >
                    <MoreVertical className="size-5" />
                  </button>
                </div>
              ))}
              {filteredUsers.length === 0 && (
                <p className="p-6 text-center text-sm text-slate-400">
                  No users found.
                </p>
              )}
            </div>

            <div className="border-t border-violet-50 bg-violet-50/30 p-4 dark:border-violet-900/20 dark:bg-violet-900/5">
              <button
                type="button"
                className="w-full text-center text-xs font-bold text-violet-700 transition-colors hover:underline dark:text-violet-400"
              >
                View All Users in System
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add Custom Role */}
      <div className="flex flex-col items-center rounded-xl border-2 border-dashed border-violet-200 bg-violet-50/40 p-8 text-center dark:border-violet-800/40 dark:bg-violet-900/10">
        <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-white shadow-sm dark:bg-slate-800">
          <ShieldCheck className="size-8 text-violet-700 dark:text-violet-400" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">
          Add a custom role
        </h3>
        <p className="mx-auto mb-6 mt-1 max-w-md text-sm text-slate-500 dark:text-slate-400">
          Need more specific access? Define a custom role with tailored
          permissions for your team members.
        </p>
        <div className="flex w-full max-w-md flex-col gap-3 sm:flex-row">
          <Input
            placeholder="Enter role name (e.g. Project Lead)"
            value={newRoleName}
            onChange={(e) => setNewRoleName(e.target.value)}
            className="flex-1 border-violet-200 focus:border-violet-500 focus:ring-violet-500/20 dark:border-violet-800"
          />
          <Button
            className="whitespace-nowrap bg-violet-700 font-bold text-white hover:bg-violet-800"
            disabled={!newRoleName.trim()}
          >
            Initialize Role
          </Button>
        </div>
      </div>

      {/* Toast */}
      {saved && (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
          <div className="flex items-center gap-4 rounded-xl bg-slate-900 px-6 py-3 shadow-2xl dark:bg-slate-800">
            <CheckCircle2 className="size-5 text-emerald-400" />
            <span className="text-sm font-medium text-white">
              All permission changes are automatically staged.
            </span>
            <button
              type="button"
              onClick={() => setSaved(false)}
              className="rounded bg-white/10 px-3 py-1 text-xs font-black uppercase tracking-widest text-violet-300 hover:bg-white/20"
            >
              Review
            </button>
            <button
              type="button"
              onClick={() => setSaved(false)}
              className="text-slate-400 hover:text-white"
              aria-label="Dismiss"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
