import {
  LinkOutlined,
  AppstoreOutlined,
  CalendarOutlined,
  BuildOutlined,
  SettingOutlined,
  CreditCardOutlined,
  FireOutlined,
  LaptopOutlined,
  MobileOutlined,
  PartitionOutlined,
  ReloadOutlined,
  RocketOutlined,
  SafetyCertificateOutlined,
  SearchOutlined,
  TagOutlined,
  ToolOutlined,
  TrophyOutlined,
  MailOutlined,
  CodeOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import type { GetProp, MenuProps } from "antd";
type MenuItem = GetProp<MenuProps, "items">[number];

const mainMenuItems: MenuItem[] = [
  {
    key: "all-products",
    label: "All Products",
    dashed: true,
    disabled: true,
    style: {
      color: "black",
      cursor: "text",
      fontWeight: 500,
      fontSize: "16px",
      fontStyle: "italic",
    },
  },
  {
    key: "1",
    icon: <MailOutlined />,
    label: "Navigation One",
  },
  {
    key: "2",
    icon: <CalendarOutlined />,
    label: "Navigation Two",
  },
  {
    key: "sub1",
    label: "Navigation Two",
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
    key: "sub2",
    label: "Navigation Three",
    icon: <SettingOutlined />,
    children: [
      { key: "7", label: "Option 7" },
      { key: "8", label: "Option 8" },
      { key: "9", label: "Option 9" },
      { key: "10", label: "Option 10" },
    ],
  },
  {
    key: "link",
    icon: <LinkOutlined />,
    label: (
      <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
        Ant Design
      </a>
    ),
  },
];

const leftSideMainItems = [
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

const trendingItems = [
  {
    key: "big-game-savings",
    label: "Big Game Savings",
  },
];

const shoppingToolsItems = [
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

const allProductsItems: MenuProps["items"] = [
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
export {
  mainMenuItems,
  leftSideMainItems,
  trendingItems,
  shoppingToolsItems,
  allProductsItems,
};
