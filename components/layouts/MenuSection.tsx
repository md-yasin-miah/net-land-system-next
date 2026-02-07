import React from "react";
import { theme, Typography } from "antd";
import { useTheme } from "next-themes";
import { MenuHeader } from "../ui";
import Link from "next/link";

const MenuSection = ({ menuItems }: { menuItems: MenuItemType[] }) => {
  const { Text } = Typography;
  const { token } = theme.useToken();
  const { theme: currentTheme } = useTheme();

  // Checking if dark mode is active to adjust manual colors
  const isDark = currentTheme === "dark";

  const leftPanelStyle: React.CSSProperties = {
    backgroundColor: isDark ? "#1f1f1f" : "#f3f5fa",
    width: "240px",
    padding: "10px 0",
    borderRight: `1px solid ${token.colorSplit}`,
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  };
  const itemStyle: React.CSSProperties = {
    padding: "5px 0 5px 12px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    transition: "all 0.2s",
    borderRadius: "4px",
    color: token.colorText,
  };
  return (
    <div style={leftPanelStyle}>
      {menuItems.map((item) => (
        <div key={item.id}>
          {item.titel && <MenuHeader>{item.titel}</MenuHeader>}
          <div className="p-1">
            {item.items.map((item:leftSideMainItemType) => (
              <Link key={item.key} href={item.link || "/"} className="hover:bg-white! dark:hover:bg-white/10" style={itemStyle}>
                {item.icon && item.icon}
                <Text>{item.label}</Text>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MenuSection;
