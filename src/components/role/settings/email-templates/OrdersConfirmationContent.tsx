"use client";
import EmailTemplateEditor from "./EmailTemplateEditor";

const PRIMARY = "#1152d4";

export default function OrdersConfirmationContent() {
  return (
    <EmailTemplateEditor
      templateKey="orders-confirmation"
      defaultSubject="Order Confirmation #{order_id}"
    >
      {/* Logo placeholder */}
      <div className="mb-10 text-center">
        <div className="mb-4 inline-flex size-16 items-center justify-center rounded-2xl bg-slate-50">
          <svg
            className="size-8 text-slate-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-slate-900">
          Thank you for your order!
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
        We&apos;ve received your order{" "}
        <span className="font-bold text-slate-800">#{"{order_id}"}</span> and
        we&apos;re getting it ready to ship. You&apos;ll receive another email
        with a tracking number as soon as it leaves our warehouse.
      </p>

      {/* Order summary box */}
      <div className="mb-8 rounded-xl border border-slate-100 bg-slate-50 p-6">
        <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-400">
          Order Summary
        </h3>
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm text-slate-600">Product Total</span>
          <span className="text-sm font-medium text-slate-800">
            {"{order_total}"}
          </span>
        </div>
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm text-slate-600">Shipping</span>
          <span className="text-sm font-medium text-slate-800">Free</span>
        </div>
        <div className="my-4 h-px bg-slate-200" />
        <div className="flex items-center justify-between">
          <span className="text-base font-bold text-slate-900">Total</span>
          <span className="text-base font-bold" style={{ color: PRIMARY }}>
            {"{order_total}"}
          </span>
        </div>
      </div>

      {/* Shipping address */}
      <div className="mb-8">
        <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">
          Shipping Address
        </h3>
        <p className="text-sm italic leading-relaxed text-slate-600">
          {"{shipping_address}"}
        </p>
      </div>

      {/* CTA */}
      <div className="mt-12 border-t border-slate-100 pt-8 text-center">
        <button
          type="button"
          className="inline-block rounded-lg px-8 py-3 font-bold text-white"
          style={{ backgroundColor: PRIMARY }}
        >
          View Order Status
        </button>
        <p className="mt-8 text-xs text-slate-400">
          If you have any questions, visit our{" "}
          <span className="cursor-pointer" style={{ color: PRIMARY }}>
            {"{support_link}"}
          </span>{" "}
          or reply to this email.
        </p>
        <p className="mt-4 text-xs font-bold uppercase tracking-widest text-slate-400">
          {"{store_name}"}
        </p>
      </div>
    </EmailTemplateEditor>
  );
}
