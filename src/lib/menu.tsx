/**
 * Central menu configuration for the app.
 * Header, Footer, User sidebar, E-commerce sidebar, and FAQ menus are managed here.
 */

import type { LucideIcon } from "lucide-react";
import {
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
} from "lucide-react";
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

// Footer social links (icon labels / keys for use with material-symbols or custom icons)
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
  { href: "/categories/enterprise", name: "Enterprise Solutions", icon: "business_center" },
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
  { href: Routes.faq.shippingDelivery, icon: Truck, label: "Shipping & Delivery" },
  { href: "#", icon: CreditCard, label: "Payments" },
  { href: "#", icon: Cpu, label: "Technical Support" },
  { href: "#", icon: RotateCcw, label: "Returns & Refunds" },
];

/** FAQ page category quick-access cards (same structure, used on main FAQ page grid) */
export const faqCategoryCards: FaqNavItem[] = [
  { href: Routes.faq.shippingDelivery, icon: Truck, label: "Shipping & Delivery" },
  { href: "#", icon: CreditCard, label: "Payment Methods" },
  { href: Routes.faq.productCompatibility, icon: Cpu, label: "Product Compatibility" },
  { href: "#", icon: RotateCcw, label: "Returns & RMA" },
];
