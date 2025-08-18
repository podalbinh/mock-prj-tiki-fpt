import logo from "@/assets/logo.svg";
import commitment from "@/assets/commitment.svg";
import ticket from "@/assets/ticket.svg";
import fastDelivery from "@/assets/fast-shipping.svg";
import shipping from "@/assets/shipping.svg";
import refund from "@/assets/refund.svg";
import returnPolicy from "@/assets/return.svg";

import { HomeOutlined, UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { Dropdown, Space, Avatar, Image } from "antd";
import CartWithBadge from "@/components/common/CartWithBadge";
import { LoginModal } from "@/components/forms/LoginModalForm";
import { useModal } from "@/hooks/useModal";
import { SignupModal } from "@/components/forms/SignUpModalForm";

import { useAuth } from "@/hooks/useAuth";

const Header = () => {
  const { openLoginModal } = useModal();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const userMenuItems = [
    {
      key: "profile",
      icon: <UserOutlined />,
      label: "Hồ sơ",
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
        logout();
        navigate("/");
        break;
      case "profile":
        navigate("/profile");
        break;
    }
  };

  return (
    <div className={`flex-col shadow-sm hidden sm:flex`}>
      <div className="flex gap-4 px-6 py-3">
        <Link to="/" className="mx-4 max-h-min">
          <Image src={logo} alt="Logo" preview={false} />
        </Link>
        {/* Todo: Tạo thanh search như design */}
        <div className="flex-grow p-4 text-center border">Search</div>
        <div className="flex gap-1">
          <Link to="/" className="mx-4 max-h-min">
            <HomeOutlined className="text-[20px] p-1" />
            Trang chủ
          </Link>

          {isAuthenticated ? (
            <Dropdown
              menu={{ items: userMenuItems, onClick: handleMenuClick }}
              placement="bottomRight"
              arrow
            >
              <Space className="cursor-pointer mx-4 py-[2px] max-h-min flex items-center">
                <Avatar
                  icon={<UserOutlined />}
                  size="small"
                  src={user?.avatarUrl}
                />
                <span className="text-gray-700 max-w-28 block truncate">
                  {user?.fullName}
                </span>
              </Space>
            </Dropdown>
          ) : (
            <button
              onClick={openLoginModal}
              className="mx-4 max-h-min flex items-center"
            >
              <UserOutlined className="text-[20px] p-1" />
              Tài khoản
            </button>
          )}

          <CartWithBadge />
        </div>
      </div>
      <div className="flex gap-2 py-2 border-t-[1px] px-6">
        <div className="font-semibold text-blue-800">Cam kết</div>
        <div className="px-4 border-r-2 flex items-center">
          <img src={commitment} alt="" className="inline-block mr-1" />
          <span>100% hàng thật</span>
        </div>
        <div className="px-4 border-r-2 flex items-center">
          <img src={shipping} alt="" className="inline-block mr-1" />
          <span>Freeship mọi nơi</span>
        </div>
        <div className="px-4 border-r-2 flex items-center">
          <img src={refund} alt="" className="inline-block mr-1" />
          <span>Hoàn tiền 200% nếu hàng giả</span>
        </div>
        <div className="px-4 border-r-2 flex items-center">
          <img src={returnPolicy} alt="" className="inline-block mr-1" />
          <span>30 ngày đổi trả</span>
        </div>
        <div className="px-4 border-r-2 flex items-center">
          <img src={fastDelivery} alt="" className="inline-block mr-1" />
          <span>Giao hàng 2h</span>
        </div>
        <div className="px-4 flex items-center">
          <img src={ticket} alt="" className="inline-block mr-1" />
          <span>Giá siêu rẻ</span>
        </div>
      </div>
      <LoginModal />
      <SignupModal />
    </div>
  );
};

export default Header;
