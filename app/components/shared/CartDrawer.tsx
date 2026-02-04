import { Badge, Button, Drawer, Tooltip } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useState } from "react";

export default function CartDrawer() {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Tooltip title="Cart">
        <Badge count={0} showZero size="small">
          <Button shape="circle" icon={<ShoppingCartOutlined />} onClick={showDrawer} />
        </Badge>
      </Tooltip>
      <Drawer
        title="Shopping Cart"
        closable={{ "aria-label": "Close Button" }}
        onClose={onClose}
        open={open}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>
  );
}
