import React, { useState } from 'react';
import { Checkbox, Button, InputNumber } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import type { CartItem as ItemType } from "@/constant/interfaces";

type Props = {
    item: ItemType;
    isSelected: boolean;
    onSelect: (id: number, selected: boolean) => void;
    onQuantityChange: (id: number, qty: number) => void;
    onRemove: (id: number) => void;
};

const CartItem: React.FC<Props> = ({ item, isSelected, onSelect, onQuantityChange, onRemove }) => {
    const [quantity, setQuantity] = useState(item.quantity);

    const handleQuantityChange = (value: number | null) => {
        if (value && value > 0) {
            setQuantity(value);
            onQuantityChange(item.productId, value);
        }
    };

    const handleQuantityBlur = () => {
        if (quantity <= 0) {
            setQuantity(1);
            onQuantityChange(item.productId, 1);
        }
    };

    return (
        <div className="flex items-center py-4 border-b border-gray-200">
            {/* Checkbox */}
            <div className="w-12 flex justify-center">
                <Checkbox
                    checked={isSelected}
                    onChange={(e) => onSelect(item.productId, e.target.checked)}
                />
            </div>

            {/* Product Info */}
            <div className="flex-1 mr-4">
                <div className="flex items-start">
                    {/* Product Image */}
                    <div className="w-20 h-20 mr-4 flex-shrink-0">
                        <img 
                            src={item.thumbnailUrl}
                            alt={item.name} 
                            className="w-full h-full object-cover rounded"
                        />
                    </div>
                    
                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm text-gray-900 mb-1 line-clamp-2">
                            {item.name}
                        </h3>
                    </div>
                </div>
            </div>

            {/* Unit Price - Đơn giá */}
            <div className="w-32 text-center">
                <div className="flex flex-col items-center">
                    <span className="font-semibold text-red-600">
                        {item.price.toLocaleString()}₫
                    </span>
                    {item.originalPrice && item.originalPrice > item.price && (
                        <span className="text-gray-500 line-through text-xs">
                            {item.originalPrice.toLocaleString()}₫
                        </span>
                    )}
                </div>
            </div>

            {/* Quantity Control */}
            <div className="w-32 flex items-center justify-center">
                <InputNumber
                    min={1}
                    value={quantity}
                    onChange={handleQuantityChange}
                    onBlur={handleQuantityBlur}
                    className="w-20"
                    size="small"
                    style={{ 
                        textAlign: 'center',
                        width: '80px'
                    }}
                />
            </div>

            {/* Subtotal */}
            <div className="w-32 text-center">
                <span className="font-semibold text-red-600">
                    {(item.price * quantity).toLocaleString()}₫
                </span>
            </div>

            {/* Remove Button */}
            <div className="w-12 flex justify-center">
                <Button
                    type="text"
                    icon={<DeleteOutlined />}
                    onClick={() => onRemove(item.productId)}
                    className="text-gray-400 hover:text-red-500"
                    size="small"
                />
            </div>
        </div>
    );
};

export default CartItem;
