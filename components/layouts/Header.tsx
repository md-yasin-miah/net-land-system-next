"use client";

import {
  Layout,
  Input,
  Button,
  Badge,
  Space,
  Flex,
  Tooltip,
  theme,
  Divider,
  Typography,
} from "antd";
import {
  SearchOutlined,
  BellOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/logo.png";
import {
  ThemeSwitch,
  LanguageSwitch,
  CartDrawer,
} from "@/components/shared/index";
import MainMenu from "./MainMenu";
import { useTheme } from "next-themes";

const { Header: AntHeader } = Layout;

const Header = () => {
  const { Text } = Typography;
  const { token } = theme.useToken();
  const { theme: currentTheme } = useTheme();
  console.log({ token, currentTheme });
  const menuItems = [
    {
      key: "shell-shocker",
      label: "Shell Shocker",
    },
    {
      key: "pc-builder",
      label: "PC Builder",
    },
    {
      key: "clearance",
      label: "Clearance",
    },
    {
      key: "best-sellers",
      label: "Best Sellers",
    },
    {
      key: "netland-card",
      label: "Newegg Card",
    },
    {
      key: "gamer-community",
      label: "Gamer Community",
    },
    {
      key: "laptop-upgrade",
      label: "Laptop Upgrade",
    },
    {
      key: "free-gift",
      label: "Free Gift w/ AMD",
    },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      {/* Top Bar */}
      <AntHeader
        style={{
          backgroundColor: "#001e60",
          height: "auto",
          padding: "10px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          color: "white",
        }}
        className="header-top"
      >
        {/* Logo*/}
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center" }}>
            <Image src={logo} alt="NetLand" width={100} height={60} />
          </Link>
        </div>

        {/* Search Bar */}
        <div style={{ flex: 1, margin: "0 40px", maxWidth: "600px" }}>
          <Input.Search
            placeholder="Search..."
            enterButton
            size="large"
            style={{
              width: "100%",
            }}
            onSearch={() => {}}
            allowClear
          />
        </div>

        {/* Right Icons */}
        <Flex wrap gap="middle">
          <Tooltip title="search">
            <Badge count={0} showZero size="small">
              <Button shape="circle" icon={<SearchOutlined />} />
            </Badge>
          </Tooltip>
          <Tooltip title="Notifications">
            <Badge count={0} showZero size="small">
              <Button shape="circle" icon={<BellOutlined />} />
            </Badge>
          </Tooltip>
          <ThemeSwitch />
          <LanguageSwitch />
          <CartDrawer />
        </Flex>
      </AntHeader>

      {/* Navigation Bar */}
      <div
        style={{
          backgroundColor: token.colorBgElevated,
          borderBottom: `1px solid ${token.colorSplit}`,
          padding: "5px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <MainMenu />
          <Space size="middle">
            <Divider
              orientation="vertical"
              style={{ height: "20px", borderColor: "#ccc" }}
            />
            {menuItems.map((item) => (
              <Link
                key={item.key}
                href={`/#${item.key}`}
                style={{ color: token.colorText, fontWeight: 500 }}
                className="hover:"
              >
                {item.label}
              </Link>
            ))}
          </Space>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <Text
            strong
            style={{
              fontStyle: "italic",
              color: token.colorText,
            }}
          >
            NETLAND BUSINESS
          </Text>

          <Divider
            orientation="vertical"
            style={{ height: "20px", borderColor: "#ccc" }}
          />
          <Text
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              cursor: "pointer",
            }}
          >
            <QuestionCircleOutlined /> Feedback
          </Text>

          <Divider
            orientation="vertical"
            style={{ height: "20px", borderColor: "#ccc" }}
          />
          <Text
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              cursor: "pointer",
            }}
          >
            <QuestionCircleOutlined /> Help Center
          </Text>
        </div>
      </div>
    </div>
  );
};

export default Header;
