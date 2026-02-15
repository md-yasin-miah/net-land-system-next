"use client";

import { useState } from "react";
import Link from "next/link";
import {
  MessageCircle,
  History,
  Search,
  Plus,
  Send,
  Paperclip,
  Smile,
  User,
  Package,
  Info,
} from "lucide-react";
import { Button } from "../ui/button";
import { Routes } from "@/lib/routes";
import { cn } from "@/lib/utils";

type Tab = "active" | "history";

const CHATS = [
  {
    id: "1",
    name: "John Doe",
    lastMessage: "Can you check my warranty?",
    time: "Active",
    active: true,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
  },
  {
    id: "2",
    name: "Sarah Smith",
    lastMessage: "Thanks for the help! I'll wait...",
    time: "12:45 PM",
    active: false,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
  },
  {
    id: "3",
    name: "Mike Ross",
    lastMessage: "I'm having trouble with my login.",
    time: "Yesterday",
    active: false,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
  },
];

const MESSAGES = [
  { type: "system" as const, text: "Technician Joined the chat" },
  {
    type: "tech" as const,
    text: "Hello! I'm Alex from Net Land technical support. How can I help you with your inquiry today?",
    time: "10:30 AM",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
  },
  {
    type: "user" as const,
    text: "Hi Alex, I'm checking my warranty status for the Fiber Router. I think it might be expiring soon.",
    time: "10:32 AM",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=User",
  },
  {
    type: "tech" as const,
    text: "I see your Fiber Router (Model X-200) on your account. Let me pull up the details for you right now.",
    time: "10:33 AM",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
  },
];

const QUICK_REPLIES = [
  "How can I help you today?",
  "Checking warranty now...",
  "Sending link",
  "Resolved?",
];

const RECENT_ORDERS = [
  { id: "10293", date: "Oct 12, 2023", amount: "$129.00" },
  { id: "09881", date: "Sep 05, 2023", amount: "$45.00" },
];

export default function LiveChatContent() {
  const [tab, setTab] = useState<Tab>("active");
  const [searchChats, setSearchChats] = useState("");
  const [message, setMessage] = useState("");
  const [selectedChatId, setSelectedChatId] = useState("1");

  return (
    <div className="flex h-[calc(100vh-8rem)] min-h-128 w-full overflow-hidden rounded-none bg-slate-50 dark:bg-slate-950">
      {/* Left Sidebar */}
      <aside className="flex w-80 shrink-0 flex-col border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        {/* Brand Header */}
        <div className="flex items-center gap-3 border-b border-slate-100 p-4 dark:border-slate-800">
          <div className="flex size-10 items-center justify-center overflow-hidden rounded-lg bg-primary text-white">
            <span className="flex size-10 items-center justify-center text-lg font-bold">
              NL
            </span>
          </div>
          <div className="flex flex-col">
            <h1 className="text-base font-bold leading-none text-primary">
              Net Land
            </h1>
            <p className="text-xs font-medium text-slate-500">Support Center</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="p-3">
          <div className="flex rounded-lg bg-slate-100 p-1 dark:bg-slate-800">
            <button
              type="button"
              onClick={() => setTab("active")}
              className={cn(
                "flex flex-1 items-center justify-center gap-2 py-2 text-sm font-semibold rounded-md transition-colors",
                tab === "active"
                  ? "bg-white text-primary shadow-sm dark:bg-slate-700 dark:text-primary"
                  : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
              )}
            >
              <MessageCircle className="size-4" />
              Active
            </button>
            <button
              type="button"
              onClick={() => setTab("history")}
              className={cn(
                "flex flex-1 items-center justify-center gap-2 py-2 text-sm font-medium rounded-md transition-colors",
                tab === "history"
                  ? "bg-white text-primary shadow-sm dark:bg-slate-700 dark:text-primary"
                  : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
              )}
            >
              <History className="size-4" />
              History
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="px-4 py-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchChats}
              onChange={(e) => setSearchChats(e.target.value)}
              placeholder="Search chats..."
              className="w-full rounded-lg border-none bg-slate-50 py-2 pl-10 pr-4 text-sm placeholder:text-slate-400 focus:ring-2 focus:ring-primary/20 dark:bg-slate-800 dark:text-white"
            />
          </div>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto">
          {CHATS.map((chat) => (
            <button
              key={chat.id}
              type="button"
              onClick={() => setSelectedChatId(chat.id)}
              className={cn(
                "flex w-full items-center gap-3 border-l-4 px-4 py-4 text-left transition-colors",
                selectedChatId === chat.id
                  ? "border-primary bg-primary/5"
                  : "border-transparent hover:bg-slate-50 dark:hover:bg-slate-800/50"
              )}
            >
              <div className="relative shrink-0">
                <div
                  className="size-12 rounded-full bg-slate-200 bg-cover bg-center dark:bg-slate-700"
                  style={{ backgroundImage: `url(${chat.avatar})` }}
                />
                {chat.active && (
                  <div className="absolute bottom-0 right-0 size-3 rounded-full border-2 border-white bg-green-500 dark:border-slate-900" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="mb-0.5 flex items-baseline justify-between">
                  <h3 className="truncate text-sm font-bold text-slate-900 dark:text-white">
                    {chat.name}
                  </h3>
                  <span
                    className={cn(
                      "text-[10px] font-medium uppercase",
                      chat.active ? "text-primary" : "text-slate-400"
                    )}
                  >
                    {chat.time}
                  </span>
                </div>
                <p className="truncate text-xs text-slate-600 dark:text-slate-400">
                  {chat.lastMessage}
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* New Chat */}
        <div className="border-t border-slate-100 p-4 dark:border-slate-800">
          <Button className="w-full font-bold" size="lg">
            <Plus className="size-5" />
            New Chat
          </Button>
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex flex-1 flex-col overflow-hidden bg-white dark:bg-slate-900">
        {/* Chat Header */}
        <header className="flex h-20 shrink-0 items-center justify-between border-b border-slate-100 px-6 dark:border-slate-800">
          <div className="flex items-center gap-4">
            <div
              className="size-12 rounded-full bg-slate-200 bg-cover bg-center dark:bg-slate-700"
              style={{
                backgroundImage: `url(https://api.dicebear.com/7.x/avataaars/svg?seed=Alex)`,
              }}
            />
            <div>
              <h2 className="mb-1 text-base font-bold leading-none text-slate-900 dark:text-white">
                Alex (Technician)
              </h2>
              <div className="flex items-center gap-1.5">
                <div className="size-2 rounded-full bg-green-500" />
                <span className="text-xs font-medium text-slate-500">
                  Online • Responds in 2m
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="secondary" size="default">
              Transfer
            </Button>
            <Button variant="destructive" size="default">
              End Session
            </Button>
          </div>
        </header>

        {/* Messages */}
        <div className="flex-1 space-y-6 overflow-y-auto p-6">
          {MESSAGES.map((msg, i) =>
            msg.type === "system" ? (
              <div key={i} className="flex justify-center">
                <span className="rounded-full bg-slate-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:bg-slate-800">
                  {msg.text}
                </span>
              </div>
            ) : msg.type === "tech" ? (
              <div key={i} className="flex max-w-[80%] gap-3">
                <div className="mt-auto shrink-0">
                  <div
                    className="size-8 rounded-full bg-slate-200 bg-cover bg-center dark:bg-slate-700"
                    style={{ backgroundImage: `url(${msg.avatar})` }}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <div className="rounded-xl rounded-bl-sm bg-primary p-4 text-sm leading-relaxed text-white shadow-sm">
                    {msg.text}
                  </div>
                  <span className="ml-1 text-[10px] font-medium text-slate-400">
                    {msg.time}
                  </span>
                </div>
              </div>
            ) : (
              <div
                key={i}
                className="ml-auto flex max-w-[80%] flex-row-reverse gap-3"
              >
                <div className="mt-auto shrink-0">
                  <div
                    className="size-8 rounded-full bg-slate-200 bg-cover bg-center dark:bg-slate-700"
                    style={{ backgroundImage: `url(${msg.avatar})` }}
                  />
                </div>
                <div className="flex flex-col items-end gap-1">
                  <div className="rounded-xl rounded-br-sm bg-slate-200 p-4 text-sm leading-relaxed text-slate-900 shadow-sm dark:bg-slate-700 dark:text-white">
                    {msg.text}
                  </div>
                  <span className="mr-1 text-[10px] font-medium text-slate-400">
                    {msg.time}
                  </span>
                </div>
              </div>
            )
          )}
          {/* Typing indicator */}
          <div className="ml-11 flex items-center gap-2">
            <div className="flex gap-1">
              <div className="size-1.5 rounded-full bg-slate-300 dark:bg-slate-600" />
              <div className="size-1.5 rounded-full bg-slate-300 dark:bg-slate-600" />
              <div className="size-1.5 rounded-full bg-slate-300 dark:bg-slate-600" />
            </div>
            <span className="text-[11px] italic text-slate-400">
              User is typing...
            </span>
          </div>
        </div>

        {/* Composer */}
        <footer className="shrink-0 border-t border-slate-100 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-4 flex gap-2 overflow-x-auto pb-2">
            {QUICK_REPLIES.map((reply) => (
              <button
                key={reply}
                type="button"
                className="shrink-0 rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 transition-colors hover:border-primary hover:text-primary dark:border-slate-700 dark:text-slate-400 dark:hover:border-primary dark:hover:text-primary"
                onClick={() => setMessage(reply)}
              >
                {reply}
              </button>
            ))}
          </div>
          <div className="flex items-end gap-3 rounded-xl border border-slate-200 bg-slate-50 p-2.5 transition-all focus-within:border-primary/40 focus-within:ring-4 focus-within:ring-primary/5 dark:border-slate-700 dark:bg-slate-800">
            <div className="flex shrink-0 items-center gap-1 pb-1">
              <button
                type="button"
                className="rounded-md p-1.5 text-slate-400 hover:bg-slate-200 hover:text-slate-600 dark:hover:bg-slate-700"
                aria-label="Attach file"
              >
                <Paperclip className="size-4" />
              </button>
              <button
                type="button"
                className="rounded-md p-1.5 text-slate-400 hover:bg-slate-200 hover:text-slate-600 dark:hover:bg-slate-700"
                aria-label="Emoji"
              >
                <Smile className="size-4" />
              </button>
            </div>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message here..."
              rows={1}
              className="max-h-32 flex-1 resize-none border-none bg-transparent py-2 text-sm focus:ring-0 dark:text-white dark:placeholder:text-slate-400"
            />
            <Button size="icon" className="shrink-0 p-2.5">
              <Send className="size-5" />
            </Button>
          </div>
        </footer>
      </main>

      {/* Right Sidebar */}
      <aside className="flex w-80 shrink-0 flex-col overflow-y-auto border-l border-slate-200 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-900/50">
        <div className="space-y-8 p-6">
          {/* Customer Details */}
          <div>
            <h4 className="mb-4 text-[11px] font-bold uppercase tracking-widest text-slate-400">
              Customer Details
            </h4>
            <div className="mb-4 flex items-center gap-4">
              <div
                className="size-14 rounded-xl bg-slate-200 bg-cover bg-center dark:bg-slate-700"
                style={{
                  backgroundImage: `url(https://api.dicebear.com/7.x/avataaars/svg?seed=John)`,
                }}
              />
              <div>
                <p className="text-sm font-bold text-slate-900 dark:text-white">
                  John Doe
                </p>
                <p className="text-xs text-slate-500">Tier: Platinum Member</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">Email:</span>
                <span className="font-medium text-slate-900 dark:text-slate-200">
                  john.d@example.com
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">Location:</span>
                <span className="font-medium text-slate-900 dark:text-slate-200">
                  Seattle, WA
                </span>
              </div>
            </div>
          </div>

          {/* Active Claim */}
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h4 className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
                Active Claim
              </h4>
              <span className="rounded bg-yellow-100 px-2 py-0.5 text-[10px] font-bold text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-500">
                IN REVIEW
              </span>
            </div>
            <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <p className="mb-1 text-sm font-bold text-slate-900 dark:text-white">
                Claim #CLM-8829
              </p>
              <p className="mb-4 text-xs text-slate-500">Fiber Router X-200</p>
              <div className="space-y-2">
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                  <div className="h-full w-2/3 rounded-full bg-primary" />
                </div>
                <div className="flex justify-between text-[10px] font-bold text-slate-400">
                  <span>SUBMITTED</span>
                  <span>FINALIZING</span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Orders */}
          <div>
            <h4 className="mb-4 text-[11px] font-bold uppercase tracking-widest text-slate-400">
              Recent Orders
            </h4>
            <div className="space-y-3">
              {RECENT_ORDERS.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between rounded-lg border border-slate-100 bg-white p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900"
                >
                  <div className="flex items-center gap-3">
                    <Package className="size-5 text-slate-400" />
                    <div>
                      <p className="text-xs font-bold text-slate-900 dark:text-white">
                        Order #{order.id}
                      </p>
                      <p className="text-[10px] text-slate-500">{order.date}</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-primary">
                    {order.amount}
                  </span>
                </div>
              ))}
            </div>
            <Link
              href={Routes.support.index}
              className="mt-4 block text-xs font-bold text-primary hover:underline"
            >
              View Full Order History
            </Link>
          </div>

          {/* System Info */}
          <div className="rounded-xl border border-primary/10 bg-primary/5 p-4">
            <div className="mb-2 flex items-center gap-2">
              <Info className="size-4 text-primary" />
              <h5 className="text-xs font-bold text-primary">
                System Information
              </h5>
            </div>
            <ul className="space-y-1 text-[11px] text-slate-600 dark:text-slate-400">
              <li>
                <strong>Device:</strong> MacBook Pro M2
              </li>
              <li>
                <strong>OS:</strong> macOS Sonoma 14.1
              </li>
              <li>
                <strong>Browser:</strong> Chrome 119.0.0
              </li>
            </ul>
          </div>
        </div>
      </aside>
    </div>
  );
}
