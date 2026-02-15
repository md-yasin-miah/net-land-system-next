"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  Truck,
  Settings,
  ShieldCheck,
  HelpCircle,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  MapPin,
  Upload,
  ArrowRight,
} from "lucide-react";
import { Button } from "../ui/button";
import { Routes } from "@/lib/routes";
import { toast } from "sonner";

const QUICK_LINKS = [
  {
    icon: Truck,
    title: "Track Order",
    description: "Check your real-time delivery status and shipping history.",
    href: Routes.support.tracking,
  },
  {
    icon: Settings,
    title: "Technical Support",
    description:
      "Access documentation, software updates, and developer guides.",
    href: Routes.support.index,
  },
  {
    icon: ShieldCheck,
    title: "RMA/Warranty",
    description:
      "Initiate a return, request repairs, or check warranty coverage.",
    href: Routes.support.warrantyReturns,
  },
  {
    icon: HelpCircle,
    title: "General FAQ",
    description:
      "Find answers to frequently asked questions about our services.",
    href: Routes.faq.index,
  },
];

const INQUIRY_OPTIONS = [
  "Technical Issue",
  "Billing Question",
  "Feature Request",
  "Account Access",
];

const PRIORITY_OPTIONS = [
  { value: "normal", label: "Normal" },
  { value: "high", label: "High" },
  { value: "urgent", label: "Urgent" },
] as const;

export default function SupportTicketsContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState(INQUIRY_OPTIONS[0]);
  const [priority, setPriority] =
    useState<(typeof PRIORITY_OPTIONS)[number]["value"]>("normal");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState<FileList | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchQuery.trim();
    if (q) {
      toast.info("Search", {
        description: "Knowledge base search would open for: " + q,
      });
      // Could navigate to Routes.faq.search?q=...
    }
  };

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !description.trim()) {
      toast.error("Missing fields", {
        description: "Please fill in name, email, and problem description.",
      });
      return;
    }
    toast.success("Ticket submitted", {
      description: "We'll get back to you shortly.",
    });
    setFullName("");
    setEmail("");
    setSubject(INQUIRY_OPTIONS[0]);
    setPriority("normal");
    setDescription("");
    setFiles(null);
  };

  return (
    <main className="flex flex-1 flex-col">
      {/* Hero Search Section */}
      <section className="relative bg-primary/5 py-16 dark:bg-primary/10 lg:py-24">
        <div
          className="absolute inset-0 z-0 opacity-10"
          style={{
            backgroundImage: "radial-gradient(#1152d4 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />
        <div className="relative z-10 mx-auto max-w-4xl px-4 md:px-6 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            All Systems Operational
          </div>
          <h1 className="mb-4 text-4xl font-black tracking-tight text-slate-900 dark:text-white md:text-6xl">
            How can we help you today?
          </h1>
          <p className="mb-10 text-lg text-slate-600 dark:text-slate-400">
            Search our knowledge base for instant answers or browse help
            categories below.
          </p>
          <form onSubmit={handleSearch} className="relative mx-auto max-w-2xl">
            <div className="group flex h-14 md:h-16 w-full items-center overflow-hidden rounded-xl border border-slate-200 bg-white px-4 shadow-xl transition-all focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10 dark:border-slate-700 dark:bg-slate-800">
              <Search className="size-5 text-slate-400 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for help articles, guides, and tutorials..."
                className="h-full w-full border-none bg-transparent px-4 text-base focus:ring-0 dark:text-white placeholder:text-slate-400"
              />
              <Button
                type="submit"
                size="default"
                className="hidden md:inline-flex"
              >
                Search
              </Button>
            </div>
            <div className="mt-4 flex flex-wrap justify-center gap-3 text-sm text-slate-500">
              <span>Popular:</span>
              <Link
                href={Routes.faq.index}
                className="underline hover:text-primary"
              >
                Setting up your account
              </Link>
              <Link
                href={Routes.faq.index}
                className="underline hover:text-primary"
              >
                API Documentation
              </Link>
              <Link
                href={Routes.faq.index}
                className="underline hover:text-primary"
              >
                Billing
              </Link>
            </div>
          </form>
        </div>
      </section>

      {/* Support Ticket & Contact Section */}
      <section className="bg-white py-16 dark:bg-slate-900/50 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            {/* Form Column */}
            <div className="lg:col-span-7">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                  Submit a Support Ticket
                </h2>
                <p className="mt-2 text-slate-600 dark:text-slate-400">
                  Can&apos;t find what you&apos;re looking for? Our team is here
                  to help.
                </p>
              </div>
              <form onSubmit={handleSubmitTicket} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="John Doe"
                      className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="john@example.com"
                      className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                      Inquiry Subject
                    </label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    >
                      {INQUIRY_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                      Priority Level
                    </label>
                    <div className="flex flex-wrap gap-4 pt-2">
                      {PRIORITY_OPTIONS.map((opt) => (
                        <label
                          key={opt.value}
                          className="flex cursor-pointer items-center gap-2"
                        >
                          <input
                            type="radio"
                            name="priority"
                            value={opt.value}
                            checked={priority === opt.value}
                            onChange={() => setPriority(opt.value)}
                            className="border-slate-300 text-primary focus:ring-primary dark:border-slate-600"
                          />
                          <span className="text-sm text-slate-700 dark:text-slate-300">
                            {opt.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Problem Description
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe your issue in detail..."
                    rows={5}
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Attachments (optional)
                  </label>
                  <label className="flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-200 bg-slate-50 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800/50 dark:hover:bg-slate-800">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="mb-2 size-8 text-slate-400" />
                      <p className="mb-2 text-sm text-slate-500 dark:text-slate-400">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-slate-400">
                        PNG, JPG or PDF (MAX. 10MB)
                      </p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      multiple
                      accept=".png,.jpg,.jpeg,.pdf"
                      onChange={(e) => setFiles(e.target.files)}
                    />
                  </label>
                </div>
                <Button
                  type="submit"
                  variant="default"
                  size="lg"
                  className="w-full py-6 text-base font-bold shadow-lg shadow-primary/30"
                >
                  Submit Ticket
                </Button>
              </form>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-5">
              <div className="sticky top-28 space-y-8">
                {/* Contact Card */}
                <div className="rounded-2xl bg-primary p-8 text-white shadow-xl shadow-primary/20">
                  <h3 className="text-xl font-bold">Contact Information</h3>
                  <p className="mt-2 opacity-90">
                    Prefer to speak with someone? Contact us directly during
                    business hours.
                  </p>
                  <div className="mt-8 space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/20">
                        <Phone className="size-5" />
                      </div>
                      <div>
                        <p className="text-sm font-medium opacity-80">
                          Support Line
                        </p>
                        <p className="text-lg font-bold">
                          +1 (800) 555-NET-LAND
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/20">
                        <Mail className="size-5" />
                      </div>
                      <div>
                        <p className="text-sm font-medium opacity-80">
                          Email Us
                        </p>
                        <p className="text-lg font-bold">support@netland.sys</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/20">
                        <Clock className="size-5" />
                      </div>
                      <div>
                        <p className="text-sm font-medium opacity-80">
                          Business Hours
                        </p>
                        <p className="text-lg font-bold">
                          Mon-Fri: 8AM - 8PM EST
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-10 border-t border-white/20 pt-8">
                    <div className="flex items-center gap-3">
                      <span className="relative flex h-3 w-3">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
                        <span className="relative inline-flex h-3 w-3 rounded-full bg-white" />
                      </span>
                      <span className="text-sm font-bold">
                        Live Chat: Online Now
                      </span>
                    </div>
                    <Link href={Routes.support.liveChat}>
                      <Button
                        type="button"
                        variant="secondary"
                        size="lg"
                        className="mt-4 w-full bg-white font-bold text-primary hover:bg-slate-100"
                        onClick={() =>
                          toast.info("Live chat", {
                            description: "Chat widget would open.",
                          })
                        }
                      >
                        <MessageCircle className="size-5" />
                        Start Live Chat
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Locations Card */}
                <div className="rounded-2xl border border-slate-200 bg-white p-8 dark:border-slate-800 dark:bg-slate-900">
                  <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-white">
                    <MapPin className="size-5 text-primary" />
                    Our Locations
                  </h3>
                  <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3168.558296614399!2d-122.0308316846815!3d37.38605197982378!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb7495bec1189%3A0x6ede7c2a3b1e4f0!2sMountain+View%2C+CA%2C+USA!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                      width="100%"
                      height="192"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Net Land System office location - Silicon Valley, CA"
                      className="h-48 w-full"
                    />
                  </div>
                  <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
                    123 Tech Plaza, Suite 400
                    <br />
                    Silicon Valley, CA 94043
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links Grid */}
      <section className="mx-auto w-full max-w-7xl px-4 md:px-6 py-16">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Quick Support
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Common actions for faster resolution
            </p>
          </div>
          <Link
            href={Routes.faq.index}
            className="group inline-flex items-center gap-1 text-sm font-bold text-primary"
          >
            View all resources
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {QUICK_LINKS.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.title}
                href={item.href}
                className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-primary/30 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                  <Icon className="size-6" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-slate-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {item.description}
                </p>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
