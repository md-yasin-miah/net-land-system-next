"use client";

import React from "react";
import { Typography, theme } from "antd";
import { StarFilled, PlayCircleOutlined } from "@ant-design/icons";
import Link from "next/link";
import Image from "next/image";

const { Text } = Typography;

interface MoreItemCardProps {
  item: MoreItem;
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
    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
      <div style={{ display: "flex", gap: 1 }}>
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
      <Text type="secondary" style={{ fontSize: 12 }}>
        ({reviewCount})
      </Text>
    </div>
  );
}

export default function MoreItemCard({ item }: MoreItemCardProps) {
  const { token } = theme.useToken();
  const href = item.href ?? "#";

  return (
    <Link
      href={href}
      style={{
        display: "block",
        height: "100%",
        textDecoration: "none",
        color: "inherit",
      }}
    >
      <article
        style={{
          height: "100%",
          borderRadius: token.borderRadiusLG,
          background: token.colorBgContainer,
          border: `1px solid ${token.colorBorderSecondary}`,
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.06)",
          overflow: "hidden",
          transition: "box-shadow 0.25s ease, transform 0.25s ease, border-color 0.2s ease",
          display: "flex",
          flexDirection: "column",
        }}
        className="more-item-card-hover"
      >
        {/* Product image */}
        <div
          style={{
            position: "relative",
            height: 160,
            background: token.colorFillTertiary ?? "#f5f5f5",
            flexShrink: 0,
          }}
        >
          <div style={{ position: "relative", width: "100%", height: "100%" }}>
            <Image
              src={item.image}
              alt={item.title}
              fill
              sizes="(max-width: 768px) 100vw, 200px"
              style={{ objectFit: "contain", padding: 12 }}
            />
            {item.topBadge && (
              <div
                style={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  background: "#2e7d32",
                  color: "#fff",
                  fontSize: 10,
                  fontWeight: 600,
                  padding: "3px 8px",
                  borderRadius: 4,
                }}
              >
                {item.topBadge}
              </div>
            )}
            {item.hasVideo && (
              <div
                style={{
                  position: "absolute",
                  right: 8,
                  bottom: 8,
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background: "rgba(13, 71, 161, 0.9)",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 16,
                }}
              >
                <PlayCircleOutlined />
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div
          style={{
            padding: "12px 14px 14px",
            flex: "1 1 auto",
            minHeight: 0,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {item.rating != null && item.reviewCount != null && (
            <div style={{ marginBottom: 6 }}>
              <StarRating rating={item.rating} reviewCount={item.reviewCount} />
            </div>
          )}
          <Text
            strong
            style={{
              fontSize: 13,
              lineHeight: 1.35,
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              marginBottom: item.promoText ? 4 : 8,
              color: token.colorTextHeading ?? token.colorText,
            }}
          >
            {item.title}
          </Text>
          {item.promoText && (
            <Text
              type="secondary"
              style={{
                fontSize: 11,
                lineHeight: 1.3,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                marginBottom: 8,
              }}
            >
              {item.promoText}
            </Text>
          )}
          <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 8, marginTop: "auto" }}>
            {item.savePercent != null && item.savePercent > 0 && (
              <span
                style={{
                  background: "#c62828",
                  color: "#fff",
                  fontSize: 11,
                  fontWeight: 700,
                  padding: "2px 6px",
                  borderRadius: 4,
                }}
              >
                Save {item.savePercent}%
              </span>
            )}
            <Text strong style={{ fontSize: 18, color: token.colorText }}>
              ${item.price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </Text>
          </div>
          <Text
            delete
            style={{ fontSize: 12, color: token.colorTextSecondary, marginTop: 2 }}
          >
            ${item.originalPrice.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </Text>
          {item.sponsored && (
            <Text
              type="secondary"
              style={{ fontSize: 10, marginTop: 8, fontStyle: "italic" }}
            >
              Sponsored
            </Text>
          )}
        </div>
      </article>
    </Link>
  );
}
