/**
 * Central menu configuration for the app.
 * Header, Footer, User sidebar, E-commerce sidebar, and FAQ menus are managed here.
 */

import {
  LucideIcon,
  LayoutDashboard,
  ShoppingCart,
  ShieldCheck,
  MessageSquare,
  Settings,
  MapPin,
  HelpCircle,
  Truck,
  CreditCard,
  Cpu,
  RotateCcw,
  Package,
  FolderTree,
  Users,
  BookOpen,
  BookMarked,
  Warehouse,
  Receipt,
  Ticket,
  BarChart3,
  ArrowLeftRight,
  Wallet,
  User,
  LogOut,
} from "lucide-react";
import type { Role } from "@/lib/mockData";
import type { Permission } from "@/lib/mockData";
import { Routes } from "@/lib/routes";

// ----- Header (E-commerce) -----
export const headerSubNav: { href: string; label: string }[] = [
  { href: "/categories", label: "All Categories" },
  { href: "/deals", label: "Today's Deals" },
  { href: "/new-arrivals", label: "New Arrivals" },
  { href: "/corporate", label: "Corporate Sales" },
  { href: "/best-sellers", label: "Best Sellers" },
  { href: Routes.support.index, label: "Customer Service" },
];

// ----- Footer -----
export interface FooterLink {
  href: string;
  label: string;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export const footerSections: FooterSection[] = [
  {
    title: "Information",
    links: [
      { href: "/about", label: "About Us" },
      { href: Routes.faq.index, label: "FAQ / Help Center" },
      { href: "/contact", label: "Contact Support" },
      { href: "/returns", label: "Return & Refund Policy" },
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms & Conditions" },
    ],
  },
  {
    title: "Customer Service",
    links: [
      { href: Routes.support.tracking, label: "Order Tracking" },
      { href: "/corporate-sales", label: "Corporate Sales" },
      { href: Routes.support.warrantyReturns, label: "Warranty & Returns" },
      { href: Routes.support.tickets, label: "Support Ticket" },
      { href: "/sitemap", label: "Sitemap" },
    ],
  },
];

// Footer social links (icon keys mapped to Lucide icons in Footer.tsx)
export const footerSocialLinks: { href: string; icon: string }[] = [
  { href: "#", icon: "social_leaderboard" },
  { href: "#", icon: "alternate_email" },
  { href: "#", icon: "public" },
];

// ----- User Panel Sidebar -----
export interface UserNavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

export const userSidebarNav: UserNavItem[] = [
  { href: Routes.me.dashboard, label: "Dashboard", icon: LayoutDashboard },
  { href: Routes.me.orders, label: "My Orders", icon: ShoppingCart },
  { href: Routes.me.warranty, label: "Warranty & RMA", icon: ShieldCheck },
  { href: Routes.me.tickets, label: "Support Tickets", icon: MessageSquare },
];

export const userSidebarSettings: UserNavItem[] = [
  { href: Routes.me.settings, label: "Account Settings", icon: Settings },
  { href: Routes.me.addresses, label: "Addresses", icon: MapPin },
];

// ----- E-commerce Home Sidebar (categories) -----
export interface EcommerceSidebarItem {
  href: string;
  name: string;
  icon: string; // Material Symbol name
}

export const ecommerceSidebarCategories: EcommerceSidebarItem[] = [
  { href: "/categories/routers", name: "Routers", icon: "router" },
  { href: "/categories/switches", name: "Switches", icon: "switch" },
  { href: "/categories/access-points", name: "Access Points", icon: "wifi" },
  {
    href: "/categories/enterprise",
    name: "Enterprise Solutions",
    icon: "business_center",
  },
  { href: "/categories/servers", name: "Servers", icon: "dns" },
  { href: "/categories/cables", name: "Cables & Wiring", icon: "cable" },
  { href: "/categories/racks", name: "Racks & Cabinets", icon: "shelves" },
];

// ----- FAQ Sidebar & Category Cards -----
export interface FaqNavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

export const faqSidebarCategories: FaqNavItem[] = [
  { href: Routes.faq.index, icon: HelpCircle, label: "General" },
  {
    href: Routes.faq.shippingDelivery,
    icon: Truck,
    label: "Shipping & Delivery",
  },
  { href: "#", icon: CreditCard, label: "Payments" },
  { href: "#", icon: Cpu, label: "Technical Support" },
  { href: "#", icon: RotateCcw, label: "Returns & Refunds" },
];

/** FAQ page category quick-access cards (same structure, used on main FAQ page grid) */
export const faqCategoryCards: FaqNavItem[] = [
  {
    href: Routes.faq.shippingDelivery,
    icon: Truck,
    label: "Shipping & Delivery",
  },
  { href: "#", icon: CreditCard, label: "Payment Methods" },
  {
    href: Routes.faq.productCompatibility,
    icon: Cpu,
    label: "Product Compatibility",
  },
  { href: "#", icon: RotateCcw, label: "Returns & RMA" },
];
export interface RoleSidebarNav {
  label: string;
  items: RoleSidebarNavItem[];
}
export interface RoleSidebarNavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}
export const roleSidebarNav:RoleSidebarNav[] = [
  {
    label: "Dashboard",
    items: [{ href: "dashboard", label: "Dashboard", icon: LayoutDashboard }],
  },
  {
    label: "Sales & Ops",
    items: [
      { href: "pos", label: "POS System", icon: Package },
      { href: "orders", label: "Orders", icon: ShoppingCart },
      { href: "products", label: "Products", icon: Package },
      { href: "categories", label: "Categories", icon: FolderTree },
    ],
  },
  {
    label: "Stakeholders",
    items: [
      { href: "customers", label: "Customers", icon: Users },
      { href: "customer-ledger", label: "Customer Ledger", icon: BookOpen },
      { href: "suppliers", label: "Suppliers", icon: Truck },
      { href: "supplier-ledger", label: "Supplier Ledger", icon: BookMarked },
    ],
  },
  {
    label: "Procurement",
    items: [
      { href: "inventory", label: "Inventory", icon: Warehouse },
      { href: "purchase-orders", label: "Purchase Orders", icon: Receipt },
    ],
  },
  {
    label: "Analytics & Admin",
    items: [
      { href: "coupons", label: "Coupons", icon: Ticket },
      { href: "reports", label: "Reports", icon: BarChart3 },
      { href: "transactions", label: "Transactions", icon: ArrowLeftRight },
      { href: "expenses", label: "Expenses", icon: Wallet },
      { href: "settings", label: "Settings", icon: Settings },
    ],
  },
];

// ----- Role-based profile dropdown menu (Header) -----
export type RoleBaseMenuItemLink = {
  type: "link";
  label: string;
  href: string;
  icon?: LucideIcon;
  shortcut?: string;
  /** Show only if user.role is in this array; omit to show to all */
  roles?: Role[];
  /** Show only if user has any of these permissions; omit to show to all */
  permissions?: Permission[];
};

export type RoleBaseMenuItemButton = {
  type: "button";
  id?: string;
  label: string;
  /** Optional: if not set, use onAction(id) from component when id is provided */
  onClick?: () => void;
  icon?: LucideIcon;
  shortcut?: string;
  roles?: Role[];
  permissions?: Permission[];
};

export type RoleBaseMenuItemSeparator = { type: "separator" };

export type RoleBaseMenuItemLabel = {
  type: "label";
  label: string;
};

export type RoleBaseProfileMenuItem =
  | RoleBaseMenuItemLink
  | RoleBaseMenuItemButton
  | RoleBaseMenuItemSeparator
  | RoleBaseMenuItemLabel;

export const RoleBaseProfileMenu: RoleBaseProfileMenuItem[] = [
  { type: "label", label: "My Account" },
  {
    type: "link",
    label: "Profile",
    href: Routes.me.dashboard,
    icon: User,
    shortcut: "⇧⌘P",
    permissions: ["me:read"],
  },
  {
    type: "link",
    label: "My Orders",
    href: Routes.me.orders,
    icon: ShoppingCart,
    permissions: ["orders:read"],
  },
  {
    type: "link",
    label: "Support Tickets",
    href: Routes.me.tickets,
    icon: MessageSquare,
    permissions: ["tickets:read"],
  },
  {
    type: "link",
    label: "Settings",
    href: Routes.me.settings,
    icon: Settings,
    shortcut: "⌘S",
    permissions: ["settings:read"],
  },
  { type: "separator" },
  {
    type: "button",
    id: "logout",
    label: "Log out",
    icon: LogOut,
    shortcut: "⇧⌘Q",
  },
];