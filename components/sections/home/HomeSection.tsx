"use client";

import React from "react";
import {  theme } from "antd";
import HeroCarousel from "./HeroCarousel";
import CategorySidebar from "./CategorySidebar";
import { heroSlides, dealCards } from "@/mock/home";
import { homeSidebarMenuItems } from "@/mock/menu";
import DealCard from "./DealCard";

export default function HomeSection() {
  const { token } = theme.useToken();

  return (
    <div className="grid gap-5 grid-cols-12">
      <div className="col-span-3 row-span-2">
        <CategorySidebar
          className="row-span-2"
          items={homeSidebarMenuItems}
          defaultSelectedKey="components-storage"
        />
      </div>
      <div className="col-span-9">
        <HeroCarousel slides={heroSlides} />
      </div>
      {dealCards.map((deal) => (
        <div key={deal.id} className="col-span-3">
          <DealCard deal={deal} />
        </div>
      ))}
    </div>
  );
}
