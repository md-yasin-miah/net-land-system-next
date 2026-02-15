"use client";

import Link from 'next/link';
import Image from 'next/image';
import { ThemeToggle } from '@/components/theme-toggle';
import { footerSections, footerSocialLinks } from '@/lib/menu';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12 border-t-4 border-primary mt-12">
      <div className="max-w-[1440px] mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Brand Column */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="size-8 bg-white rounded flex items-center justify-center overflow-hidden">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDvyMzi3-AG74sz9bfpdLf2qoeeCLoWZo-Kp9LbktqK48wxodbkGObAwSu9VCuOtpOxboYhfbzBe1qQiRs1DjKn6mZxnwK2YJCPWmaXAXSZIgjDmWvaP1H2ogooHZWLsxf9DI2IHbQaPS6wtuFo1IbnAURmwGgE030AhBxiB5l9PE-2LKI36j0bmXVW2hUYIk2gpQ7lpi1fW40MFjopMcM7F9HcpAmy5a28ZiN-cmaZTSPd0BbuNsb8ENlodrBy1c8JaHbBvGluNbk"
                alt="Net Land System Logo"
                width={32}
                height={32}
                className="w-full h-full object-contain"
              />
            </div>
            <h2 className="text-white text-lg font-bold">Net Land System</h2>
          </div>
          <p className="text-sm leading-relaxed mb-6">
            Your premier destination for networking excellence in Bangladesh. We supply enterprise-grade hardware to IT professionals and corporate firms.
          </p>
          <div className="flex gap-4">
            {footerSocialLinks.map((social) => (
              <Link key={social.icon} href={social.href} className="hover:text-white transition-colors">
                <span className="material-symbols-outlined">{social.icon}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Links Columns from menu */}
        {footerSections.map((section) => (
          <div key={section.title}>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">{section.title}</h4>
            <ul className="flex flex-col gap-3 text-sm">
              {section.links.map((link) => (
                <li key={link.href + link.label}>
                  <Link href={link.href} className="hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Contact Column */}
        <div>
          <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Get in Touch</h4>
          <div className="flex flex-col gap-4 text-sm">
            <div className="flex gap-3">
              <span className="material-symbols-outlined text-primary">location_on</span>
              <p>
                IDB Bhaban, Level 3, Shop 312<br />
                Dhaka-1207, Bangladesh
              </p>
            </div>
            <div className="flex gap-3">
              <span className="material-symbols-outlined text-primary">phone</span>
              <p>
                +880 1712-345678<br />
                +880 2-9876543
              </p>
            </div>
            <div className="flex gap-3">
              <span className="material-symbols-outlined text-primary">mail</span>
              <p>
                sales@netland.com.bd<br />
                support@netland.com.bd
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="max-w-[1440px] mx-auto px-4 mt-12 pt-8 border-t border-slate-800">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-xs opacity-60">© 2024 Net Land System Bangladesh. All Rights Reserved.</p>
          
          <div className="flex items-center gap-6">
            {/* Theme Toggle */}
            <ThemeToggle />
            
            {/* Payment Methods */}
            <div className="flex items-center gap-4 opacity-70">
              <div className="h-6 w-10 bg-slate-700 rounded-sm flex items-center justify-center font-bold text-[8px]">
                VISA
              </div>
              <div className="h-6 w-10 bg-slate-700 rounded-sm flex items-center justify-center font-bold text-[8px]">
                BKASH
              </div>
              <div className="h-6 w-10 bg-slate-700 rounded-sm flex items-center justify-center font-bold text-[8px]">
                NAGAD
              </div>
              <div className="h-6 w-10 bg-slate-700 rounded-sm flex items-center justify-center font-bold text-[8px]">
                COD
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
