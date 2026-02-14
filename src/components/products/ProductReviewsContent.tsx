"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Star,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Flag,
  Edit,
  ImagePlus,
  Eye,
} from "lucide-react";
import { Routes } from "@/lib/routes";
import { cn, extractTitleFromSlug } from "@/lib/utils";
import { useAppDispatch } from "@/store/hooks";
import { addItem, openDrawer } from "@/store/cartSlice";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

const STAR_DISTRIBUTION = [
  { stars: 5, percent: 85 },
  { stars: 4, percent: 10 },
  { stars: 3, percent: 3 },
  { stars: 2, percent: 1 },
  { stars: 1, percent: 1 },
];

const COMMUNITY_PHOTOS = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuB6asCZMyCjfLf05sIsdI8GdaFVvUmNCqOkCjk0LSHnSmNA75idLgTkKQvJuQ2o71dmY5HUe38sJBnpQ9nJ6AOHKqBnIGAEHbQWXzseLaWvtcRiziRdAcAwCW3kdqpkG-mqq3VAO6sAoAgsdSLyYTqbOfesKEX2ftFvjYJ5Ha56fGgOiV9ghWLPi_eIgBvmjRSgbSl0tcUIRERLY4ivB3NCZwnizcEJXH4zUYH4t_S7TauVWrzmzG84vFHPAL_e4sj03QHYNk2Cmbo",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuD5Q4gVPG1gYKomqKeUnSTrVS17DufeOtkg3tEO0lZuEv06itcAeyKsbJLaI7Hz13rafdxy4adShdnxCu4i6Sc6Z_3ou7fC_GQMhl-Vyjuiy0qTCREEJnob_3W2xRstGHuEwPRgyGf6MyF3aLnfXRTV2Q605U6lzt9BOE3oI5mYzz1sfIdzdEoSMPUDFmncfL6W-KotwSK8yv65qKAzfRKQL1b7La2APEmW1jysKixGP7NsFTeut55klZkRLLpG0gppoI_SYwrvzO4",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCXxsjkkIPO2tH45CoUTsFVC_NHJwOzZvGMvynY-JJgHwu7Gs4PB1rZK81d8fNWqKCiFMCVDw_QfD5XklZPn1FZGWGKKpklg4A_xqP1Jlbn4vzce8RbIw_eYUJKn58NSzsuN09i84U47UsJjJIaJIWOyNRWP7RbS5kVk91wLX8aUUvHFWEzcz5AfiNvaONGkF_1kSWlKsuidYtJ2CblHIFDfwmEG8-kXJ0_3IPPaFs1ohVq0QXGaidwZXxO0_32GWQsedXteDbUqDo",
];

const MOCK_REVIEWS = [
  {
    id: "1",
    author: "James Davidson",
    initials: "JD",
    role: "Sr. Systems Architect",
    date: "October 12, 2023",
    rating: 5,
    verified: true,
    title: "Exceptional Throughput and PoE Stability",
    body: "We deployed 12 of these units across our satellite offices. The PoE+ management is robust—we're driving heavy VoIP and security camera traffic with zero dropouts. The L3 features are surprisingly comprehensive for a switch at this price point. Highly recommended for mid-market enterprise use.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBkOzxuULcnWEdx4lMorKiSLkpDoLi-gpCLD-Dr4OW-gaa8Cop1RFM0VSkbUgsARNm_uTx6SQbvK7OVZNVOGz4MI2ZcbVGE8kWpeGUDljFNXA0kstBQ3WU3UzSdFU2YlYDTJxrBfAiCWapC6e6o7GFFLELQr2DIvtWMZI-tjkz5sYl5fyppiHEdmHepoQO2cqgdpTEKvBfXIXYVZZA2QqF9bCKgGeAAQt4L4II7akIwgBkAiRhlbDa0bAoqJ_Piropc95oDQezq0cg",
    helpfulCount: 24,
  },
  {
    id: "2",
    author: "Sarah Chen",
    initials: "SC",
    role: "Network Administrator",
    date: "September 28, 2023",
    rating: 4,
    verified: false,
    badge: "Certified Engineer",
    title: "Great performance, CLI could be better",
    body: "Hardware performance is rock solid. No latency issues even at high saturation. My only gripe is the proprietary CLI syntax—it takes some getting used to if you're coming from Cisco or Juniper. Once you get past the learning curve, it's a breeze to manage.",
    helpfulCount: 8,
  },
];

interface ProductReviewsContentProps {
  slug: string;
  productName: string;
  productImage: string;
  productSubtitle?: string;
  sku?: string;
  rating?: number;
  reviewCount?: number;
  price?: string;
}

export default function ProductReviewsContent({
  slug,
  productName,
  productImage,
  productSubtitle = "Enterprise-grade managed switch with PoE+",
  sku = "NL-CS-X100-48P",
  rating = 4.8,
  reviewCount = 124,
  price = "৳45,000",
}: ProductReviewsContentProps) {
  const dispatch = useAppDispatch();
  const [sortBy, setSortBy] = useState<"relevant" | "newest">("relevant");
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [reviewRating, setReviewRating] = useState(0);

  const handleAddToCart = () => {
    dispatch(
      addItem({
        id: `reviews-${slug}`,
        name: productName,
        slug,
        image: productImage,
        price: 45000,
        quantity: 1,
        subtitle: productSubtitle,
      }),
    );
    dispatch(openDrawer());
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <nav className="flex mb-8 text-sm font-medium text-slate-500 dark:text-slate-400 flex-wrap gap-x-2">
        <Link href="/" className="hover:text-primary">
          Home
        </Link>
        <span className="text-slate-300">/</span>
        <Link href="/categories" className="hover:text-primary">
          Networking Hardware
        </Link>
        <span className="text-slate-300">/</span>
        <span className="text-slate-900 dark:text-white">{productName}</span>
      </nav>

      {/* Product Summary */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center border border-slate-200 dark:border-slate-700 shrink-0 overflow-hidden">
              <Image
                src={productImage}
                alt={productName}
                width={96}
                height={96}
                className="object-contain p-2"
              />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
                {productName}
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                {productSubtitle}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="success">
                  In Stock
                </Badge>
                <Badge variant="outline" className="text-slate-500 dark:text-slate-400">
                  SKU: {sku}
                </Badge>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <Link href={Routes.products.detail(slug)}>
              <Button variant="outline">
                <Eye className="size-4" />
                View Product Details
              </Button>
            </Link>
            <Button
              type="button"
              onClick={handleAddToCart}
              className="flex-1 md:flex-none inline-flex items-center justify-center px-6 py-2.5 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-colors"
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
              Customer Rating
            </h3>
            <div className="flex items-end gap-3 mb-6">
              <span className="text-5xl font-black text-slate-900 dark:text-white">
                {rating}
              </span>
              <div className="pb-1">
                <div className="flex text-amber-500 gap-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      className={cn(
                        "size-5",
                        i <= Math.floor(rating)
                          ? "fill-current"
                          : "text-slate-200 dark:text-slate-600",
                      )}
                    />
                  ))}
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  {reviewCount} Global Reviews
                </p>
              </div>
            </div>
            <div className="space-y-3">
              {STAR_DISTRIBUTION.map((row) => (
                <div
                  key={row.stars}
                  className="grid grid-cols-[3rem_1fr_2.5rem] items-center gap-3"
                >
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    {row.stars} Star
                  </span>
                  <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all"
                      style={{ width: `${row.percent}%` }}
                    />
                  </div>
                  <span className="text-sm text-slate-500 text-right">
                    {row.percent}%
                  </span>
                </div>
              ))}
            </div>
            <button
              type="button"
              className="w-full mt-8 py-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <Edit className="size-5" />
              Write a Review
            </button>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
              Community Photos
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {COMMUNITY_PHOTOS.map((src, i) => (
                <div
                  key={i}
                  className="w-full aspect-square relative rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden"
                >
                  <Image
                    src={src}
                    alt={`Customer setup ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
              <div className="w-full aspect-square rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-500 cursor-pointer border border-slate-200 dark:border-slate-700">
                +12 Photos
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="lg:col-span-8 space-y-6">
          {/* Write Review Form */}
          <section className="bg-white dark:bg-slate-900 rounded-xl border-2 border-primary/30 p-6 md:p-8 shadow-lg ring-4 ring-primary/5">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-primary/10 rounded-lg">
                <MessageSquare className="size-5 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Write your review
              </h3>
            </div>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Overall Rating
                </label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setReviewRating(i)}
                      className="p-0.5 hover:opacity-80 transition-opacity"
                    >
                      <Star
                        className={cn(
                          "size-8 transition-colors",
                          i <= reviewRating
                            ? "fill-amber-500 text-amber-500"
                            : "text-slate-300 dark:text-slate-600",
                        )}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Review Title
                  </label>
                  <input
                    type="text"
                    placeholder="Summarize your experience"
                    className="w-full px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Technical Role
                  </label>
                  <select className="w-full px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-slate-900 dark:text-white">
                    <option>Network Engineer</option>
                    <option>IT Administrator</option>
                    <option>CTO / IT Director</option>
                    <option>Consultant</option>
                    <option>Other Professional</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Review Details
                </label>
                <textarea
                  placeholder="What did you like? Any installation challenges?"
                  rows={4}
                  className="w-full px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none resize-y text-slate-900 dark:text-white placeholder:text-slate-400"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Add Photos
                </label>
                <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-lg p-8 flex flex-col items-center justify-center text-slate-500 hover:border-primary hover:bg-primary/5 cursor-pointer transition-all">
                  <ImagePlus className="size-10 mb-2 text-slate-400" />
                  <p className="text-sm font-medium">
                    Drag and drop setup photos or click to browse
                  </p>
                  <p className="text-xs mt-1">PNG, JPG up to 10MB</p>
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  className="px-6 py-2.5 font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-8 py-2.5 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </section>

          {/* Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-4">
              <span className="text-sm font-bold text-slate-900 dark:text-white">
                Sort by:
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setSortBy("relevant")}
                  className={cn(
                    "px-3 py-1.5 text-xs font-bold rounded-full transition-colors",
                    sortBy === "relevant"
                      ? "bg-primary text-white"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700",
                  )}
                >
                  Most Relevant
                </button>
                <button
                  type="button"
                  onClick={() => setSortBy("newest")}
                  className={cn(
                    "px-3 py-1.5 text-xs font-bold rounded-full transition-colors",
                    sortBy === "newest"
                      ? "bg-primary text-white"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700",
                  )}
                >
                  Newest First
                </button>
              </div>
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={verifiedOnly}
                onChange={(e) => setVerifiedOnly(e.target.checked)}
                className="rounded text-primary focus:ring-primary h-4 w-4"
              />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Verified Buyers Only
              </span>
            </label>
          </div>

          {/* Review list */}
          <div className="space-y-6">
            {MOCK_REVIEWS.map((review) => (
              <article
                key={review.id}
                className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm"
              >
                <div className="flex justify-between items-start mb-4 flex-wrap gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center border border-slate-200 dark:border-slate-700 font-bold text-primary text-sm">
                      {review.initials}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="font-bold text-slate-900 dark:text-white">
                          {review.author}
                        </h4>
                        {review.verified && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-[10px] font-bold uppercase tracking-wider">
                            Verified Buyer
                          </span>
                        )}
                        {review.badge && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                            {review.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {review.role} • {review.date}
                      </p>
                    </div>
                  </div>
                  <div className="flex text-amber-500 gap-0.5">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        className={cn(
                          "size-4",
                          i <= review.rating
                            ? "fill-current"
                            : "text-slate-200 dark:text-slate-600",
                        )}
                      />
                    ))}
                  </div>
                </div>
                <h5 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  {review.title}
                </h5>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  {review.body}
                </p>
                {review.image && (
                  <div className="flex gap-2 mb-6">
                    <div className="relative w-24 h-24 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
                      <Image
                        src={review.image}
                        alt="Review attachment"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                )}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-slate-500">
                      Was this review helpful?
                    </span>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        className="flex items-center gap-1 px-3 py-1 border border-slate-200 dark:border-slate-700 rounded-md text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-slate-700 dark:text-slate-300"
                      >
                        <ThumbsUp className="size-3.5" />
                        Yes ({review.helpfulCount})
                      </button>
                      <button
                        type="button"
                        className="flex items-center gap-1 px-3 py-1 border border-slate-200 dark:border-slate-700 rounded-md text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-slate-700 dark:text-slate-300"
                      >
                        <ThumbsDown className="size-3.5" />
                        No
                      </button>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 p-1"
                    aria-label="Report"
                  >
                    <Flag className="size-4" />
                  </button>
                </div>
              </article>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-2 py-8">
            <button
              type="button"
              disabled
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Previous page"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              className="w-10 h-10 rounded-lg bg-primary text-white font-bold text-sm"
            >
              1
            </button>
            <button
              type="button"
              className="w-10 h-10 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 font-bold text-sm text-slate-700 dark:text-slate-300"
            >
              2
            </button>
            <button
              type="button"
              className="w-10 h-10 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 font-bold text-sm text-slate-700 dark:text-slate-300"
            >
              3
            </button>
            <span className="px-2 text-slate-400">...</span>
            <button
              type="button"
              className="w-10 h-10 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 font-bold text-sm text-slate-700 dark:text-slate-300"
            >
              12
            </button>
            <button
              type="button"
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
              aria-label="Next page"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
