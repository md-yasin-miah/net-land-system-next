"use client";

import React, { useState } from "react";
import { Typography, theme } from "antd";
import { StarFilled, PlayCircleOutlined } from "@ant-design/icons";
import Link from "next/link";
import Image from "next/image";

const { Text } = Typography;

interface CategoryProductCardProps {
  product: CategoryProduct;
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

export default function CategoryProductCard({ product }: CategoryProductCardProps) {
  const { token } = theme.useToken();
  const href = product.href ?? "#";
  const imageList = product.images?.length ? product.images : [product.image];
  const [hovered, setHovered] = useState(false);
  const displayImage = hovered && imageList.length > 1 ? imageList[1] : imageList[0];

  return (
    <Link
      href={href}
      style={{
        display: "block",
        height: "100%",
        textDecoration: "none",
        color: "inherit",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
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
        className="category-product-card-hover"
      >
        {/* Top badge */}
        {product.topBadge && (
          <div
            style={{
              flexShrink: 0,
              padding: "6px 12px 0",
              display: "flex",
              alignItems: "center",
            }}
          >
            <span
              style={{
                display: "inline-flex",
                padding: "4px 10px",
                borderRadius: 6,
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.02em",
                background:
                  product.topBadgeVariant === "secondary"
                    ? "linear-gradient(135deg, #42a5f5 0%, #1976d2 100%)"
                    : "linear-gradient(135deg, #0d47a1 0%, #0a3d91 100%)",
                color: "#fff",
                boxShadow: "0 1px 2px rgba(0,0,0,0.06)",
              }}
            >
              {product.topBadge}
            </span>
          </div>
        )}

        {/* Image + spec badges row */}
        <div
          style={{
            display: "flex",
            flex: "1 1 auto",
            minHeight: 0,
            padding: "12px 12px 0",
            gap: 8,
          }}
        >
          <div
            style={{
              position: "relative",
              flex: 1,
              minWidth: 0,
              height: 160,
              background: token.colorFillTertiary ?? "#f5f5f5",
              borderRadius: token.borderRadius,
              overflow: "hidden",
            }}
          >
            <Image
              src={displayImage}
              alt={product.title}
              fill
              sizes="(max-width: 400px) 140px, 200px"
              style={{ objectFit: "contain", padding: 12 }}
            />
            {product.hasVideo && (
              <div
                style={{
                  position: "absolute",
                  right: 8,
                  bottom: 8,
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background: "rgba(0,0,0,0.6)",
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
        <div style={{ padding: "12px 14px 14px", flexShrink: 0 }}>
          {product.rating != null && product.reviewCount != null && (
            <div style={{ marginBottom: 6 }}>
              <StarRating rating={product.rating} reviewCount={product.reviewCount} />
            </div>
          )}
          <Text
            strong
            style={{
              fontSize: 13,
              lineHeight: 1.35,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              marginBottom: product.promoText ? 4 : 8,
              color: token.colorTextHeading ?? token.colorText,
            }}
          >
            {product.title}
          </Text>
          {product.promoText && (
            <Text
              type="secondary"
              style={{ fontSize: 11, display: "block", marginBottom: 8 }}
            >
              {product.promoText}
            </Text>
          )}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 8,
            }}
          >
            {product.savePercent != null && product.savePercent > 0 && (
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
                Save {product.savePercent}%
              </span>
            )}
            <Text strong style={{ fontSize: 18, color: token.colorText }}>
              ${product.price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </Text>
          </div>
          <Text
            delete
            style={{ fontSize: 12, color: token.colorTextSecondary, display: "block", marginTop: 2 }}
          >
            ${product.originalPrice.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </Text>
        </div>
      </article>
    </Link>
  );
}
