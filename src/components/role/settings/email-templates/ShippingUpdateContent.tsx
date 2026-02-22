"use client";
import EmailTemplateEditor from "./EmailTemplateEditor";

const PRIMARY = "#0ea5e9"; // sky-500

export default function ShippingUpdateContent() {
  return (
    <EmailTemplateEditor
      templateKey="shipping-update"
      defaultSubject="Your order #{order_id} has shipped!"
    >
      {/* Header */}
      <div className="mb-10 text-center">
        <div
          className="mb-4 inline-flex size-16 items-center justify-center rounded-2xl"
          style={{ backgroundColor: `${PRIMARY}15` }}
        >
          <svg
            className="size-8"
            style={{ color: PRIMARY }}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-slate-900">
          Your order is on its way!
        </h1>
      </div>

      <p className="mb-6 text-slate-600">
        Hi{" "}
        <span className="font-mono" style={{ color: PRIMARY }}>
          {"{customer_name}"}
        </span>
        ,
      </p>
      <p className="mb-6 text-slate-600">
        Great news! Your order{" "}
        <span className="font-bold text-slate-800">#{"{order_id}"}</span> has
        been shipped and is on its way to you. You can track your package using
        the tracking number below.
      </p>

      {/* Tracking box */}
      <div
        className="mb-8 rounded-xl border p-6"
        style={{ backgroundColor: `${PRIMARY}08`, borderColor: `${PRIMARY}20` }}
      >
        <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-400">
          Tracking Information
        </h3>
        <div className="mb-3 flex items-center justify-between">
          <span className="text-sm text-slate-600">Tracking Number</span>
          <span
            className="rounded px-2 py-0.5 font-mono text-sm font-bold"
            style={{ color: PRIMARY, backgroundColor: `${PRIMARY}15` }}
          >
            {"{tracking_number}"}
          </span>
        </div>
        <div className="mb-3 flex items-center justify-between">
          <span className="text-sm text-slate-600">Estimated Delivery</span>
          <span className="text-sm font-medium text-slate-800">
            3–5 business days
          </span>
        </div>
        <div className="mb-3 flex items-center justify-between">
          <span className="text-sm text-slate-600">Ship Date</span>
          <span className="text-sm font-medium text-slate-800">
            {"{order_date}"}
          </span>
        </div>
      </div>

      {/* Delivery address */}
      <div className="mb-8">
        <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">
          Delivery Address
        </h3>
        <p className="text-sm italic leading-relaxed text-slate-600">
          {"{shipping_address}"}
        </p>
      </div>

      {/* Progress tracker */}
      <div className="mb-8">
        <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-400">
          Shipment Progress
        </h3>
        <div className="flex items-center gap-0">
          {["Order Placed", "Processing", "Shipped", "Out for Delivery", "Delivered"].map(
            (step, i) => (
              <div key={step} className="flex flex-1 flex-col items-center">
                <div
                  className="flex size-8 items-center justify-center rounded-full text-xs font-bold text-white"
                  style={{
                    backgroundColor: i <= 2 ? PRIMARY : "#e2e8f0",
                    color: i <= 2 ? "white" : "#94a3b8",
                  }}
                >
                  {i + 1}
                </div>
                <p
                  className="mt-1 text-center text-[10px] font-medium"
                  style={{ color: i <= 2 ? PRIMARY : "#94a3b8" }}
                >
                  {step}
                </p>
              </div>
            )
          )}
        </div>
      </div>

      {/* CTA */}
      <div className="mt-12 border-t border-slate-100 pt-8 text-center">
        <button
          type="button"
          className="inline-block rounded-lg px-8 py-3 font-bold text-white"
          style={{ backgroundColor: PRIMARY }}
        >
          Track My Package
        </button>
        <p className="mt-8 text-xs text-slate-400">
          Need help?{" "}
          <span className="cursor-pointer" style={{ color: PRIMARY }}>
            {"{support_link}"}
          </span>
        </p>
        <p className="mt-4 text-xs font-bold uppercase tracking-widest text-slate-400">
          {"{store_name}"}
        </p>
      </div>
    </EmailTemplateEditor>
  );
}
