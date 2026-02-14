import { Suspense } from "react";
import Link from "next/link";
import {
  ChevronRight,
  SearchSlash,
  SpellCheck,
  Filter,
  Globe,
  Rocket,
  CreditCard,
  Shield,
  MessageCircle,
  Ticket,
} from "lucide-react";
import { Routes } from "@/lib/routes";
import FaqSearchForm from "@/components/faq/FaqSearchForm";

const SUGGESTED_TOPICS = [
  { href: Routes.faq.index, icon: Rocket, title: "Getting Started", description: "Learn the basics and set up your account in minutes." },
  { href: "#", icon: CreditCard, title: "Billing & Payments", description: "Manage subscriptions, invoices, and payment methods." },
  { href: "#", icon: Shield, title: "Account Security", description: "2FA, password recovery, and privacy settings." },
];

export default function FaqSearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="mx-auto max-w-3xl px-4 md:px-6 py-10">
        <nav className="mb-8 flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400">
          <Link href={Routes.faq.index} className="hover:text-primary transition-colors">
            Help Center
          </Link>
          <ChevronRight className="size-4" />
          <span className="text-slate-900 dark:text-white font-semibold">Search Results</span>
        </nav>

        <Suspense fallback={null}>
          <FaqSearchWithQuery searchParams={searchParams} />
        </Suspense>
      </div>
    </main>
  );
}

async function FaqSearchWithQuery({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = (q ?? "").trim() || "XYZ";

  return (
    <>
      <div className="mb-12">
        <div className="relative rounded-xl border-2 border-primary/20 bg-white dark:bg-slate-900 overflow-hidden shadow-sm focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20">
          <FaqSearchForm
            className="w-full"
            placeholder="Search for answers..."
            size="large"
            defaultQuery={query}
          />
        </div>
      </div>

      <div className="flex flex-col items-center text-center">
        <div className="mb-6 flex size-32 items-center justify-center rounded-full bg-primary/5 text-primary/40">
          <SearchSlash className="size-16" />
        </div>
        <h1 className="mb-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          Zero results found for <span className="text-primary italic">&quot;{query}&quot;</span>
        </h1>
        <p className="mx-auto max-w-lg text-lg text-slate-600 dark:text-slate-400">
          Don&apos;t give up just yet! Check your spelling or use more general keywords. Our
          database updates daily, and we&apos;re here to help.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-8 text-sm text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <SpellCheck className="size-4 text-primary" />
            <span>Check for typos</span>
          </div>
          <div className="flex items-center gap-2">
            <Filter className="size-4 text-primary" />
            <span>Use fewer keywords</span>
          </div>
          <div className="flex items-center gap-2">
            <Globe className="size-4 text-primary" />
            <span>Try broad categories</span>
          </div>
        </div>
      </div>

      <div className="mt-20">
        <div className="flex items-center justify-between border-b border-primary/10 pb-4 mb-8">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Suggested Topics</h2>
          <Link
            href={Routes.faq.index}
            className="text-sm font-bold text-primary hover:underline"
          >
            View all categories
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SUGGESTED_TOPICS.map((topic) => {
            const Icon = topic.icon;
            return (
              <Link
                key={topic.href}
                href={topic.href}
                className="group flex items-start gap-4 rounded-xl border border-primary/10 bg-white dark:bg-slate-900 p-6 transition hover:border-primary/40 hover:shadow-lg"
              >
                <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-white">
                  <Icon className="size-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white">{topic.title}</h3>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    {topic.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="mt-16 rounded-2xl bg-primary px-6 md:px-8 py-10 text-center text-white shadow-xl shadow-primary/20">
        <h2 className="text-2xl font-bold">Still can&apos;t find what you&apos;re looking for?</h2>
        <p className="mt-2 text-white/80">
          Our support team is available to help you resolve any issues.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/contact"
            className="flex min-w-[180px] items-center justify-center gap-2 rounded-lg bg-white px-8 py-3.5 text-sm font-bold text-primary transition hover:bg-slate-50"
          >
            <MessageCircle className="size-5" />
            Contact Support
          </Link>
          <Link
            href="/support"
            className="flex min-w-[180px] items-center justify-center gap-2 rounded-lg border border-white/30 bg-white/10 px-8 py-3.5 text-sm font-bold text-white transition hover:bg-white/20"
          >
            <Ticket className="size-5" />
            Open a Ticket
          </Link>
        </div>
      </div>
    </>
  );
}
