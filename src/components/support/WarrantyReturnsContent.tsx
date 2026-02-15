"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  ShieldCheck,
  Router,
  Cable,
  Wifi,
  Box,
  Wrench,
  RotateCcw,
  ClipboardCheck,
  CheckCircle2,
  FileText,
  AlertTriangle,
  XCircle,
  Phone,
  Mail,
  MapPin,
  Download,
} from "lucide-react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { Routes } from "@/lib/routes";
import { useRouter } from "next/navigation";
import { slugify } from "@/lib/utils";

const BRANDS = [
  {
    name: "Cisco",
    icon: Router,
    period: "1-Year Limited",
    description:
      "Full hardware support and official software updates for authorized units in BD.",
  },
  {
    name: "Mikrotik",
    icon: Cable,
    period: "1-Year Replacement",
    description:
      "Direct replacement for manufacturing defects. Requires original box for RMA processing.",
  },
  {
    name: "Ubiquiti",
    icon: Wifi,
    period: "1-Year Manufacturer",
    description:
      "UniFi & EdgeMAX series covered under standard factory warranty terms.",
  },
  {
    name: "TP-Link",
    icon: Box,
    period: "2-Year Limited",
    description:
      "Extended local warranty for SMB and Enterprise grade networking equipment.",
  },
];

const RMA_STEPS = [
  {
    icon: Wrench,
    title: "1. Initial Diagnosis",
    description:
      "Contact our support desk for basic troubleshooting over phone/email.",
  },
  {
    icon: RotateCcw,
    title: "2. Submission",
    description:
      "Bring the faulty unit to our Dhaka service center with original invoice.",
  },
  {
    icon: ClipboardCheck,
    title: "3. Brand Verification",
    description:
      "Our engineers verify the fault with the manufacturer's RMA guidelines.",
  },
  {
    icon: CheckCircle2,
    title: "4. Resolution",
    description:
      "Receive your repaired or replacement unit within 7-15 working days.",
  },
];

const EXCLUSIONS = [
  "Physical damage or burnt marks",
  "Unauthorized repair attempts",
  "Liquid or moisture ingress",
  "Lighting/Power surge damage",
  "Missing serial number labels",
  "Custom third-party firmware",
];

export default function WarrantyReturnsContent() {
  const [serial, setSerial] = useState("");
  const router = useRouter();
  const handleCheckWarranty = () => {
    const q = serial.trim();
    if (!q) {
      toast.error("Enter serial number", {
        description: "Please enter a serial number to check.",
      });
      return;
    } else {
      toast.success("Warranty Checked", {
        description: "Your warranty has been checked successfully",
      });
      router.push(Routes.support.warrantyResults(slugify(q)));
    }
  };

  return (
    <main className="flex-1">
      {/* Hero with Warranty Checker */}
      <div className="relative w-full bg-primary/5 dark:bg-primary/10 py-16 px-4 md:px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-slate-900 dark:text-white text-4xl md:text-5xl font-black leading-tight tracking-tight mb-4">
            Warranty & Returns Policy
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto mb-10">
            Verified support for Cisco, Mikrotik, and Ubiquiti hardware in
            Bangladesh. Enter your serial number below to check your current
            coverage.
          </p>
          <div className="max-w-2xl mx-auto bg-white dark:bg-slate-900 p-2 rounded-xl shadow-xl shadow-primary/5 border border-primary/10 flex flex-col md:flex-row gap-2 items-center">
            <div className="flex-1 flex items-center px-4 gap-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-transparent focus-within:border-primary/30 focus-within:ring-2 focus-within:ring-primary/20 transition-all">
              <Search className="size-5 text-slate-400 shrink-0" />
              <input
                type="text"
                value={serial}
                onChange={(e) => setSerial(e.target.value)}
                placeholder="Enter Serial Number (e.g., SN-2023-NETL)"
                className="w-full bg-transparent border-none focus:ring-0 py-2.5 text-sm font-medium placeholder:text-slate-400 text-slate-900 dark:text-white focus:outline-none"
              />
            </div>
            <Button
              type="button"
              variant="default"
              size="lg"
              className=""
              onClick={handleCheckWarranty}
            >
              Check Warranty Status
            </Button>
          </div>
          <p className="mt-4 text-xs text-slate-400">
            Authorized Bangladesh Distribution Only
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-6 py-16">
        {/* Brand Warranty Grid */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <ShieldCheck className="size-8 text-primary" />
            <h2 className="text-slate-900 dark:text-white text-2xl font-bold">
              Warranty Coverage by Brand
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {BRANDS.map((brand) => {
              const Icon = brand.icon;
              return (
                <div
                  key={brand.name}
                  className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-primary/40 transition-all group"
                >
                  <div className="w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                    <Icon className="size-6 text-primary group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                    {brand.name}
                  </h3>
                  <p className="text-primary font-bold text-sm mb-2">
                    {brand.period}
                  </p>
                  <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">
                    {brand.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* RMA Process */}
        <div className="mb-20 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 md:p-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
              How to Claim Warranty in Bangladesh
            </h2>
            <p className="text-slate-500 dark:text-slate-400">
              A streamlined process to get your network back online as quickly
              as possible.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-10 left-[12.5%] right-[12.5%] h-0.5 bg-slate-200 dark:bg-slate-700 z-0" />
            {RMA_STEPS.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.title}
                  className="relative z-10 flex flex-col items-center text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-white dark:bg-slate-800 border-4 border-primary flex items-center justify-center mb-4 shadow-lg shadow-primary/10">
                    <Icon className="size-8 text-primary" />
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-white mb-2">
                    {step.title}
                  </h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Return & Refund + Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-10">
            <section>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <FileText className="size-6 text-primary" />
                Return & Refund Conditions
              </h3>
              <div className="text-slate-600 dark:text-slate-400 space-y-4">
                <p>
                  Net Land System offers a{" "}
                  <strong className="text-slate-900 dark:text-white">
                    7-day return policy
                  </strong>{" "}
                  for networking hardware subject to the following conditions:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    Items must be in original, unopened, and sealed factory
                    packaging.
                  </li>
                  <li>
                    Software licenses and activated cloud subscriptions are
                    non-refundable.
                  </li>
                  <li>
                    A 15% restocking fee applies to items that have been opened
                    but are non-defective.
                  </li>
                  <li>
                    Refunds are processed via original payment method within 10
                    business days.
                  </li>
                </ul>
              </div>
            </section>
            <section>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <AlertTriangle className="size-6 text-red-500" />
                Warranty Exclusions
              </h3>
              <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-6 rounded-r-lg">
                <p className="text-red-800 dark:text-red-200 font-medium mb-2">
                  Warranty will be void if:
                </p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-red-700 dark:text-red-300 text-sm">
                  {EXCLUSIONS.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <XCircle className="size-4 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-primary p-8 rounded-2xl text-white">
              <h4 className="text-xl font-bold mb-4">Need Help?</h4>
              <p className="text-white/80 mb-6 text-sm">
                Our technical team is ready to assist you with RMA requests.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Phone className="size-5 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-white/70">Hotline</p>
                    <p className="font-bold">+880 1712-345678</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="size-5 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-white/70">Email Support</p>
                    <p className="font-bold">rma@netland.com.bd</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="size-5 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-white/70">Service Center</p>
                    <p className="font-bold">
                      Multiplan Centre, Level 10, Dhaka
                    </p>
                  </div>
                </div>
              </div>
              <Link
                href="/support"
                className="block w-full mt-8 bg-white text-primary font-bold py-3 rounded-lg hover:bg-slate-100 transition-colors text-center"
              >
                Open Support Ticket
              </Link>
            </div>
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl">
              <h4 className="font-bold text-slate-900 dark:text-white mb-4">
                Download Forms
              </h4>
              <div className="space-y-3">
                <a
                  href="#"
                  className="flex items-center justify-between p-3 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group"
                >
                  <span className="text-sm font-medium text-slate-900 dark:text-white">
                    RMA Request Form
                  </span>
                  <Download className="size-4 text-slate-400 group-hover:text-primary" />
                </a>
                <a
                  href="#"
                  className="flex items-center justify-between p-3 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group"
                >
                  <span className="text-sm font-medium text-slate-900 dark:text-white">
                    Policy Document (PDF)
                  </span>
                  <Download className="size-4 text-slate-400 group-hover:text-primary" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
