"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Lock, CreditCard, Banknote, Shield } from "lucide-react";
import { useAppSelector } from "@/store/hooks";
import { getCartTotal } from "@/store/cartSlice";
import { cn } from "@/lib/utils";

const DELIVERY_OPTIONS = [
  { id: "standard", label: "Standard Delivery", days: "3-5 Business Days", price: 60 },
  { id: "express", label: "Express Delivery", days: "Next Day Delivery", price: 150 },
];

const PAYMENT_OPTIONS = [
  { id: "cod", label: "Cash on Delivery", description: "Pay when you receive the order", icon: Banknote },
  { id: "ssl", label: "SSLCommerz / Online", description: "Cards, bKash, Rocket, Nogod", icon: CreditCard },
];

const DIVISIONS = ["Dhaka", "Chattogram", "Sylhet", "Rajshahi", "Khulna", "Barishal", "Rangpur", "Mymensingh"];
const DISTRICTS: Record<string, string[]> = {
  Dhaka: ["Dhaka City", "Gazipur", "Narayanganj", "Tangail", "Narsingdi"],
  Chattogram: ["Chattogram", "Cox's Bazar", "Comilla", "Noakhali"],
  Sylhet: ["Sylhet", "Moulvibazar", "Habiganj"],
  Rajshahi: ["Rajshahi", "Bogra", "Pabna"],
  Khulna: ["Khulna", "Jessore", "Satkhira"],
  Barishal: ["Barishal", "Patuakhali"],
  Rangpur: ["Rangpur", "Dinajpur", "Nilphamari"],
  Mymensingh: ["Mymensingh", "Jamalpur", "Netrokona"],
};
const AREAS: Record<string, string[]> = {
  "Dhaka City": ["Uttara", "Gulshan", "Banani", "Dhanmondi", "Mirpur", "Motijheel"],
  Gazipur: ["Gazipur Sadar", "Tongi", "Kaliakair"],
  Narayanganj: ["Narayanganj Sadar", "Fatullah", "Bandar"],
};

const VAT_RATE = 0.05;
const INPUT_CLASS =
  "w-full h-12 px-4 rounded-lg border border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-light";

export default function CheckoutContent() {
  const cartItems = useAppSelector((s) => s.cart.items);
  const subtotal = getCartTotal(cartItems);

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [division, setDivision] = useState("Dhaka");
  const [district, setDistrict] = useState("Dhaka City");
  const [area, setArea] = useState("Uttara");
  const [detailedAddress, setDetailedAddress] = useState("");
  const [delivery, setDelivery] = useState<"standard" | "express">("standard");
  const [payment, setPayment] = useState<"cod" | "ssl">("ssl");
  const [promoCode, setPromoCode] = useState("");

  const shippingFee = delivery === "standard" ? 60 : 150;
  const beforeTax = subtotal + shippingFee;
  const tax = Math.round(beforeTax * VAT_RATE);
  const total = beforeTax + tax;

  const districts = DISTRICTS[division] ?? ["Dhaka City"];
  const areas = AREAS[district] ?? [district, "Other"];

  if (cartItems.length === 0) {
    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Your cart is empty</h1>
          <p className="text-slate-500 dark:text-slate-400 mb-6">Add items from the shop to checkout.</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-black tracking-tight mb-2 text-slate-900 dark:text-white">
          Checkout
        </h1>
        <p className="text-slate-500 dark:text-slate-400 font-light">
          Securely complete your purchase of enterprise networking gear.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Checkout Form */}
        <div className="lg:col-span-8 space-y-6">
          {/* 1. Customer Information */}
          <section className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm">
                1
              </span>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Customer Information</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={INPUT_CLASS}
                  placeholder="admin@netland.com"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={INPUT_CLASS}
                  placeholder="+880 1XXX-XXXXXX"
                />
              </div>
            </div>
          </section>

          {/* 2. Shipping Address */}
          <section className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm">
                2
              </span>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Shipping Address (Bangladesh)
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Division</label>
                <select
                  value={division}
                  onChange={(e) => {
                    const div = e.target.value;
                    setDivision(div);
                    const distList = DISTRICTS[div] ?? ["Dhaka City"];
                    const d = distList[0];
                    setDistrict(d);
                    setArea(AREAS[d]?.[0] ?? d);
                  }}
                  className={INPUT_CLASS}
                >
                  {DIVISIONS.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">District</label>
                <select
                  value={district}
                  onChange={(e) => {
                    const d = e.target.value;
                    setDistrict(d);
                    setArea(AREAS[d]?.[0] ?? d);
                  }}
                  className={INPUT_CLASS}
                >
                  {districts.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Area / Upazila
                </label>
                <select
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  className={INPUT_CLASS}
                >
                  {areas.map((a) => (
                    <option key={a} value={a}>{a}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Detailed Address
              </label>
              <textarea
                value={detailedAddress}
                onChange={(e) => setDetailedAddress(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none font-light resize-none"
                placeholder="House no, Flat, Street address..."
                rows={3}
              />
            </div>
          </section>

          {/* 3. Delivery Method */}
          <section className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm">
                3
              </span>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Delivery Method</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {DELIVERY_OPTIONS.map((opt) => (
                <label
                  key={opt.id}
                  className={cn(
                    "relative flex cursor-pointer rounded-lg border p-4 transition-colors",
                    delivery === opt.id
                      ? "border-primary bg-primary/5"
                      : "border-slate-200 dark:border-slate-700 hover:border-primary/50"
                  )}
                >
                  <input
                    type="radio"
                    name="delivery"
                    value={opt.id}
                    checked={delivery === opt.id}
                    onChange={() => setDelivery(opt.id as "standard" | "express")}
                    className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer border-slate-300 text-primary focus:ring-primary"
                  />
                  <span className="ml-3 flex flex-col">
                    <span className="block text-sm font-bold text-slate-900 dark:text-white">
                      {opt.label}
                    </span>
                    <span className="mt-1 text-xs text-slate-500 font-light">{opt.days}</span>
                    <span className="mt-2 text-sm font-bold text-primary">
                      ৳{opt.price.toLocaleString()}
                    </span>
                  </span>
                </label>
              ))}
            </div>
          </section>

          {/* 4. Payment Method */}
          <section className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm">
                4
              </span>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Payment Method</h2>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {PAYMENT_OPTIONS.map((opt) => {
                  const Icon = opt.icon;
                  return (
                    <label
                      key={opt.id}
                      className={cn(
                        "flex items-center p-4 border rounded-lg cursor-pointer transition-colors",
                        payment === opt.id
                          ? "border-primary bg-primary/5"
                          : "border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
                      )}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={opt.id}
                        checked={payment === opt.id}
                        onChange={() => setPayment(opt.id as "cod" | "ssl")}
                        className="w-4 h-4 text-primary focus:ring-primary"
                      />
                      <div className="ml-4 flex items-center gap-3">
                        <Icon
                          className={cn(
                            "size-5",
                            payment === opt.id ? "text-primary" : "text-slate-400"
                          )}
                        />
                        <div>
                          <p className="text-sm font-bold text-slate-900 dark:text-white">
                            {opt.label}
                          </p>
                          <p className="text-xs text-slate-500 font-light">{opt.description}</p>
                        </div>
                      </div>
                    </label>
                  );
                })}
              </div>
              <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg flex items-center gap-4 border border-dashed border-slate-300 dark:border-slate-700">
                <Shield className="size-5 text-primary shrink-0" />
                <p className="text-xs text-slate-500 font-light">
                  Your transaction is secured by SSL encryption. We do not store your card details.
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Right: Order Summary (Sticky) */}
        <div className="lg:col-span-4">
          <div className="sticky top-24 space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-lg overflow-hidden">
              <div className="p-6 border-b border-slate-100 dark:border-slate-800">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">Order Summary</h2>
              </div>
              <div className="p-6 space-y-4 max-h-[400px] overflow-y-auto">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="relative h-16 w-16 rounded-lg bg-slate-100 dark:bg-slate-800 shrink-0 overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1">
                        {item.name}
                      </p>
                      <p className="text-xs text-slate-500 font-light">
                        {item.subtitle ?? "Qty"} • {item.quantity} {item.quantity === 1 ? "unit" : "units"}
                      </p>
                      <p className="text-sm font-bold text-primary mt-1">
                        ৳{(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-6 bg-slate-50 dark:bg-slate-800/50 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500 font-light">Subtotal</span>
                  <span className="font-medium text-slate-900 dark:text-white">
                    ৳{subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500 font-light">Shipping Fee</span>
                  <span className="font-medium text-slate-900 dark:text-white">
                    ৳{shippingFee.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500 font-light">Tax (VAT 5%)</span>
                  <span className="font-medium text-slate-900 dark:text-white">
                    ৳{tax.toLocaleString()}
                  </span>
                </div>
                <div className="pt-3 border-t border-slate-200 dark:border-slate-700 flex justify-between items-end">
                  <span className="text-base font-bold text-slate-900 dark:text-white">
                    Total Amount
                  </span>
                  <span className="text-2xl font-black text-primary">
                    ৳{total.toLocaleString()}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <button
                  type="button"
                  className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-lg shadow-xl shadow-primary/20 transition-all flex items-center justify-center gap-2"
                >
                  <Lock className="size-5" />
                  Place Order Now
                </button>
                <p className="text-[10px] text-center text-slate-400 mt-4 uppercase tracking-widest font-bold">
                  SSL Secured Transaction
                </p>
              </div>
            </div>
            <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex gap-2">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="flex-1 h-10 px-3 rounded border border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-sm font-light outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                placeholder="Promo code"
              />
              <button
                type="button"
                className="bg-slate-200 dark:bg-slate-700 px-4 rounded text-sm font-bold hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
