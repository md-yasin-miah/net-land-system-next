"use client";

import HeroCarousel from "./HeroCarousel";
import PosterCarousel from "./PosterCarousel";
import StaticPosterCard from "./StaticPosterCard";
import TodayDealCard from "./TodayDealCard";
import { heroSlides, dealCards, posterCarouselSlides, staticPoster, todaysBestDeals } from "@/mock/home";
import { allProductsItems } from "@/mock/menu";
import DealCard from "./DealCard";
import { Menu, theme, Button, Typography } from "antd";
import { RightOutlined } from "@ant-design/icons";

export default function HomeSection() {
  const { token } = theme.useToken();
  return (
    <div>
    <section className="grid gap-5 grid-cols-12">
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
    </section>
      {/* Today's Best Deals */}
    <section style={{ marginTop: 32 }}>
      <Typography.Title
        level={3}
        style={{
          marginBottom: 16,
          fontWeight: 700,
          color: token.colorTextHeading ?? "#0d47a1",
        }}
      >
        Today&apos;s Best Deals
      </Typography.Title>
      <div
        className="todays-best-deals-scroll grid md:grid-cols-5 grid-cols-1 gap-5"
      >
        {todaysBestDeals.map((deal, index) => 
            <TodayDealCard key={index} deal={deal} />
        )}
      </div>
      <div className="flex justify-center mt-10">
        <Button
          type="primary"
          size="large"
          icon={<RightOutlined />}
          iconPlacement="end"
          href="#all-deals"
          style={{
            borderRadius: token.borderRadiusLG,
            fontWeight: 600,
            paddingLeft: 24,
            paddingRight: 24,
          }}
        >
          See all deals
        </Button>
      </div>
    </section>
    </div>
  );
}
