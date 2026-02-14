"use client";

import Image from "next/image";
import Link from "next/link";
import { CheckCircle, Truck, Download, ShieldCheck, Printer } from "lucide-react";
import { Routes } from "@/lib/routes";

const MOCK_ORDER = {
  orderId: "NL-882910",
  status: "Processing",
  delivery: "3-5 Business Days",
  items: [
    {
      name: "Mikrotik RB4011 Router",
      subtitle: "High-performance 10-port Gigabit router",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCo5iSLySnpsTj_GzMglrr34EwZraixs1N2EPlgUGZD0NrN7StRGn460TpjenOaZ16yJ8_9KFoafjEfdlpVG-1sITu9DuBdpjdLJds5qA80hL3ZOhFvpPL49NpXHAPp4KRX7HSNGu-E_mGC4W5kNtQhK8s0TOyeEY8roTmdFgbPb_mp-vk8poxmra8spP3HUI_OL4fBqUEo2bVsDdCXKrsJ5sfGNL7gfa4MlpRfmTXwIK_3119FfG6Z_Gs8RzfqwuQ75gyE33hyfbU",
      qty: 1,
      price: 19900,
    },
    {
      name: "Cisco Catalyst C9200L Switch",
      subtitle: "24-port Data, 4 x 1G fixed uplinks",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDv792bDBuGAB4e6k_vFiuiR3cbrjhcssj0auvQQvng6i1QAQ41StdDihFxvdphV779Cc0Dk6K2DlgvvTzgoxMvahih_xwa5lB5qR2wJQi5KXzFpWx4aSGIbxAYTMulM7S_nCIGTzXTWYXjnzGSjLquEG40iHtuTyX4VZM_dj3gzD46KDjRjnen6x-y4hME_IeoospUh1dmuEl6r90uaGayc2lXqSUhD13VLPIClg26vsi5gce05MGgsSmCWTdd8f0d43bB1S0qrAM",
      qty: 1,
      price: 245000,
    },
  ],
  subtotal: 264900,
  shipping: 0,
  total: 264900,
};

interface ThankYouContentProps {
  orderId?: string;
}

export default function ThankYouContent({ orderId }: ThankYouContentProps) {
  const order = {
    ...MOCK_ORDER,
    orderId: orderId || MOCK_ORDER.orderId,
  };

  const handlePrint = () => window.print();
  const handleDownloadInvoice = () => {
    // Placeholder: trigger invoice download
  };

  return (
    <main className="flex-1 flex flex-col items-center py-10 px-4 min-h-[60vh]">
      <div className="flex flex-col max-w-[800px] w-full gap-6">
        {/* Success Messaging */}
        <div className="text-center space-y-4 py-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 mb-2">
            <CheckCircle className="size-10" />
          </div>
          <h1 className="text-slate-900 dark:text-white tracking-tight text-3xl md:text-4xl font-bold leading-tight">
            Thank you for your order!
          </h1>
          <div className="space-y-1">
            <p className="text-slate-500 dark:text-slate-400 text-lg font-medium">
              Order ID: #{order.orderId}
            </p>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              A confirmation email has been sent to your inbox.
            </p>
          </div>
        </div>

        {/* Order Status / Delivery */}
        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 flex flex-col md:flex-row items-center gap-6">
          <div className="bg-primary/10 p-4 rounded-lg shrink-0">
            <Truck className="size-8 text-primary" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="font-bold text-lg text-slate-900 dark:text-white">
              Estimated Delivery for Bangladesh
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              Expected arrival:{" "}
              <span className="font-semibold text-primary">{order.delivery}</span>
            </p>
          </div>
          <div className="shrink-0">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-wider">
              {order.status}
            </span>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex flex-wrap justify-between items-center gap-2 bg-slate-50/50 dark:bg-slate-800/30">
            <h3 className="font-bold text-slate-900 dark:text-white">Order Summary</h3>
            <button
              type="button"
              onClick={handleDownloadInvoice}
              className="flex items-center gap-2 text-primary text-sm font-semibold hover:underline"
            >
              <Download className="size-4" />
              Download Invoice
            </button>
          </div>
          <div className="divide-y divide-slate-200 dark:divide-slate-800">
            {order.items.map((item, i) => (
              <div key={i} className="flex items-center gap-4 py-4 px-6">
                <div className="relative size-16 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden shrink-0 bg-slate-50 dark:bg-slate-800">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-contain p-1"
                  />
                </div>
                <div className="flex flex-col flex-1 min-w-0">
                  <p className="text-slate-900 dark:text-white text-base font-semibold leading-tight truncate">
                    {item.name}
                  </p>
                  <p className="text-slate-500 dark:text-slate-400 text-xs">{item.subtitle}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-slate-900 dark:text-white text-sm font-medium">
                    Qty: {item.qty}
                  </p>
                  <p className="text-slate-500 dark:text-slate-400 text-xs">
                    ৳{item.price.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-slate-50 dark:bg-slate-800/50 p-6 border-t border-slate-200 dark:border-slate-800">
            <div className="flex justify-between items-center">
              <span className="text-slate-500 dark:text-slate-400 text-sm">
                Subtotal ({order.items.length} items)
              </span>
              <span className="text-slate-900 dark:text-white font-medium">
                ৳{order.subtotal.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="text-slate-500 dark:text-slate-400 text-sm">Shipping to Dhaka</span>
              <span className="text-green-600 dark:text-green-400 font-medium text-sm">
                {order.shipping === 0 ? "Free" : `৳${order.shipping.toLocaleString()}`}
              </span>
            </div>
            <div className="flex justify-between items-center mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
              <span className="text-slate-900 dark:text-white font-bold text-lg">Total Amount</span>
              <span className="text-primary font-bold text-xl">
                ৳{order.total.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Support & Security */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center py-4">
          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs">
            <ShieldCheck className="size-4 text-primary shrink-0" />
            Authorized Dealer & Secure Transaction
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-sm text-center">
            Need help with your networking setup?{" "}
            <Link href="/contact" className="text-primary font-medium hover:underline">
              Contact our support team
            </Link>
          </p>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center pt-4 pb-12">
          <Link
            href={Routes.home}
            className="w-full sm:w-auto flex min-w-[240px] items-center justify-center rounded-lg h-12 px-8 bg-primary text-white text-base font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all"
          >
            Continue Shopping
          </Link>
          <button
            type="button"
            onClick={handlePrint}
            className="w-full sm:w-auto flex min-w-[180px] items-center justify-center gap-2 rounded-lg h-12 px-8 border-2 border-primary/20 text-primary bg-transparent text-base font-semibold hover:bg-primary/5 dark:hover:bg-primary/10 transition-all"
          >
            <Printer className="size-5" />
            Print Receipt
          </button>
        </div>
      </div>
    </main>
  );
}
