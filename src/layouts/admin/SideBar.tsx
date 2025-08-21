import { Layout, Menu } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import {
  DashboardOutlined,
  ShoppingOutlined,
  AppstoreOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  ProfileOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;

interface AdminSidebarProps {
  collapsed: boolean;
}

export default function AdminSidebar({ collapsed }: AdminSidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      key: "/admin",
      icon: <DashboardOutlined />,
      label: "Dashboard",
    },
    {
      key: "/admin/products",
      icon: <ShoppingOutlined />,
      label: "Quản lý sản phẩm",
    },
    {
      key: "/admin/categories",
      icon: <AppstoreOutlined />,
      label: "Quản lý danh mục",
    },
    {
      key: "/admin/users",
      icon: <UserOutlined />,
      label: "Quản lý người dùng",
    },
    {
      key: "orders",
      icon: <ShoppingCartOutlined />,
      label: "Quản lý đơn hàng",
      children: [
        {
          key: "/admin/orders/statistics",
          label: "Thống kê đơn hàng",
        },
        {
          key: "/admin/orders",
          label: "Danh sách đơn hàng",
        },
      ],
    },
    {
      key: "/admin/profile",
      icon: <ProfileOutlined />,
      label: "Thông tin cá nhân",
    },
  ];

  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(key);
  };

  const getSelectedKeys = () => {
    return [location.pathname];
  };

  const getOpenKeys = () => {
    const openKeys: string[] = [];
    if (location.pathname.includes("/products")) openKeys.push("products");
    if (location.pathname.includes("/categories")) openKeys.push("categories");
    if (location.pathname.includes("/users")) openKeys.push("users");
    if (location.pathname.includes("/orders")) openKeys.push("orders");
    return openKeys;
  };

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      width={250}
      className="overflow-auto h-screen fixed left-0 top-0 bottom-0 z-10"
    >
      <div className="h-16 flex items-center justify-center border-b border-gray-700">
        <div
          className={`text-white font-bold ${
            collapsed ? "text-base" : "text-xl"
          }`}
        >
          {collapsed ? "A" : "ADMIN"}
        </div>
      </div>

      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={getSelectedKeys()}
        defaultOpenKeys={getOpenKeys()}
        items={menuItems}
        onClick={handleMenuClick}
        className="border-r-0"
      />
    </Sider>
  );
}
