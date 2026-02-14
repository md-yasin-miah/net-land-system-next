"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronRight,
  Star,
  StarHalf,
  CheckCircle2,
  Minus,
  Plus,
  ShoppingCart,
  ShieldCheck,
  Truck,
  ArrowRight,
  List,
  Cpu,
  Download,
  BarChart3,
  FileText,
  ExternalLink,
  MessageSquare,
} from "lucide-react";
import { Routes } from "@/lib/routes";
import { cn, extractTitleFromSlug } from "@/lib/utils";
import { useParams } from "next/navigation";
import { useAppDispatch } from "@/store/hooks";
import { addItem, openDrawer } from "@/store/cartSlice";

// Types
export interface ProductDetailsProps {
  product?: {
    name: string;
    sku: string;
    badge?: string;
    rating: number;
    reviewCount: number;
    description: string;
    features: string[];
    price: string;
    inStock: boolean;
    stockNote?: string;
    images: string[];
    warranty?: string;
    shipping?: string;
  };
  breadcrumbs?: { label: string; href?: string }[];
  specs?: { group: string; items: { label: string; value: string }[] }[];
  relatedProducts?: { name: string; subtitle: string; price: string; image: string; href: string }[];
}

const defaultProduct = {
  name: "MikroTik hAP ax³",
  sku: "C53UiG+5HPaxD2HPax-D2HPaxD",
  badge: "NEW GENERATION",
  rating: 4.8,
  reviewCount: 124,
  description:
    "The ultimate home access point. hAP ax³ is our most powerful AX device with the best wireless network coverage to date. Features a modern quad-core ARM CPU running at 1.8 GHz and enough memory for heavy tasks.",
  features: [
    "Wi-Fi 6 (802.11ax) dual-band support",
    "1x 2.5G Ethernet & 4x Gigabit Ethernet ports",
    "IPsec hardware acceleration",
  ],
  price: "$129.00",
  inStock: true,
  stockNote: "Ships within 24 hours",
  images: [
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCNJq-b9v3yj3CyFlAbMo5p2bp9U2v-EONr8uxtq7h7ooTyEVZJTlYjYs9-SocziXnMnf2toAM1bo0rxL6Qe-lpnt9hRC3IeV2Cyep_yzXR9ejXj5QEg78SAZ4j9EhQsX3Yx9KM94GV-QjF73mVnCIaj8916f2clfsehogq0SBJX1sHx6GwL6mt3PUoIRhowC2k0Ie0PtS2K6YFzm93b_Cgnj3MHjjZ5FAasOGqWNSCTZIiwfjrHScq6-QChNlMfnOdH4O4Z-U-Tpo",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDi-9iaeDCf-bF1m2-ejDjaA_KJwaFzcINskasJc8UDlXdSJVkR08QU61o1_JNOeIjHyVJKKXG6bicd1E9hyTmXfcbNwAZA2rZVrmJxF9DHNz8OaZ_g9g54Upu0f2MUP4Is4GUcBKCjner-xE9irxppz60N92XKnSNccRPtYR8tOm2a2Xk8395i0zkMdpdC7WaTREAloZEH0HN_mL8i861jEVlAMWxKzZ8C2ahvvg9eJ9lGA1FhA5qvX_VYQnLdiB1E2NeG2cvlN2U",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuC7TZp3d5CZa8ifbwRINopE5QaXQn_lHqRg1f-BVyj_PadOFDV7D6VQ1Sl86pBkubip7sm0UVoVuMk5PLX6rdYhKU6G70eiRMcjMAohVY7uFZD6i-Q8WRGfoNVNnVLbUGPLSubAr26eAm4kTV58UO7DpRXJ-wUqAg_WtqO0qGbLY5soN1G2WwVmVkk_rbPgdX8HHhrq23vMYBNkyV5Mr3fEwH8XNI4RHsjiVnOtsOWkTLMQ6y3vMzysLKy4Y2UW4_6w1Dd6u2xnlDY",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAIxAdNoo4S2NuqNwrSuOftNbopDfOeWXGgc6sgIJu6zcm8FNTmdaUEgyZ5O-xo2HJw09MAnrKcAr7rqsEp9YPWDY2GlFXM8spI098GP_beiKinQ5U-dyvifDrtvGFvZ-Vp8RJJzxr7Nq03WeHBd3eSHWgYgNmBIRsyLIkSNLaoFoyweUiJlYOQUdgQTPyYTtakHLKOwldTcVrmLlS58SMc2RXTI_XrIxt1dysSeXeL3favkqLIm3cCcm7yHIptF8T9PlcFa5EMiiE",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDaF7HsMuwoYSNX0EUrJnS2ddFx3mCPWeH2ruX1xM24IBuW89Pemhwlebn6wjue6yNtunnVyAzvQwQLLeD-qXecxkgZZ_tWI8aqw2H7SEFPl2eTxh4iv9RDYu1VetP_64hlEiQtUMmYgLCJ9X8uhHfg-jbMnT0MWXJkSTAU3uw8QW55itR8ExDe0cXhA3O_Ec4XnzUC9w1en4ijI-7lcNwvwP6dHjFnrh-IH2Lf3uVNQXHxTuB3EmrCDOp7HpLjIL8DMBY0DNvVglE",
  ],
  warranty: "2-Year Warranty",
  shipping: "Global Shipping",
};

const defaultBreadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Networking Hardware", href: "/categories/networking" },
  { label: "Wireless Routers", href: "/categories/routers" },
  { label: "hAP ax³" },
];

const defaultSpecs = [
  {
    group: "Powering",
    items: [
      { label: "Number of DC inputs", value: "2 (DC jack, PoE-IN)" },
      { label: "DC jack input Voltage", value: "12-28 V" },
      { label: "Max power consumption", value: "38 W" },
      { label: "Fan count", value: "Passive" },
    ],
  },
  {
    group: "Wireless Specifications",
    items: [
      { label: "Wireless 5 GHz Max data rate", value: "1200 Mbit/s" },
      { label: "Wireless 5 GHz number of chains", value: "2" },
      { label: "Wireless 5 GHz standards", value: "802.11a/n/ac/ax" },
      { label: "Antenna gain dBi for 5 GHz", value: "5.5" },
    ],
  },
  {
    group: "Ethernet",
    items: [
      { label: "10/100/1000 Ethernet ports", value: "4" },
      { label: "Number of 2.5G Ethernet ports", value: "1" },
    ],
  },
  {
    group: "Other",
    items: [
      { label: "CPU", value: "IPQ-6010" },
      { label: "Storage size", value: "128 MB" },
    ],
  },
];

const defaultRelated = [
  {
    name: "MikroTik cAP ax",
    subtitle: "AX ceiling access point",
    price: "$99.00",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAn472-LLgJzai4kebFwn0gfSZJESzuh7wn4jy_UiPYPBbKke6i-tvMPv4-ctV_Cl46-R_CMeeosI8qPZy27txKonQtOx1jCXqkec1WlmKPLpJNwbq36eNa5BdROqUmDZCO7lJeRgNvwSCcaaNLmdTHk-ptNuF4lxj2ltMkeenD36FPjuLXFu2usHAq59CkaEZpLJ9NVc0eJkABCOGxLVa9XiQxo7Kj0_w0d0ALR56PKzAX6tPhugWZRf72_jC8G5RqE-dQ9fNSMaw",
    href: "/products/cap-ax",
  },
  {
    name: "RB5009UG+S+IN",
    subtitle: "High-performance wired router",
    price: "$199.00",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBAxAjQ_jDEyEf1AatdZIy3PQ6BXgQkKPuC7TWWYjI7ZqpKl6u8ZIY2IsRLuM2Zov3U-T0BqFhuoYYuNKAUGGJYblSmp4trPHh0HBXbNifvU_eUoD-tS3Q_BkFmTVmHgCrjmtT2K-DHsI7IQeBtXO_VPq6fOgWoYwPKLKd7dgoeqJSdkrYWpJq0z-Z1nPq49FIydk8IGmcIBIbSbbVzoTOEFCwI-olUpDOQkSwGNGWGJ8SqDEN7yeLNWhhfbNOoNsqv7uPb73yB-40",
    href: "/products/rb5009",
  },
  {
    name: "MikroTik hAP ax²",
    subtitle: "Compact AX home router",
    price: "$89.00",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDIkHoi6OQ-bR4K61wmFzDbLY9D1pA59BS0GnCa4uqc9BXxgMZ0YJhZxmwUe89iOtVMAiHPsV9wtdBfelqD3JVuClcpMhA5rrWCCQNKW-AQNY4QapZzAavMgHUuOqgTTyKBPYBEqlrJP0Jni78hfkrG4Ed9zIxaRKVraQqUKbr6fMxlOR8k9AOU-_Eo8mpGwzPsHDo2B67VBoO6P-c1Tk8hkrZ_fzPkmQQses5sdCzvzzxVsrBIU5_gnsYYwArNzpF4vtYYzQlyALs",
    href: "/products/hap-ax2",
  },
  {
    name: "PowerBox Pro",
    subtitle: "Outdoor router with PoE out",
    price: "$115.00",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBT8FYkTRdUnmS9IYi4HFkXrZ6_sKvFPUun3A63EPLDNRJwHZXbDPZPmiel1GP-c8Q-dSoBB-QRUE9hvRwA2dx-iyFh-VVTyiwHD-RW7sG0ThIvPkl1xk820wRu6cg1OYZr4XgYDZauYP_ay9GLXt9ffZM79lx3pTM-j7JPNp-VLK-P8pTqxFgkQ9z9AuR2yCCMe_pq5fLysb73TVt1LnQUhIxxHazZn6MQxMvFtru3wgcmWZIfGbhpoX1RK7kJoFh3pvmKaaNhwrY",
    href: "/products/powerbox-pro",
  },
];

const TABS = [
  { id: "specs", label: "Specifications", icon: List },
  { id: "technical", label: "Technical Overview", icon: Cpu },
  { id: "reviews", label: "Reviews", icon: MessageSquare },
  { id: "support", label: "Support & Downloads", icon: Download },
  { id: "ethernet", label: "Ethernet Test Results", icon: BarChart3 },
];

const defaultTechnicalOverview = {
  summary:
    "The hAP ax³ is built on the Qualcomm IPQ-6010 platform, featuring a quad-core ARM Cortex-A53 processor at 1.8 GHz. It delivers enterprise-grade Wi-Fi 6 performance for home and small office deployments with dual-band concurrent operation.",
  highlights: [
    { title: "RouterOS 7", description: "Full RouterOS 7 support with container and zero-touch provisioning capabilities." },
    { title: "Dual-band AX", description: "2.4 GHz and 5 GHz 802.11ax with 2×2 MU-MIMO and OFDMA for efficient multi-user throughput." },
    { title: "2.5G Uplink", description: "Single 2.5G Ethernet port for high-speed WAN or uplink to multi-gig switches." },
    { title: "IPsec Hardware", description: "Hardware-accelerated IPsec for VPN without sacrificing routing performance." },
  ],
};

const defaultSupportDownloads = [
  { label: "Product Manual (PDF)", href: "#", icon: FileText },
  { label: "Latest Firmware", href: "#", icon: Download },
  { label: "RouterOS Documentation", href: "#", icon: ExternalLink },
  { label: "MikroTik Wiki", href: "#", icon: ExternalLink },
];

const defaultEthernetTests = [
  { test: "2.5G port throughput (TCP)", result: "2.37 Gbps", note: "Full line rate" },
  { test: "Gigabit port throughput (TCP)", result: "941 Mbps", note: "Full line rate" },
  { test: "IPsec throughput (AES-256-GCM)", result: "~800 Mbps", note: "Hardware accelerated" },
  { test: "Latency (bridge mode)", result: "< 10 µs", note: "Store-and-forward" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: (i: number) => ({
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: i * 0.05 },
  }),
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

function parsePrice(priceStr: string): number {
  const cleaned = priceStr.replace(/[$,৳\s]/g, "");
  return Number(cleaned) || 0;
}

const ProductDetails = ({
  product = defaultProduct,
  breadcrumbs = defaultBreadcrumbs,
  specs = defaultSpecs,
  relatedProducts = defaultRelated,
}: ProductDetailsProps) => {
  const { slug } = useParams();
  const dispatch = useAppDispatch();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("specs");

  const productSlug = (slug as string) || product.name.toLowerCase().replace(/\s+/g, "-");
  const priceNum = parsePrice(product.price);

  const handleAddToCart = () => {
    dispatch(
      addItem({
        id: product.sku,
        name: product.name,
        slug: productSlug,
        image: product.images[0],
        price: priceNum,
        quantity,
        subtitle: product.features[0],
      })
    );
    dispatch(openDrawer());
  };

  const fullStars = Math.floor(product.rating);
  const hasHalfStar = product.rating % 1 >= 0.5;

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumbs */}
      <motion.nav
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center gap-2 text-sm text-slate-500 mb-8 overflow-x-auto whitespace-nowrap"
      >
        {breadcrumbs.map((item, i) => (
          <span key={i} className="flex items-center gap-2">
            {item.href ? (
              <Link href={item.href} className="hover:text-primary transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-slate-900 dark:text-slate-100 font-medium">{item.label}</span>
            )}
            {i < breadcrumbs.length - 1 && (
              <ChevronRight className="size-4 shrink-0 text-slate-400" />
            )}
          </span>
        ))}
      </motion.nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left: Product Gallery */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          custom={0}
          className="lg:col-span-7 space-y-4"
        >
          <motion.div
            variants={itemVariants}
            className="aspect-square bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden flex items-center justify-center p-8 group"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedImageIndex}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.25 }}
                className="w-full h-full flex items-center justify-center"
              >
                <Image
                  src={product.images[selectedImageIndex]}
                  alt={`${product.name} - View ${selectedImageIndex + 1}`}
                  width={500}
                  height={500}
                  className="max-w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500"
                />
              </motion.div>
            </AnimatePresence>
          </motion.div>
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-4 gap-4"
          >
            {product.images.map((src, i) => (
              <motion.button
                key={i}
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedImageIndex(i)}
                className={cn(
                  "aspect-square bg-white dark:bg-slate-800 rounded-lg overflow-hidden p-2 cursor-pointer transition-opacity",
                  selectedImageIndex === i
                    ? "border-2 border-primary"
                    : "border border-slate-200 dark:border-slate-700 opacity-70 hover:opacity-100"
                )}
              >
                <Image
                  src={src}
                  alt={`Thumb ${i + 1}`}
                  width={120}
                  height={120}
                  className="w-full h-full object-contain"
                />
              </motion.button>
            ))}
          </motion.div>
        </motion.div>

        {/* Right: Product Info & Purchase Card */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          custom={0.1}
          className="lg:col-span-5 flex flex-col gap-6"
        >
          <motion.div variants={itemVariants}>
            {product.badge && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary mb-4">
                {product.badge}
              </span>
            )}
            <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
              {slug ? extractTitleFromSlug(slug as string) : product.name}
            </h1>
            <p className="text-lg text-slate-500 dark:text-slate-400 mt-2">{product.sku}</p>
            <div className="flex items-center gap-4 mt-4">
              <Link
                href={Routes.products.reviews(productSlug)}
                className="flex items-center gap-2 group"
              >
                <div className="flex text-amber-400">
                  {[...Array(fullStars)].map((_, i) => (
                    <Star key={i} className="size-5 fill-current" />
                  ))}
                  {hasHalfStar && <StarHalf className="size-5 fill-current" />}
                </div>
                <span className="text-sm font-medium text-slate-400 group-hover:text-primary transition-colors">
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </Link>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="space-y-4 text-slate-600 dark:text-slate-300"
          >
            <p className="text-base leading-relaxed">{product.description}</p>
            <ul className="space-y-2">
              {product.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="size-5 text-primary shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Purchase Card */}
          <motion.div
            variants={itemVariants}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm sticky top-24"
          >
            <div className="flex items-end justify-between mb-6">
              <div>
                <span className="text-sm text-slate-500 block mb-1">Price</span>
                <span className="text-4xl font-bold text-slate-900 dark:text-white">
                  {product.price}
                </span>
              </div>
              <div className="text-right">
                <span className="inline-flex items-center text-emerald-600 dark:text-emerald-400 text-sm font-semibold">
                  <span className="size-2 bg-emerald-500 rounded-full mr-2 animate-pulse" />
                  In Stock
                </span>
                {product.stockNote && (
                  <span className="block text-xs text-slate-400">{product.stockNote}</span>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-4 mb-2">
                <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-lg h-12">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3 hover:text-primary transition-colors"
                  >
                    <Minus className="size-5" />
                  </button>
                  <input
                    type="text"
                    readOnly
                    value={quantity}
                    className="w-12 text-center bg-transparent border-none focus:ring-0 font-bold"
                  />
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-3 hover:text-primary transition-colors"
                  >
                    <Plus className="size-5" />
                  </button>
                </div>
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="flex-1 h-12 border-2 border-primary text-primary font-bold rounded-lg hover:bg-primary/5 transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="size-5" />
                  Add to Cart
                </button>
              </div>
              <motion.button
                type="button"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full h-12 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
              >
                Buy It Now
              </motion.button>
            </div>
            <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-700 grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <ShieldCheck className="size-5" />
                {product.warranty}
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Truck className="size-5" />
                {product.shipping}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Details Tabs */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="mt-20"
      >
        {/* Tab navigation - professional pill style */}
        <div className="flex flex-wrap gap-2 p-1.5 bg-slate-100 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 mb-8">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold whitespace-nowrap transition-all duration-200",
                  activeTab === tab.id
                    ? "bg-white dark:bg-slate-800 text-primary shadow-sm border border-slate-200 dark:border-slate-600"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-800/50"
                )}
              >
                <Icon className="size-4 shrink-0" />
                {tab.label}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          {/* Specifications tab - card-based layout */}
          {activeTab === "specs" && (
            <motion.div
              key="specs"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
              {specs.map((group, gi) => (
                <motion.div
                  key={group.group}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: gi * 0.05, duration: 0.25 }}
                  className="bg-white dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden"
                >
                  <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-700 bg-slate-50/80 dark:bg-slate-800/80">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
                      {group.group}
                    </h3>
                  </div>
                  <div className="divide-y divide-slate-100 dark:divide-slate-700">
                    {group.items.map((row, ri) => (
                      <div
                        key={ri}
                        className="flex justify-between items-center gap-4 px-5 py-3.5"
                      >
                        <span className="text-sm text-slate-500 dark:text-slate-400">
                          {row.label}
                        </span>
                        <span className="text-sm font-semibold text-slate-900 dark:text-white text-right shrink-0">
                          {row.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Technical Overview tab */}
          {activeTab === "technical" && (
            <motion.div
              key="technical"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/30 p-6">
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  {defaultTechnicalOverview.summary}
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {defaultTechnicalOverview.highlights.map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.25 }}
                    className="flex gap-4 p-5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 hover:border-primary/30 dark:hover:border-primary/30 transition-colors"
                  >
                    <div className="shrink-0 size-10 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                      <Cpu className="size-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white mb-1">
                        {item.title}
                      </h4>
                      <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Reviews tab - preview + link to full page */}
          {activeTab === "reviews" && (
            <motion.div
              key="reviews"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/30">
                <div className="flex items-center gap-4">
                  <span className="text-4xl font-black text-slate-900 dark:text-white">
                    {product.rating}
                  </span>
                  <div>
                    <div className="flex text-amber-400 gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            "size-5",
                            i < Math.floor(product.rating)
                              ? "fill-current"
                              : i < product.rating
                                ? "fill-amber-400/50"
                                : "text-slate-200 dark:text-slate-600"
                          )}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                      {product.reviewCount} reviews
                    </p>
                  </div>
                </div>
                <Link
                  href={Routes.products.reviews(productSlug)}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
                >
                  <MessageSquare className="size-5" />
                  View all reviews
                </Link>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Read customer reviews, see community photos, and write your own review on the
                dedicated reviews page.
              </p>
            </motion.div>
          )}

          {/* Support & Downloads tab */}
          {activeTab === "support" && (
            <motion.div
              key="support"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
                Official resources and downloads for this product.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {defaultSupportDownloads.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.25 }}
                      className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 hover:border-primary hover:bg-primary/5 dark:hover:bg-primary/10 transition-all group"
                    >
                      <div className="shrink-0 size-11 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center group-hover:bg-primary/10 dark:group-hover:bg-primary/20 transition-colors">
                        <Icon className="size-5 text-slate-600 dark:text-slate-300 group-hover:text-primary transition-colors" />
                      </div>
                      <div className="min-w-0">
                        <span className="font-semibold text-slate-900 dark:text-white block truncate">
                          {item.label}
                        </span>
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                          Opens in new tab
                        </span>
                      </div>
                      <ExternalLink className="size-4 text-slate-400 shrink-0 ml-auto" />
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Ethernet Test Results tab */}
          {activeTab === "ethernet" && (
            <motion.div
              key="ethernet"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Laboratory test results. Actual performance may vary by environment.
              </p>
              <div className="rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700">
                        <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                          Test
                        </th>
                        <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                          Result
                        </th>
                        <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 hidden sm:table-cell">
                          Note
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                      {defaultEthernetTests.map((row) => (
                        <tr
                          key={row.test}
                          className="bg-white dark:bg-slate-800/30 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors"
                        >
                          <td className="px-5 py-4 text-sm font-medium text-slate-900 dark:text-white">
                            {row.test}
                          </td>
                          <td className="px-5 py-4 text-sm font-semibold text-primary">
                            {row.result}
                          </td>
                          <td className="px-5 py-4 text-sm text-slate-500 dark:text-slate-400 hidden sm:table-cell">
                            {row.note}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.section>

      {/* Related Products */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5 }}
        className="mt-24 border-t border-slate-200 dark:border-slate-700 pt-16 mb-20"
      >
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
              Related Products
            </h2>
            <p className="text-slate-500 mt-2">
              Complete your setup with these recommended items
            </p>
          </div>
          <Link
            href="/categories/routers"
            className="text-primary font-bold flex items-center gap-1 hover:underline underline-offset-4"
          >
            View All Routers
            <ArrowRight className="size-5" />
          </Link>
        </div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {relatedProducts.map((item) => (
            <motion.div
              key={item.name}
              variants={itemVariants}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 p-4 transition-shadow hover:shadow-xl"
            >
              <Link href={item.href} className="block">
                <div className="aspect-square bg-slate-50 dark:bg-slate-900 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                  <motion.div
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.4 }}
                    className="w-3/4 flex justify-center"
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={200}
                      height={200}
                      className="w-full h-auto object-contain"
                    />
                  </motion.div>
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                  {item.name}
                </h4>
                <p className="text-sm text-slate-500 mt-1">{item.subtitle}</p>
              </Link>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-lg font-bold text-slate-900 dark:text-white">
                  {item.price}
                </span>
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 bg-primary/10 text-primary rounded-lg hover:bg-primary hover:text-white transition-colors"
                >
                  <ShoppingCart className="size-5" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>
    </main>
  );
};

export default ProductDetails;
