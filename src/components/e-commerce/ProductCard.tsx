"use client";

import { Routes } from "@/lib/routes";
import Image from "next/image";
import Link from "next/link";
import { Star, StarHalf, CheckCircle, Clock, ShoppingCart, Bookmark } from "lucide-react";
import { slugify } from "@/lib/utils";
import { useAppDispatch } from "@/store/hooks";
import { addItem, openDrawer } from "@/store/cartSlice";

export interface ProductCardProps {
  id: string;
  brand: string;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  specs: string[];
  badge?: "SAVE 15%" | "HOT" | "NEW";
  inStock: boolean;
}

const ProductCard = ({
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
}: ProductCardProps) => {
  const dispatch = useAppDispatch();
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  const handleAddToCart = () => {
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
    <div className="bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700 p-3 flex flex-col group hover:shadow-xl transition-shadow relative">
      <div className="relative aspect-square overflow-hidden mb-3">
        <Image
          src={image}
          alt={name}
          width={300}
          height={300}
          className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal"
        />
        {badge && (
          <span
            className={`absolute top-0 right-0 text-white text-[10px] font-bold px-2 py-0.5 rounded-sm ${
              badge === "SAVE 15%" ? "bg-red-500" : "bg-primary"
            }`}
          >
            {badge}
          </span>
        )}
      </div>
      <div className="flex-1">
        <p className="text-[10px] text-slate-400 font-bold mb-1 uppercase">
          {brand}
        </p>
        <Link href={Routes.products.detail(slugify(name))}>
          <h3 className="text-sm font-medium leading-tight mb-2 group-hover:text-primary transition-colors line-clamp-2 h-10 hover:underline">
            {name}
          </h3>
        </Link>
        <div className="mb-2 flex items-center gap-1">
          <div className="flex text-orange-400 text-xs">
            {[...Array(fullStars)].map((_, i) => (
              <Star key={i} className="size-4 fill-current" />
            ))}
            {hasHalfStar && (
              <StarHalf className="size-4 fill-current" />
            )}
            {[...Array(5 - Math.ceil(rating))].map((_, i) => (
              <Star key={`empty-${i}`} className="size-4 opacity-30" />
            ))}
          </div>
          <span className="text-[10px] text-slate-400">({reviews})</span>
        </div>
        <div className="text-xs text-slate-500 mb-2">
          {specs.map((spec, index) => (
            <div key={index}>• {spec}</div>
          ))}
        </div>
      </div>
      <div className="mt-2">
        <div className="flex flex-col">
          {originalPrice && (
            <span className="text-xs text-slate-400 line-through">
              ৳{originalPrice.toLocaleString()}
            </span>
          )}
          <span className="text-lg font-bold text-slate-900 dark:text-white">
            ৳{price.toLocaleString()}
          </span>
        </div>
        <div
          className={`mb-3 flex items-center gap-1 text-[10px] font-bold ${
            inStock ? "text-green-600" : "text-orange-600"
          }`}
        >
          {inStock ? (
            <CheckCircle className="size-4 shrink-0" />
          ) : (
            <Clock className="size-4 shrink-0" />
          )}
          {inStock ? "In Stock" : "Pre-Order"}
        </div>
        <button
          type="button"
          onClick={handleAddToCart}
          className={`flex w-full items-center justify-center gap-2 rounded py-2 text-xs font-bold text-white transition-colors ${
            inStock
              ? "bg-primary hover:bg-blue-700"
              : "bg-slate-800 hover:bg-slate-900"
          }`}
        >
          {inStock ? (
            <ShoppingCart className="size-4 shrink-0" />
          ) : (
            <Bookmark className="size-4 shrink-0" />
          )}
          {inStock ? "Add to Cart" : "Pre-Order"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
