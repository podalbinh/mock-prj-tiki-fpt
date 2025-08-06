import {
  Layout,
  Avatar,
  Dropdown,
  Space,
  Typography,
  Button,
} from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  SettingOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";

const { Header: AntHeader } = Layout;
const { Text } = Typography;

interface AdminHeaderProps {
  collapsed: boolean;
  onToggle: () => void;
}

export default function AdminHeader({ collapsed, onToggle }: AdminHeaderProps) {
  const userMenuItems = [
    {
      key: "profile",
      icon: <UserOutlined />,
      label: "Thông tin cá nhân",
    },
    {
      key: "settings",
      icon: <SettingOutlined />,
      label: "Cài đặt",
    },
    {
      type: "divider" as const,
    },
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
        console.log("Đăng xuất");
        break;
      case "profile":
        console.log("Xem thông tin cá nhân");
        break;
      case "settings":
        console.log("Cài đặt");
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
              <Text strong>Admin User</Text>
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
