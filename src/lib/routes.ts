import { Role } from "./mockData";

export const Routes = {
  home: "/",
  auth: {
    login: "/login",
    signup: "/sign-up",
  },
  // E Commerce Routes
  products: {
    list: "/products",
    detail: (slug: string) => `/products/${slug}`,
    reviews: (slug: string) => `/products/${slug}/reviews`,
  },
  checkout: "/checkout",
  checkoutThankYou: "/checkout/thank-you",
  faq: {
    index: "/faq",
    shippingDelivery: "/faq/shipping-delivery",
    productCompatibility: "/faq/product-compatibility",
    search: "/faq/search",
  },
  support: {
    index: "/support",
    tickets: "/support/tickets",
    liveChat: "/support/live-chat",
    tracking: "/support/tracking",
    warrantyReturns: "/support/warranty-returns",
    warrantyResults: (serial: string) => `/support/warranty-results/${serial}`,
  },
  // User Routes
  me: {
    root: "/me",
    dashboard: "/me/dashboard",
    orders: "/me/orders",
    orderDetail: (id: string) => `/me/orders/${id}`,
    orderTracking: (id: string) => `/me/orders/${id}/track`,
    warranty: "/me/warranty",
    tickets: "/me/tickets",
    ticketDetail: (id: string) => `/me/tickets/${id}`,
    settings: "/me/settings",
    addresses: "/me/addresses",
    profile: "/me/profile",
  },
  role: (role: Role) => ({
    root: `/role/${role}`,
    dashboard: `/role/${role}/dashboard`,
    posSystem: `/role/${role}/pos-system`,
    orders: {
      list: `/role/${role}/orders/list`,
      create: `/role/${role}/orders/list/create`,
      invoice: (id: string) => `/role/${role}/orders/list/${id}/invoice`,
      detail: (id: string) => `/role/${role}/orders/${id}`,
      tracking: (id: string) => `/role/${role}/orders/${id}/track`,
    },
    orderDetail: (id: string) => `/role/${role}/orders/${id}`,
    orderTracking: (id: string) => `/role/${role}/orders/${id}/track`,
    products: `/role/${role}/products`,
    categories: `/role/${role}/categories`,
    customers: `/role/${role}/customers`,
    customerLedger: `/role/${role}/customer-ledger`,
    suppliers: `/role/${role}/suppliers`,
    supplierLedger: `/role/${role}/supplier-ledger`,
    inventory: `/role/${role}/inventory`,
    purchaseOrders: {
      list: `/role/${role}/purchase-orders`,
      create: `/role/${role}/purchase-orders/create`,
    },
    promotions: {
      root: `/role/${role}/promotions/coupons`,
      coupons: `/role/${role}/promotions/coupons`,
    },
    reports: {
      analytics: `/role/${role}/reports/analytics`,
    },
    transactions: `/role/${role}/transactions`,
    expenseOpexTracking: `/role/${role}/expense-opex-tracking`,
    settings: {
      root: `/role/${role}/settings/role-permissions`,
      rolePermissions: `/role/${role}/settings/role-permissions`,
      emailTemplates:{
        root: `/role/${role}/settings/email-templates`,
        template: (template: string) =>
        `/role/${role}/settings/email-templates/${template}`
      },
    },
    addresses: `/role/${role}/addresses`,
    warranty: `/role/${role}/warranty`,
    tickets: `/role/${role}/tickets`,
    ticketDetail: (id: string) => `/role/${role}/tickets/${id}`,
  }),
};
