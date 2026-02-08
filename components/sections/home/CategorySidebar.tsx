"use client";

import React from "react";
import { Menu } from "antd";
import type { MenuProps } from "antd";

const SIDEBAR_BG = "#001e60";
const SIDEBAR_ACTIVE_BG = "rgba(255,255,255,0.12)";
const SIDEBAR_ACTIVE_BORDER = "#1890ff";

interface CategorySidebarProps {
  className?: string;
  items?: MenuProps["items"];
  defaultSelectedKey?: string;
}

export default function CategorySidebar({
  className = "",
  items = [],
  defaultSelectedKey = "components-storage",
}: CategorySidebarProps) {
  return (
    <div
      className={className}
      style={{
        flexShrink: 0,
        borderRadius: 8,
        overflow: "hidden",
        backgroundColor: SIDEBAR_BG,
      }}
    >
      <Menu
        mode="inline"
        items={items}
        defaultSelectedKeys={[defaultSelectedKey]}
        style={{
          background: "transparent",
          border: "none",
          color: "rgba(255,255,255,0.85)",
        }}
        className="home-category-sidebar"
      />
    </div>
  );
}
