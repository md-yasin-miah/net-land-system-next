"use client";

import React from "react";
import { Menu, theme } from "antd";
import type { MenuProps } from "antd";
import { useTheme } from "next-themes";

/** Dark theme: deep blue sidebar (brand) */
const SIDEBAR_BG_DARK = "#001e60";
const SIDEBAR_ACTIVE_BG_DARK = "rgba(255,255,255,0.12)";
const SIDEBAR_HOVER_BG_DARK = "rgba(255,255,255,0.08)";
const SIDEBAR_TEXT_DARK = "rgba(255,255,255,0.85)";
const SIDEBAR_ARROW_DARK = "rgba(255,255,255,0.5)";

/** Light theme: elevated surface with border */
const SIDEBAR_BG_LIGHT = "#fafafa";
const SIDEBAR_ACTIVE_BG_LIGHT = "rgba(0,0,0,0.06)";
const SIDEBAR_HOVER_BG_LIGHT = "rgba(0,0,0,0.04)";
const SIDEBAR_TEXT_LIGHT = "rgba(0,0,0,0.88)";
const SIDEBAR_ARROW_LIGHT = "rgba(0,0,0,0.45)";
const SIDEBAR_BORDER_LIGHT = "1px solid rgba(0,0,0,0.06)";

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
  const { token } = theme.useToken();
  const { theme: themeMode } = useTheme();
  const isDark = themeMode === "dark";

  const vars = {
    "--sidebar-bg": isDark ? SIDEBAR_BG_DARK : SIDEBAR_BG_LIGHT,
    "--sidebar-text": isDark ? SIDEBAR_TEXT_DARK : SIDEBAR_TEXT_LIGHT,
    "--sidebar-arrow": isDark ? SIDEBAR_ARROW_DARK : SIDEBAR_ARROW_LIGHT,
    "--sidebar-hover-bg": isDark ? SIDEBAR_HOVER_BG_DARK : SIDEBAR_HOVER_BG_LIGHT,
    "--sidebar-active-bg": isDark ? SIDEBAR_ACTIVE_BG_DARK : SIDEBAR_ACTIVE_BG_LIGHT,
    "--sidebar-active-border": token.colorPrimary,
    "--sidebar-selected-text": isDark ? "#fff" : token.colorPrimary,
  } as React.CSSProperties;

  return (
    <div
      className={`home-category-sidebar-wrapper ${isDark ? "category-sidebar-dark" : "category-sidebar-light"} ${className}`}
      style={{
        flexShrink: 0,
        borderRadius: token.borderRadiusLG,
        overflow: "hidden",
        backgroundColor: isDark ? SIDEBAR_BG_DARK : SIDEBAR_BG_LIGHT,
        border: isDark ? undefined : SIDEBAR_BORDER_LIGHT,
        boxShadow: isDark ? undefined : token.boxShadowSecondary,
        ...vars,
      }}
    >
      <Menu
        mode="inline"
        items={items}
        defaultSelectedKeys={[defaultSelectedKey]}
        style={{
          background: "transparent",
          border: "none",
          padding: `${token.paddingXS}px 0`,
        }}
        className="home-category-sidebar"
      />
    </div>
  );
}
