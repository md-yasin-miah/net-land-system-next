import {
  AppstoreOutlined,
  BuildOutlined,
  CalendarOutlined,
  CreditCardOutlined,
  FireOutlined,
  HeartOutlined,
  LaptopOutlined,
  MailOutlined,
  MobileOutlined,
  PartitionOutlined,
  ReloadOutlined,
  RocketOutlined,
  SafetyCertificateOutlined,
  SearchOutlined,
  TagOutlined,
  ToolOutlined,
  TrophyOutlined,
  CodeOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import Link from "next/link";

export const MainMenuItems: MenuItemType[] = [
  {
    id: 1,
    items: [
      {
        key: "todays-best-deals",
        label: "Today's Best Deals",
        icon: <FireOutlined />,
        link: "/deals",
      },
      {
        key: "email-deals",
        label: "Email Deals",
        icon: <MailOutlined />,
      },
      {
        key: "clearance-deals",
        label: "Clearance Deals",
        icon: <TagOutlined />,
      },
      {
        key: "refreshed",
        label: "Refreshed - Like New",
        icon: <ReloadOutlined />,
      },
      {
        key: "store-credit-card",
        label: "Netland Store Credit Card",
        icon: <CreditCardOutlined />,
      },
    ],
  },
  {
    id: 2,
    titel: "Trending",
    items: [
      {
        key: "big-game-savings",
        label: "Big Game Savings",
      },
    ],
  },
  {
    id: 3,
    titel: "Shopping Tools",
    items: [
      {
        key: "pc-builder",
        label: "PC Builder",
        icon: <BuildOutlined />,
      },
      {
        key: "gaming-pc-finder",
        label: "Gaming PC Finder",
        icon: <SearchOutlined />,
      },
      {
        key: "pc-upgrader",
        label: "PC Upgrader",
        icon: <RocketOutlined />,
      },
      {
        key: "laptop-finder",
        label: "Laptop Finder",
        icon: <LaptopOutlined />,
      },
      {
        key: "memory-finder",
        label: "Memory Finder",
        icon: <PartitionOutlined />,
      },
      {
        key: "network-builder",
        label: "Network Builder",
        icon: <PartitionOutlined />,
      },
    ],
  },
];

export const allProductsItems: MenuProps["items"] = [
  {
    key: "all-products",
    label: "All Products",
    disabled: true,
    style: {
      padding: "0 20px 10px 24px",
      margin: 0,
      fontStyle: "italic",
      cursor: "text",
      fontSize: "16px",
      color: "inherit",
      fontWeight: "600",
    },
  },
  {
    key: "components-storage",
    label: "Components & Storage",
    icon: <AppstoreOutlined />,
    children: [
      { key: "3", label: <Link href="/products/components-storage/3">Option 3</Link> },
      { key: "4", label: <Link href="/products/components-storage/4">Option 4</Link> },
      {
        key: "sub1-2",
        label: "Submenu",
        children: [
          { key: "5", label: <Link href="/products/components-storage/5">Option 5</Link> },
          { key: "6", label: <Link href="/products/components-storage/6">Option 6</Link> },
        ],
      },
    ],
  },
  {
    key: "computer-systems",
    label: <Link href="/products/computer-systems">Computer Systems</Link>,
    icon: <LaptopOutlined />,
  },
  {
    key: "computer-peripherals",
    label: <Link href="/products/computer-peripherals">Computer Peripherals</Link>,
    icon: <MobileOutlined />,
  },
  {
    key: "server-components",
    label: <Link href="/products/server-components">Server & Components</Link>,
    icon: <PartitionOutlined />,
  },
  {
    key: "appliances",
    label: <Link href="/products/appliances">Appliances</Link>,
    icon: <ToolOutlined />,
  },
  {
    key: "electronics",
    label: <Link href="/products/electronics">Electronics</Link>,
    icon: <MobileOutlined />,
  },
  {
    key: "gaming-vr",
    label: <Link href="/products/gaming-vr">Gaming & VR</Link>,
    icon: <TrophyOutlined />,
  },
  {
    key: "networking",
    label: <Link href="/products/networking">Networking</Link>,
    icon: <PartitionOutlined />,
  },
  {
    key: "smart-home",
    label: <Link href="/products/smart-home">Smart Home & Security</Link>,
    icon: <SafetyCertificateOutlined />,
  },
  {
    key: "office-solutions",
    label: <Link href="/products/office-solutions">Office Solutions</Link>,
    icon: <CalendarOutlined />,
  },
  {
    key: "software-services",
    label: <Link href="/products/software-services">Software & Services</Link>,
    icon: <CodeOutlined />,
  },
  {
    key: "automotive-tools",
    label: <Link href="/products/automotive-tools">Automotive & Tools</Link>,
    icon: <ToolOutlined />,
  },
  {
    key: "home-outdoors",
    label: <Link href="/products/home-outdoors">Home & Outdoors</Link>,
    icon: <ToolOutlined />,
  },
  {
    key: "health-sports",
    label: <Link href="/products/health-sports">Health & Sports</Link>,
    icon: <HeartOutlined />,
  },
  {
    key: "toys-drones",
    label: <Link href="/products/toys-drones">Toys, Drones & Maker</Link>,
    icon: <RocketOutlined />,
  },
];
