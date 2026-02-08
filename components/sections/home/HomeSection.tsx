"use client";

import React from "react";
import { theme } from "antd";
import HeroCarousel from "./HeroCarousel";
import DealCardsRow from "./DealCardsRow";
import CategorySidebar from "./CategorySidebar";
import { heroSlides, dealCards } from "@/mock/home";
import { homeSidebarMenuItems } from "@/mock/menu";

export default function HomeSection() {
  const { token } = theme.useToken();

  return (
    <div className="grid md:grid-cols-12 grid-cols-1 gap-5">
      <CategorySidebar
        className="md:col-span-3 col-span-1"
        items={homeSidebarMenuItems}
        defaultSelectedKey="components-storage"
      />
      <div className="md:col-span-9 col-span-1">
        <HeroCarousel slides={heroSlides} />
        <DealCardsRow deals={dealCards} />
      </div>
    </div>
  );
}
