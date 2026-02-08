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
