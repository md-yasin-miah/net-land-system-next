"use client";

import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import CategoryProductCard from "./CategoryProductCard";

interface NewArrivalsCarouselProps {
  products: CategoryProduct[];
}

const splideOptions = {
  type: "slide" as const,
  perPage: 4,
  perMove: 1,
  gap: 16,
  arrows: true,
  pagination: false,
  rewind: true,
  breakpoints: {
    1200: { perPage: 4 },
    992: { perPage: 3 },
    768: { perPage: 2 },
    576: { perPage: 1 },
  },
};

export default function NewArrivalsCarousel({ products }: NewArrivalsCarouselProps) {
  if (!products.length) return null;

  return (
    <div className="new-arrivals-splide">
      <Splide options={splideOptions}>
        {products.map((product) => (
          <SplideSlide key={product.id}>
            <div className="min-h-[380px] h-full">
              <CategoryProductCard product={product} />
            </div>
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
}
