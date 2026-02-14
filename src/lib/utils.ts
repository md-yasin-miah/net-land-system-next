import { CURRENCY } from './constants';

/**
 * Format price with currency symbol
 * @param price - Price in BDT
 * @returns Formatted price string (e.g., "৳1,234")
 */
export const formatPrice = (price: number): string => {
  return `${CURRENCY.symbol}${price.toLocaleString('en-BD')}`;
};

/**
 * Calculate discount percentage
 * @param originalPrice - Original price
 * @param currentPrice - Current/sale price
 * @returns Discount percentage rounded to nearest integer
 */
export const calculateDiscount = (originalPrice: number, currentPrice: number): number => {
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
};

/**
 * Format rating for display
 * @param rating - Rating value (0-5)
 * @returns Object with full stars, half star, and empty stars count
 */
export const formatRating = (rating: number) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - Math.ceil(rating);

  return {
    fullStars,
    hasHalfStar,
    emptyStars,
  };
};

/**
 * Generate product slug from name
 * @param name - Product name
 * @returns URL-friendly slug
 */
export const generateSlug = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim();
};

/**
 * Truncate text to specified length
 * @param text - Text to truncate
 * @param maxLength - Maximum length
 * @returns Truncated text with ellipsis if needed
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
};

/**
 * Check if shipping is free based on cart total
 * @param cartTotal - Total cart value
 * @param threshold - Free shipping threshold (default: 50000)
 * @returns Boolean indicating if shipping is free
 */
export const isFreeShipping = (cartTotal: number, threshold: number = 50000): boolean => {
  return cartTotal >= threshold;
};

/**
 * Format date to localized string
 * @param date - Date object or string
 * @returns Formatted date string
 */
export const formatDate = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString('en-BD', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

/**
 * Validate email address
 * @param email - Email address to validate
 * @returns Boolean indicating if email is valid
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate Bangladeshi phone number
 * @param phone - Phone number to validate
 * @returns Boolean indicating if phone is valid
 */
export const isValidBDPhone = (phone: string): boolean => {
  // Matches +880, 880, or 0 followed by 1 and 9 more digits
  const phoneRegex = /^(?:\+?880|0)?1[3-9]\d{8}$/;
  return phoneRegex.test(phone.replace(/[\s-]/g, ''));
};

/**
 * Calculate cart total
 * @param items - Array of cart items with price and quantity
 * @returns Total price
 */
export const calculateCartTotal = (
  items: Array<{ price: number; quantity: number }>
): number => {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
};

/**
 * Get stock status display
 * @param inStock - Boolean indicating if in stock
 * @returns Object with status text, color, and icon
 */
export const getStockStatus = (inStock: boolean) => {
  return inStock
    ? {
        text: 'In Stock',
        color: 'text-green-600',
        icon: 'check_circle',
      }
    : {
        text: 'Pre-Order',
        color: 'text-orange-600',
        icon: 'schedule',
      };
};
