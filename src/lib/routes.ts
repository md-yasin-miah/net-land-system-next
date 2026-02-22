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
    root: `/${role}`,
    dashboard: `/${role}/dashboard`,
    posSystem: `/${role}/pos-system`,
    orders: {
      list: `/${role}/orders/list`,
      create: `/${role}/orders/list/create`,
      invoice: (id: string) => `/${role}/orders/list/${id}/invoice`,
      detail: (id: string) => `/${role}/orders/${id}`,
      tracking: (id: string) => `/${role}/orders/${id}/track`,
    },
    orderDetail: (id: string) => `/${role}/orders/${id}`,
    orderTracking: (id: string) => `/${role}/orders/${id}/track`,
    products: `/${role}/products`,
    categories: `/${role}/categories`,
    customers: `/${role}/customers`,
    customerLedger: `/${role}/customer-ledger`,
    suppliers: `/${role}/suppliers`,
    supplierLedger: `/${role}/supplier-ledger`,
    inventory: `/${role}/inventory`,
    purchaseOrders: {
      list: `/${role}/purchase-orders`,
      create: `/${role}/purchase-orders/create`,
    },
    promotions: {
      root: `/${role}/promotions/coupons`,
      coupons: `/${role}/promotions/coupons`,
    },
    reports: {
      analytics: `/${role}/reports/analytics`,
    },
    transactions: `/${role}/transactions`,
    expenseOpexTracking: `/${role}/expense-opex-tracking`,
    settings: {
      root: `/${role}/settings`,
      rolePermissions: `/${role}/settings/role-permissions`,
      emailTemplates: {
        ordersConfirmation: `/${role}/settings/email-templates/orders-confirmation`,
        shippingUpdate: `/${role}/settings/email-templates/shipping-update`,
        welcomeEmail: `/${role}/settings/email-templates/welcome-email`,
        passwordReset: `/${role}/settings/email-templates/password-reset`,
        abandonedCart: `/${role}/settings/email-templates/abandoned-cart`,
      },
    },
    addresses: `/${role}/addresses`,
    warranty: `/${role}/warranty`,
    tickets: `/${role}/tickets`,
    ticketDetail: (id: string) => `/${role}/tickets/${id}`,
  }),
};
