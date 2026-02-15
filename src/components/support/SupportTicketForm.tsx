"use client";

import { useState } from "react";
import { Upload } from "lucide-react";
import { Button } from "../ui/button";

const INQUIRY_OPTIONS = [
  "Technical Issue",
  "Billing Question",
  "Feature Request",
  "Account Access",
];

const PRIORITY_OPTIONS = [
  { value: "normal", label: "Normal" },
  { value: "high", label: "High" },
  { value: "urgent", label: "Urgent" },
] as const;

export type PriorityValue = (typeof PRIORITY_OPTIONS)[number]["value"];

export interface SupportTicketFormValues {
  fullName: string;
  email: string;
  subject: string;
  priority: PriorityValue;
  description: string;
  files: FileList | null;
}

export interface SupportTicketFormProps {
  /** Called on submit with form values. Return false to prevent reset. */
  onSubmit?: (values: SupportTicketFormValues) => void | boolean | Promise<void | boolean>;
  /** Optional title above the form */
  title?: string;
  /** Optional description below title */
  description?: string;
  /** Show the title/description block (default true) */
  showHeader?: boolean;
  /** Prefill full name (e.g. logged-in user) */
  defaultFullName?: string;
  /** Prefill email (e.g. logged-in user) */
  defaultEmail?: string;
  /** Submit button label */
  submitLabel?: string;
  /** Compact layout (single column, less padding) for embedding in panels */
  compact?: boolean;
}

const inputClass =
  "w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white";
const labelClass = "text-sm font-semibold text-slate-700 dark:text-slate-300";

export default function SupportTicketForm({
  onSubmit: onSubmitProp,
  title = "Submit a Support Ticket",
  description: desc = "Can't find what you're looking for? Our team is here to help.",
  showHeader = true,
  defaultFullName = "",
  defaultEmail = "",
  submitLabel = "Submit Ticket",
  compact = false,
}: SupportTicketFormProps) {
  const [fullName, setFullName] = useState(defaultFullName);
  const [email, setEmail] = useState(defaultEmail);
  const [subject, setSubject] = useState(INQUIRY_OPTIONS[0]);
  const [priority, setPriority] = useState<PriorityValue>("normal");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState<FileList | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const values: SupportTicketFormValues = {
      fullName,
      email,
      subject,
      priority,
      description,
      files,
    };
    const result = await onSubmitProp?.(values);
    if (result === false) return;
    setFullName(defaultFullName);
    setEmail(defaultEmail);
    setSubject(INQUIRY_OPTIONS[0]);
    setPriority("normal");
    setDescription("");
    setFiles(null);
  };

  return (
    <div className={compact ? "space-y-4" : "space-y-6"}>
      {showHeader && (
        <div className={compact ? "mb-4" : "mb-8"}>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white md:text-3xl">
            {title}
          </h2>
          <p className="mt-2 text-slate-600 dark:text-slate-400">{desc}</p>
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label className={labelClass}>Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="John Doe"
              className={inputClass}
            />
          </div>
          <div className="space-y-2">
            <label className={labelClass}>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john@example.com"
              className={inputClass}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label className={labelClass}>Inquiry Subject</label>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className={inputClass}
            >
              {INQUIRY_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className={labelClass}>Priority Level</label>
            <div className="flex flex-wrap gap-4 pt-2">
              {PRIORITY_OPTIONS.map((opt) => (
                <label
                  key={opt.value}
                  className="flex cursor-pointer items-center gap-2"
                >
                  <input
                    type="radio"
                    name="priority"
                    value={opt.value}
                    checked={priority === opt.value}
                    onChange={() => setPriority(opt.value)}
                    className="border-slate-300 text-primary focus:ring-primary dark:border-slate-600"
                  />
                  <span className="text-sm text-slate-700 dark:text-slate-300">
                    {opt.label}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <label className={labelClass}>Problem Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your issue in detail..."
            rows={5}
            className={inputClass}
          />
        </div>
        <div className="space-y-2">
          <label className={labelClass}>Attachments (optional)</label>
          <label className="flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-200 bg-slate-50 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800/50 dark:hover:bg-slate-800">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="mb-2 size-8 text-slate-400" />
              <p className="mb-2 text-sm text-slate-500 dark:text-slate-400">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-slate-400">PNG, JPG or PDF (MAX. 10MB)</p>
            </div>
            <input
              type="file"
              className="hidden"
              multiple
              accept=".png,.jpg,.jpeg,.pdf"
              onChange={(e) => setFiles(e.target.files)}
            />
          </label>
        </div>
        <Button
          type="submit"
          variant="default"
          size="lg"
          className="w-full py-6 text-base font-bold shadow-lg shadow-primary/30"
        >
          {submitLabel}
        </Button>
      </form>
    </div>
  );
}
