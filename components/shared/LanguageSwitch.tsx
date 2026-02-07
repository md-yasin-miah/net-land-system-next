import { Button, Dropdown } from "antd";
import type { MenuProps } from "antd";
import { GlobalOutlined } from "@ant-design/icons";

export default function LanguageSwitch() {
  const items: MenuProps["items"] = [
    {
      key: "2",
      label: "English",
      icon: <span>🇺🇸</span>,
    },
    {
      key: "3",
      label: "Bangle",
      icon: <span>🇧🇩</span>,
    },
  ];
  return (
    <Dropdown menu={{ items }}>
      <Button icon={<GlobalOutlined />} iconPlacement="start">
        English
      </Button>
    </Dropdown>
  );
}
