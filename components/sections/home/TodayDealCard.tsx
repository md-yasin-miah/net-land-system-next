"use client";

import React, { useState } from "react";
import { Badge, Typography, theme } from "antd";
import { StarFilled, RightOutlined } from "@ant-design/icons";
import Link from "next/link";
import Image from "next/image";

const { Text } = Typography;

interface TodayDealCardProps {
  deal: TodayDeal;
}

function StarRating({
  rating,
  reviewCount,
}: {
  rating: number;
  reviewCount: number;
}) {
  const { token } = theme.useToken();
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <div style={{ display: "flex", gap: 2 }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <StarFilled
            key={star}
            style={{
              fontSize: 12,
              color:
                star <= fullStars
                  ? (token.colorWarning ?? "#faad14")
                  : star === fullStars + 1 && hasHalf
                    ? (token.colorWarning ?? "#faad14")
                    : token.colorFillSecondary,
              opacity: star === fullStars + 1 && hasHalf ? 0.7 : 1,
            }}
          />
        ))}
      </div>
      <Text type="secondary" style={{ fontSize: 12, lineHeight: 1 }}>
        ({reviewCount})
      </Text>
    </div>
  );
}

export default function TodayDealCard({ deal }: TodayDealCardProps) {
  const { token } = theme.useToken();
  const href = deal.href ?? "#";
  const savingsAmount = deal.originalPrice - deal.price;
  const imageList =
    deal.images && deal.images.length > 0 ? deal.images : [deal.image];
  const [cardHovered, setCardHovered] = useState(false);
  const hoverImageIndex = cardHovered && imageList.length > 1 ? 1 : 0;

  return (
    <Badge.Ribbon
      text={deal.badge}
      color={deal?.badge_olor || token.colorPrimary}
    >
      <Link
        href={href}
        style={{
          display: "block",
          height: "100%",
          textDecoration: "none",
          color: "inherit",
        }}
        onMouseEnter={() => setCardHovered(true)}
        onMouseLeave={() => setCardHovered(false)}
      >
        <article
          style={{
            height: "100%",
            borderRadius: token.borderRadiusLG,
            background: token.colorBgContainer,
            border: `1px solid ${token.colorBorderSecondary}`,
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.06)",
            overflow: "hidden",
            transition:
              "box-shadow 0.25s ease, transform 0.25s ease, border-color 0.2s ease",
            display: "flex",
            flexDirection: "column",
          }}
          className="today-deal-card-hover"
        >
          {/* Content block */}
          <div
            style={{
              padding: "14px 16px 12px",
              flex: "1 1 auto",
              minHeight: 0,
            }}
          >
            <StarRating rating={deal.rating} reviewCount={deal.reviewCount} />

            <Text
              strong
              style={{
                fontSize: 14,
                lineHeight: 1.4,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                marginTop: 8,
                marginBottom: deal.promoText ? 6 : 0,
                color: token.colorTextHeading ?? token.colorText,
              }}
            >
              {deal.title}
            </Text>

            {deal.promoText && (
              <div
                style={{
                  fontSize: 11,
                  color: "#c62828",
                  lineHeight: 1.35,
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  paddingLeft: 8,
                  borderLeft: `3px solid ${token.colorError ?? "#ff4d4f"}`,
                  marginBottom: 10,
                }}
              >
                {deal.promoText}
              </div>
            )}

            {/* Price row + discount badge */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 8,
                marginTop: 10,
                position: "relative",
                paddingRight: 56,
              }}
            >
              <Text
                strong
                style={{
                  fontSize: 22,
                  color: token.colorText,
                  lineHeight: 1.2,
                }}
              >
                $
                {deal.price.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </Text>
              <Text
                delete
                style={{ fontSize: 13, color: token.colorTextSecondary }}
              >
                $
                {deal.originalPrice.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </Text>
              <div
                style={{
                  position: "absolute",
                  right: 0,
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "#c62828",
                  color: "#fff",
                  fontSize: 11,
                  fontWeight: 700,
                  padding: "4px 8px",
                  borderRadius: token.borderRadiusSM,
                  lineHeight: 1.2,
                }}
              >
                {deal.discountPercent}% off
              </div>
            </div>
            {savingsAmount > 0 && (
              <Text
                type="secondary"
                style={{ fontSize: 11, marginTop: 4, display: "block" }}
              >
                Save ${savingsAmount.toFixed(2)}
              </Text>
            )}
          </div>

          {/* Product image - multiple images, swap on hover */}
          <div
            style={{
              position: "relative",
              margin: "0 12px 12px",
              height: 140,
              background: token.colorFillTertiary ?? "#f5f5f5",
              borderRadius: token.borderRadius,
              overflow: "hidden",
              flexShrink: 0,
            }}
          >
            <div
              style={{ position: "relative", width: "100%", height: "100%" }}
            >
              {imageList.map((imgSrc, index) => (
                <div
                  key={imgSrc + index}
                  style={{
                    position: "absolute",
                    inset: 0,
                    opacity: index === hoverImageIndex ? 1 : 0,
                    transition: "opacity 0.3s ease",
                    padding: 12,
                  }}
                >
                  <Image
                    src={imgSrc}
                    alt={deal.imageAlt ?? `${deal.title} view ${index + 1}`}
                    fill
                    sizes="(max-width: 400px) 160px, 248px"
                    style={{ objectFit: "contain" }}
                  />
                </div>
              ))}
              {deal.tags && deal.tags.length > 0 && (
                <div
                  style={{
                    position: "absolute",
                    bottom: 8,
                    left: 8,
                    right: 8,
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 4,
                    zIndex: 1,
                  }}
                >
                  {deal.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontSize: 10,
                        fontWeight: 600,
                        background: "rgba(0,0,0,0.72)",
                        color: "#fff",
                        padding: "3px 8px",
                        borderRadius: 4,
                        letterSpacing: "0.02em",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Footer CTA - classic e-comm pattern */}
          <div
            style={{
              padding: "0 16px 14px",
              flexShrink: 0,
              borderTop: `1px solid ${token.colorBorderSecondary}`,
              paddingTop: 12,
              marginTop: "auto",
            }}
          >
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
                fontSize: 13,
                fontWeight: 600,
                color: token.colorPrimary,
              }}
            >
              View deal
              <RightOutlined style={{ fontSize: 12 }} />
            </span>
          </div>
        </article>
      </Link>
    </Badge.Ribbon>
  );
}
