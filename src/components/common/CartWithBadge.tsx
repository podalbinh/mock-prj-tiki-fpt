import  { useEffect, useMemo, useCallback } from "react";
import { Badge, notification } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";
import { useModal } from "@/hooks/useModal";
import { useNavigate } from "react-router-dom";

const CartWithBadge = () => {
  const { cartItems } = useCart(); 
  const { isAuthenticated } = useAuth();
  const { openLoginModal } = useModal();
  const navigate = useNavigate();
  
  // Sử dụng useMemo để tính toán totalItems và đảm bảo re-render khi cartItems thay đổi
  const totalItems = useMemo(() => {
    console.log('CartWithBadge: useMemo triggered, cartItems.length:', cartItems.length);
    return cartItems.length;
  }, [cartItems]);
  
  // Debug log để kiểm tra realtime
  console.log('CartWithBadge: render, totalItems:', totalItems, 'cartItems.length:', cartItems.length);
  
  // useEffect để đảm bảo component re-render khi cartItems thay đổi
  useEffect(() => {
    console.log('CartWithBadge: useEffect triggered, totalItems:', totalItems, 'cartItems.length:', cartItems.length);
  }, [totalItems, cartItems.length]);

  const handleCartClick = useCallback(() => {
    if (isAuthenticated) {
      navigate('/cart');
    } else {
      // Hiện notification mỗi lần click
      notification.warning({
        message: 'Yêu cầu đăng nhập',
        description: 'Vui lòng đăng nhập để xem giỏ hàng',
        duration: 4,
        placement: 'topRight',
      });
      openLoginModal();
    }
  }, [isAuthenticated, navigate, openLoginModal]);

  return (
    <div onClick={handleCartClick} className="cursor-pointer">
      <Badge count={isAuthenticated ? totalItems : 0} size="small">
        <ShoppingCartOutlined className="text-[20px] p-1 text-blue-600" />
      </Badge>
    </div>
  );
};

export default CartWithBadge;
