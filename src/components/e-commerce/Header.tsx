"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Bell, Menu, Search, ShoppingCart } from "lucide-react";
import { Routes } from "@/lib/routes";
import { headerSubNav, RoleBaseProfileMenu } from "@/lib/menu";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { openDrawer } from "@/store/cartSlice";
import { getCartCount, getCartTotal } from "@/store/cartSlice";
import { logout } from "@/store/authSlice";
import { ThemeToggle } from "../theme-toggle";
import { Button } from "../ui/button";
import CustomDropdownMenu from "../common/CustomDropdownMenu";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";

const Header = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((s) => s.cart.items);
  const cartCount = getCartCount(cartItems);
  const cartTotal = getCartTotal(cartItems);
  const user = useAppSelector((s) => s.auth.user);

  const handleMenuAction = (id: string) => {
    if (id === "logout") {
      dispatch(logout());
      router.push(Routes.home);
    }
  };
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
              <Search className="size-5 text-white" />
            </button>
          </div>
        </div>

        {/* User Actions */}
        <div className="flex items-center gap-4 shrink-0">
          {!user && (
            <div className="hidden xl:flex flex-col text-xs">
              <span className="opacity-80">Welcome,</span>
              <Link
                href={Routes.auth.login}
                className="font-semibold hover:underline"
              >
                Sign In / Register
              </Link>
            </div>
          )}
          <div className="flex items-center gap-4">
            <Link href="/notifications" className="relative">
              <Button
                variant="outline"
                size="icon"
                className="bg-transparent hover:bg-transparent hover:text-white border-white/20"
              >
                <Bell className="w-5 h-5" />
              </Button>
              <span className="absolute -top-2 -right-2 size-4 bg-orange-500 text-[10px] flex items-center justify-center rounded-full font-bold">
                2
              </span>
            </Link>
            <ThemeToggle className="border-white/20" />
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
            {user && (
              <CustomDropdownMenu
                menu={RoleBaseProfileMenu}
                onAction={handleMenuAction}
              >
                <Avatar className="cursor-pointer border border-white/20">
                  <AvatarImage src={user.avatar} alt="" />
                  <AvatarFallback className="bg-transparent border border-white/20 text-white">
                    {user.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </CustomDropdownMenu>
            )}
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
