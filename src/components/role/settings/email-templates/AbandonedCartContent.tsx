"use client";
import { useState } from "react";
import EmailTemplateEditor from "./EmailTemplateEditor";

const PRIMARY = "#ec4899"; // pink-500

const DUMMY_ITEMS = [
  { name: "Wireless Noise-Cancelling Headphones", sku: "WH-1000XM5", price: 349.99, qty: 1, img: "🎧" },
  { name: "USB-C Charging Hub (7-in-1)", sku: "HUB-7C-BLK", price: 59.99, qty: 2, img: "🔌" },
];

export default function AbandonedCartContent() {
  const [discount, setDiscount] = useState("10");

  const subtotal = DUMMY_ITEMS.reduce((s, i) => s + i.price * i.qty, 0);
  const discountAmount = subtotal * (Number(discount) / 100);
  const total = subtotal - discountAmount;

  return (
    <EmailTemplateEditor
      templateKey="abandoned-cart"
      defaultSubject="You left something behind, {customer_name}!"
    >
      {/* Header */}
      <div className="mb-10 text-center">
        <div
          className="mb-4 inline-flex size-16 items-center justify-center rounded-2xl"
          style={{ backgroundColor: `${PRIMARY}15` }}
        >
          <span className="text-3xl">🛒</span>
        </div>
        <h1 className="text-2xl font-bold text-slate-900">
          Your cart misses you!
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          You left some great items behind. Come back and complete your order.
        </p>
      </div>

      <p className="mb-6 text-slate-600">
        Hi{" "}
        <span className="font-mono" style={{ color: PRIMARY }}>
          {"{customer_name}"}
        </span>
        ,
      </p>
      <p className="mb-6 text-slate-600">
        It looks like you started an order but didn&apos;t finish. Your cart has
        been saved — but items sell out fast! Complete your purchase now before
        they&apos;re gone.
      </p>

      {/* Cart items */}
      <div className="mb-6">
        <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">
          Items in Your Cart
        </h3>
        <div className="space-y-3">
          {DUMMY_ITEMS.map((item) => (
            <div
              key={item.sku}
              className="flex items-center gap-4 rounded-xl border border-slate-100 bg-slate-50 p-4"
            >
              <div
                className="flex size-12 items-center justify-center rounded-lg text-2xl"
                style={{ backgroundColor: `${PRIMARY}10` }}
              >
                {item.img}
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-slate-800">
                  {item.name}
                </p>
                <p className="text-xs text-slate-500">SKU: {item.sku}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-slate-800">
                  ${(item.price * item.qty).toFixed(2)}
                </p>
                <p className="text-xs text-slate-400">Qty: {item.qty}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Discount offer */}
      <div
        className="mb-8 rounded-xl border p-5"
        style={{ borderColor: `${PRIMARY}30`, backgroundColor: `${PRIMARY}08` }}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-slate-800">
              🎁 Special Offer Just for You!
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Use code{" "}
              <span
                className="rounded border px-1.5 py-0.5 font-mono font-bold"
                style={{ color: PRIMARY, borderColor: `${PRIMARY}40` }}
              >
                COMEBACK{discount}
              </span>{" "}
              at checkout
            </p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2">
              <label className="text-xs text-slate-500">Discount %</label>
              <select
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                className="rounded border border-slate-200 bg-white px-2 py-1 text-xs font-bold focus:outline-none"
                style={{ color: PRIMARY }}
              >
                {["5", "10", "15", "20"].map((d) => (
                  <option key={d} value={d}>
                    {d}%
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Order summary */}
      <div className="mb-8 rounded-xl border border-slate-100 bg-slate-50 p-6">
        <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-400">
          Order Summary
        </h3>
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm text-slate-600">Subtotal</span>
          <span className="text-sm font-medium text-slate-800">
            ${subtotal.toFixed(2)}
          </span>
        </div>
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm text-slate-600">
            Discount ({discount}% off)
          </span>
          <span className="text-sm font-medium" style={{ color: PRIMARY }}>
            −${discountAmount.toFixed(2)}
          </span>
        </div>
        <div className="my-4 h-px bg-slate-200" />
        <div className="flex items-center justify-between">
          <span className="text-base font-bold text-slate-900">Total</span>
          <span className="text-base font-bold" style={{ color: PRIMARY }}>
            ${total.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Urgency */}
      <div className="mb-8 text-center">
        <p className="text-sm font-semibold text-slate-700">
          ⏰ Items in your cart are in high demand. Don&apos;t miss out!
        </p>
      </div>

      {/* CTA */}
      <div className="mt-12 border-t border-slate-100 pt-8 text-center">
        <button
          type="button"
          className="inline-block rounded-lg px-8 py-3 font-bold text-white"
          style={{ backgroundColor: PRIMARY }}
        >
          Complete My Purchase
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
