import {
  Mail,
  CreditCard,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const PRIMARY = "#1152d4";

const LINE_ITEMS = [
  {
    description: "NetCore L3 Managed Switch",
    detail: "48-Port Gigabit Ethernet, 4x 10G SFP+ Uplinks, PoE+ Support",
    sku: "NC-SW-48P-L3",
    qty: 12,
    unitPrice: 1250,
    amount: 15000,
  },
  {
    description: "Enterprise Wi-Fi 6E Access Point",
    detail: "Tri-Band Internal Antennas, Ceiling Mount Kit Included",
    sku: "NC-AP-6E-INT",
    qty: 25,
    unitPrice: 450,
    amount: 11250,
  },
  {
    description: "Network Audit & Optimization",
    detail: "Professional Service - On-site physical audit and configuration check",
    sku: "SVC-AUD-PRO",
    qty: 1,
    unitPrice: 2800,
    amount: 2800,
  },
  {
    description: "Remote Configuration Deployment",
    detail: "Firmware updates and VLAN provisioning (8 Hours)",
    sku: "SVC-REM-CFG",
    qty: 8,
    unitPrice: 175,
    amount: 1400,
  },
];



export interface OrderInvoiceProps {
  invoiceNumber?: string;
  issueDate?: string;
  dueDate?: string;
  status?: "pending" | "paid" | "overdue";
}

export default function OrderInvoice({
  invoiceNumber = "INV-2023-0842",
  issueDate = "October 24, 2023",
  dueDate = "November 23, 2023",
  status = "pending",
}: OrderInvoiceProps) {
  const subtotal = 30450;
  const shipping = 125;
  const tax = 2512.12;
  const total = subtotal + shipping + tax;

  const statusConfig = {
    pending: {
      label: "Payment Pending",
      className:
        "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400",
      dot: "bg-amber-500",
    },
    paid: {
      label: "Paid",
      className:
        "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400",
      dot: "bg-emerald-500",
    },
    overdue: {
      label: "Overdue",
      className: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400",
      dot: "bg-red-500",
    },
  }[status];

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Invoice Document */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-900 print:shadow-none">
        {/* Header */}
        <div className="border-b border-slate-100 p-8 dark:border-slate-800 md:p-12">
          <div className="flex flex-col justify-between gap-8 md:flex-row">
            {/* Company */}
            <div className="space-y-4">
              <div>
                <h2 className="text-2xl font-black uppercase tracking-tight text-slate-900 dark:text-white">
                  NetCore Systems
                </h2>
                <p className="text-xs font-medium uppercase tracking-widest text-slate-500">
                  Networking Hardware &amp; Services
                </p>
              </div>
              <div className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                <p>1284 Tech Boulevard, Suite 500</p>
                <p>San Francisco, CA 94107</p>
                <p>United States</p>
                <p className="mt-2 flex items-center gap-2">
                  <Mail className="size-3" />
                  billing@netcore.systems
                </p>
              </div>
            </div>

            {/* Invoice meta */}
            <div className="space-y-4 text-left md:text-right">
              <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider">
                <span
                  className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${statusConfig.className}`}
                >
                  <span
                    className={`size-1.5 rounded-full ${statusConfig.dot}`}
                  />
                  {statusConfig.label}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-x-8 md:block">
                <div className="mb-4">
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                    Invoice Number
                  </p>
                  <p className="text-xl font-bold text-slate-900 dark:text-white">
                    {invoiceNumber}
                  </p>
                </div>
                <div className="mb-4">
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                    Issue Date
                  </p>
                  <p className="font-medium text-slate-900 dark:text-white">
                    {issueDate}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                    Due Date
                  </p>
                  <p className="font-medium text-slate-900 dark:text-white">
                    {dueDate}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bill To / Ship To */}
        <div className="grid grid-cols-1 gap-8 bg-slate-50 px-8 py-8 dark:bg-slate-800/50 md:grid-cols-2 md:px-12">
          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-400">
              Bill To
            </h3>
            <div className="text-sm text-slate-900 dark:text-slate-200">
              <p className="mb-1 text-base font-bold">
                Global Data Dynamics Inc.
              </p>
              <p>Attn: Procurement Department</p>
              <p>892 Innovation Way</p>
              <p>Austin, TX 78701</p>
              <p>United States</p>
              <p className="mt-3 text-slate-500">VAT ID: US892100451</p>
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-400">
              Ship To
            </h3>
            <div className="text-sm text-slate-900 dark:text-slate-200">
              <p className="mb-1 text-base font-bold">GDD Logistics Hub</p>
              <p>444 Distribution Cir</p>
              <p>Pflugerville, TX 78660</p>
              <p>United States</p>
              <p className="mt-3 text-slate-500">
                Contact: +1 (512) 555-0198
              </p>
            </div>
          </div>
        </div>

        {/* Line Items */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
                {[
                  { label: "Description", align: "left", wide: true },
                  { label: "SKU", align: "right" },
                  { label: "Qty", align: "right" },
                  { label: "Unit Price", align: "right" },
                  { label: "Amount", align: "right", wide: true },
                ].map((h) => (
                  <th
                    key={h.label}
                    className={`py-4 text-xs font-bold uppercase tracking-widest text-slate-400 ${
                      h.wide ? "px-8 md:px-12" : "px-4"
                    } ${h.align === "right" ? "text-right" : ""}`}
                  >
                    {h.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {LINE_ITEMS.map((item) => (
                <tr
                  key={item.sku}
                  className="transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/30"
                >
                  <td className="px-8 py-6 md:px-12">
                    <div className="font-bold text-slate-900 dark:text-white">
                      {item.description}
                    </div>
                    <div className="mt-1 text-sm text-slate-500">
                      {item.detail}
                    </div>
                  </td>
                  <td className="px-4 py-6 text-right font-mono text-sm text-slate-600 dark:text-slate-400">
                    {item.sku}
                  </td>
                  <td className="px-4 py-6 text-right font-medium">
                    {item.qty}
                  </td>
                  <td className="px-4 py-6 text-right text-slate-600 dark:text-slate-400">
                    ${item.unitPrice.toLocaleString()}.00
                  </td>
                  <td className="px-8 py-6 text-right font-bold text-slate-900 dark:text-white md:px-12">
                    ${item.amount.toLocaleString()}.00
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer: Terms + Totals */}
        <div className="flex flex-col justify-between gap-10 p-8 md:flex-row md:p-12">
          {/* Payment terms + wire transfer */}
          <div className="flex-1 space-y-6">
            <div>
              <h4 className="mb-2 text-xs font-bold uppercase tracking-widest text-slate-400">
                Payment Terms
              </h4>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                Payment is due within 30 days of the invoice date (Net 30).
                Late payments are subject to a 1.5% monthly finance charge.
                Hardware remains property of NetCore Systems until full payment
                is received.
              </p>
            </div>
            <div
              className="rounded-lg border p-4"
              style={{
                backgroundColor: `${PRIMARY}0d`,
                borderColor: `${PRIMARY}1a`,
              }}
            >
              <h4
                className="mb-2 text-xs font-bold uppercase tracking-widest"
                style={{ color: PRIMARY }}
              >
                Wire Transfer Instructions
              </h4>
              <div className="grid grid-cols-2 gap-2 text-sm text-slate-900 dark:text-slate-200">
                <span className="text-slate-500">Bank:</span>
                <span className="font-medium">Global First Bank</span>
                <span className="text-slate-500">Account No:</span>
                <span className="font-medium">9877 1223 0041</span>
                <span className="text-slate-500">SWIFT/BIC:</span>
                <span className="font-medium">GFBAUS33X</span>
                <span className="text-slate-500">Reference:</span>
                <span className="font-bold" style={{ color: PRIMARY }}>
                  {invoiceNumber}
                </span>
              </div>
            </div>
          </div>

          {/* Totals */}
          <div className="w-full space-y-3 md:w-80">
            <div className="flex justify-between border-b border-slate-100 py-2 text-sm text-slate-600 dark:border-slate-800 dark:text-slate-400">
              <span>Subtotal</span>
              <span>${subtotal.toLocaleString()}.00</span>
            </div>
            <div className="flex justify-between border-b border-slate-100 py-2 text-sm text-slate-600 dark:border-slate-800 dark:text-slate-400">
              <span>Shipping &amp; Handling</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between border-b border-slate-100 py-2 text-sm text-slate-600 dark:border-slate-800 dark:text-slate-400">
              <span>Tax (VAT 8.25%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-4 text-slate-900 dark:text-white">
              <span className="text-lg font-bold">Total Amount Due</span>
              <span
                className="text-2xl font-black"
                style={{ color: PRIMARY }}
              >
                ${total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </span>
            </div>
            <Button
              className="w-full gap-2 py-3 font-bold text-white"
              style={{ backgroundColor: PRIMARY }}
            >
              <CreditCard className="size-5" />
              Pay Online Now
            </Button>
          </div>
        </div>

        {/* Bottom note */}
        <div className="border-t border-slate-100 px-8 py-4 text-center dark:border-slate-800 md:px-12">
          <p className="text-xs font-medium text-slate-400">
            Thank you for choosing NetCore Systems for your infrastructure
            needs.
          </p>
        </div>
      </div>
    </div>
  );
}
