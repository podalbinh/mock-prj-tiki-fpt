import {
  HomeOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  UnorderedListOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { Drawer, Menu, Typography, Button } from "antd";
import { useLocation, Link } from "react-router-dom";

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileSidebar({ isOpen, onClose }: MobileSidebarProps) {
  const location = useLocation();

  const navigationItems = [
    { key: "/", icon: <HomeOutlined />, label: "Trang chủ", href: "/" },
    {
      key: "/cart",
      icon: <ShoppingCartOutlined />,
      label: "Giỏ hàng",
      href: "/cart",
    },
    {
      key: "/profile",
      icon: <UserOutlined />,
      label: "Trang cá nhân",
      href: "/profile",
    },
    {
      key: "/orders",
      icon: <UnorderedListOutlined />,
      label: "Đơn hàng",
      href: "/profile/orders",
    },
  ];

  return (
    <Drawer
      title={
        <div className="flex items-center justify-between">
          <Typography.Text strong>Menu</Typography.Text>
          <Button type="text" icon={<CloseOutlined />} onClick={onClose} />
        </div>
      }
      placement="left"
      open={isOpen}
      onClose={onClose}
      width={280}
      closable={false}
      styles={{
        body: {
          padding: 0,
          display: "flex",
          flexDirection: "column",
          height: "100%",
        },
      }}
    >
      {/* Navigation */}
      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        items={navigationItems.map((item) => ({
          key: item.key,
          icon: item.icon,
          label: (
            <Link to={item.href} onClick={onClose}>
              {item.label}
            </Link>
          ),
        }))}
      />

      {/* Footer */}
      <div className="mt-auto p-3 border-t border-gray-200 text-center">
        <Typography.Text type="secondary" className="text-xs">
          Phiên bản 1.0.0
        </Typography.Text>
      </div>
    </Drawer>
  );
}
