// Product Types
export interface Product {
  id: string;
  brand: string;
  name: string;
  slug: string;
  description?: string;
  image: string;
  images?: string[];
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  specs: string[];
  badge?: 'SAVE 15%' | 'HOT' | 'NEW';
  inStock: boolean;
  category: string;
  subcategory?: string;
}

// Category Types
export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description?: string;
  parentId?: string;
}

// Cart Types
export interface CartItem {
  productId: string;
  quantity: number;
  price: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
  itemCount: number;
}

// User Types
export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  address?: Address;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

// Order Types
export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: Date;
  shippingAddress: Address;
}

// Feature Types
export interface Feature {
  icon: string;
  title: string;
  description: string;
}

// Newsletter Types
export interface NewsletterSubscription {
  email: string;
  subscribedAt: Date;
}
