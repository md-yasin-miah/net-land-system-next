import Link from "next/link";
import { ChevronRight, MessageCircle, Mail } from "lucide-react";
import { Routes } from "@/lib/routes";
import FaqAccordionItem from "@/components/faq/FaqAccordionItem";
import FaqSidebar, { FaqSupportCard } from "@/components/faq/FaqSidebar";

export default function FaqShippingDeliveryPage() {
  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
      <FaqSidebar activeSlug="shipping" showSupportCard={false} showResourcesCard={false} />

      <main className="flex-1 flex flex-col min-w-0 bg-white dark:bg-slate-900">
        <div className="px-4 md:px-6 lg:px-12 py-6 border-b border-slate-200 dark:border-slate-800">
          <nav className="flex items-center gap-2 text-sm font-medium">
            <Link href={Routes.faq.index} className="text-primary hover:underline">
              Help Center
            </Link>
            <ChevronRight className="size-4 text-slate-400" />
            <span className="text-slate-500 dark:text-slate-400">Shipping & Delivery</span>
          </nav>
          <h1 className="mt-4 text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Shipping & Delivery
          </h1>
          <p className="mt-2 text-slate-500 dark:text-slate-400 max-w-2xl">
            Find answers to common questions about our shipping processes, delivery timelines, and
            logistics for enterprise gear.
          </p>
        </div>

        <div className="px-4 md:px-6 lg:px-12 py-8 flex flex-col gap-4">
          <FaqAccordionItem question="How to track my order?" defaultOpen>
            <p className="text-sm leading-relaxed">
              Once your order has shipped, you will receive an email with your tracking number and a
              link to the carrier&apos;s website. You can also track your order directly from your{" "}
              <Link href="/tracking" className="text-primary font-bold hover:underline">
                Account Dashboard
              </Link>{" "}
              under &apos;Order History&apos;. Simply click the &apos;Track Order&apos; button next
              to your most recent purchase to see real-time updates.
            </p>
          </FaqAccordionItem>

          <FaqAccordionItem question="Do you deliver on weekends?">
            <p className="text-sm leading-relaxed">
              Yes, we offer weekend delivery for most metropolitan areas. Standard Shipping
              typically delivers Monday through Friday, but our <strong>Expedited</strong> and{" "}
              <strong>Priority</strong> shipping methods include Saturday delivery at no extra cost
              in eligible areas. Sunday delivery is currently restricted to specific regions
              serviced by our local courier partners.
            </p>
          </FaqAccordionItem>

          <FaqAccordionItem question="What are the shipping costs for enterprise gear?">
            <p className="text-sm leading-relaxed mb-2">
              Shipping costs for enterprise-grade hardware are calculated based on weight, volume,
              and destination.
            </p>
            <ul className="list-disc ml-5 space-y-1 text-sm">
              <li>
                <strong>Domestic:</strong> Starting at ৳60 for standard, ৳150 for express.
              </li>
              <li>
                <strong>Corporate / Bulk:</strong> Custom quotes provided at checkout.
              </li>
              <li>
                <strong>White Glove Service:</strong> Available for large orders—contact sales.
              </li>
            </ul>
            <p className="mt-2 text-sm">
              Orders over ৳50,000 qualify for complimentary standard shipping within Dhaka.
            </p>
          </FaqAccordionItem>

          <FaqAccordionItem question="How do I change my shipping address after an order is placed?">
            <p className="text-sm leading-relaxed">
              If your order has not yet been processed (usually within 2 hours of placement), you
              can update the address via the{" "}
              <Link href="/account/orders" className="text-primary font-bold hover:underline">
                Self-Service Portal
              </Link>
              . If the order has already moved to &apos;Processing&apos; or &apos;Shipped&apos;,
              please contact our support team immediately. While we cannot guarantee changes once
              the item is with the carrier, we can often initiate a package redirect for a small
              carrier-imposed fee.
            </p>
          </FaqAccordionItem>
        </div>

        <div className="mt-auto px-4 md:px-6 lg:px-12 py-10 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-8 rounded-2xl bg-white dark:bg-slate-900 shadow-sm border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-5">
              <div className="size-14 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <MessageCircle className="size-8" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-slate-900 dark:text-white">Still need help?</h4>
                <p className="text-slate-500 dark:text-slate-400 text-sm">
                  Can&apos;t find the answer you&apos;re looking for? Our support team is here for
                  you.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Link
                href="/support"
                className="px-6 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-all inline-flex items-center gap-2"
              >
                <MessageCircle className="size-4" />
                Chat Now
              </Link>
              <Link
                href="/contact"
                className="px-6 py-2.5 rounded-lg bg-primary text-white font-bold text-sm hover:bg-primary/90 transition-all inline-flex items-center gap-2"
              >
                <Mail className="size-4" />
                Contact Us
              </Link>
            </div>
          </div>
        </div>

        <footer className="px-4 md:px-6 lg:px-12 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800">
          <p>© {new Date().getFullYear()} Net Land System. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link href="/contact" className="hover:text-primary transition-colors">
              Contact Support
            </Link>
          </div>
        </footer>
      </main>
    </div>
  );
}
