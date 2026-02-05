"use client";

import {
  leftSideMainItems,
  trendingItems,
  shoppingToolsItems,
  allProductsItems,
} from "@/mock/menu";
import { MenuOutlined, RightOutlined } from "@ant-design/icons";
import { Dropdown, theme, Typography, Space, Button } from "antd";
import React, { useState } from "react";
import { useTheme } from "next-themes";

const { Text, Title } = Typography;

export default function MainMenu() {
  // We can use both NextThemes and Antd tokens to adapt styles
  const { token } = theme.useToken();
  const { theme: currentTheme } = useTheme();

  // Checking if dark mode is active to adjust manual colors
  const isDark = currentTheme === "dark";

  const contentStyle: React.CSSProperties = {
    backgroundColor: token.colorBgElevated,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
    display: "flex",
    width: "600px",
    overflow: "hidden",
  };

  const leftPanelStyle: React.CSSProperties = {
    // Newegg uses a light blue-ish gray for the left panel in light mode
    backgroundColor: isDark ? "#1f1f1f" : "#f3f5fa",
    width: "240px",
    padding: "20px 0",
    borderRight: `1px solid ${token.colorSplit}`,
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  };

  const rightPanelStyle: React.CSSProperties = {
    backgroundColor: token.colorBgContainer,
    flex: 1,
    padding: "20px 0",
    maxHeight: "700px",
    overflowY: "auto",
  };

  const sectionHeaderStyle: React.CSSProperties = {
    padding: "0 20px",
    marginBottom: "10px",
    fontWeight: "bold",
    fontStyle: "italic", // Newegg style
    display: "block",
  };

  const itemStyle: React.CSSProperties = {
    padding: "8px 20px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    transition: "all 0.2s",
    color: token.colorText,
  };

  const rightItemStyle: React.CSSProperties = {
    ...itemStyle,
    justifyContent: "space-between",
  };

  const renderItem = (item: any) => (
    <div key={item.key} className="menu-hover-item" style={itemStyle}>
      {item.icon && <span style={{ fontSize: "16px" }}>{item.icon}</span>}
      <Text>{item.label}</Text>
    </div>
  );

  const renderRightItem = (item: any) => (
    <div key={item.key} className="menu-hover-item" style={rightItemStyle}>
      <Space>
        {/* {item.icon} */}{" "}
        {/* Newegg right side usually text only, but we have icons if needed */}
        <Text>{item.label}</Text>
      </Space>
      <RightOutlined
        style={{ fontSize: "10px", color: token.colorTextSecondary }}
      />
    </div>
  );

  return (
    <>
      <style jsx global>{`
        .menu-hover-item:hover {
          background-color: ${token.colorFillTertiary};
          color: ${token.colorPrimary};
        }
        .menu-hover-item:hover .ant-typography {
          color: ${token.colorPrimary};
          font-weight: 500;
        }
      `}</style>
      <Dropdown
        trigger={["click"]}
        dropdownRender={() => (
          <div style={contentStyle}>
            {/* Left Panel */}
            <div style={leftPanelStyle}>
              {/* Main Items */}
              <div>{leftSideMainItems.map(renderItem)}</div>

              {/* Trending */}
              <div>
                <Text style={sectionHeaderStyle}>Trending</Text>
                {trendingItems.map(renderItem)}
              </div>

              {/* Shopping Tools */}
              <div>
                <Text style={sectionHeaderStyle}>Shopping Tools</Text>
                {shoppingToolsItems.map(renderItem)}
              </div>
            </div>

            {/* Right Panel */}
            <div style={rightPanelStyle}>
              <Title
                level={5}
                style={{
                  padding: "0 20px 10px 20px",
                  margin: 0,
                  fontStyle: "italic",
                }}
              >
                All Products
              </Title>
              {allProductsItems?.map(renderRightItem)}
            </div>
          </div>
        )}
      >
        <Button
          type="text"
          style={{
            color: "inherit",
            fontWeight: "bold",
            padding: "4px 8px",
            height: "auto",
          }}
        >
          <MenuOutlined style={{ marginRight: "5px" }} />
          Menu
        </Button>
      </Dropdown>
    </>
  );
}
