"use client";

import { useState } from "react";
import { Search, Plus, BarChart3, CheckCircle2, Smile } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import SupportTicketForm from "@/components/support/SupportTicketForm";
import { toast } from "sonner";

type Tab = "all" | "open" | "pending" | "resolved";

const TABS: { id: Tab; label: string }[] = [
  { id: "all", label: "All Tickets" },
  { id: "open", label: "Open" },
  { id: "pending", label: "Pending" },
  { id: "resolved", label: "Resolved" },
];

const TICKETS = [
  {
    id: "TK-1024",
    subject: "Cannot access VPN gateway",
    category: "Software",
    categoryStyle: "bg-primary/10 text-primary",
    priority: "Urgent",
    priorityStyle: "text-red-600 dark:text-red-400",
    status: "Open",
    statusStyle: "bg-primary text-white",
    updated: "2 hours ago",
  },
  {
    id: "TK-1025",
    subject: "Main monitor flickering in office",
    category: "Hardware",
    categoryStyle: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    priority: "Medium",
    priorityStyle: "text-amber-600",
    status: "Pending",
    statusStyle: "bg-amber-100 text-amber-700 border border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800/50",
    updated: "5 hours ago",
  },
  {
    id: "TK-1026",
    subject: "Incorrect billing on invoice #442",
    category: "Shipping",
    categoryStyle: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
    priority: "Low",
    priorityStyle: "text-slate-400",
    status: "Resolved",
    statusStyle: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    updated: "Yesterday",
  },
];

const STATS = [
  { label: "Avg Response Time", value: "2.4 Hours", icon: BarChart3, iconBg: "bg-primary/10 text-primary" },
  { label: "Resolved Rate", value: "94%", icon: CheckCircle2, iconBg: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400" },
  { label: "Customer Sat", value: "4.8/5.0", icon: Smile, iconBg: "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400" },
];

export default function MeTicketsContent() {
  const [tab, setTab] = useState<Tab>("all");
  const [searchTickets, setSearchTickets] = useState("");

  const handleSubmitTicket = (values: { fullName: string; email: string; description: string }) => {
    if (!values.fullName.trim() || !values.email.trim() || !values.description.trim()) {
      toast.error("Missing fields", {
        description: "Please fill in name, email, and problem description.",
      });
      return false;
    }
    toast.success("Ticket created", {
      description: "We'll get back to you shortly.",
    });
  };

  return (
    <div className="mx-auto max-w-6xl w-full space-y-8 p-8">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
            Support Tickets
          </h1>
          <p className="mt-1 text-slate-500 dark:text-slate-400">
            Manage and track your organization&apos;s support requests.
          </p>
        </div>
        <Button
          className="gap-2 shadow-lg shadow-primary/20"
          onClick={() => document.getElementById("create-ticket-form")?.scrollIntoView({ behavior: "smooth" })}
        >
          <Plus className="size-5" />
          Create New Ticket
        </Button>
      </div>

      {/* Tabs & Search */}
      <div className="flex flex-col gap-4 border-b border-slate-200 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-8">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={cn(
                "border-b-2 pb-4 text-sm font-bold transition-colors cursor-pointer",
                tab === t.id
                  ? "border-primary text-primary"
                  : "border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div className="relative mb-2">
          <Search className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTickets}
            onChange={(e) => setSearchTickets(e.target.value)}
            placeholder="Search tickets..."
            className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary dark:border-slate-800 dark:bg-slate-900 dark:text-white"
          />
        </div>
      </div>

      {/* Ticket List Table */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50">
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                  Ticket ID
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                  Subject
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                  Category
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                  Priority
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                  Status
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                  Last Updated
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {TICKETS.map((ticket) => (
                <tr
                  key={ticket.id}
                  className="transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/30"
                >
                  <td className="px-6 py-4 text-sm font-medium text-slate-500">
                    #{ticket.id}
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">
                    {ticket.subject}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={cn(
                        "rounded-md px-2.5 py-1 text-xs font-semibold",
                        ticket.categoryStyle
                      )}
                    >
                      {ticket.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className={cn("flex items-center gap-1.5 text-xs font-bold", ticket.priorityStyle)}>
                      <span className="size-2 rounded-full bg-current" />
                      {ticket.priority}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={cn(
                        "rounded-full px-3 py-1 text-xs font-bold",
                        ticket.statusStyle
                      )}
                    >
                      {ticket.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">{ticket.updated}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create New Ticket Section - Reusable Form */}
      <div id="create-ticket-form" className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-900">
        <div className="border-b border-slate-200 bg-slate-50/50 p-6 dark:border-slate-800 dark:bg-slate-800/50">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Create New Ticket
          </h2>
          <p className="text-sm text-slate-500">
            Fill out the details below to request assistance.
          </p>
        </div>
        <div className="p-8">
          <SupportTicketForm
            showHeader={false}
            submitLabel="Submit Ticket"
            defaultFullName="Alex Johnson"
            defaultEmail="alex.j@example.com"
            onSubmit={(values) => handleSubmitTicket(values)}
          />
        </div>
      </div>

      {/* Footer Stats */}
      <div className="grid gap-6 sm:grid-cols-3">
        {STATS.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
            >
              <div
                className={cn(
                  "flex size-12 shrink-0 items-center justify-center rounded-full",
                  stat.iconBg
                )}
              >
                <Icon className="size-6" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase text-slate-500">{stat.label}</p>
                <p className="text-xl font-black text-slate-900 dark:text-white">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
