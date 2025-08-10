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
    <div className="flex flex-col shadow-sm">
      <div className="flex gap-4 px-6 py-3">
        <img src={logo} alt="Logo" />
        {/* Todo: Tạo thanh search như design */}
        <div className="flex-grow">
          <Input
            // value={}
            // onChange={}
            placeholder="100% hàng thật"
            prefix={<SearchOutlined className="text-gray-400" size={16} aria-hidden="true" />}
            addonAfter={
              <button type="submit" className="search-addon" aria-label="Tìm kiếm">
                Tìm kiếm
              </button>
            }
            // cho phép clear nếu muốn
            allowClear
            className="antd-search-input"
            // antd Input cần ref khác kiểu, nhưng ta chỉ focus qua inputRef khi rỗng
          />
        </div>
        <div className="flex gap-1">
          <Link to="/home" className="mx-4 max-h-min">
            <HomeOutlined className="text-[20px] p-1" />
            Trang chủ
          </Link>
          <button
            onClick={handleAccountClick}
            className="mx-4 max-h-min flex items-center"
          >
            <UserOutlined className="text-[20px] p-1" />
            Tài khoản
          </button>
          <Link to="/cart" className="border-l-2 max-h-min px-4">
            <CartWithBadge />
          </Link>
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
