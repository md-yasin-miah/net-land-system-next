"use client";

import { ConfigProvider, theme as antTheme } from "antd";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import themeConfig from "@/theme/themeConfig";

export default function AntdConfigProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    queueMicrotask(() => setMounted(true));
  }, []);

  if (!mounted) {
    return <ConfigProvider theme={themeConfig}>{children}</ConfigProvider>;
  }

  return (
    <ConfigProvider
      theme={{
        ...themeConfig,
        algorithm:
          theme === "dark" ? antTheme.darkAlgorithm : antTheme.defaultAlgorithm,
      }}
    >
      {children}
    </ConfigProvider>
  );
}
