import  { useEffect, useMemo, useCallback, useState } from "react";
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
  
  // Local state để track cart items
  const [localCartItems, setLocalCartItems] = useState(cartItems);
  
  // Update local state khi cartItems thay đổi
  useEffect(() => {
    setLocalCartItems(cartItems);
  }, [cartItems]);
  
  // Sử dụng useMemo để tính toán totalItems và đảm bảo re-render khi localCartItems thay đổi
  const totalItems = useMemo(() => {
    const total = localCartItems.length;
    return total;
  }, [localCartItems]);
  
  // useEffect để đảm bảo component re-render khi localCartItems thay đổi
  useEffect(() => {
  }, [totalItems, localCartItems.length]);

  // Thêm useEffect để lắng nghe cart-updated event
  useEffect(() => {
    const handleCartUpdated = (e: CustomEvent) => {
      if (e.detail && e.detail.cartItems) {
        setLocalCartItems(e.detail.cartItems);
      }
    };

    window.addEventListener('cart-updated', handleCartUpdated as EventListener);
    
    return () => {
      window.removeEventListener('cart-updated', handleCartUpdated as EventListener);
    };
  }, []);

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
        <ShoppingCartOutlined className="text-[20px] p-1 lg:text-blue-600 text-white" />
      </Badge>
    </div>
  );
};

export default CartWithBadge;
