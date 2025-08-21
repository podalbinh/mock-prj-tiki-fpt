import React from "react";
// import { ShoppingBag } from "lucide-react";
import { SearchOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

interface NoProductsFoundProps {
  keyword: string;
  onClearSearch?: () => void;
  onRetry?: () => void;
}

const NoProductsFound: React.FC<NoProductsFoundProps> = ({ keyword }) => {
  const navigate = useNavigate();

  return (
    <div className="text-center py-20 max-w-md mx-auto px-4">
      <div className="mb-6">
        <SearchOutlined className="text-6xl text-gray-300" />
      </div>
      <h2 className="text-2xl font-semibold text-gray-900 mb-3">
        Không tìm thấy sản phẩm
      </h2>
      <p className="text-gray-600 mb-8">
        Không có sản phẩm nào phù hợp với từ khóa{""}
        <span className="font-semibold text-gray-900 px-2 py-1 rounded-md">
          "{keyword}"
        </span>
      </p>
      <Button
        type="primary"
        size="large"
        onClick={() => navigate("/")}
        className="bg-blue-600 hover:bg-blue-700 border-blue-600 mt-3"
      >
        Trang chủ
      </Button>
    </div>
  );
};

export default NoProductsFound;
