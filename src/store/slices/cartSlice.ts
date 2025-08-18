// src/features/cart/cartSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CartItem, CreateOrderResponse } from "@/constant/interfaces";
import { formattedPrice } from "@/utils/priceHelper";
import { randomDeliveryDate } from "@/utils/dateHelper";

interface CartState {
  items: CartItem[];
  recentOrder: {
    totalAmount: string;
    orderId: number;
    productId: number;
    productName: string;
    thumbnailUrl: string;
    deliveryDate: string;
  } | null;
}

const initialState: CartState = {
  items: JSON.parse(localStorage.getItem("cart") || "[]"),
  recentOrder: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        (item) => item.productId === action.payload.productId
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(
        (item) => item.productId !== action.payload
      );
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      const item = state.items.find((i) => i.productId === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    // Recent Order
    setRecentOrder: (state, action: PayloadAction<CreateOrderResponse>) => {
      const payload = action.payload;
      if (!payload || !payload.orderId) {
        console.error("Invalid order data:", payload);
        return;
      }
      const price = formattedPrice(payload.totalAmount);
      state.recentOrder = {
        totalAmount: price,
        orderId: payload.orderId,
        productId: payload.products?.[0]?.productId,
        productName: payload.products?.[0]?.productName,
        thumbnailUrl: payload.products?.[0]?.thumbnailUrl,
        deliveryDate: randomDeliveryDate(),
      };
    },
    clearRecentOrder: (state) => {
      state.recentOrder = null;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  setRecentOrder,
  clearRecentOrder,
} = cartSlice.actions;

export default cartSlice.reducer;
