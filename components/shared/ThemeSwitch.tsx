"use client";

import { Segmented, ConfigProvider } from "antd";
import { SunOutlined, MoonOutlined } from "@ant-design/icons";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeSwitch() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    queueMicrotask(() => setMounted(true));
  }, []);

  if (!mounted) {
    return null; // or a placeholder/skeleton
  }

  return (
    <ConfigProvider
      theme={{
        components: {
          Segmented: {
            itemSelectedBg: theme === "dark" ? "#000000" : "#ffffff",
            itemSelectedColor: theme === "dark" ? "#ffffff" : "#000000",
            trackBg: theme === "dark" ? "#333333" : "rgba(0, 0, 0, 0.04)",
          },
        },
      }}
    >
      <Segmented
        value={theme}
        onChange={(value) => setTheme(value as "light" | "dark")}
        options={[
          {
            value: "light",
            icon: <SunOutlined />,
          },
          {
            value: "dark",
            icon: <MoonOutlined />,
          },
        ]}
        style={{
          border: "1px solid",
          borderColor: theme === "dark" ? "#424242" : "#d9d9d9",
        }}
      />
    </ConfigProvider>
  );
}
