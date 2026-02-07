import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NetLand System",
  description: "NetLand System Bangladesh",
};

import { AntdRegistry } from "@ant-design/nextjs-registry";
import ReduxProvider from "@/lib/redux/provider";
import { ThemeProvider,AntdConfigProvider } from "@/components/shared/provider/index";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AntdRegistry>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <AntdConfigProvider>
              <ReduxProvider>{children}</ReduxProvider>
            </AntdConfigProvider>
          </ThemeProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
