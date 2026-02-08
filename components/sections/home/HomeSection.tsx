"use client";

import HeroCarousel from "./HeroCarousel";
import PosterCarousel from "./PosterCarousel";
import StaticPosterCard from "./StaticPosterCard";
import { heroSlides, dealCards, posterCarouselSlides, staticPoster } from "@/mock/home";
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
            height: "100%",
          }}
        >
          <Menu
            style={{
              borderRadius: token.borderRadiusLG,
              height: "inherit",
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
      <div className="col-span-6" style={{ height: 280 }}>
        <PosterCarousel slides={posterCarouselSlides} />
      </div>
      <div className="col-span-6">
        <StaticPosterCard poster={staticPoster}/>
      </div>
    </div>
  );
}
