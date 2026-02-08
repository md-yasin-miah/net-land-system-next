"use client";

import {
  Layout,
  Input,
  Button,
  Badge,
  Flex,
  Tooltip,
  theme,
  Divider,
  Typography,
  Menu,
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
import { HeaderMenuItems } from "@/mock/menu";

const { Header: AntHeader } = Layout;

const Header = () => {
  const { Text } = Typography;
  const { token } = theme.useToken();
  const { theme: currentTheme } = useTheme();
  console.log({ token, currentTheme });

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
          padding: "5px 10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" , flex: 1 }}>
          <MainMenu />
          <Divider
            orientation="vertical"
            style={{ height: "20px", borderColor: "#ccc" }}
          />
          <Menu
            items={HeaderMenuItems}
            mode="horizontal"
            className="header-nav-menu"
            style={{
              border: "none",
              lineHeight: "32px",
            }}
            styles={{
              item: {
                color: token.colorText,
                fontWeight: 500,
                border: "none",
                padding: "0 10px",
                borderRadius: token.borderRadius,
              },
              
            }}
          />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <Text
            strong
            style={{
              fontStyle: "italic",
              color: token.colorText,
              fontSize: "12px",
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
              fontSize: "12px",
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
              fontSize: "12px",
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
