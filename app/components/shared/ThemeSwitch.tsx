import { useState } from "react";
import { Segmented, ConfigProvider } from "antd";
import { SunOutlined, MoonOutlined } from "@ant-design/icons";

export default function ThemeSwitch() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  return (
    <ConfigProvider
      theme={{
        components: {
          Segmented: {
            itemSelectedBg: theme === "dark" ? "#000000" : "#ffffff",
            itemSelectedColor: theme === "dark" ? "#ffffff" : "#000000",
            trackBg: theme === "dark" ? "#333333" : "#cacacaff",
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
          border: "1px solid #d9d9d9",
        }}
      />
    </ConfigProvider>
  );
}
