export const Routes = {
  home: "/",
  auth: {
    login: "/login",
    signup: "/signup",
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
    settings: "/me/settings",
    addresses: "/me/addresses",
  },
};
