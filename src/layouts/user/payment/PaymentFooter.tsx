import type React from "react";

const PaymentFooter: React.FC = () => {
  return (
    <footer className="bg-gray-100 border-t border-gray-200 py-6 px-4 mt-8">
      <div className="max-w-7xl mx-auto">
        {/* Disclaimer text */}
        <div className="mb-4">
          <p className="text-sm text-gray-800 leading-relaxed">
            Bằng việc tiến hành Đặt Mua, bạn đồng ý với các Điều kiện Giao dịch
            chung:
          </p>
        </div>

        {/* Policy links */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <a
              href="#"
              className="text-[12px] text-gray-800 hover:text-blue-600 transition-colors duration-200 whitespace-nowrap"
            >
              Quy chế hoạt động
            </a>
            <a
              href="#"
              className="text-[12px] text-gray-800 hover:text-blue-600 transition-colors duration-200 whitespace-nowrap"
            >
              Chính sách giải quyết khiếu nại
            </a>
            <a
              href="#"
              className="text-[12px] text-gray-800 hover:text-blue-600 transition-colors duration-200 whitespace-nowrap"
            >
              Chính sách bảo hành
            </a>
            <a
              href="#"
              className="text-[12px] text-gray-800 hover:text-blue-600 transition-colors duration-200 whitespace-nowrap"
            >
              Chính sách bảo mật thanh toán
            </a>
            <a
              href="#"
              className="text-[12px] text-gray-800 hover:text-blue-600 transition-colors duration-200 whitespace-nowrap"
            >
              Chính sách bảo mật thanh toán
            </a>
            <a
              href="#"
              className="text-[12px] text-gray-800 hover:text-blue-600 transition-colors duration-200 whitespace-nowrap"
            >
              Chính sách bảo mật thông tin cá nhân
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-2">
          <p className="text-xs text-gray-500">
            © 2019 - Bản quyền của Công Ty Cổ Phần TIKI - Tiki.vn
          </p>
        </div>
      </div>
    </footer>
  );
};

export default PaymentFooter;
