"use client";

import { useRef } from "react";
import { ChevronRight, Download, Printer, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import OrderInvoice from "@/components/templates/OrderInvoice";

export default function OrderInvoiceContent() {
  const invoiceRef = useRef<HTMLDivElement>(null);

  function printInvoice() {
    if (!invoiceRef.current) return;
    const content = invoiceRef.current.outerHTML;
    const win = window.open("", "_blank", "width=900,height=700");
    if (!win) return;
    win.document.write(`<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Invoice INV-2023-0842</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
      body { font-family: Inter, system-ui, sans-serif; background: white; margin: 0; padding: 24px; }
      @media print { body { padding: 0; } }
    </style>
  </head>
  <body>${content}</body>
</html>`);
    win.document.close();
    win.focus();
    // Wait for Tailwind CDN to load before printing
    setTimeout(() => {
      win.print();
      win.close();
    }, 800);
  }
  const ACTIVITY = [
    {
      label: "Invoice created",
      meta: "Oct 24, 2023 · 09:12 AM by Sarah Jenkins",
      dot: "bg-blue-500",
    },
    {
      label: "Sent to client",
      meta: "Oct 24, 2023 · 10:45 AM via Automated Dispatch",
      dot: "bg-slate-300",
      muted: true,
    },
    {
      label: "Viewed by client",
      meta: "Oct 25, 2023 · 02:22 PM from Austin, TX",
      dot: "bg-emerald-500",
    },
  ];
  return (
    <div className="space-y-6">
      {/* Breadcrumb & Actions */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <span className="cursor-pointer hover:text-blue-800 transition-colors">
              Invoices
            </span>
            <ChevronRight className="size-4" />
            <span className="font-medium text-slate-900 dark:text-white">
              INV-2023-0842
            </span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Invoice INV-2023-0842
          </h1>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            className="gap-2 shadow-sm"
            onClick={printInvoice}
          >
            <Download className="size-[18px]" />
            Download PDF
          </Button>
          <Button variant="outline" className="gap-2 shadow-sm" onClick={printInvoice}>
            <Printer className="size-[18px]" />
            Print
          </Button>
          <Button className="gap-2 bg-blue-700 font-semibold text-white shadow-md hover:bg-blue-800">
            <Send className="size-[18px]" />
            Send Invoice
          </Button>
        </div>
      </div>

      {/* Invoice template */}
      <div ref={invoiceRef}>
        <OrderInvoice
          invoiceNumber="INV-2023-0842"
          issueDate="October 24, 2023"
          dueDate="November 23, 2023"
          status="pending"
        />
      </div>
      {/* Invoice Activity */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 print:hidden">
        <h3 className="mb-4 flex items-center gap-2 font-bold text-slate-900 dark:text-white">
          <span className="size-4 text-slate-400">&#9203;</span>
          Invoice Activity
        </h3>
        <div className="space-y-4">
          {ACTIVITY.map((event) => (
            <div key={event.meta} className="flex items-start gap-3">
              <div
                className={`mt-2 size-2 shrink-0 rounded-full ${event.dot}`}
              />
              <div>
                <p
                  className={`text-sm font-semibold ${
                    event.muted
                      ? "text-slate-600 dark:text-slate-400"
                      : "text-slate-900 dark:text-white"
                  }`}
                >
                  {event.label}
                </p>
                <p className="text-xs text-slate-500">{event.meta}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
