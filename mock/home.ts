/**
 * Mock data for home page: hero carousel slides and deal cards
 */

export interface HeroSlide {
  id: string;
  title: string;
  subtitle?: string;
  image: string;
  ctaText: string;
  ctaHref: string;
}

export interface DealCardProduct {
  name: string;
  image: string;
}

export interface DealCard {
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

export const heroSlides: HeroSlide[] = [
  {
    id: "big-game",
    title: "BIG GAME SAVINGS",
    subtitle: "Big Game Savings",
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&h=400&fit=crop",
    ctaText: "Shop now",
    ctaHref: "#big-game",
  },
  {
    id: "tech-deals",
    title: "TECH DEALS",
    subtitle: "Components & More",
    image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=1200&h=400&fit=crop",
    ctaText: "Shop now",
    ctaHref: "#tech",
  },
  {
    id: "gaming",
    title: "GAMING & VR",
    subtitle: "Gaming & VR",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&h=400&fit=crop",
    ctaText: "Shop now",
    ctaHref: "#gaming",
  },
];

export const dealCards: DealCard[] = [
  {
    id: "intel-combo",
    brandLabel: "intel.",
    brandHref: "#intel",
    savingsText: "Intel Combo up savings $277.98",
    moreLabel: "More options",
    moreHref: "#intel-more",
    title: "Intel Core Ultra 7 265K, Arrow Lake 20-Core (8P+12E), LGA 1851, 125W",
    products: [
      {
        name: "ASRock Z890...",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=120&h=120&fit=crop",
      },
      {
        name: "CORSAIR Vengeance...",
        image: "https://images.unsplash.com/photo-1562976540-1502c2145186?w=120&h=120&fit=crop",
      },
    ],
    price: 799.99,
    originalPrice: 1077.97,
    primaryButtonText: "Add to cart",
    secondaryButtonText: "Build with it",
  },
  {
    id: "nas-combo",
    brandLabel: "NAS",
    brandHref: "#nas",
    savingsText: "NAS Combo up savings $79.00",
    moreLabel: "More options",
    moreHref: "#nas-more",
    title: "UGREEN NASync DXP2800, 2-Bay NAS with Intel N100 Quad-Core",
    products: [
      {
        name: "WD Red Plus 8TB...",
        image: "https://images.unsplash.com/photo-1597872200969-2b65d565e384?w=120&h=120&fit=crop",
      },
    ],
    price: 730.97,
    originalPrice: 809.97,
    primaryButtonText: "Add to cart",
    secondaryButtonText: "Build with it",
  },
  {
    id: "shell-shocker",
    brandLabel: "Shell Shocker",
    brandHref: "#shell-shocker",
    savingsText: "Shell Shocker",
    moreLabel: "See all",
    moreHref: "#shell-all",
    title: "MSI Ventus GeForce RTX 5060 Ti Graphics Card RTX 5060 Ti 8G VENTU...",
    promoText: "Get Free MSI 650W 80+ Bronze PSU with selected purchase, limited offer",
    products: [
      {
        name: "MSI RTX 5060 Ti",
        image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=200&h=200&fit=crop",
      },
    ],
    price: 379.99,
    originalPrice: 445.49,
    badge: "14% off",
    primaryButtonText: "Add to cart",
  },
];
