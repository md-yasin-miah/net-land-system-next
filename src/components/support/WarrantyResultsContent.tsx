"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import {
  ShieldCheck,
  Router,
  ClipboardCheck,
  Download,
  FileText,
  MessageCircle,
  BookOpen,
  History,
  Search,
  ArrowRight,
} from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Routes } from "@/lib/routes";

const MOCK_RESULT = {
  productLine: "Cisco Catalyst 9200L",
  productSubtitle: "Network Access Switch - 48 Port",
  status: "ACTIVE",
  warrantyType: "1-Year Limited Hardware Warranty",
  serviceLevel: "Next Business Day (NBD) Replacement",
  startDate: "January 15, 2024",
  expirationDate: "January 15, 2025",
  daysLeft: 237,
  percentRemaining: 65,
};

const SUPPORT_CARDS = [
  {
    icon: MessageCircle,
    title: "Technical Support",
    description:
      "Need help configuring your device? Open a ticket with our team.",
    href: Routes.support.tickets,
    label: "Open Ticket",
  },
  {
    icon: BookOpen,
    title: "Knowledge Base",
    description:
      "Access setup guides, firmware updates, and troubleshooting docs.",
    href: Routes.faq.index,
    label: "Browse Docs",
  },
  {
    icon: History,
    title: "Case History",
    description:
      "View previous warranty claims and maintenance records for this unit.",
    href: Routes.support.tickets,
    label: "View History",
  },
];

interface WarrantyResultsContentProps {
  serial: string;
}

export default function WarrantyResultsContent({
  serial,
}: WarrantyResultsContentProps) {
  const router = useRouter();
  const [anotherSerial, setAnotherSerial] = useState("");

  const handleCheckAnother = (e: React.FormEvent) => {
    e.preventDefault();
    const q = anotherSerial.trim();
    if (q) router.push(`/support/warranty-results/${encodeURIComponent(q)}`);
  };

  return (
    <main className="flex flex-1 justify-center py-10 px-4 min-h-[60vh]">
      <div className="flex flex-col max-w-[960px] w-full gap-8">
        {/* Page Header */}
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-primary">
              <ShieldCheck className="size-5" />
              <span className="text-sm font-semibold uppercase tracking-wider">
                Verification Successful
              </span>
            </div>
            <h1 className="text-slate-900 dark:text-white text-4xl font-black leading-tight tracking-tight">
              Warranty Details
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-lg">
              Results for Serial Number:{" "}
              <span className="font-mono font-bold text-primary">{serial}</span>
            </p>
          </div>
          {/* Check another serial - inline */}
          <form
            onSubmit={handleCheckAnother}
            className="flex gap-2 max-w-md ml-auto"
          >
            <div className="flex-1 flex items-center rounded-lg border border-primary/10 bg-slate-50 dark:bg-slate-800/50 pl-3 gap-2 focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary/30">
              <Search className="size-5 text-primary shrink-0" />
              <input
                type="text"
                value={anotherSerial}
                onChange={(e) => setAnotherSerial(e.target.value)}
                placeholder="Check another serial..."
                className="w-full bg-transparent border-none focus:ring-0 py-2.5 focus:outline-none text-sm placeholder:text-slate-400 text-slate-900 dark:text-white"
              />
            </div>
            <Button type="submit" variant="default" size="lg">
              Check
            </Button>
          </form>
        </div>

        {/* Main Warranty Card */}
        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-xl shadow-primary/5 border border-primary/10 overflow-hidden">
          {/* Card Header */}
          <div className="p-6 md:p-8 border-b border-primary/5 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex gap-6 items-start">
              <div className="size-24 rounded-lg bg-slate-50 dark:bg-slate-800 flex items-center justify-center border border-primary/10 shrink-0">
                <Router className="size-10 text-primary" />
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium uppercase tracking-wide">
                  Product Line
                </p>
                <h3 className="text-slate-900 dark:text-white text-2xl font-bold">
                  {MOCK_RESULT.productLine}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-base">
                  {MOCK_RESULT.productSubtitle}
                </p>
              </div>
            </div>
            <div className="flex flex-col items-start md:items-end gap-2">
                <Badge variant="success">
                  {MOCK_RESULT.status}
                </Badge>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Verified by Net Land System
              </p>
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 p-6 md:p-8 gap-x-12 gap-y-8">
            <div className="flex flex-col gap-1.5 border-l-4 border-primary/20 pl-4">
              <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">
                Warranty Type
              </p>
              <p className="text-slate-900 dark:text-white text-base font-semibold">
                {MOCK_RESULT.warrantyType}
              </p>
            </div>
            <div className="flex flex-col gap-1.5 border-l-4 border-primary/20 pl-4">
              <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">
                Service Level
              </p>
              <p className="text-slate-900 dark:text-white text-base font-semibold">
                {MOCK_RESULT.serviceLevel}
              </p>
            </div>
            <div className="flex flex-col gap-1.5 border-l-4 border-primary/20 pl-4">
              <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">
                Start Date
              </p>
              <p className="text-slate-900 dark:text-white text-base font-semibold">
                {MOCK_RESULT.startDate}
              </p>
            </div>
            <div className="flex flex-col gap-1.5 border-l-4 border-primary/20 pl-4">
              <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">
                Expiration Date
              </p>
              <p className="text-slate-900 dark:text-white text-base font-semibold">
                {MOCK_RESULT.expirationDate}
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="px-6 md:px-8 pb-8 flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <p className="text-slate-900 dark:text-white text-sm font-semibold">
                Warranty Term Remaining
              </p>
              <p className="text-primary text-sm font-bold">
                {MOCK_RESULT.daysLeft} Days Left ({MOCK_RESULT.percentRemaining}
                %)
              </p>
            </div>
            <div className="h-3 w-full bg-primary/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all"
                style={{ width: `${MOCK_RESULT.percentRemaining}%` }}
              />
            </div>
          </div>

          {/* Action Bar */}
          <div className="bg-slate-50 dark:bg-slate-800/50 p-6 md:p-8 flex flex-wrap gap-4 items-center justify-between border-t border-primary/5">
            <div className="flex gap-3 flex-wrap">
              <Button asChild size="lg" className="shadow-lg shadow-primary/20">
                <Link href="/support" className="flex items-center gap-2">
                  <ClipboardCheck className="size-5" />
                  Claim Warranty
                </Link>
              </Button>
              <Button type="button" variant="outline" size="lg">
                <Download className="size-5" />
                Certificate
              </Button>
            </div>
            <Link
              href="/support/warranty-returns"
              className="text-primary hover:underline text-sm font-bold flex items-center gap-1"
            >
              <FileText className="size-4" />
              View Full Warranty Policy
            </Link>
          </div>
        </div>

        {/* Support Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SUPPORT_CARDS.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-primary/10 flex flex-col gap-3"
              >
                <Icon className="size-6 text-primary" />
                <h4 className="text-slate-900 dark:text-white font-bold">
                  {card.title}
                </h4>
                <p className="text-slate-500 dark:text-slate-400 text-sm">
                  {card.description}
                </p>
                <Link
                  href={card.href}
                  className="text-primary text-sm font-bold hover:underline mt-2 inline-flex items-center gap-1"
                >
                  {card.label}
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
