"use client";
import EmailTemplateEditor from "./EmailTemplateEditor";

const PRIMARY = "#f59e0b"; // amber-500

export default function PasswordResetContent() {
  return (
    <EmailTemplateEditor
      templateKey="password-reset"
      defaultSubject="Reset your {store_name} password"
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
              d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-slate-900">
          Reset Your Password
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          We received a request to reset your password.
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
        We received a request to reset the password for your account associated
        with{" "}
        <span className="font-mono font-medium text-slate-800">
          {"{customer_email}"}
        </span>
        . Click the button below to choose a new password.
      </p>

      {/* Reset button */}
      <div className="mb-8 text-center">
        <button
          type="button"
          className="inline-block rounded-lg px-10 py-3 font-bold text-white"
          style={{ backgroundColor: PRIMARY }}
        >
          Reset My Password
        </button>
        <p className="mt-3 text-xs text-slate-400">
          This link expires in <strong>24 hours</strong>.
        </p>
      </div>

      {/* Warning box */}
      <div
        className="mb-8 rounded-xl border p-5"
        style={{ borderColor: `${PRIMARY}30`, backgroundColor: `${PRIMARY}08` }}
      >
        <div className="flex items-start gap-3">
          <span className="text-xl">⚠️</span>
          <div>
            <p className="text-sm font-semibold text-slate-800">
              Didn&apos;t request this?
            </p>
            <p className="mt-1 text-xs text-slate-500">
              If you didn&apos;t request a password reset, you can safely ignore
              this email. Your password will remain unchanged.
            </p>
          </div>
        </div>
      </div>

      {/* Security tips */}
      <div className="mb-8 rounded-xl border border-slate-100 bg-slate-50 p-6">
        <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-400">
          Security Tips
        </h3>
        <ul className="space-y-2 text-sm text-slate-600">
          {[
            "Use a strong password with at least 8 characters.",
            "Include uppercase letters, numbers, and symbols.",
            "Never share your password with anyone.",
            "Use a unique password for each account.",
          ].map((tip) => (
            <li key={tip} className="flex items-start gap-2">
              <span style={{ color: PRIMARY }}>✓</span>
              {tip}
            </li>
          ))}
        </ul>
      </div>

      {/* Footer */}
      <div className="mt-12 border-t border-slate-100 pt-8 text-center">
        <p className="text-xs text-slate-400">
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
