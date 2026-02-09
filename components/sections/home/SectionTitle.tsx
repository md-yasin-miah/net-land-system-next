"use client";

import React from "react";
import { Typography, theme } from "antd";

const { Title } = Typography;

interface SectionTitleProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export default function SectionTitle({ children, style }: SectionTitleProps) {
  const { token } = theme.useToken();
  return (
    <Title
      level={3}
      style={{
        margin: 0,
        marginBottom: 16,
        fontWeight: 700,
        color: token.colorTextHeading ?? "#0d47a1",
        ...style,
      }}
    >
      {children}
    </Title>
  );
}
