import type React from "react";
import { Input } from "antd";
import {
  MenuOutlined,
  SearchOutlined,
  GiftOutlined,
  RightOutlined,
  LeftOutlined,
} from "@ant-design/icons";
import CartWithBadge from "@/components/common/CartWithBadge";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import MobileSidebar from "./MobileSidebar";

const MobileHeader: React.FC = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const navigate = useNavigate();

  return (
    <div className={`w-full sm:hidden bg-slate-100`}>
      {/* Main Header */}
      <div className="bg-blue-400 px-4 py-3 flex items-center gap-3">
        {/* Back Arrow */}
        <button className="text-white text-lg" onClick={() => navigate(-1)}>
          <LeftOutlined />
        </button>

        {/* Menu Icon */}
        <button
          className="text-white text-lg"
          onClick={() => setOpenMenu(true)}
        >
          <MenuOutlined />
        </button>

        {/* Search Bar */}
        <div className="flex-1">
          <Input
            placeholder="Bạn đang tìm kiếm gì"
            prefix={<SearchOutlined className="text-gray-400" />}
            className="rounded-md border-0 p-2"
            size="middle"
          />
        </div>

        {/* Shopping Cart with Badge */}
        <CartWithBadge />
      </div>

      {/* Promotional Banner */}
      <div className="bg-yellow-200 px-4 py-3 mx-4 mt-2 rounded-lg flex items-center justify-between cursor-pointer hover:bg-yellow-300 transition-colors">
        <div className="flex items-center gap-1 justify-center">
          <GiftOutlined className="text-blue-600 text-xl" />
          <span className="text-gray-800 font-medium">
            <span className="text-blue-600 font-bold">30 NGÀY</span> đổi ý &
            miễn phí trả hàng
          </span>
        </div>
        <RightOutlined className="text-gray-600" />
      </div>

      <MobileSidebar isOpen={openMenu} onClose={() => setOpenMenu(false)} />
    </div>
  );
};

export default MobileHeader;
