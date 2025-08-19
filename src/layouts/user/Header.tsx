import logo from "@/assets/logo.svg";
import commitment from "@/assets/commitment.svg";
import ticket from "@/assets/ticket.svg";
import fastDelivery from "@/assets/fast-shipping.svg";
import shipping from "@/assets/shipping.svg";
import refund from "@/assets/refund.svg";
import returnPolicy from "@/assets/return.svg";

import {
  HomeOutlined,
  LogoutOutlined,
  SearchOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import CartWithBadge from "@/components/common/CartWithBadge";
import { LoginModal } from "@/components/forms/LoginModalForm";
import { useModal } from "@/hooks/useModal";
import { SignupModal } from "@/components/forms/SignUpModalForm";
import { Avatar, Dropdown, Space } from "antd";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";

const Header = () => {
  const suggestions = [
    "điện gia dụng",
    "xe cộ",
    "mẹ & bé",
    "khỏe đẹp",
    "nhà cửa",
    "sách",
    "potter",
    "lịch treo tường 2024",
    "nguyễn nhật ánh",
  ];

  const { openLoginModal } = useModal();
  const { user, isAuthenticated, logout } = useAuth();
  const [keyword, setKeyword] = useState("");
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

  const handleSearch = () => {
    if (keyword.trim()) {
      navigate(`/search?keyword=${encodeURIComponent(keyword)}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <div className="flex-col shadow-sm w-full hidden lg:flex">
      <div className="flex justify-between px-6 py-3 w-full">
        <div className="w-[10%]">
          <img src={logo} alt="Logo" />
        </div>

        <div className="flex flex-col w-[90%]">
          <div className="flex  items-center justify-between">
            <div className="w-[70%] border rounded-lg">
              <div className="flex items-center w-full">
                <SearchOutlined
                  className="text-gray-400 mr-2 px-3 py-2"
                  aria-hidden="true"
                />
                <input
                  type="text"
                  placeholder="100% hàng thật"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 outline-none text-sm placeholder-gray-400"
                />
                <button
                  type="submit"
                  onClick={handleSearch}
                  aria-label="Tìm kiếm"
                  className="text-blue-500 text-sm font-normal rounded-r-lg border-l px-3 py-2 pl-2 hover:bg-blue-100"
                >
                  Tìm kiếm
                </button>
              </div>
            </div>
            <div className="flex">
              <Link
                to="/"
                className="mx-4 max-h-min flex items-center gap-1 whitespace-nowrap"
              >
                <HomeOutlined className="text-[20px] p-1 flex-shrink-0" />
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
                  className="mx-4 max-h-min flex items-center gap-1 whitespace-nowrap"
                >
                  <UserOutlined className="text-[20px] p-1 flex-shrink-0" />
                  Tài khoản
                </button>
              )}

              <Link
                to="/cart"
                className="border-l-2 max-h-min px-4 flex items-center"
              >
                <CartWithBadge />
              </Link>
            </div>
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500">
            {suggestions.map((s, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Tìm nhanh: ${s}`}
                title={s}
              >
                {s}
              </button>
            ))}
          </div>
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
