"use client";

/**
 * Shared Email Template Editor shell.
 * Receives template-specific content as a prop.
 */

import { useState } from "react";
import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  List,
  Link,
  Image,
  Monitor,
  Smartphone,
  Send,
  Save,
  Settings,
  ChevronRight,
  Search,
  Plus,
  Receipt,
  Truck,
  UserPlus,
  KeyRound,
  ShoppingCartIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { Routes } from "@/lib/routes";
import type { Role } from "@/lib/mockData";

// ─── Template list ────────────────────────────────────────────────────────────

const TEMPLATES = [
  {
    key: "orders-confirmation",
    label: "Order Confirmation",
    icon: Receipt,
    lastEdited: "2h ago",
  },
  {
    key: "shipping-update",
    label: "Shipping Update",
    icon: Truck,
    lastEdited: "1d ago",
  },
  {
    key: "welcome-email",
    label: "Welcome Email",
    icon: UserPlus,
    lastEdited: "3d ago",
  },
  {
    key: "password-reset",
    label: "Password Reset",
    icon: KeyRound,
    lastEdited: "1w ago",
  },
  {
    key: "abandoned-cart",
    label: "Abandoned Cart",
    icon: ShoppingCartIcon,
    lastEdited: "2w ago",
  },
];

// ─── Variable groups ──────────────────────────────────────────────────────────

const VARIABLE_GROUPS = [
  {
    label: "Customer Data",
    vars: ["{customer_name}", "{customer_email}", "{customer_id}"],
  },
  {
    label: "Order Data",
    vars: [
      "{order_id}",
      "{order_total}",
      "{order_date}",
      "{shipping_address}",
      "{billing_address}",
      "{tracking_number}",
    ],
  },
  {
    label: "Store Data",
    vars: [
      "{store_name}",
      "{support_link}",
      "{store_logo_url}",
      "{unsubscribe_link}",
    ],
  },
];

// ─── Props ────────────────────────────────────────────────────────────────────

export interface EmailTemplateEditorProps {
  /** The slug of the current template, e.g. "orders-confirmation" */
  templateKey: string;
  /** Subject line default */
  defaultSubject: string;
  /** The editable email body JSX */
  children: React.ReactNode;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function EmailTemplateEditor({
  templateKey,
  defaultSubject,
  children,
}: EmailTemplateEditorProps) {
  const params = useParams();
  const router = useRouter();
  const role = (params?.role as Role) ?? "admin";
  const r = Routes.role(role);

  const [subject, setSubject] = useState(defaultSubject);
  const [viewMode, setViewMode] = useState<"visual" | "html">("visual");
  const [search, setSearch] = useState("");
  const [saved, setSaved] = useState(false);

  const filteredTemplates = TEMPLATES.filter((t) =>
    t.label.toLowerCase().includes(search.toLowerCase()),
  );

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  function copyVariable(v: string) {
    navigator.clipboard.writeText(v).catch(() => {});
  }

  function navigateTo(key: string) {
    router.push(`/${role}/settings/email-templates/${key}`);
  }

  return (
    <div className="-m-8 flex h-[calc(100vh-4rem)] flex-col overflow-hidden">
      {/* Top bar */}
      <header className="flex h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-6 dark:border-slate-800 dark:bg-slate-900">
        <h1 className="text-base font-semibold text-slate-800 dark:text-slate-200">
          Email Notification Editor
        </h1>
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            className="gap-2 text-slate-600 dark:text-slate-300"
          >
            <Send className="size-[18px]" />
            Send Test Email
          </Button>
          <Button
            onClick={handleSave}
            className="gap-2 bg-primary font-bold text-white shadow-sm hover:bg-primary/90"
          >
            <Save className="size-[18px]" />
            {saved ? "Saved!" : "Save Changes"}
          </Button>
        </div>
      </header>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left sidebar: template list */}
        <aside className="flex w-72 shrink-0 flex-col border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
          <div className="border-b border-slate-100 p-4 dark:border-slate-800">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 size-[18px] -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search templates..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-10 pr-4 text-sm transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>
          </div>

          <div className="flex-1 space-y-1 overflow-y-auto p-2">
            {filteredTemplates.map((t) => {
              const Icon = t.icon;
              const isActive = t.key === templateKey;
              return (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => navigateTo(t.key)}
                  className={`flex w-full cursor-pointer items-center gap-3 rounded-xl p-3 text-left transition-colors ${
                    isActive
                      ? "border border-primary/10 bg-primary/5"
                      : "hover:bg-slate-50 dark:hover:bg-slate-800"
                  }`}
                >
                  <div
                    className={`flex size-10 items-center justify-center rounded-lg ${
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-400"
                    }`}
                  >
                    <Icon className="size-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p
                      className={`truncate text-sm ${
                        isActive
                          ? "font-semibold text-slate-900 dark:text-white"
                          : "font-medium text-slate-700 dark:text-slate-300"
                      }`}
                    >
                      {t.label}
                    </p>
                    <p className="truncate text-[11px] text-slate-500">
                      Last edited {t.lastEdited}
                    </p>
                  </div>
                  {isActive && (
                    <div className="size-2 shrink-0 rounded-full bg-primary" />
                  )}
                </button>
              );
            })}
          </div>

          <div className="border-t border-slate-100 p-4 dark:border-slate-800">
            <button
              type="button"
              className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-slate-200 px-4 py-2 text-sm font-semibold text-slate-500 transition-all hover:border-primary hover:text-primary dark:border-slate-700"
            >
              <Plus className="size-5" />
              New Template
            </button>
          </div>
        </aside>

        {/* Main editor */}
        <main className="flex flex-1 flex-col overflow-hidden bg-slate-50 dark:bg-slate-950">
          {/* Toolbar */}
          <div className="flex h-12 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center gap-1">
              {[
                { icon: Bold, label: "Bold" },
                { icon: Italic, label: "Italic" },
                { icon: Underline, label: "Underline" },
              ].map(({ icon: Icon, label }) => (
                <button
                  key={label}
                  type="button"
                  title={label}
                  className="rounded p-1.5 text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
                >
                  <Icon className="size-[18px]" />
                </button>
              ))}
              <div className="mx-1 h-4 w-px bg-slate-200 dark:bg-slate-700" />
              {[
                { icon: AlignLeft, label: "Align Left" },
                { icon: AlignCenter, label: "Align Center" },
                { icon: List, label: "List" },
              ].map(({ icon: Icon, label }) => (
                <button
                  key={label}
                  type="button"
                  title={label}
                  className="rounded p-1.5 text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
                >
                  <Icon className="size-[18px]" />
                </button>
              ))}
              <div className="mx-1 h-4 w-px bg-slate-200 dark:bg-slate-700" />
              {[
                { icon: Link, label: "Link" },
                { icon: Image, label: "Image" },
              ].map(({ icon: Icon, label }) => (
                <button
                  key={label}
                  type="button"
                  title={label}
                  className="rounded p-1.5 text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
                >
                  <Icon className="size-[18px]" />
                </button>
              ))}
            </div>

            {/* Visual / HTML toggle */}
            <div className="flex items-center gap-2 rounded-lg bg-slate-100 p-1 dark:bg-slate-800">
              {(["visual", "html"] as const).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setViewMode(mode)}
                  className={`rounded-md px-3 py-1 text-xs font-bold capitalize transition-colors ${
                    viewMode === mode
                      ? "bg-white text-primary shadow-sm dark:bg-slate-700 dark:text-primary"
                      : "text-slate-500 hover:text-slate-700 dark:text-slate-400"
                  }`}
                >
                  {mode === "visual" ? "Visual" : "HTML Code"}
                </button>
              ))}
            </div>

            {/* Viewport toggle */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                title="Desktop View"
                className="rounded p-1.5 text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
              >
                <Monitor className="size-[18px]" />
              </button>
              <button
                type="button"
                title="Mobile View"
                className="rounded p-1.5 text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
              >
                <Smartphone className="size-[18px]" />
              </button>
            </div>
          </div>

          {/* Canvas */}
          <div className="flex flex-1 justify-center overflow-y-auto p-8">
            <div className="flex min-h-[800px] w-full max-w-2xl flex-col rounded-xl border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-900">
              {/* Subject */}
              <div className="flex items-center gap-4 border-b border-slate-50 p-6 text-sm dark:border-slate-800">
                <span className="w-16 font-medium text-slate-400">
                  Subject:
                </span>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="flex-1 border-none bg-transparent p-0 font-semibold text-slate-800 focus:outline-none focus:ring-0 dark:text-white"
                />
              </div>

              {/* Body */}
              <div className="flex-1 p-10">
                {viewMode === "visual" ? (
                  children
                ) : (
                  <textarea
                    className="h-full w-full resize-none rounded-lg border border-slate-200 bg-slate-50 p-4 font-mono text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                    defaultValue={`<!-- ${subject} -->\n<!-- Paste or edit raw HTML here -->`}
                  />
                )}
              </div>
            </div>
          </div>
        </main>

        {/* Right panel: variables */}
        <aside className="flex w-64 shrink-0 flex-col border-l border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
          <div className="border-b border-slate-100 p-4 dark:border-slate-800">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Dynamic Variables
            </h3>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-6">
              {VARIABLE_GROUPS.map((group) => (
                <div key={group.label}>
                  <span className="mb-3 block text-xs font-semibold text-slate-500">
                    {group.label}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {group.vars.map((v) => (
                      <button
                        key={v}
                        type="button"
                        onClick={() => copyVariable(v)}
                        title="Click to copy"
                        className="rounded border border-primary/20 bg-primary/10 px-2 py-1 font-mono text-xs text-primary transition-colors hover:bg-primary/20"
                      >
                        {v}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800">
              <h4 className="mb-2 text-xs font-bold text-slate-700 dark:text-slate-300">
                Pro Tip
              </h4>
              <p className="text-[11px] leading-normal text-slate-500 dark:text-slate-400">
                Click any variable tag to copy it, then paste it into the editor
                canvas to use dynamic data.
              </p>
            </div>
          </div>

          <div className="border-t border-slate-100 p-4 dark:border-slate-800">
            <button
              type="button"
              className="flex w-full items-center justify-between rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800"
            >
              <div className="flex items-center gap-2">
                <Settings className="size-5" />
                <span className="text-sm font-medium">Email Settings</span>
              </div>
              <ChevronRight className="size-[18px]" />
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
