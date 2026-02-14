export const Routes = {
  home: "/",
  auth: {
    login: "/login",
    signup: "/signup",
  },
  products: {
    list: "/products",
    detail: (slug: string) => `/products/${slug}`,
  },
  checkout: "/checkout",
};