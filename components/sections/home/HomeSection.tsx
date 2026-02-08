"use client";

import HeroCarousel from "./HeroCarousel";
import { heroSlides, dealCards } from "@/mock/home";
import { allProductsItems } from "@/mock/menu";
import DealCard from "./DealCard";
import { Menu, theme } from "antd";

export default function HomeSection() {
  const { token } = theme.useToken();
  return (
    <div className="grid gap-5 grid-cols-12">
      <div className="col-span-3 row-span-2">
        <div
          style={{
            backgroundColor: token.colorBgElevated,
            flex: 1,
            padding: "10px 0",
            overflowY: "auto",
          }}
        >
          <Menu
            style={{
              minHeight: "100%",
            }}
            styles={{
              item: {
                padding: "10px 15px",
              },
              itemIcon: {
                fontSize: "16px",
              },
            }}
            items={allProductsItems}
            className="custom-right-menu"
            selectable={false}
          />
        </div>
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
