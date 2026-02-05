"use client";

import {
  Layout,
  Input,
  Button,
  Badge,
  Dropdown,
  Space,
  theme,
  Flex,
  Tooltip,
} from "antd";
import {
  SearchOutlined,
  BellOutlined,
  ShoppingCartOutlined,
  MenuOutlined,
  QuestionCircleOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/logo.png";
import {
  ThemeSwitch,
  LanguageSwitch,
  CartDrawer,
} from "@/app/components/shared";
import MainMenu from "./MainMenu";

const { Header: AntHeader } = Layout;

const Header = () => {
  const {
    token: { colorPrimary },
  } = theme.useToken();

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
      key: "newegg-card",
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

  const categoryItems = [
    { key: "1", label: "Computer Systems" },
    { key: "2", label: "Components" },
    { key: "3", label: "Electronics" },
    { key: "4", label: "Gaming" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      {/* Top Bar */}
      <AntHeader
        style={{
          backgroundColor: "#001e60", // Deep blue background like Newegg
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
          backgroundColor: "#f4f6fa", // Light gray background
          borderBottom: "1px solid #ddd",
          padding: "5px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <MainMenu/>

          <div
            style={{ height: "20px", width: "1px", background: "#ccc" }}
          ></div>

          <Space size="middle">
            {menuItems.map((item) => (
              <Link
                key={item.key}
                href={`/#${item.key}`}
                style={{ color: "#333", fontWeight: 500 }}
              >
                {item.label}
              </Link>
            ))}
          </Space>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <span
            style={{
              fontWeight: "bold",
              fontStyle: "italic",
              color: "#003366",
            }}
          >
            NEWEGG BUSINESS
          </span>
          <div
            style={{ height: "20px", width: "1px", background: "#ccc" }}
          ></div>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              cursor: "pointer",
            }}
          >
            <QuestionCircleOutlined /> Feedback
          </span>
          <div
            style={{ height: "20px", width: "1px", background: "#ccc" }}
          ></div>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              cursor: "pointer",
            }}
          >
            <QuestionCircleOutlined /> Help Center
          </span>
        </div>
      </div>
    </div>
  );
};

export default Header;
