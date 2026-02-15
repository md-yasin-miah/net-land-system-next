"use client";

import type React from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, Share2, Globe } from "lucide-react";
import { footerSections, footerSocialLinks } from "@/lib/menu";

const socialIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  social_leaderboard: Share2,
  alternate_email: Mail,
  public: Globe,
};

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12 border-t-4 border-primary mt-12">
      <div className="max-w-[1440px] mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Brand Column */}
        <div>
          <Image src="/logo-white.png" alt="Net Land System Bangladesh" width={200} height={150} className="mb-5"/>
          <p className="text-sm leading-relaxed mb-6">
            Your premier destination for networking excellence in Bangladesh. We
            supply enterprise-grade hardware to IT professionals and corporate
            firms.
          </p>
          <div className="flex gap-4">
            {footerSocialLinks.map((social) => {
              const Icon = socialIconMap[social.icon] ?? Share2;
              return (
                <Link
                  key={social.icon}
                  href={social.href}
                  className="hover:text-white transition-colors"
                >
                  <Icon className="size-5" />
                </Link>
              );
            })}
          </div>
        </div>

        {/* Links Columns from menu */}
        {footerSections.map((section) => (
          <div key={section.title}>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">
              {section.title}
            </h4>
            <ul className="flex flex-col gap-3 text-sm">
              {section.links.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Contact Column */}
        <div>
          <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">
            Get in Touch
          </h4>
          <div className="flex flex-col gap-4 text-sm">
            <div className="flex gap-3">
              <MapPin className="size-5 shrink-0 text-primary" />
              <p>
                IDB Bhaban, Level 3, Shop 312
                <br />
                Dhaka-1207, Bangladesh
              </p>
            </div>
            <div className="flex gap-3">
              <Phone className="size-5 shrink-0 text-primary" />
              <p>
                +880 1712-345678
                <br />
                +880 2-9876543
              </p>
            </div>
            <div className="flex gap-3">
              <Mail className="size-5 shrink-0 text-primary" />
              <p>
                sales@netland.com.bd
                <br />
                support@netland.com.bd
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="max-w-[1440px] mx-auto px-4 mt-12 pt-8 border-t border-slate-800">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-xs opacity-60">
            © 2024 Net Land System Bangladesh. All Rights Reserved.
          </p>

          <div className="flex items-center gap-6">
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
