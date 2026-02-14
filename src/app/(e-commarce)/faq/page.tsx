import Link from "next/link";
import { ChevronRight, Search, Truck, CreditCard, Cpu, RotateCcw, HelpCircle } from "lucide-react";
import { Routes } from "@/lib/routes";
import FaqAccordionItem from "@/components/faq/FaqAccordionItem";
import FaqSidebar, { FaqSupportCard } from "@/components/faq/FaqSidebar";
import FaqSearchForm from "@/components/faq/FaqSearchForm";

const CATEGORY_CARDS = [
  { href: Routes.faq.shippingDelivery, icon: Truck, label: "Shipping & Delivery" },
  { href: "#", icon: CreditCard, label: "Payment Methods" },
  { href: Routes.faq.productCompatibility, icon: Cpu, label: "Product Compatibility" },
  { href: "#", icon: RotateCcw, label: "Returns & RMA" },
];

export default function FaqPage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8">
        <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-8">
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <ChevronRight className="size-4" />
          <span className="font-medium text-slate-900 dark:text-white">Help Center</span>
        </nav>

        {/* Hero */}
        <section className="relative rounded-xl overflow-hidden mb-12 bg-primary">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
              backgroundSize: "24px 24px",
            }}
          />
          <div className="relative py-16 px-6 md:px-8 flex flex-col items-center text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
              How can we help?
            </h1>
            <p className="text-blue-100 mb-8 text-lg">
              Search our technical knowledge base for hardware support, shipping times, or
              compatibility guides.
            </p>
            <FaqSearchForm className="w-full flex bg-white rounded-xl shadow-xl p-1.5" />
          </div>
        </section>

        {/* Category Quick Access */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {CATEGORY_CARDS.map((card, i) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.href}
                href={card.href}
                className={`flex flex-col items-center justify-center p-6 bg-white dark:bg-slate-900 rounded-xl border-b-4 shadow-sm hover:shadow-md transition-all group ${
                  i === 0 ? "border-primary" : "border-transparent hover:border-primary/50"
                }`}
              >
                <Icon
                  className={`size-8 mb-3 group-hover:scale-110 transition-transform ${
                    i === 0 ? "text-primary" : "text-slate-500 dark:text-slate-400 group-hover:text-primary"
                  }`}
                />
                <span className="text-sm font-bold text-slate-700 dark:text-slate-300 text-center">
                  {card.label}
                </span>
              </Link>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* FAQ Accordion */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <HelpCircle className="size-6 text-primary" />
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
                <h3 className="text-primary text-xs font-black uppercase tracking-widest mb-4">
                  Shipping & Delivery
                </h3>
                <div className="space-y-3">
                  <FaqAccordionItem
                    question="How long does standard shipping take for hardware?"
                    defaultOpen
                  >
                    Most in-stock networking hardware is processed within 24 hours. Standard delivery
                    typically takes 3-5 business days within Bangladesh. Express options are
                    available at checkout for urgent replacements.
                  </FaqAccordionItem>
                  <FaqAccordionItem question="Do you offer international shipping?">
                    We currently focus on domestic delivery within Bangladesh. For international
                    inquiries, please contact our sales team.
                  </FaqAccordionItem>
                </div>
              </div>
              <div className="border-b border-slate-200 dark:border-slate-800 pb-4 pt-4">
                <h3 className="text-primary text-xs font-black uppercase tracking-widest mb-4">
                  Product Compatibility
                </h3>
                <div className="space-y-3">
                  <FaqAccordionItem question="Are your SFP modules compatible with Cisco and Juniper?">
                    Our transceivers are MSA compliant and available with specific vendor coding for
                    Cisco, Juniper, Arista, and more. Use our Compatibility Finder or contact a
                    technical specialist to ensure you receive the correctly coded module.
                  </FaqAccordionItem>
                  <FaqAccordionItem question="Will this rackmount kit fit a 19-inch standard rack?">
                    Yes, all of our rack-mount accessories are built to EIA-310 standard
                    specifications for 19-inch rack frames unless explicitly stated otherwise in the
                    product description.
                  </FaqAccordionItem>
                </div>
              </div>
              <div className="pb-4 pt-4">
                <h3 className="text-primary text-xs font-black uppercase tracking-widest mb-4">
                  Returns & RMA
                </h3>
                <FaqAccordionItem question="What is your policy for DOA equipment?">
                  Dead on Arrival (DOA) equipment must be reported within 48 hours of delivery. We
                  will issue an immediate Advance Replacement and provide a prepaid return label for
                  the faulty unit.
                </FaqAccordionItem>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-8">
            <FaqSupportCard />
            <div className="bg-slate-900 dark:bg-slate-800 rounded-xl p-8 shadow-xl text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
              <h3 className="text-lg font-bold mb-4 relative z-10">Product Manuals</h3>
              <p className="text-slate-400 text-sm mb-6 relative z-10">
                Download technical data sheets, firmware update guides, and installation manuals.
              </p>
              <Link
                href="#"
                className="inline-flex items-center gap-2 text-primary font-bold hover:underline relative z-10"
              >
                Visit Resource Center
                <ChevronRight className="size-4" />
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
