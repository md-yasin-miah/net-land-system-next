"use client";

import React, { useRef, useState, useCallback } from "react";
import { theme } from "antd";
import { PauseOutlined, CaretRightOutlined } from "@ant-design/icons";
import Link from "next/link";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import type { Splide as SplideType } from "@splidejs/splide";
import "@splidejs/splide/dist/css/splide.min.css";

const posterSplideOptions = {
  type: "loop" as const,
  perPage: 1,
  autoplay: true,
  interval: 5000,
  pauseOnHover: true,
  arrows: true,
  pagination: true,
  rewind: true,
};

interface PosterCarouselProps {
  slides: Poster[];
}

export default function PosterCarousel({ slides }: PosterCarouselProps) {
  const { token } = theme.useToken();
  const splideRef = useRef<SplideType | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  const handleMounted = useCallback((splide: SplideType) => {
    splideRef.current = splide;
  }, []);

  const handleAutoplayPlay = useCallback(() => setIsPaused(false), []);
  const handleAutoplayPause = useCallback(() => setIsPaused(true), []);

  const toggleAutoplay = useCallback(() => {
    const splide = splideRef.current;
    if (!splide?.Components?.Autoplay) return;
    const autoplay = splide.Components.Autoplay as {
      play: () => void;
      pause: () => void;
      isPaused: () => boolean;
    };
    if (autoplay.isPaused()) {
      autoplay.play();
      setIsPaused(false);
    } else {
      autoplay.pause();
      setIsPaused(true);
    }
  }, []);

  if (!slides.length) return null;

  return (
    <div
      className="poster-carousel"
      style={{
        borderRadius: token.borderRadiusLG,
        overflow: "hidden",
        position: "relative",
        height: "100%",
      }}
    >
      <Splide
        options={posterSplideOptions}
        onMounted={handleMounted}
        onAutoplayPlay={handleAutoplayPlay}
        onAutoplayPause={handleAutoplayPause}
        style={{ height: "100%" }}
      >
        {slides.map((slide) => (
          <SplideSlide key={slide.id} style={{ height: "100%" }}>
            <Link
              href={slide.href}
              style={{
                display: "block",
                height: "100%",
                minHeight: 320,
                background: `url(${slide.image}) center/cover`,
              }}
            />
          </SplideSlide>
        ))}
      </Splide>
      <button
        type="button"
        aria-label={isPaused ? "Play carousel" : "Pause carousel"}
        onClick={toggleAutoplay}
        style={{
          position: "absolute",
          right: 16,
          bottom: 16,
          width: 44,
          height: 44,
          borderRadius: "50%",
          border: "none",
          background: "rgba(100, 50, 80, 0.9)",
          color: "#fff",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 18,
          boxShadow: token.boxShadowSecondary,
        }}
      >
        {isPaused ? <CaretRightOutlined /> : <PauseOutlined />}
      </button>
    </div>
  );
}
