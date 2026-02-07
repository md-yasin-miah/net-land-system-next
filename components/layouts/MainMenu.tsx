"use client";

import { allProductsItems, MainMenuItems } from "@/mock/menu";
import { MenuOutlined } from "@ant-design/icons";
import { Dropdown, theme, Button, Menu } from "antd";
import React from "react";
import { MenuSection } from "@/components/layouts";

export default function MainMenu() {
  const { token } = theme.useToken();
  const contentStyle: React.CSSProperties = {
    backgroundColor: token.colorBgElevated,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
    display: "flex",
    width: "540px",
    overflow: "hidden",
  };

  const rightPanelStyle: React.CSSProperties = {
    backgroundColor: token.colorBgElevated,
    flex: 1,
    padding: "10px 0",
    overflowY: "auto",
  };

  return (
    <Dropdown
      trigger={["click"]}
      arrow
      popupRender={() => (
        <div style={contentStyle}>
          {/* Left Panel */}
          <MenuSection menuItems={MainMenuItems} />
          {/* Right Panel */}
          <div style={rightPanelStyle}>
            <Menu
              style={{
                boxShadow: "none",
                height: "100%",
              }}
              styles={{
                itemIcon: {
                  fontSize: "16px",
                },
              }}
              items={allProductsItems}
              mode="vertical"
              className="custom-right-menu"
              selectable={false}
            />
          </div>
        </div>
      )}
    >
      <Button
        type="text"
        style={{
          color: token.colorText,
          fontWeight: "bold",
          padding: "4px 8px",
          height: "auto",
        }}
      >
        <MenuOutlined style={{ marginRight: "5px" }} />
        Menu
      </Button>
    </Dropdown>
  );
}
