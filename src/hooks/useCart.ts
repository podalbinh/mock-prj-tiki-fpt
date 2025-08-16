import { useState, useEffect, useCallback } from 'react';
import { useAuth } from './useAuth';
import { notification } from 'antd';
import type { CartItem } from '@/constant/interfaces';

export const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { isAuthenticated } = useAuth();

  // Load cart items from localStorage on mount
  useEffect(() => {
    console.log('useCart: Loading cart items...');
    
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        console.log('useCart: Loaded from localStorage:', parsedCart);
        setCartItems(parsedCart);
      } catch (error) {
        console.error('useCart: Error parsing cart items:', error);
        setCartItems([]);
        localStorage.setItem('cartItems', JSON.stringify([]));
      }
    }
    
    // Lắng nghe thay đổi localStorage từ bên ngoài (F12, etc.)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'cartItems' && e.newValue) {
        try {
          const newCart = JSON.parse(e.newValue);
          console.log('useCart: localStorage changed externally, new cart:', newCart);
          setCartItems(newCart);
        } catch (error) {
          console.error('useCart: Error parsing external localStorage change:', error);
        }
      }
    };

    // Lắng nghe custom event cart-updated từ các component khác
    const handleCartUpdated = (e: CustomEvent) => {
      console.log('useCart: Custom cart-updated event received:', e.detail);
      if (e.detail && e.detail.cartItems) {
        setCartItems(e.detail.cartItems);
      }
    };
    
    // Thêm event listeners
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('cart-updated', handleCartUpdated as EventListener);
    
    // Cleanup
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('cart-updated', handleCartUpdated as EventListener);
    };
  }, []); // Không có dependency để tránh re-render

  const addToCart = useCallback((item: CartItem) => {
    if (!isAuthenticated) {
      notification.warning({
        message: 'Yêu cầu đăng nhập',
        description: 'Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng',
        duration: 4,
      });
      return false;
    }

    // Sử dụng callback pattern để đảm bảo state update đồng bộ
    setCartItems(prev => {
      const existingItem = prev.find(cartItem => cartItem.productId === item.productId);
      let newCart;
      
      if (existingItem) {
        newCart = prev.map(cartItem =>
          cartItem.productId === item.productId
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        );
      } else {
        newCart = [...prev, item];
      }
      
      // Cập nhật localStorage ngay lập tức
      localStorage.setItem('cartItems', JSON.stringify(newCart));
      console.log('useCart: Added to cart, new cart:', newCart);
      
      // Dispatch custom event để thông báo cho các component khác
      window.dispatchEvent(new CustomEvent('cart-updated', { 
        detail: { cartItems: newCart, action: 'add', itemId: item.productId } 
      }));
      
      return newCart;
    });
    return true;
  }, [isAuthenticated]);

  const updateQuantity = useCallback((id: number, quantity: number) => {
    console.log('useCart: Updating quantity for id:', id, 'to:', quantity);
    
    if (quantity <= 0) {
      console.log('useCart: Quantity <= 0, removing item');
      // Xóa item trực tiếp thay vì gọi removeFromCart
      setCartItems(prev => {
        const newCart = prev.filter(item => item.productId !== id);
        localStorage.setItem('cartItems', JSON.stringify(newCart));
        console.log('useCart: Item removed due to quantity <= 0');
        
        // Dispatch custom event để thông báo cho các component khác
        window.dispatchEvent(new CustomEvent('cart-updated', { 
          detail: { cartItems: newCart, action: 'remove', itemId: id } 
        }));
        
        return newCart;
      });
      return;
    }
    
    // Sử dụng callback pattern để đảm bảo state update đồng bộ
    setCartItems(prev => {
      const newCart = prev.map(item =>
        item.productId === id ? { ...item, quantity } : item
      );
      
      // Cập nhật localStorage ngay lập tức
      localStorage.setItem('cartItems', JSON.stringify(newCart));
      console.log('useCart: Updated quantity, new cart:', newCart);
      
      // Dispatch custom event để thông báo cho các component khác
      window.dispatchEvent(new CustomEvent('cart-updated', { 
        detail: { cartItems: newCart, action: 'update', itemId: id, quantity } 
      }));
      
      return newCart;
    });
  }, []);

  const removeFromCart = useCallback((id: number) => {
    console.log('useCart: Removing item with id:', id);
    
    // Sử dụng callback pattern để đảm bảo state update đồng bộ
    setCartItems(prev => {
      const newCart = prev.filter(item => item.productId !== id);
      console.log('useCart: Cart after removal:', newCart);
      
      // Cập nhật localStorage ngay lập tức
      localStorage.setItem('cartItems', JSON.stringify(newCart));
      console.log('useCart: localStorage updated after removal');
      
      // Dispatch custom event để thông báo cho các component khác
      window.dispatchEvent(new CustomEvent('cart-updated', { 
        detail: { cartItems: newCart, action: 'remove', itemId: id } 
      }));
      
      return newCart;
    });
  }, []); // Không có dependency để tránh re-render

  const clearCart = useCallback(() => {
    console.log('useCart: Clearing cart');
    
    // Sử dụng callback pattern để đảm bảo state update đồng bộ
    setCartItems(prev => {
      console.log('useCart: Previous cart before clearing:', prev);
      
      // Cập nhật localStorage ngay lập tức
      localStorage.setItem('cartItems', JSON.stringify([]));
      console.log('useCart: Cart cleared, localStorage updated');
      
      // Dispatch custom event để thông báo cho các component khác
      window.dispatchEvent(new CustomEvent('cart-updated', { 
        detail: { cartItems: [], action: 'clear' } 
      }));
      
      return [];
    });
  }, []);

  const getTotalItems = useCallback(() => {
    // Trả về số lượng sản phẩm khác nhau, không phải tổng quantity
    return cartItems.length;
  }, [cartItems]);

  const getTotalPrice = useCallback(() => {
    return cartItems.reduce((total: number, item: CartItem) => total + (item.price * item.quantity), 0);
  }, [cartItems]);


  return {
    cartItems,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getTotalItems,
    getTotalPrice,
    isAuthenticated,
  };
};
