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

export const leftSideMainItems = [
  {
    key: "todays-best-deals",
    label: "Today's Best Deals",
    icon: <FireOutlined />,
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
    label: "Newegg Store Credit Card",
    icon: <CreditCardOutlined />,
  },
];

export const trendingItems = [
  {
    key: "big-game-savings",
    label: "Big Game Savings",
  },
];

export const shoppingToolsItems = [
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
];

export const allProductsItems: MenuProps["items"] = [
  {
    key: "components-storage",
    label: "Components & Storage",
    icon: <AppstoreOutlined />,
    children: [
      { key: "3", label: "Option 3" },
      { key: "4", label: "Option 4" },
      {
        key: "sub1-2",
        label: "Submenu",
        children: [
          { key: "5", label: "Option 5" },
          { key: "6", label: "Option 6" },
        ],
      },
    ],
  },
  {
    key: "computer-systems",
    label: "Computer Systems",
    icon: <LaptopOutlined />,
  },
  {
    key: "computer-peripherals",
    label: "Computer Peripherals",
    icon: <MobileOutlined />,
  },
  {
    key: "server-components",
    label: "Server & Components",
    icon: <PartitionOutlined />,
  },
  {
    key: "appliances",
    label: "Appliances",
    icon: <ToolOutlined />,
  },
  {
    key: "electronics",
    label: "Electronics",
    icon: <MobileOutlined />,
  },
  {
    key: "gaming-vr",
    label: "Gaming & VR",
    icon: <TrophyOutlined />,
  },
  {
    key: "networking",
    label: "Networking",
    icon: <PartitionOutlined />,
  },
  {
    key: "smart-home",
    label: "Smart Home & Security",
    icon: <SafetyCertificateOutlined />,
  },
  {
    key: "office-solutions",
    label: "Office Solutions",
    icon: <CalendarOutlined />,
  },
  {
    key: "software-services",
    label: "Software & Services",
    icon: <CodeOutlined />,
  },
  {
    key: "automotive-tools",
    label: "Automotive & Tools",
    icon: <ToolOutlined />,
  },
  {
    key: "home-outdoors",
    label: "Home & Outdoors",
    icon: <ToolOutlined />,
  },
  {
    key: "health-sports",
    label: "Health & Sports",
    icon: <HeartOutlined />,
  },
  {
    key: "toys-drones",
    label: "Toys, Drones & Maker",
    icon: <RocketOutlined />,
  },
];
