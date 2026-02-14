import Link from 'next/link';
import Image from 'next/image';
import { Bell, Menu, ShoppingCart, User } from 'lucide-react';
import { Routes } from '@/lib/routes';

const Header = () => {
  return (
    <header className="bg-primary text-white sticky top-0 z-50 shadow-md">
      {/* Main Navigation */}
      <div className="max-w-[1440px] mx-auto px-4 h-16 flex items-center justify-between gap-6">
        {/* Logo Area */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <div className="size-10 bg-white rounded-lg flex items-center justify-center overflow-hidden">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCpwW0cnzf8_nY9c4SCeoJW9THJfrFDYVuV5AM4vaUo3dW9lCOqezSxu2ou01FcBAr5ASOMza-nP_G35g7WBIeEOxf-mcVOvRbdZQSRquGOIxBbK7_TEgiVUpzbgVbTrwnOWaT5s1h_1z6Fx57ungxLiF35-ZGB1gteJL5ooSdH1OZlrtD1VPdg0LrMNSgZBlkQY5FKLi7G85tamFiwYapfqiHtxOK-kqjccJMBSEx-ZOxXYJuVQjCM_aM6HxVGqQVg_EPL4FtaNgE"
              alt="Net Land System Bangladesh Logo"
              width={40}
              height={40}
              className="w-full h-full object-contain"
            />
          </div>
          <h1 className="text-xl font-bold tracking-tight hidden lg:block">Net Land System</h1>
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
            <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded transition-colors border border-white/20">
              <ShoppingCart className="w-5 h-5" />
              <span className="font-bold">৳0.00</span>
            </button>
          </div>
        </div>
      </div>

      {/* Sub Nav / Categories */}
      <div className="bg-primary-dark/20 border-t border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 h-10 flex items-center gap-8 text-sm font-medium">
          <Link href="/categories" className="flex items-center gap-1 hover:text-blue-200">
            <Menu className="w-4 h-4" /> All Categories
          </Link>
          <Link href="/deals" className="hover:text-blue-200">
            Today&apos;s Deals
          </Link>
          <Link href="/new-arrivals" className="hover:text-blue-200">
            New Arrivals
          </Link>
          <Link href="/corporate" className="hover:text-blue-200">
            Corporate Sales
          </Link>
          <Link href="/best-sellers" className="hover:text-blue-200">
            Best Sellers
          </Link>
          <Link href="/support" className="hover:text-blue-200">
            Customer Service
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
