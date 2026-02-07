import { Typography } from "antd";

const { Title } = Typography;

const MenuHeader = ({
  children,
}: {
  children: React.ReactNode | string;
}) => (
  <Title
    level={5}
    style={{
      padding: "0 20px 10px 24px",
      margin: 0,
      fontStyle: "italic",
    }}
  >
    {children}
  </Title>
);


export default MenuHeader