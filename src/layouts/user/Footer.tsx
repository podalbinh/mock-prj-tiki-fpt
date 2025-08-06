export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Customer Support */}
          <div className="lg:col-span-1">
            <h3 className="font-semibold text-gray-900 mb-4">
              Hỗ trợ Khách hàng
            </h3>
            <div className="space-y-2 text-sm text-gray-600">
              <div>
                <span className="font-medium">Hotline: </span>
                <span className="text-blue-600">1900-6035</span>
              </div>
              <div className="text-xs text-gray-500">
                (1000 đ/phút, 8-21h kể cả T7, CN)
              </div>
              <ul className="space-y-1 mt-3">
                <li>
                  <a href="#" className="hover:text-blue-600">
                    Các câu hỏi thường gặp
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600">
                    Gửi yêu cầu hỗ trợ
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600">
                    Hướng dẫn đặt hàng
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600">
                    Phương thức vận chuyển
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600">
                    Chính sách kiểm hàng
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600">
                    Chính sách đổi trả
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600">
                    Hướng dẫn trả góp
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600">
                    Chính sách hàng nhập khẩu
                  </a>
                </li>
              </ul>
              <div className="mt-4 space-y-1">
                <div>
                  Hỗ trợ khách hàng:{" "}
                  <span className="text-blue-600">hotro@tiki.vn</span>
                </div>
                <div>
                  Báo lỗi bảo mật:{" "}
                  <span className="text-blue-600">security@tiki.vn</span>
                </div>
              </div>
            </div>
          </div>

          {/* About Tiki */}
          <div className="lg:col-span-1">
            <h3 className="font-semibold text-gray-900 mb-4">Về Tiki</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href="#" className="hover:text-blue-600">
                  Giới thiệu Tiki
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">
                  Tiki Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">
                  Tuyển dụng
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">
                  Chính sách bảo mật thanh toán
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">
                  Chính sách bảo mật thông tin cá nhân
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">
                  Chính sách giải quyết khiếu nại
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">
                  Điều khoản sử dụng
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">
                  Giới thiệu Tiki Xu
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">
                  Tiếp thị liên kết cùng Tiki
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">
                  Bán hàng doanh nghiệp
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">
                  Điều kiện vận chuyển
                </a>
              </li>
            </ul>
          </div>

          {/* Partnership */}
          <div className="lg:col-span-1">
            <h3 className="font-semibold text-gray-900 mb-4">
              Hợp tác và liên kết
            </h3>
            <ul className="space-y-2 text-sm text-gray-600 mb-6">
              <li>
                <a href="#" className="hover:text-blue-600">
                  Quy chế hoạt động Sàn GDTMDT
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">
                  Bán hàng cùng Tiki
                </a>
              </li>
            </ul>

            <h4 className="font-semibold text-gray-900 mb-3">Chứng nhận bởi</h4>
            <div className="flex flex-wrap gap-2">
              <div className="w-12 h-12 bg-red-100 rounded flex items-center justify-center">
                <div className="w-8 h-8 bg-red-500 rounded-full"></div>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded flex items-center justify-center">
                <div className="w-8 h-8 bg-green-500 rounded-full"></div>
              </div>
              <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center">
                <div className="w-8 h-8 bg-gray-500 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="lg:col-span-1">
            <h3 className="font-semibold text-gray-900 mb-4">
              Phương thức thanh toán
            </h3>
            <div className="grid grid-cols-4 gap-2 mb-6">
              {/* Payment method icons */}
              <div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">
                VISA
              </div>
              <div className="w-12 h-8 bg-red-600 rounded flex items-center justify-center text-white text-xs font-bold">
                MC
              </div>
              <div className="w-12 h-8 bg-green-600 rounded flex items-center justify-center text-white text-xs font-bold">
                JCB
              </div>
              <div className="w-12 h-8 bg-blue-500 rounded flex items-center justify-center text-white text-xs font-bold">
                ATM
              </div>
              <div className="w-12 h-8 bg-purple-600 rounded flex items-center justify-center text-white text-xs font-bold">
                MO
              </div>
              <div className="w-12 h-8 bg-cyan-500 rounded flex items-center justify-center text-white text-xs font-bold">
                ZP
              </div>
              <div className="w-12 h-8 bg-red-500 rounded flex items-center justify-center text-white text-xs font-bold">
                AL
              </div>
              <div className="w-12 h-8 bg-blue-400 rounded flex items-center justify-center text-white text-xs font-bold">
                VN
              </div>
              <div className="w-12 h-8 bg-gray-600 rounded flex items-center justify-center text-white text-xs font-bold">
                COD
              </div>
            </div>

            <h4 className="font-semibold text-gray-900 mb-3">
              Dịch vụ giao hàng
            </h4>
            <div className="text-blue-600 font-bold text-lg">TIKINOW</div>
          </div>

          {/* Connect with us */}
          <div className="lg:col-span-1">
            <h3 className="font-semibold text-gray-900 mb-4">
              Kết nối với chúng tôi
            </h3>
            <div className="flex space-x-3 mb-6">
              <a
                href="#"
                className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700"
              >
                {/* <Facebook size={16} /> */}
                Facebook
              </a>
              <a
                href="#"
                className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white hover:bg-red-700"
              >
                Youtube
              </a>
              <a
                href="#"
                className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white hover:bg-blue-600"
              >
                Mess
              </a>
            </div>

            <h4 className="font-semibold text-gray-900 mb-3">
              Tải ứng dụng trên điện thoại
            </h4>
            <div className="flex items-start space-x-3">
              <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center">
                <div className="w-12 h-12 bg-black rounded grid grid-cols-3 gap-px p-1">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <div key={i} className="bg-white rounded-sm"></div>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <div className="w-24 h-8 bg-black rounded flex items-center justify-center">
                  <span className="text-white text-xs">App Store</span>
                </div>
                <div className="w-24 h-8 bg-black rounded flex items-center justify-center">
                  <span className="text-white text-xs">Google Play</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Company Information */}
        <div className="border-t border-gray-200 pt-6 mb-6">
          <h3 className="font-semibold text-gray-900 mb-3">
            Công ty TNHH TI KI
          </h3>
          <div className="text-sm text-gray-600 space-y-1">
            <p>
              Tòa nhà số 52 đường Út Tịch, Phường 4, Quận Tân Bình, Thành phố Hồ
              Chí Minh
            </p>
            <p>
              Giấy chứng nhận đăng ký doanh nghiệp số 0309532909 do Sở Kế Hoạch
              và Đầu Tư Thành phố Hồ Chí Minh cấp lần đầu vào ngày 06/01/2010.
            </p>
            <p>
              Hotline: <span className="text-blue-600">1900 6035</span>
            </p>
          </div>
        </div>

        {/* Featured Brands */}
        <div className="border-t border-gray-200 pt-6">
          <h3 className="font-semibold text-gray-900 mb-3">
            Thương Hiệu Nổi Bật
          </h3>
          <div className="text-xs text-gray-500 leading-relaxed">
            <span>
              vascara / dior / esteelauder / th truemilk / barbie / owen /
              ensure / durex / bioderma / elly / milo / skechers / aldo /
              triumph / nutifood / kindle / nerman / wacom / anessa / yoosee /
              olay / similac / comfort / bitas / shiseido / langfarm / hukan /
              vichy / fila / tsubaki
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
