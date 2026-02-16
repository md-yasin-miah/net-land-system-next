// Color Scheme Constants
export const COLORS = {
  primary: "#1152d4",
  primaryDark: "#0d3ea8",
  backgroundLight: "#f6f6f8",
  backgroundDark: "#101622",
  orange: {
    500: "#f97316",
    600: "#ea580c",
  },
  slate: {
    100: "#f1f5f9",
    200: "#e2e8f0",
    300: "#cbd5e1",
    400: "#94a3b8",
    500: "#64748b",
    600: "#475569",
    700: "#334155",
    800: "#1e293b",
    900: "#0f172a",
  },
} as const;
// Company Information
export const COMPANY_INFO = {
  name: "Net Land System Bangladesh",
  shortName: "Net Land System",
  tagline: "Networking Hardware Store",
  description:
    "Your premier destination for networking excellence in Bangladesh. We supply enterprise-grade hardware to IT professionals and corporate firms.",
  address: {
    line1: "IDB Bhaban, Level 3, Shop 312",
    line2: "Dhaka-1207, Bangladesh",
  },
  contact: {
    phones: ["+880 1712-345678", "+880 2-9876543"],
    emails: ["sales@netland.com.bd", "support@netland.com.bd"],
  },
  social: {
    facebook: "#",
    twitter: "#",
    linkedin: "#",
  },
} as const;

// Free Shipping Threshold
export const FREE_SHIPPING_THRESHOLD = 50000;

// Currency
export const CURRENCY = {
  symbol: "৳",
  code: "BDT",
  name: "Bangladeshi Taka",
} as const;

// Features
export const SITE_FEATURES = [
  {
    icon: "verified",
    title: "Official Warranty",
    description: "100% Genuine Products",
  },
  {
    icon: "headset_mic",
    title: "Expert Support",
    description: "Certified Tech Engineers",
  },
  {
    icon: "payments",
    title: "Corporate Deals",
    description: "Credit Facility for Firms",
  },
  {
    icon: "bolt",
    title: "Express Delivery",
    description: "Same Day in Dhaka",
  },
] as const;

// Payment Methods
export const PAYMENT_METHODS = ["VISA", "BKASH", "NAGAD", "COD"] as const;

