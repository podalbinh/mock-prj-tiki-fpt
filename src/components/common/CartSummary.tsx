import React from 'react';
import { Button, Divider } from 'antd';
import type { CartItem as ItemType } from "@/constant/interfaces";

type Props = {
    items: ItemType[];
    selectedItems: ItemType[];
    onCheckout: () => void;
};

const CartSummary: React.FC<Props> = ({ items, selectedItems, onCheckout }) => {
    const totalItems = selectedItems.length; // Số lượng sản phẩm khác nhau đã chọn
    const subtotal = selectedItems.reduce((acc, item) => acc + ((item.price || 0) * (item.quantity || 1)), 0);
    const shippingFee: number = 0; // Miễn phí vận chuyển
    const total: number = subtotal + shippingFee;

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold mb-4">Tóm tắt đơn hàng</h3>
            
            <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                    <span className="text-gray-600">Sản phẩm ({totalItems})</span>
                    <span className="font-medium">{subtotal.toLocaleString()}₫</span>
                </div>
                
                <div className="flex justify-between">
                    <span className="text-gray-600">Phí vận chuyển</span>
                    <span className="text-green-600 font-medium">
                        {shippingFee === 0 ? 'Miễn phí' : `${shippingFee.toLocaleString()}₫`}
                    </span>
                </div>
                
                <Divider className="my-3" />
                
                <div className="flex justify-between text-lg">
                    <span className="font-semibold">Tổng cộng</span>
                    <span className="font-bold text-red-600">{total.toLocaleString()}₫</span>
                </div>
            </div>

            <Button
                type="primary"
                size="large"
                block
                onClick={onCheckout}
                disabled={selectedItems.length === 0}
                className="bg-red-600 hover:bg-red-700 border-red-600"
            >
                Tiến hành thanh toán
            </Button>

            <div className="mt-4 text-center">
                <p className="text-xs text-gray-500">
                    Bằng việc tiếp tục, bạn đồng ý với 
                    <a href="#" className="text-blue-600 hover:underline ml-1">
                        Điều khoản sử dụng
                    </a>
                </p>
            </div>
        </div>
    );
};

export default CartSummary;
