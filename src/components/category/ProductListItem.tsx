"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingCart, Heart, ChevronRight } from "lucide-react";
import { Routes } from "@/lib/routes";
import { slugify } from "@/lib/utils";
import { useAppDispatch } from "@/store/hooks";
import { addItem, openDrawer } from "@/store/cartSlice";
import type { ProductCardProps } from "@/components/e-commerce/ProductCard";
import { cn } from "@/lib/utils";

interface ProductListItemProps extends ProductCardProps {}

export default function ProductListItem({
  id,
  brand,
  name,
  image,
  price,
  originalPrice,
  rating,
  reviews,
  specs,
  badge,
  inStock,
}: ProductListItemProps) {
  const dispatch = useAppDispatch();
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!inStock) return;
    dispatch(
      addItem({
        id,
        name,
        slug: slugify(name),
        image,
        price,
        quantity: 1,
        subtitle: specs[0] ?? `${brand} • In Stock`,
      })
    );
    dispatch(openDrawer());
  };

  return (
    <article className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden hover:shadow-lg hover:border-primary/20 transition-all duration-300">
      <div className="flex flex-col sm:flex-row gap-4 p-4 md:p-5">
        {/* Image */}
        <Link
          href={Routes.products.detail(slugify(name))}
          className="relative shrink-0 w-full sm:w-48 md:w-56 aspect-square sm:aspect-auto sm:h-40 bg-slate-50 dark:bg-slate-800 rounded-lg overflow-hidden flex items-center justify-center"
        >
          <Image
            src={image}
            alt={name}
            width={224}
            height={224}
            className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal group-hover:scale-105 transition-transform duration-300"
          />
          {badge && (
            <span
              className={cn(
                "absolute top-2 left-2 text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wide shadow-sm",
                badge === "SAVE 15%" ? "bg-red-500" : "bg-primary"
              )}
            >
              {badge}
            </span>
          )}
        </Link>

        {/* Content */}
        <div className="flex-1 min-w-0 flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">
              {brand}
            </p>
            <Link
              href={Routes.products.detail(slugify(name))}
              className="block mb-2"
            >
              <h3 className="text-base font-semibold text-slate-900 dark:text-white leading-snug line-clamp-2 group-hover:text-primary transition-colors hover:underline">
                {name}
              </h3>
            </Link>
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "size-4",
                      i < fullStars
                        ? "fill-amber-500 text-amber-500"
                        : i === fullStars && hasHalfStar
                          ? "fill-amber-500/50 text-amber-500"
                          : "text-slate-200 dark:text-slate-600"
                    )}
                  />
                ))}
              </div>
              <span className="text-xs text-slate-500">({rating}) · {reviews} reviews</span>
            </div>
            <ul className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
              {specs.slice(0, 3).map((spec, i) => (
                <li key={i} className="flex items-center gap-1.5">
                  <span className="size-1 rounded-full bg-primary shrink-0" />
                  {spec}
                </li>
              ))}
            </ul>
          </div>

          {/* Price & actions */}
          <div className="flex md:flex-col md:min-w-[140px] items-center md:items-end justify-between md:justify-center gap-4 border-t md:border-t-0 pt-4 md:pt-0 md:border-l border-slate-100 dark:border-slate-800 md:pl-6">
            <div className="text-left md:text-right">
              {originalPrice && (
                <span className="block text-sm text-slate-400 line-through">
                  ৳{originalPrice.toLocaleString()}
                </span>
              )}
              <span className="text-xl font-bold text-slate-900 dark:text-white">
                ৳{price.toLocaleString()}
              </span>
              <p
                className={cn(
                  "text-xs font-medium mt-0.5 flex items-center gap-1",
                  inStock ? "text-green-600 dark:text-green-500" : "text-amber-600 dark:text-amber-500"
                )}
              >
                {inStock ? "In stock" : "Low stock"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Add to wishlist"
              >
                <Heart className="size-5" />
              </button>
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={!inStock}
                className={cn(
                  "inline-flex items-center gap-2 px-4 py-2.5 rounded-lg font-semibold text-sm transition-colors",
                  inStock
                    ? "bg-primary text-white hover:bg-primary/90 shadow-sm"
                    : "bg-slate-200 dark:bg-slate-700 text-slate-500 cursor-not-allowed"
                )}
              >
                <ShoppingCart className="size-4" />
                Add to cart
              </button>
              <Link
                href={Routes.products.detail(slugify(name))}
                className="p-2 rounded-lg text-slate-400 hover:text-primary hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="View product"
              >
                <ChevronRight className="size-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
