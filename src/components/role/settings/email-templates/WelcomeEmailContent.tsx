"use client";
import EmailTemplateEditor from "./EmailTemplateEditor";

const PRIMARY = "#10b981"; // emerald-500

export default function WelcomeEmailContent() {
  return (
    <EmailTemplateEditor
      templateKey="welcome-email"
      defaultSubject="Welcome to {store_name} — You're in!"
    >
      {/* Hero */}
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
              d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-slate-900">
          Welcome to{" "}
          <span style={{ color: PRIMARY }}>{"{store_name}"}</span>!
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          We&apos;re thrilled to have you on board.
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
        Your account has been created successfully. You can now browse our
        catalog, track orders, and enjoy exclusive member benefits.
      </p>

      {/* Benefits */}
      <div className="mb-8 space-y-3">
        {[
          { emoji: "🛍️", title: "Shop Thousands of Products", desc: "Browse our full catalog with exclusive member pricing." },
          { emoji: "📦", title: "Fast & Free Shipping", desc: "Free shipping on orders over $50." },
          { emoji: "🎁", title: "Exclusive Offers", desc: "Get early access to sales and special promotions." },
          { emoji: "💬", title: "24/7 Support", desc: "Our team is always here to help you." },
        ].map((b) => (
          <div
            key={b.title}
            className="flex items-start gap-4 rounded-xl border p-4"
            style={{ borderColor: `${PRIMARY}20`, backgroundColor: `${PRIMARY}05` }}
          >
            <span className="text-2xl">{b.emoji}</span>
            <div>
              <p className="text-sm font-semibold text-slate-800">{b.title}</p>
              <p className="text-xs text-slate-500">{b.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Account info */}
      <div className="mb-8 rounded-xl border border-slate-100 bg-slate-50 p-6">
        <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-400">
          Your Account
        </h3>
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm text-slate-600">Email</span>
          <span className="font-mono text-sm font-medium text-slate-800">
            {"{customer_email}"}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-600">Customer ID</span>
          <span className="font-mono text-sm font-medium text-slate-800">
            {"{customer_id}"}
          </span>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-12 border-t border-slate-100 pt-8 text-center">
        <button
          type="button"
          className="inline-block rounded-lg px-8 py-3 font-bold text-white"
          style={{ backgroundColor: PRIMARY }}
        >
          Start Shopping
        </button>
        <p className="mt-8 text-xs text-slate-400">
          Questions? Reach us at{" "}
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
