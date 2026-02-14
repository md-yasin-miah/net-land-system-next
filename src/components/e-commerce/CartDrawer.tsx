"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Minus, Plus, Trash2, ArrowRight, Lock, ShoppingBag } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  closeDrawer,
  removeItem,
  updateQuantity,
  getCartTotal,
  // getCartCount,
  type CartItem,
} from "@/store/cartSlice";

const SHIPPING_ESTIMATE = 250;

export default function CartDrawer() {
  const dispatch = useAppDispatch();
  const items = useAppSelector((s) => s.cart.items);
  const isOpen = useAppSelector((s) => s.cart.isDrawerOpen);

  const subtotal = getCartTotal(items);
  const total = subtotal + SHIPPING_ESTIMATE;

  const handleClose = useCallback(() => dispatch(closeDrawer()), [dispatch]);

  useEffect(() => {
    if (!isOpen) return;
    const onEscape = (e: KeyboardEvent) => e.key === "Escape" && handleClose();
    document.addEventListener("keydown", onEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleClose]);

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
            onClick={handleClose}
            aria-hidden
          />
        )}
      </AnimatePresence>

      {/* Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white dark:bg-background-dark shadow-2xl z-[70] flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800 shrink-0">
              <div className="flex items-center gap-3">
                <div className="size-8 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                  <ShoppingBag className="size-5 text-primary" />
                </div>
                <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                  Shopping Cart
                </h2>
              </div>
              <button
                type="button"
                onClick={handleClose}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
                aria-label="Close cart"
              >
                <X className="size-5 text-slate-500" />
              </button>
            </div>

            {/* Item list */}
            <div className="flex-1 overflow-y-auto py-4 px-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <ShoppingBag className="size-14 text-slate-300 dark:text-slate-600 mb-4" />
                  <p className="text-slate-500 dark:text-slate-400 font-medium">
                    Your cart is empty
                  </p>
                  <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">
                    Add items from the shop to get started
                  </p>
                  <Link
                    href="/"
                    onClick={handleClose}
                    className="mt-6 text-primary font-semibold hover:underline"
                  >
                    Continue shopping
                  </Link>
                </div>
              ) : (
                <ul className="space-y-6">
                  {items.map((item) => (
                    <CartDrawerItem
                      key={item.id}
                      item={item}
                      onRemove={() => dispatch(removeItem(item.id))}
                      onUpdateQty={(qty) =>
                        dispatch(updateQuantity({ id: item.id, quantity: qty }))
                      }
                    />
                  ))}
                </ul>
              )}
            </div>

            {/* Footer - Order summary & CTA */}
            {items.length > 0 && (
              <div className="p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 shrink-0">
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400">
                    <span>Subtotal</span>
                    <span>৳{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400">
                    <span>Estimated Shipping</span>
                    <span>৳{SHIPPING_ESTIMATE.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400">
                    <span>Tax (Estimated)</span>
                    <span className="italic">Calculated at checkout</span>
                  </div>
                  <div className="pt-3 border-t border-slate-200 dark:border-slate-700 flex justify-between items-center">
                    <span className="text-lg font-bold text-slate-900 dark:text-white">
                      Total
                    </span>
                    <span className="text-xl font-bold text-primary">
                      ৳{total.toLocaleString()}
                    </span>
                  </div>
                </div>
                <Link
                  href="/checkout"
                  onClick={handleClose}
                  className="w-full bg-primary hover:bg-blue-700 text-white py-4 rounded-xl font-bold text-lg transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 mb-4"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="size-5" />
                </Link>
                <p className="text-center text-xs text-slate-500 flex items-center justify-center gap-1">
                  <Lock className="size-3.5" />
                  Secure checkout with end-to-end encryption
                </p>
              </div>
            )}
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}

function CartDrawerItem({
  item,
  onRemove,
  onUpdateQty,
}: {
  item: CartItem;
  onRemove: () => void;
  onUpdateQty: (qty: number) => void;
}) {
  return (
    <li className="flex gap-4 group">
      <div className="relative size-24 rounded-lg bg-slate-100 dark:bg-slate-800 overflow-hidden shrink-0 border border-slate-200 dark:border-slate-700">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover"
          sizes="96px"
        />
      </div>
      <div className="flex-1 flex flex-col justify-between min-w-0">
        <div>
          <div className="flex justify-between items-start gap-2">
            <Link
              href={`/products/${item.slug}`}
              onClick={() => {}}
              className="text-base font-semibold text-slate-900 dark:text-white leading-tight hover:text-primary transition-colors line-clamp-2"
            >
              {item.name}
            </Link>
            <button
              type="button"
              onClick={onRemove}
              className="text-slate-400 hover:text-red-500 transition-colors shrink-0"
              aria-label={`Remove ${item.name} from cart`}
            >
              <Trash2 className="size-5" />
            </button>
          </div>
          {item.subtitle && (
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed line-clamp-2">
              {item.subtitle}
            </p>
          )}
        </div>
        <div className="flex items-center justify-between mt-2 gap-2">
          <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
            <button
              type="button"
              onClick={() => onUpdateQty(Math.max(1, item.quantity - 1))}
              className="px-2 py-1.5 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus className="size-4" />
            </button>
            <span className="px-3 text-sm font-medium min-w-8 text-center">
              {item.quantity}
            </span>
            <button
              type="button"
              onClick={() => onUpdateQty(item.quantity + 1)}
              className="px-2 py-1.5 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors"
              aria-label="Increase quantity"
            >
              <Plus className="size-4" />
            </button>
          </div>
          <div className="text-right shrink-0">
            <span className="block text-base font-bold text-primary">
              ৳{(item.price * item.quantity).toLocaleString()}
            </span>
            {item.quantity > 1 && (
              <span className="block text-[10px] text-slate-400 uppercase">
                ৳{item.price.toLocaleString()} each
              </span>
            )}
          </div>
        </div>
      </div>
    </li>
  );
}
