import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import {
  ReduxProvider,
  AuthHydrator,
  CartHydrator,
} from "@/store/ReduxProvider";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Net Land System Bangladesh | Networking Hardware Store",
  description:
    "Your premier destination for networking excellence in Bangladesh. We supply enterprise-grade hardware to IT professionals and corporate firms.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} antialiased bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100`}
      >
        <ThemeProvider defaultTheme="system" storageKey="net-land-theme">
          <ReduxProvider>
            <TooltipProvider>
              <AuthHydrator />
              <CartHydrator />
              {children}
            </TooltipProvider>
          </ReduxProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
