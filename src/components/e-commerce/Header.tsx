"use client";

import Link from "next/link";
import Image from "next/image";
import { Bell, Menu, ShoppingCart, User } from "lucide-react";
import { Routes } from "@/lib/routes";
import { headerSubNav } from "@/lib/menu";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { openDrawer } from "@/store/cartSlice";
import { getCartCount, getCartTotal } from "@/store/cartSlice";
import { ThemeToggle } from "../theme-toggle";

const Header = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((s) => s.cart.items);
  const cartCount = getCartCount(cartItems);
  const cartTotal = getCartTotal(cartItems);

  return (
    <header className="bg-primary text-white sticky top-0 z-50 shadow-md">
      {/* Main Navigation */}
      <div className="max-w-[1440px] mx-auto px-4 h-16 flex items-center justify-between gap-6">
        {/* Logo Area */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <Image src="/logo-white.png" alt="Logo" width={120} height={100} />
        </Link>

        {/* Search Bar */}
        <div className="flex-1 max-w-3xl">
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Search for routers, switches, or servers..."
              className="w-full h-10 pl-4 pr-12 rounded bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-300 border-none"
            />
            <button className="absolute right-0 h-10 w-12 bg-orange-500 hover:bg-orange-600 rounded-r-sm flex items-center justify-center transition-colors">
              <span className="material-symbols-outlined text-white">search</span>
            </button>
          </div>
        </div>

        {/* User Actions */}
        <div className="flex items-center gap-6 shrink-0">
          <div className="hidden xl:flex flex-col text-xs">
            <span className="opacity-80">Welcome,</span>
            <Link href={Routes.auth.login} className="font-semibold hover:underline">
              Sign In / Register
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/profile" className="relative p-2 hover:bg-white/10 rounded-full transition-colors">
              <User className="w-5 h-5" />
            </Link>
            <Link href="/notifications" className="relative p-2 hover:bg-white/10 rounded-full transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-0 right-0 size-4 bg-orange-500 text-[10px] flex items-center justify-center rounded-full font-bold">
                2
              </span>
            </Link>
            <ThemeToggle />
            <button
              type="button"
              onClick={() => dispatch(openDrawer())}
              className="relative flex items-center gap-2 bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded transition-colors border border-white/20"
              aria-label={`Cart: ${cartCount} items`}
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="font-bold">৳{cartTotal.toLocaleString()}</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 size-4 bg-orange-500 text-[10px] flex items-center justify-center rounded-full font-bold">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Sub Nav / Categories */}
      <div className="bg-primary-dark/20 border-t border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 h-10 flex items-center gap-8 text-sm font-medium">
          {headerSubNav.map((item) => (
            <Link
              key={item.href + item.label}
              href={item.href}
              className="flex items-center gap-1 hover:text-blue-200"
            >
              {item.label === "All Categories" && <Menu className="w-4 h-4" />}
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
