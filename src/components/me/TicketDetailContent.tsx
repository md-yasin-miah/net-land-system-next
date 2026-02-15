"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronRight,
  X,
  Calendar,
  MessageCircle,
  Headphones,
  Send,
  Bold,
  Italic,
  List,
  Code,
  Paperclip,
  Eye,
  Download,
  Share2,
  FileText,
  User,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Routes } from "@/lib/routes";
import { cn } from "@/lib/utils";

const MESSAGES = [
  {
    id: "1",
    author: "Alex Johnson",
    role: "user" as const,
    time: "10:45 AM",
    body: "Hi Team, I've been trying to connect to the corporate VPN (Region: US-East) since this morning's Windows update. It gets stuck on \"Connecting...\" and then times out with Error 807. I've tried restarting the service but no luck. Attached my connection log below.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
  },
  {
    id: "2",
    type: "code" as const,
    content: `[2023-10-24 10:42:15] Initiating VPN connection...
[2023-10-24 10:42:18] Resolve: us-east-vpn.company.com -> 52.44.12.98
[2023-10-24 10:42:40] ERROR: GRE protocol blocked or timeout.
[2023-10-24 10:42:41] Connection failed: Error 807.`,
  },
  {
    id: "3",
    author: "Support Engineer (Sarah)",
    role: "support" as const,
    time: "11:15 AM",
    body: "Hello Alex, sorry to hear about the connection issues. Error 807 usually indicates a firewall or network blockage on the client side. Could you check if the \"IKEv2\" protocol is allowed in your Windows Firewall settings? I've seen the update reset these rules occasionally.",
  },
  {
    id: "4",
    author: "Alex Johnson",
    role: "user" as const,
    time: "11:30 AM",
    body: "Thanks Sarah. I checked the firewall and it seems okay, but I captured a screenshot of my settings just in case. Does this look correct to you?",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
    attachment: {
      name: "firewall_settings.png",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=240&fit=crop",
    },
  },
];

const ATTACHMENTS = [
  { name: "vpn_connect_logs.txt", size: "12.5 KB", icon: "doc", color: "text-red-500 bg-red-50 dark:bg-red-900/20" },
  { name: "firewall_settings.png", size: "1.2 MB", icon: "image", color: "text-blue-500 bg-blue-50 dark:bg-blue-900/20" },
];

interface TicketDetailContentProps {
  ticketId: string;
}

export default function TicketDetailContent({ ticketId }: TicketDetailContentProps) {
  const [reply, setReply] = useState("");

  // Derive subject from id for display (in real app would come from API)
  const subject =
    ticketId === "TK-1024"
      ? "Cannot access VPN gateway"
      : ticketId === "TK-1025"
        ? "Main monitor flickering in office"
        : ticketId === "TK-1026"
          ? "Incorrect billing on invoice #442"
          : "Cannot access VPN server after latest OS update";

  return (
    <div className="flex h-full flex-col min-h-0 bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <header className="flex h-16 shrink-0 items-center justify-between border-b border-primary/10 bg-white px-6 dark:border-slate-800 dark:bg-slate-900">
        <nav className="flex items-center gap-2 text-xs font-medium text-slate-400">
          <Link href={Routes.me.tickets} className="hover:text-primary">
            Tickets
          </Link>
          <ChevronRight className="size-4" />
          <span className="text-slate-900 dark:text-white">Ticket #{ticketId.replace(/^TK-/, "")}</span>
        </nav>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="gap-2">
            <X className="size-4" />
            Close Ticket
          </Button>
          <Button size="sm">Update Status</Button>
        </div>
      </header>

      <div className="flex flex-1 min-h-0">
        {/* Conversation */}
        <div className="flex flex-1 flex-col min-w-0 overflow-hidden">
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <div className="mb-8">
              <h2 className="text-2xl font-bold leading-tight text-slate-900 dark:text-white">
                Ticket #{ticketId.replace(/^TK-/, "")} - {subject}
              </h2>
              <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-slate-500">
                <span className="flex items-center gap-1">
                  <Calendar className="size-4" />
                  Oct 24, 2023, 10:45 AM
                </span>
                <span className="flex items-center gap-1">
                  <MessageCircle className="size-4" />
                  4 Messages
                </span>
              </div>
            </div>

            {MESSAGES.map((msg) => {
              if ("type" in msg && msg.type === "code") {
                return (
                  <div key={msg.id} className="ml-14 max-w-[85%]">
                    <pre className="overflow-x-auto rounded-lg border border-slate-800 bg-slate-900 p-4 font-mono text-xs text-slate-300">
                      {msg.content}
                    </pre>
                  </div>
                );
              }
              const isSupport = msg.role === "support";
              return (
                <div
                  key={msg.id}
                  className={cn(
                    "flex gap-4 max-w-[85%]",
                    isSupport && "ml-auto flex-row-reverse"
                  )}
                >
                  <div className="size-10 shrink-0 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
                    {msg.avatar ? (
                      <Image
                        src={msg.avatar}
                        alt=""
                        width={40}
                        height={40}
                        className="size-10 object-cover"
                      />
                    ) : (
                      <Headphones className="size-5 text-primary" />
                    )}
                  </div>
                  <div className={cn("space-y-1", isSupport && "flex flex-col items-end")}>
                    <div className={cn("flex items-baseline gap-2", isSupport && "flex-row-reverse")}>
                      <span
                        className={cn(
                          "text-sm font-bold",
                          isSupport ? "text-primary" : "text-slate-900 dark:text-white"
                        )}
                      >
                        {msg.author}
                      </span>
                      <span className="text-[10px] text-slate-400">{msg.time}</span>
                    </div>
                    <div
                      className={cn(
                        "rounded-xl p-4 text-sm leading-relaxed shadow-sm",
                        isSupport
                          ? "rounded-tr-none bg-primary text-white"
                          : "rounded-tl-none border border-slate-200 bg-white text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                      )}
                    >
                      {msg.body}
                    </div>
                    {"attachment" in msg && msg.attachment && (
                      <div className="mt-2 w-64 overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700 group relative">
                        <Image
                          src={msg.attachment.image}
                          alt={msg.attachment.name}
                          width={256}
                          height={160}
                          className="size-full object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                          <button
                            type="button"
                            className="rounded-full bg-white p-2 text-slate-900 hover:bg-primary hover:text-white"
                            aria-label="View"
                          >
                            <Eye className="size-4" />
                          </button>
                          <button
                            type="button"
                            className="rounded-full bg-white p-2 text-slate-900 hover:bg-primary hover:text-white"
                            aria-label="Download"
                          >
                            <Download className="size-4" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Reply box */}
          <div className="border-t border-primary/10 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
            <div className="mx-auto max-w-4xl space-y-4">
              <div className="mb-2 flex items-center gap-2">
                <Button variant="ghost" size="icon" className="size-8 text-slate-500">
                  <Bold className="size-4" />
                </Button>
                <Button variant="ghost" size="icon" className="size-8 text-slate-500">
                  <Italic className="size-4" />
                </Button>
                <Button variant="ghost" size="icon" className="size-8 text-slate-500">
                  <List className="size-4" />
                </Button>
                <Button variant="ghost" size="icon" className="size-8 text-slate-500">
                  <Code className="size-4" />
                </Button>
                <div className="mx-1 h-4 w-px bg-slate-200 dark:bg-slate-700" />
                <Button variant="ghost" size="icon" className="size-8 text-slate-500">
                  <Paperclip className="size-4" />
                </Button>
              </div>
              <textarea
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                placeholder="Type your reply here..."
                className="min-h-[120px] w-full resize-none rounded-xl border border-slate-200 p-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                rows={4}
              />
              <div className="flex items-center justify-between">
                <p className="text-xs italic text-slate-400">Press Ctrl+Enter to send</p>
                <Button className="gap-2" size="sm">
                  <span>Send Reply</span>
                  <Send className="size-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="w-80 shrink-0 overflow-y-auto border-l border-primary/10 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
          <section className="space-y-8">
            <div>
              <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                Ticket Status
              </h3>
              <div className="flex items-center justify-between rounded-xl border border-primary/10 bg-primary/5 p-3 dark:border-slate-700 dark:bg-primary/10">
                <div className="flex items-center gap-2">
                  <span className="size-2.5 animate-pulse rounded-full bg-primary" />
                  <span className="text-sm font-bold text-primary">In Progress</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                Information
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-slate-500">Priority</span>
                  <span className="flex items-center gap-1 text-sm font-semibold text-red-500">
                    <AlertCircle className="size-4" />
                    High
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-500">Category</span>
                  <span className="text-sm font-semibold text-slate-900 dark:text-white">
                    Networking
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-500">Assigned To</span>
                  <span className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
                    Sarah M.
                    <span className="flex size-5 items-center justify-center rounded-full bg-primary/10">
                      <User className="size-3 text-primary" />
                    </span>
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-500">Client</span>
                  <span className="text-sm font-semibold text-slate-900 dark:text-white">
                    Alex Johnson
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                Attachments (2)
              </h3>
              <div className="space-y-3">
                {ATTACHMENTS.map((a) => (
                  <div
                    key={a.name}
                    className="flex cursor-pointer items-center gap-3 rounded-lg border border-slate-100 p-2 transition-colors hover:border-primary/20 dark:border-slate-800"
                  >
                    <span
                      className={cn(
                        "flex size-10 items-center justify-center rounded",
                        a.color
                      )}
                    >
                      <FileText className="size-5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-semibold text-slate-900 dark:text-white">
                        {a.name}
                      </p>
                      <p className="text-[10px] text-slate-500">{a.size}</p>
                    </div>
                    <Download className="size-4 text-slate-400" />
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-primary/10 pt-4 dark:border-slate-800">
              <button
                type="button"
                className="flex w-full items-center justify-between rounded-lg p-3 text-sm text-slate-600 transition-colors hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800"
              >
                <span className="flex items-center gap-2">
                  <Share2 className="size-4 text-slate-400" />
                  Share Ticket
                </span>
                <ChevronRight className="size-3" />
              </button>
              <button
                type="button"
                className="mt-1 flex w-full items-center justify-between rounded-lg p-3 text-sm text-slate-600 transition-colors hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800"
              >
                <span className="flex items-center gap-2">
                  <FileText className="size-4 text-slate-400" />
                  Export as PDF
                </span>
                <ChevronRight className="size-3" />
              </button>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
