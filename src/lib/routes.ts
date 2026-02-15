import { Role } from "./mockData";

export const Routes = {
  role:(role: Role) => ({
    root: `/${role}`,
    dashboard: `/${role}/dashboard`,
    orders: `/${role}/orders`,
    orderDetail: (id: string) => `/${role}/orders/${id}`,
    orderTracking: (id: string) => `/${role}/orders/${id}/track`,
    warranty: `/${role}/warranty`,
    tickets: `/${role}/tickets`,
    ticketDetail: (id: string) => `/${role}/tickets/${id}`,
    settings: `/${role}/settings`,
    addresses: `/${role}/addresses`,
  }),
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
    warrantyResults: (serial: string) =>
      `/support/warranty-results/${serial}`,
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
  },
};
