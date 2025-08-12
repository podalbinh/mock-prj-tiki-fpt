import logo from "@/assets/logo.svg";
import commitment from "@/assets/commitment.svg";
import ticket from "@/assets/ticket.svg";
import fastDelivery from "@/assets/fast-shipping.svg";
import shipping from "@/assets/shipping.svg";
import refund from "@/assets/refund.svg";
import returnPolicy from "@/assets/return.svg";

import { HomeOutlined, SearchOutlined, UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import CartWithBadge from "@/components/common/CartWithBadge";
import {LoginModal} from "@/components/forms/LoginModalForm";
import { useModal } from '@/hooks/useModal'
import { SignupModal } from "@/components/forms/SignUpModalForm";
import { useNavigate } from "react-router-dom";
import { Input } from "antd";

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
  ]

  const { openLoginModal } = useModal()
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("authToken");

  const handleAccountClick = () => {
    console.log('isAuthenticated',isAuthenticated)
    if (isAuthenticated) {
      navigate("/profile");
    } else {
      openLoginModal();
    }
  };

  return (
    <div className="flex flex-col shadow-sm w-full">
      <div className="flex justify-between px-6 py-3 w-full">
        <div className="w-[10%]">
          <img src={logo} alt="Logo"/>
        </div>

        <div className="flex flex-col w-[90%]">
          <div className="flex  items-center justify-between">
            <div className="w-[70%]">
              <Input
                // value={query}
                // onChange={(e) => setQuery(e.target.value)}
                placeholder="100% hàng thật"
                prefix={<SearchOutlined className="text-gray-400" size={16} aria-hidden="true" />}
                addonAfter={
                    <button type="submit" aria-label="Tìm kiếm">
                        Tìm kiếm
                    </button>
                }
              />
            </div>
            <div className="flex">
              <Link
                to="/home"
                className="mx-4 max-h-min flex items-center gap-1 whitespace-nowrap"
              >
                <HomeOutlined className="text-[20px] p-1 flex-shrink-0" />
                Trang chủ
              </Link>

              <button
                onClick={handleAccountClick}
                className="mx-4 max-h-min flex items-center gap-1 whitespace-nowrap"
              >
                <UserOutlined className="text-[20px] p-1 flex-shrink-0" />
                Tài khoản
              </button>

              <Link
                to="/cart"
                className="border-l-2 max-h-min px-4 flex items-center"
              >
                <CartWithBadge />
              </Link>
            </div>
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500">
            {suggestions.map((s, i) => (
                <button
                    key={i}
                    type="button"
                    // onClick={() => applySuggestion(s)}
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