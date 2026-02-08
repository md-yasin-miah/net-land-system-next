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
            overflowY: "auto",
          }}
        >
          <Menu
            style={{
              minHeight: "100%",
              borderRadius: token.borderRadiusLG,
            }}
            styles={{
              item: {
                display: "flex",
              },
              itemIcon: {
                fontSize: "16px",
              },
            }}
            items={allProductsItems?.filter((item) => !(item && "disabled" in item && item.disabled))}
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
