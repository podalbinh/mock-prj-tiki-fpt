import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { notification, Checkbox, Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import CartItem from "@/components/common/CartItem";
import CartSummary from "@/components/common/CartSummary";
import EmptyCart from "@/components/EmptyCart";
import { LoginModal } from "@/components/forms/LoginModalForm";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";
import { useModal } from "@/hooks/useModal";

const CartPage = () => {
  const navigate = useNavigate();
  const { cartItems, updateQuantity, removeFromCart, validateCart } = useCart();
  const { isAuthenticated } = useAuth();
  const { openLoginModal } = useModal();
  const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set());
  const [selectAll, setSelectAll] = useState(false);
  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      // Hiện notification warning mỗi lần truy cập
      notification.warning({
        message: "Yêu cầu đăng nhập",
        description: "Vui lòng đăng nhập để xem giỏ hàng",
        duration: 4,
        placement: "topRight",
      });

      // Hiện loginModal và redirect về trang chủ
      openLoginModal();
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, openLoginModal, navigate]);

  // Update select all when selectedItems changes
  useEffect(() => {
    if (cartItems.length > 0 && selectedItems.size === cartItems.length) {
      setSelectAll(true);
    } else {
      setSelectAll(false);
    }
  }, [selectedItems, cartItems]);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(new Set(cartItems.map((item) => item.productId || 0)));
    } else {
      setSelectedItems(new Set());
    }
    setSelectAll(checked);
  };

  const handleSelectItem = (id: number, selected: boolean) => {
    const newSelected = new Set(selectedItems);
    if (selected) {
      newSelected.add(id);
    } else {
      newSelected.delete(id);
    }
    setSelectedItems(newSelected);
  };

  const handleQuantityChange = (id: number, quantity: number) => {
    updateQuantity(id, quantity);
  };

  const handleRemove = (id: number) => {
    removeFromCart(id);
    setSelectedItems((prev) => {
      const newSelected = new Set(prev);
      newSelected.delete(id);
      return newSelected;
    });
  };

  const handleRemoveSelected = () => {
    if (selectedItems.size === 0) {
      notification.warning({
        message: "Thông báo",
        description: "Vui lòng chọn sản phẩm để xóa",
      });
      return;
    }

    selectedItems.forEach((id) => removeFromCart(id));
    setSelectedItems(new Set());
    setSelectAll(false);

    notification.success({
      message: "Thành công",
      description: "Đã xóa các sản phẩm đã chọn",
    });
  };

  const handleCheckout = async () => {
    if (selectedItems.size === 0) {
      notification.warning({
        message: "Thông báo",
        description: "Vui lòng chọn sản phẩm để thanh toán",
      });
      return;
    }

    try {
      // Gọi API validate cart với các item được chọn
      const selectedCartItems = getSelectedItems();

      await validateCart(selectedCartItems);

      if (selectedCartItems.length > 0) {
        try {
          navigate("/payment", {
            state: {
              selectedCartItems: selectedCartItems,
            },
          });
        } catch (navigateError) {
          console.error("Error calling navigate:", navigateError);
        }
      }
    } catch (error) {
      console.error("Error validating cart:", error);
      // Xử lý error message từ API response
      if (error && typeof error === "object" && "data" in error) {
        const apiError = error as any;
        notification.error({
          message: "Lỗi xác nhận giỏ hàng",
          description: apiError.data.data.message,
        });
      }
    }
  };

  const getSelectedItems = () => {
    return cartItems.filter((item) => selectedItems.has(item.productId || 0));
  };

  // Don't render anything if not authenticated (will redirect)
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang chuyển hướng...</p>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return <EmptyCart />;
  }

  return (
    <>
      <div className="container mx-auto pt-4 max-w-7xl">
        {/* Page Header */}
        <div className="mb-6 border-gray-200 border-b p-4 bg-white rounded-lg shadow-sm ">
          <h1 className="text-2xl font-bold text-gray-900">GIỎ HÀNG</h1>
        </div>

        {/* Cart Header */}
        <div className="bg-white rounded-lg shadow-sm border mb-4">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center">
              {/* Checkbox */}
              <div className="w-12 flex justify-center">
                <Checkbox
                  checked={selectAll}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                />
              </div>

              {/* Product Info Header */}
              <div className="flex-1 mr-4">
                <span className="font-medium text-gray-600">
                  Tất cả ({cartItems.length} sản phẩm)
                </span>
              </div>

              {/* Column Headers */}
              <div className="w-32 text-center text-sm text-gray-600">
                Đơn giá
              </div>
              <div className="w-32 text-center text-sm text-gray-600">
                Số lượng
              </div>
              <div className="w-32 text-center text-sm text-gray-600">
                Thành tiền
              </div>
              <div className="w-12 flex justify-center">
                <Button
                  type="text"
                  icon={<DeleteOutlined />}
                  onClick={handleRemoveSelected}
                  disabled={selectedItems.size === 0}
                  className="text-gray-400 hover:text-red-500"
                  size="small"
                />
              </div>
            </div>
          </div>

          {/* Cart Items */}
          <div className="divide-y divide-gray-200">
            {cartItems.map((item) => (
              <CartItem
                key={item.productId || 0}
                item={item}
                isSelected={selectedItems.has(item.productId || 0)}
                onSelect={handleSelectItem}
                onQuantityChange={handleQuantityChange}
                onRemove={handleRemove}
              />
            ))}
          </div>
        </div>

        {/* Cart Summary */}
        <div className="lg:col-span-1 mb-6">
          <CartSummary
            items={cartItems}
            selectedItems={getSelectedItems()}
            onCheckout={handleCheckout}
          />
        </div>
      </div>

      {/* Login Modal */}
      <LoginModal />
    </>
  );
};

export default CartPage;
