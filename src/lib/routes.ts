export const Routes = {
  home: "/",
  auth: {
    login: "/login",
    signup: "/signup",
  },
  products: {
    list: "/products",
    detail: (slug: string) => `/products/${slug}`,
    reviews: (slug: string) => `/products/${slug}/reviews`,
  },
  checkout: "/checkout",
  faq: {
    index: "/faq",
    shippingDelivery: "/faq/shipping-delivery",
    productCompatibility: "/faq/product-compatibility",
    search: "/faq/search",
  },
};