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
  File,
  Percent,
  Mail,
} from "lucide-react";
import type { Role } from "@/lib/mockData";
import type { Permission } from "@/lib/mockData";
import { Routes } from "@/lib/routes";
import { useAppDispatch } from "@/store/hooks";
import { logout } from "@/store/authSlice";
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

/** Direct link item */
export interface RoleSidebarNavItemLink {
  href: string;
  label: string;
  icon: LucideIcon;
}

/** Nested group with sub-items */
export interface RoleSidebarNavItemGroup {
  href?: string;
  label: string;
  icon: LucideIcon;
  items: RoleSidebarNavItemLink[];
}

export type RoleSidebarNavItem =
  | RoleSidebarNavItemLink
  | RoleSidebarNavItemGroup;

export function isNestedNavItem(
  item: RoleSidebarNavItem,
): item is RoleSidebarNavItemGroup {
  return (
    "items" in item && Array.isArray((item as RoleSidebarNavItemGroup).items)
  );
}

/** Build role sidebar nav with full hrefs from Routes.role(role). Use in RolePanelLayout. */
export function getRoleSidebarNav(role: Role): RoleSidebarNav[] {
  const r = Routes.role(role);
  return [
    {
      label: "Dashboard",
      items: [{ href: r.dashboard, label: "Dashboard", icon: LayoutDashboard }],
    },
    {
      label: "Sales & Ops",
      items: [
        { href: r.posSystem, label: "POS System", icon: Package },
        {
          label: "Orders",
          icon: ShoppingCart,
          items: [
            { href: r.orders.list, label: "Orders", icon: File },
            {
              href: r.orders.tracking("1"),
              label: "Order Tracking",
              icon: Truck,
            },
          ],
        },
        { href: r.products, label: "Products", icon: Package },
        { href: r.categories, label: "Categories", icon: FolderTree },
      ],
    },
    {
      label: "Stakeholders",
      items: [
        { href: r.customers, label: "Customers", icon: Users },
        { href: r.customerLedger, label: "Customer Ledger", icon: BookOpen },
        { href: r.suppliers, label: "Suppliers", icon: Truck },
        { href: r.supplierLedger, label: "Supplier Ledger", icon: BookMarked },
      ],
    },
    {
      label: "Procurement",
      items: [
        { href: r.inventory, label: "Inventory", icon: Warehouse },
        {
          href: r.purchaseOrders.list,
          label: "Purchase Orders",
          icon: Receipt,
        },
      ],
    },
    {
      label: "Finance",
      items: [
        {
          href: r.expenseOpexTracking,
          label: "Expense & Opex Tracking",
          icon: Wallet,
        },
      ],
    },
    {
      label: "Analytics & Admin",
      items: [
        {
          href: r.promotions.root,
          label: "Promotions",
          icon: Percent,
          items: [
            { href: r.promotions.coupons, label: "Coupons", icon: Ticket },
          ],
        },
        {
          label: "Reports",
          icon: BarChart3,
          items: [
            { href: r.reports.analytics, label: "Analytics", icon: BarChart3 },
          ],
        },
        { href: r.transactions, label: "Transactions", icon: ArrowLeftRight },
      ],
    },
    {
      label: "Settings",
      items: [
        {
          href: r.settings.rolePermissions,
          label: "Role & Permissions",
          icon: Settings,
        },
        {
          href: r.settings.emailTemplates.root,
          label: "Email Templates",
          icon: Mail,
        },
      ],
    },
  ];
}

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

export const RoleBaseProfileMenu = (role: Role): RoleBaseProfileMenuItem[] => {
  const dispatch = useAppDispatch();
  return role === "customer"
    ? [
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
          onClick: () => {
            dispatch(logout());
          },
          label: "Log out",
          icon: LogOut,
          shortcut: "⇧⌘Q",
        },
      ]
    : [
        { type: "label", label: "My Account" },
        {
          type: "link",
          label: "Dashboard",
          href: Routes.role(role).dashboard,
          icon: LayoutDashboard,
          shortcut: "⇧⌘P",
          permissions: ["admin:read"],
        },
        {
          type: "link",
          label: "Orders",
          href: Routes.role(role).orders.list,
          icon: ShoppingCart,
          permissions: ["orders:read"],
        },
        { type: "separator" },
        {
          type: "button",
          onClick: () => {
            dispatch(logout());
          },
          id: "logout",
          label: "Log out",
          icon: LogOut,
          shortcut: "⇧⌘Q",
        },
      ];
};
