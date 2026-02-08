"use client";

import React from "react";
import { Card, Button, Typography, theme, Space } from "antd";
import { RightOutlined } from "@ant-design/icons";
import Link from "next/link";
import Image from "next/image";

const { Text } = Typography;

interface DealCardProps {
  deal: DealCard;
}

export default function DealCard({ deal }: DealCardProps) {
  const { token } = theme.useToken();

  return (
    <Card
      styles={{
        body: { padding: 16 },
      }}
      style={{
        height: "100%",
        borderRadius: token.borderRadiusLG,
        backgroundColor: token.colorBgContainer,
      }}
    >
      {/* Header: brand + more link */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 12,
        }}
      >
        <Link href={deal.brandHref ?? "#"} style={{ fontWeight: 600, color: token.colorText }}>
          {deal.brandLabel}
        </Link>
        <Link
          href={deal.moreHref}
          style={{
            fontSize: 12,
            color: token.colorPrimary,
            display: "flex",
            alignItems: "center",
            gap: 4,
          }}
        >
          {deal.moreLabel}
          <RightOutlined style={{ fontSize: 10 }} />
        </Link>
      </div>

      <Text type="secondary" style={{ fontSize: 12, display: "block", marginBottom: 8 }}>
        {deal.savingsText}
      </Text>

      {/* Main product / title */}
      <div style={{ position: "relative", minHeight: 100, marginBottom: 12 }}>
        {deal.products && deal.products.length > 0 ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 8,
            }}
          >
            <div style={{ flex: 1, display: "flex", gap: 8, alignItems: "center" }}>
              {deal.products.map((p, i) => (
                <React.Fragment key={p.name}>
                  <div
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: 4,
                      overflow: "hidden",
                      flexShrink: 0,
                      position: "relative",
                      backgroundColor: token.colorFillTertiary,
                    }}
                  >
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      sizes="64px"
                      style={{ objectFit: "cover" }}
                    />
                    {deal.badge && i === 0 && (
                      <div
                        style={{
                          position: "absolute",
                          top: 4,
                          right: 4,
                          background: "#ff4d4f",
                          color: "#fff",
                          fontSize: 10,
                          fontWeight: 600,
                          padding: "2px 4px",
                          borderRadius: 4,
                        }}
                      >
                        {deal.badge}
                      </div>
                    )}
                  </div>
                  {i < deal.products!.length - 1 && (
                    <span style={{ color: token.colorTextSecondary, fontSize: 16 }}>+</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ position: "relative", width: "100%", height: 120 }}>
            <div
              style={{
                position: "absolute",
                right: 0,
                bottom: 0,
                width: 100,
                height: 100,
                borderRadius: 4,
                overflow: "hidden",
                backgroundColor: token.colorFillTertiary,
              }}
            >
              <Image
                src="https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=200&h=200&fit=crop"
                alt={deal.title}
                fill
                sizes="100px"
                style={{ objectFit: "cover" }}
              />
            </div>
            {deal.badge && (
              <div
                style={{
                  position: "absolute",
                  right: 8,
                  top: 8,
                  background: "#ff4d4f",
                  color: "#fff",
                  fontSize: 11,
                  fontWeight: 600,
                  padding: "2px 6px",
                  borderRadius: 4,
                }}
              >
                {deal.badge}
              </div>
            )}
          </div>
        )}
        <Text
          style={{
            fontSize: 13,
            display: "block",
            lineHeight: 1.35,
          }}
          ellipsis
        >
          {deal.title}
        </Text>
        {deal.promoText && (
          <Text type="secondary" style={{ fontSize: 12, display: "block", marginTop: 4 }}>
            {deal.promoText}
          </Text>
        )}
      </div>

      {/* Price */}
      <div style={{ marginBottom: 12 }}>
        <Text strong style={{ fontSize: 20, color: token.colorPrimary }}>
          ${deal.price.toFixed(2)}
        </Text>
        <Text delete style={{ marginLeft: 8, fontSize: 14, color: token.colorTextSecondary }}>
          ${deal.originalPrice.toFixed(2)}
        </Text>
      </div>

      {/* Actions */}
      <Space wrap size="small">
        {deal.secondaryButtonText && (
          <Button size="small" style={{ borderRadius: token.borderRadius }}>
            {deal.secondaryButtonText}
          </Button>
        )}
        <Button
          type="primary"
          size="small"
          icon={<RightOutlined />}
          iconPlacement="end"
          style={{ borderRadius: token.borderRadius }}
        >
          {deal.primaryButtonText}
        </Button>
      </Space>
    </Card>
  );
}
