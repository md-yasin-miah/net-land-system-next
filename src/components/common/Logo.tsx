"use client";

import { Routes } from "@/lib/routes";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "@/components/theme-provider";

interface LogoProps {
  href?: string;
  width: number;
  height: number;
  alt?: string;
  containerClass?: string;
  imageClass?: string;
}

const Logo = ({
  href,
  width,
  height,
  alt = "Net Land System Logo",
  containerClass,
  imageClass,
}: LogoProps) => {
  const { theme } = useTheme();
  return (
    <Link href={href ?? Routes.home} className={containerClass}>
      <Image
        src={theme === "light" ? "/logo-black.png" : "/logo-white.png"}
        alt={alt}
        width={width}
        height={height}
        className={imageClass}
      />
    </Link>
  );
};

export default Logo;
