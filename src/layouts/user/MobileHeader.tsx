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

const MobileHeader: React.FC = () => {
  return (
    <div className={`w-full sm:hidden bg-slate-100`}>
      {/* Main Header */}
      <div className="bg-blue-400 px-4 py-3 flex items-center gap-3">
        {/* Back Arrow */}
        <button className="text-white text-lg">
          <LeftOutlined />
        </button>

        {/* Menu Icon */}
        <button className="text-white text-lg">
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
    </div>
  );
};

export default MobileHeader;
