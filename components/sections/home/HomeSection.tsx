"use client";

import React from "react";
import HeroCarousel from "./HeroCarousel";
import PosterCarousel from "./PosterCarousel";
import StaticPosterCard from "./StaticPosterCard";
import TodayDealCard from "./TodayDealCard";
import NewArrivalsCarousel from "./NewArrivalsCarousel";
import MoreItemCard from "./MoreItemCard";
import SectionTitle from "./SectionTitle";
import {
  heroSlides,
  dealCards,
  posterCarouselSlides,
  staticPoster,
  todaysBestDeals,
  gamingLaptops,
  moreItemsToConsider,
} from "@/mock/home";
import { allProductsItems } from "@/mock/menu";
import DealCard from "./DealCard";
import { Menu, theme, Button, Row, Col } from "antd";
import { RightOutlined } from "@ant-design/icons";
import Link from "next/link";

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
              items={allProductsItems?.filter(
                (item) => !(item && "disabled" in item && item.disabled),
              )}
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
          <StaticPosterCard poster={staticPoster} />
        </div>
      </section>
      {/* Today's Best Deals */}
      <section style={{ marginTop: 32 }}>
        <SectionTitle>Today&apos;s Best Deals</SectionTitle>
        <div className="todays-best-deals-scroll grid md:grid-cols-5 grid-cols-1 gap-5">
          {todaysBestDeals.map((deal, index) => (
            <TodayDealCard key={index} deal={deal} />
          ))}
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
      {/* New Arrivals / Gaming Laptops */}
      <section style={{ marginTop: 48 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 16,
          }}
        >
          <SectionTitle style={{ marginBottom: 0 }}>
            Gaming Laptops
          </SectionTitle>
          <Link
            href="#gaming-laptops"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
              fontSize: 14,
              fontWeight: 600,
              color: token.colorPrimary,
              textDecoration: "none",
            }}
          >
            See More
            <RightOutlined style={{ fontSize: 12 }} />
          </Link>
        </div>
        <NewArrivalsCarousel products={gamingLaptops} />
      </section>
      {/* More Items to Consider */}
      <section style={{ marginTop: 48 }}>
        <SectionTitle>More Items to Consider</SectionTitle>
        <Row gutter={[16, 16]} style={{ alignItems: "stretch" }}>
          {moreItemsToConsider.map((item) => (
            <Col
              key={item.id}
              xs={24}
              sm={12}
              md={8}
              lg={4}
              xl={4}
            >
              <MoreItemCard item={item} />
            </Col>
          ))}
        </Row>
      </section>
    </div>
  );
}
