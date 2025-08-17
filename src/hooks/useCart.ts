import { useState, useEffect, useCallback, useRef } from 'react';
import { useAuth } from './useAuth';
import { notification } from 'antd';
import type {CartItem, Category, CartValidateResponse} from '@/constant/interfaces';
import Request from "@/config/api.ts";
import {API_ENDPOINTS} from "@/constant/endpoint.ts";

export const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { isAuthenticated } = useAuth();
  const isInitialized = useRef(false);
  const lastCartUpdate = useRef<string>('');

  // Load cart items from localStorage on mount
  useEffect(() => {
    if (isInitialized.current) return;
    
    console.log('useCart: Loading cart items...');
    
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        console.log('useCart: Loaded from localStorage:', parsedCart);
        
        // Validate và normalize dữ liệu từ localStorage
        const validatedCart = parsedCart.map((item: any) => ({
          productId: item.productId || 0,
          name: item.name || 'Unnamed Product',
          thumbnailUrl: item.thumbnailUrl || '/placeholder.svg',
          price: item.price || 0,
          originalPrice: item.originalPrice || 0,
          quantity: item.quantity || 1
        }));
        
        setCartItems(validatedCart);
        lastCartUpdate.current = JSON.stringify(validatedCart);
        
        // Cập nhật lại localStorage với dữ liệu đã validate
        if (JSON.stringify(parsedCart) !== JSON.stringify(validatedCart)) {
          localStorage.setItem('cart', JSON.stringify(validatedCart));
          console.log('useCart: Updated localStorage with validated data');
        }
      } catch (error) {
        console.error('useCart: Error parsing cart items:', error);
        setCartItems([]);
        localStorage.setItem('cart', JSON.stringify([]));
        lastCartUpdate.current = '[]';
      }
    }
    
    isInitialized.current = true;
    
    // Lắng nghe thay đổi localStorage từ bên ngoài (F12, etc.)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'cart' && e.newValue && e.newValue !== lastCartUpdate.current) {
        try {
          const newCart = JSON.parse(e.newValue);
          console.log('useCart: localStorage changed externally, new cart:', newCart);
          
          // Validate và normalize dữ liệu từ localStorage
          const validatedCart = newCart.map((item: any) => ({
            productId: item.productId || 0,
            name: item.name || 'Unnamed Product',
            thumbnailUrl: item.thumbnailUrl || '/placeholder.svg',
            price: item.price || 0,
            originalPrice: item.originalPrice || 0,
            quantity: item.quantity || 1
          }));
          
          setCartItems(validatedCart);
          lastCartUpdate.current = JSON.stringify(validatedCart);
        } catch (error) {
          console.error('useCart: Error parsing external localStorage change:', error);
        }
      }
    };

    // Lắng nghe custom event cart-updated từ các component khác
    const handleCartUpdated = (e: CustomEvent) => {
      console.log('useCart: Custom cart-updated event received:', e.detail);
      if (e.detail && e.detail.cartItems) {
        const newCartString = JSON.stringify(e.detail.cartItems);
        if (newCartString !== lastCartUpdate.current) {
          // Validate và normalize dữ liệu từ custom event
          const validatedCart = e.detail.cartItems.map((item: any) => ({
            productId: item.productId || 0,
            name: item.name || 'Unnamed Product',
            thumbnailUrl: item.thumbnailUrl || '/placeholder.svg',
            price: item.price || 0,
            originalPrice: item.originalPrice || 0,
            quantity: item.quantity || 1
          }));
          
          setCartItems(validatedCart);
          lastCartUpdate.current = newCartString;
        }
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

    console.log('useCart: addToCart called with item:', item);

    // Validate và normalize dữ liệu CartItem
    const normalizedItem: CartItem = {
      productId: item.productId || 0,
      name: item.name || 'Unnamed Product',
      thumbnailUrl: item.thumbnailUrl || '/placeholder.svg',
      price: item.price || 0,
      originalPrice: item.originalPrice || 0,
      quantity: item.quantity || 1
    };

    // Sử dụng callback pattern để đảm bảo state update đồng bộ
    setCartItems(prev => {
      console.log('useCart: addToCart - previous cart:', prev);
      const existingItem = prev.find(cartItem => cartItem.productId === normalizedItem.productId);
      let newCart;
      
      if (existingItem) {
        newCart = prev.map(cartItem =>
          cartItem.productId === normalizedItem.productId
            ? { ...cartItem, quantity: cartItem.quantity + normalizedItem.quantity }
            : cartItem
        );
      } else {
        newCart = [...prev, normalizedItem];
      }
      
      console.log('useCart: addToCart - new cart:', newCart);
      
      // Cập nhật localStorage ngay lập tức
      localStorage.setItem('cart', JSON.stringify(newCart));
      lastCartUpdate.current = JSON.stringify(newCart);
      console.log('useCart: Added to cart, new cart:', newCart);
      
      // Dispatch custom event để thông báo cho các component khác
      window.dispatchEvent(new CustomEvent('cart-updated', { 
        detail: { cartItems: newCart, action: 'add', itemId: normalizedItem.productId } 
      }));
      
      return newCart;
    });
    return true;
  }, [isAuthenticated]);

  const updateQuantity = useCallback((id: number, quantity: number) => {
    console.log('useCart: Updating quantity for id:', id, 'to:', quantity);
    
    // Validate quantity
    const validQuantity = Math.max(1, quantity || 1);
    
    if (validQuantity <= 0) {
      console.log('useCart: Quantity <= 0, removing item');
      // Xóa item trực tiếp thay vì gọi removeFromCart
      setCartItems(prev => {
        const newCart = prev.filter(item => item.productId !== id);
        
        // Cập nhật localStorage ngay lập tức
        localStorage.setItem('cart', JSON.stringify(newCart));
        lastCartUpdate.current = JSON.stringify(newCart);
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
        item.productId === id ? { ...item, quantity: validQuantity } : item
      );
      
      // Cập nhật localStorage ngay lập tức
      localStorage.setItem('cart', JSON.stringify(newCart));
      lastCartUpdate.current = JSON.stringify(newCart);
      console.log('useCart: Updated quantity, new cart:', newCart);
      
      // Dispatch custom event để thông báo cho các component khác
      window.dispatchEvent(new CustomEvent('cart-updated', { 
        detail: { cartItems: newCart, action: 'update', itemId: id, quantity: validQuantity } 
      }));
      
      return newCart;
    });
  }, []);

  const removeFromCart = useCallback((id: number) => {
    console.log('useCart: Removing item with id:', id);
    
    // Sử dụng callback pattern để đảm bảo state update đồng bộ
    setCartItems(prev => {
      console.log('useCart: removeFromCart - previous cart:', prev);
      const newCart = prev.filter(item => item.productId !== id);
      
      console.log('useCart: removeFromCart - new cart:', newCart);
      
      // Cập nhật localStorage ngay lập tức
      localStorage.setItem('cart', JSON.stringify(newCart));
      lastCartUpdate.current = JSON.stringify(newCart);
      console.log('useCart: Cart after removal:', newCart);
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
      if (prev.length === 0) return prev;
      
      console.log('useCart: Previous cart before clearing:', prev);
      
      // Cập nhật localStorage ngay lập tức
      localStorage.setItem('cart', JSON.stringify([]));
      lastCartUpdate.current = '[]';
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
    const total = cartItems.length;
    console.log('useCart: getTotalItems called, returning:', total, 'cartItems:', cartItems);
    return total;
  }, [cartItems]);

  const getTotalPrice = useCallback(() => {
    const total = cartItems.reduce((total: number, item: CartItem) => {
      const price = item.price || 0;
      const quantity = item.quantity || 1;
      return total + (price * quantity);
    }, 0);
    console.log('useCart: getTotalPrice called, returning:', total);
    return total;
  }, [cartItems]);

  const validateCart = async (selectedCartItems: CartItem[]) => {
    const response = await Request.post<CartValidateResponse>(
        API_ENDPOINTS.VALIDATE_CART,
        selectedCartItems
    );
    return response;
  };
  return {
    cartItems,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getTotalItems,
    getTotalPrice,
    isAuthenticated,
    validateCart
  };
};
