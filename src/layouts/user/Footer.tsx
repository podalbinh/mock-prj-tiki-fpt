import { Image } from "antd";
import logo2 from "../../../public/assets/bo-cong-thuong.svg";
import logo1 from "../../../public/assets/bo-cong-thuong-2.svg";
import logo3 from "../../../public/assets/bo-cong-thuong-3.svg";
import payment0 from "../../../public/assets/payment-0.svg";
import payment1 from "../../../public/assets/payment-1.svg";
import payment2 from "../../../public/assets/payment-2.svg";
import payment3 from "../../../public/assets/payment-3.svg";
import payment4 from "../../../public/assets/payment-4.svg";
import payment5 from "../../../public/assets/payment-5.svg";
import payment6 from "../../../public/assets/payment-6.svg";
import payment7 from "../../../public/assets/payment-7.svg";
import payment8 from "../../../public/assets/payment-8.svg";
import payment9 from "../../../public/assets/payment-9.svg";
import payment10 from "../../../public/assets/payment-10.svg";
import appstore from "../../../public/assets/appstore.svg";
import googleplay from "../../../public/assets/googleplay.svg";
import zalo from "../../../public/assets/zalo.svg";
import facebook from "../../../public/assets/facebook.svg";
import youtube from "../../../public/assets/youtube.svg";
import tikiQr from "../../../public/assets/tiki-qr.svg";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8">
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
              <Image src={logo1} preview={false} />
              <Image src={logo2} preview={false} />
              <Image src={logo3} preview={false} />
            </div>
          </div>

          {/* Payment Methods */}
          <div className="lg:col-span-1">
            <h3 className="font-semibold text-gray-900 mb-4">
              Phương thức thanh toán
            </h3>
            <div className="grid grid-cols-4 gap-2 mb-6">
              {/* Payment method icons */}
              <Image src={payment0} preview={false} className="max-w-12"/>
              <Image src={payment1} preview={false} className="max-w-12"/>
              <Image src={payment2} preview={false} className="max-w-12"/>
              <Image src={payment3} preview={false} className="max-w-12"/>
              <Image src={payment4} preview={false} className="max-w-12"/>
              <Image src={payment5} preview={false} className="max-w-12"/>
              <Image src={payment6} preview={false} className="max-w-12"/>
              <Image src={payment7} preview={false} className="max-w-12"/>
              <Image src={payment8} preview={false} className="max-w-12"/>
              <Image src={payment9} preview={false} className="max-w-12"/>
              <Image src={payment10} preview={false} className="max-w-12"/>
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
              <a href="#" className="w-8 h-8 rounded-full">
                <Image src={facebook} preview={false} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full">
                <Image src={youtube} preview={false} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full">
                <Image src={zalo} preview={false} />
              </a>
            </div>

            <h4 className="font-semibold text-gray-900 mb-3">
              Tải ứng dụng trên điện thoại
            </h4>
            <div className="flex items-start space-x-3">
              <div className="w-16 h-16 rounded flex items-center justify-center">
                <Image src={tikiQr} preview={false} />
              </div>
              <div className="space-y-2">
                <div className="w-24 h-8 rounded flex items-center justify-center">
                  <Image src={appstore} preview={false} />
                </div>
                <div className="w-24 h-8 bg-black rounded flex items-center justify-center">
                  <Image src={googleplay} preview={false} />
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
