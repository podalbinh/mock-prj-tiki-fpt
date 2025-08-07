import { Layout, Avatar, Dropdown, Space, Typography, Button } from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router";

const { Header: AntHeader } = Layout;
const { Text } = Typography;

interface AdminHeaderProps {
  collapsed: boolean;
  onToggle: () => void;
}

export default function AdminHeader({ collapsed, onToggle }: AdminHeaderProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const userMenuItems = [
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Đăng xuất",
      danger: true,
    },
  ];

  const handleMenuClick = ({ key }: { key: string }) => {
    switch (key) {
      case "logout":
        logout();
        navigate("/admin/login");
        break;
    }
  };

  return (
    <AntHeader className="px-6 bg-white border-b border-gray-200 flex items-center justify-between">
      <div className="flex items-center">
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={onToggle}
          className="text-base w-16 h-16"
        />
        <Text strong className="text-lg ml-4">
          Trang Quản Trị
        </Text>
      </div>

      <Space size="middle">
        <Dropdown
          menu={{ items: userMenuItems, onClick: handleMenuClick }}
          placement="bottomRight"
          arrow
        >
          <Space className="cursor-pointer px-2">
            <Avatar icon={<UserOutlined />} />
            <div className="flex flex-col items-start">
              <Text strong>{user?.fullName}</Text>
              <Text type="secondary" className="text-xs">
                Quản trị viên
              </Text>
            </div>
          </Space>
        </Dropdown>
      </Space>
    </AntHeader>
  );
}
