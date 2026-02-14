import { createSlice } from "@reduxjs/toolkit";

export interface CartItem {
  id: string;
  name: string;
  slug: string;
  image: string;
  price: number;
  quantity: number;
  subtitle?: string;
}

const CART_STORAGE_KEY = "net-land-cart";

function loadCartFromStorage(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartItem[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveCartToStorage(items: CartItem[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  } catch {
    // ignore
  }
}

interface CartState {
  items: CartItem[];
  isDrawerOpen: boolean;
}

const initialState: CartState = {
  items: [],
  isDrawerOpen: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: { payload: Omit<CartItem, "quantity"> & { quantity?: number } }) {
      const { id, name, slug, image, price, subtitle, quantity = 1 } = action.payload;
      const existing = state.items.find((i) => i.id === id);
      if (existing) {
        existing.quantity += quantity;
      } else {
        state.items.push({
          id,
          name,
          slug,
          image,
          price,
          quantity,
          subtitle,
        });
      }
      saveCartToStorage(state.items);
    },
    removeItem(state, action: { payload: string }) {
      state.items = state.items.filter((i) => i.id !== action.payload);
      saveCartToStorage(state.items);
    },
    updateQuantity(state, action: { payload: { id: string; quantity: number } }) {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (!item) return;
      if (action.payload.quantity < 1) {
        state.items = state.items.filter((i) => i.id !== action.payload.id);
      } else {
        item.quantity = action.payload.quantity;
      }
      saveCartToStorage(state.items);
    },
    hydrateFromStorage(state) {
      state.items = loadCartFromStorage();
    },
    clearCart(state) {
      state.items = [];
      saveCartToStorage(state.items);
    },
    openDrawer(state) {
      state.isDrawerOpen = true;
    },
    closeDrawer(state) {
      state.isDrawerOpen = false;
    },
    toggleDrawer(state) {
      state.isDrawerOpen = !state.isDrawerOpen;
    },
  },
});

export const {
  addItem,
  removeItem,
  updateQuantity,
  hydrateFromStorage,
  clearCart,
  openDrawer,
  closeDrawer,
  toggleDrawer,
} = cartSlice.actions;
export default cartSlice.reducer;

export function getCartTotal(items: CartItem[]): number {
  return items.reduce((sum, i) => sum + i.price * i.quantity, 0);
}

export function getCartCount(items: CartItem[]): number {
  return items.reduce((sum, i) => sum + i.quantity, 0);
}
