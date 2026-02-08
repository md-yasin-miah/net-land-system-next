"use client";

import React, { useEffect, useRef } from "react";
import { Button, Typography } from "antd";
import { RightOutlined } from "@ant-design/icons";
import Link from "next/link";
import type { HeroSlide } from "@/mock/home";
import Splide from "@splidejs/splide";
import "@splidejs/splide/dist/css/splide.min.css";

const { Title } = Typography;

interface HeroCarouselProps {
  slides: HeroSlide[];
}

export default function HeroCarousel({ slides }: HeroCarouselProps) {
  const splideRef = useRef<HTMLDivElement>(null);
  const splideInstance = useRef<Splide | null>(null);

  useEffect(() => {
    if (!splideRef.current || !slides.length) return;
    splideInstance.current = new Splide(splideRef.current, {
      type: "loop",
      perPage: 1,
      autoplay: true,
      interval: 5000,
      pauseOnHover: true,
      arrows: true,
      pagination: true,
      rewind: true,
    });
    splideInstance.current.mount();
    return () => {
      splideInstance.current?.destroy();
      splideInstance.current = null;
    };
  }, [slides.length]);

  if (!slides.length) return null;

  return (
    <div
      className="splide hero-carousel"
      ref={splideRef}
      style={{ borderRadius: 8, overflow: "hidden", marginBottom: 24 }}
    >
      <div className="splide__track">
        <ul className="splide__list">
          {slides.map((slide) => (
            <li key={slide.id} className="splide__slide">
              <div
                style={{
                  position: "relative",
                  height: 320,
                  background: `linear-gradient(to right, rgba(0,0,0,0.4) 0%, transparent 50%), url(${slide.image}) center/cover`,
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    padding: "0 48px",
                  }}
                >
                  <div style={{ maxWidth: 560 }}>
                    {slide.subtitle && (
                      <div
                        style={{
                          display: "inline-block",
                          background: "rgba(255,255,255,0.2)",
                          padding: "4px 12px",
                          borderRadius: 4,
                          marginBottom: 8,
                          fontSize: 12,
                          color: "#fff",
                          fontWeight: 600,
                        }}
                      >
                        {slide.subtitle}
                      </div>
                    )}
                    <Title
                      level={2}
                      style={{
                        color: "#fff",
                        marginBottom: 16,
                        fontWeight: 700,
                        textShadow: "0 1px 4px rgba(0,0,0,0.5)",
                      }}
                    >
                      {slide.title}
                    </Title>
                    <Link href={slide.ctaHref}>
                      <Button
                        type="primary"
                        size="large"
                        icon={<RightOutlined />}
                        iconPosition="end"
                        style={{
                          background: "#f0ad4e",
                          borderColor: "#f0ad4e",
                          fontWeight: 600,
                        }}
                      >
                        {slide.ctaText}
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
