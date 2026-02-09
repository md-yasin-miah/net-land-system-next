interface HeroSlide {
  id: string;
  title: string;
  subtitle?: string;
  image: string;
  ctaText: string;
  ctaHref: string;
}

interface DealCardProduct {
  name: string;
  image: string;
}

interface DealCard {
  id: string;
  brandLabel: string;
  brandHref?: string;
  savingsText: string;
  moreLabel: string;
  moreHref: string;
  title: string;
  description?: string;
  products?: DealCardProduct[];
  price: number;
  originalPrice: number;
  badge?: string;
  badgePercent?: string;
  primaryButtonText: string;
  secondaryButtonText?: string;
  promoText?: string;
}
/** Single slide for poster-style carousel (e.g. Corsair-style banner) */
interface Poster {
  id: number;
  image: string;
  href: string;
}

/** Single product card for "Today's Best Deals" horizontal row */
interface TodayDeal {
  id: string;
  badge?: string;
  badge_olor?:string
  badgeVariant?: "primary" | "secondary";
  rating: number;
  reviewCount: number;
  title: string;
  promoText?: string;
  price: number;
  originalPrice: number;
  discountPercent: number;
  image: string;
  /** Multiple images: first shown by default, others on hover (cycle or second only) */
  images?: string[];
  imageAlt?: string;
  tags?: string[];
  href?: string;
}
