"use client";

import type React from "react";
import { useState } from "react";
// import { Checkbox, Button, InputNumber } from "antd";
// import { DeleteOutlined } from "@ant-design/icons";
// import { useNavigate } from "react-router-dom";
import type { CartItem as ItemType } from "@/constant/interfaces";
import { DeleteOutlined } from "@ant-design/icons";

type Props = {
  item: ItemType;
  isSelected: boolean;
  onSelect: (id: number, selected: boolean) => void;
  onQuantityChange: (id: number, qty: number) => void;
  onRemove: (id: number) => void;
};

const CartItem: React.FC<Props> = ({
  item,
  isSelected,
  onSelect,
  onQuantityChange,
  onRemove,
}) => {
  const navigate = (path: string) => {
    window.location.href = path;
  };

  const [quantity, setQuantity] = useState(item.quantity || 1);

  const handleIncrement = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onQuantityChange(item.productId || 0, newQuantity);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onQuantityChange(item.productId || 0, newQuantity);
    }
  };

  const handleProductClick = () => {
    navigate(`/books/${item.productId}`);
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center py-4 border-b border-gray-200 gap-2 sm:gap-0 p-4">
      {/* Desktop: Checkbox */}
      <div className="hidden sm:flex w-12 justify-center">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={(e) => onSelect(item.productId || 0, e.target.checked)}
          className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
        />
      </div>

      {/* Product Info */}
      <div className="flex-1 sm:mr-4 flex items-center">
        {/* Mobile: Checkbox */}
        <div className="flex items-center sm:hidden">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={(e) => onSelect(item.productId || 0, e.target.checked)}
            className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
          />
        </div>

        <div
          className="flex flex-1 items-start cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
          onClick={handleProductClick}
        >
          {/* Product Image */}
          <div className="w-16 sm:w-20 mr-3 sm:mr-4 flex-shrink-0 shadow-md rounded-sm">
            <img
              src={item.thumbnailUrl || "/placeholder.svg"}
              alt={item.name || "Product"}
              className="w-full h-full object-cover rounded"
            />
          </div>

          {/* Product Details */}
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-sm sm:text-base text-gray-900 mb-1 line-clamp-2 hover:text-blue-600 transition-colors">
              {item.name || "Unnamed Product"}
            </h3>
            {/* Mobile: Show price here */}
            <div className="sm:hidden mt-2">
              <div className="flex flex-col">
                <span className="font-semibold text-red-600 text-sm">
                  {(item.price || 0).toLocaleString()}₫
                </span>
                {item.originalPrice &&
                  item.originalPrice > (item.price || 0) && (
                    <span className="text-gray-500 line-through text-xs">
                      {(item.originalPrice || 0).toLocaleString()}₫
                    </span>
                  )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile: Remove button */}
        <button
          onClick={() => onRemove(item.productId || 0)}
          className="sm:hidden flex w-7 h-8 flex-shrink-0 items-center justify-center text-gray-400 hover:text-red-500 transition-colors rounded-md border"
        >
          <DeleteOutlined />
        </button>
      </div>

      {/* Mobile: Quantity and Total in one row */}
      <div className="flex items-center justify-between sm:hidden px-2">
        {/* Quantity Control */}
        <div className="flex items-center">
          <span className="text-sm text-gray-600 mr-3">Số lượng:</span>
          <div className="flex items-center border border-gray-300 rounded">
            <button
              onClick={handleDecrement}
              disabled={quantity <= 1}
              className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              -
            </button>
            <span className="w-10 h-8 flex items-center justify-center text-sm font-medium border-x border-gray-300">
              {quantity}
            </span>
            <button
              onClick={handleIncrement}
              className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
            >
              +
            </button>
          </div>
        </div>

        {/* Subtotal */}
        <div className="text-right">
          <span className="text-sm text-gray-600">Tổng:</span>
          <div className="font-semibold text-red-600 text-sm">
            {((item.price || 0) * quantity).toLocaleString()}₫
          </div>
        </div>
      </div>

      {/* Desktop: Unit Price */}
      <div className="hidden sm:block w-32 text-center">
        <div className="flex flex-col items-center">
          <span className="font-semibold text-red-600">
            {(item.price || 0).toLocaleString()}₫
          </span>
          {item.originalPrice && item.originalPrice > (item.price || 0) && (
            <span className="text-gray-500 line-through text-xs">
              {(item.originalPrice || 0).toLocaleString()}₫
            </span>
          )}
        </div>
      </div>

      {/* Desktop: Quantity Control */}
      <div className="hidden sm:flex w-32 items-center justify-center">
        <div className="flex items-center border border-gray-300 rounded">
          <button
            onClick={handleDecrement}
            disabled={quantity <= 1}
            className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            -
          </button>
          <span className="w-10 h-8 flex items-center justify-center text-sm font-medium border-x border-gray-300">
            {quantity}
          </span>
          <button
            onClick={handleIncrement}
            className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
          >
            +
          </button>
        </div>
      </div>

      {/* Desktop: Subtotal */}
      <div className="hidden sm:block w-32 text-center">
        <span className="font-semibold text-red-600">
          {((item.price || 0) * quantity).toLocaleString()}₫
        </span>
      </div>

      {/* Desktop: Remove Button */}
      <div className="hidden sm:flex w-12 justify-center">
        <button
          onClick={() => onRemove(item.productId || 0)}
          className="p-2 text-gray-400 hover:text-red-500 transition-colors"
        >
          <DeleteOutlined />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
