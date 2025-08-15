import {Card, Button, App} from "antd";
import { DownOutlined } from "@ant-design/icons";
import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {useBook} from "@/hooks/useBook.ts";
import {formattedPrice} from "@/utils/priceHelper.ts";
import {useNavigate} from "react-router-dom";
import {useOrder} from "@/hooks/useOrder.ts";
import {useCart} from "@/hooks/useCart.ts";
import type { CartItem } from "@/constant/interfaces";

export default function OrderSummary() {
    const location = useLocation();
    const navigate = useNavigate();
    const {createOrders} = useOrder()
    const { getBookById } = useBook();
    const [total, setTotal] = useState<number>(0);
    const { cartItems, clearCart } = useCart();
    const { message } = App.useApp();
    const userJson = localStorage.getItem("user");
    const user = userJson ? JSON.parse(userJson) : null;

    useEffect(() => {
        if (location.state?.selectedCartItems) {
            // Xử lý state mới với selectedCartItems
            (async () => {
                const selectedItems = location.state.selectedCartItems;
                const totalPrice = await Promise.all(
                    selectedItems.map(async (item: any) => {
                        if (!item.productId) return 0;
                        const data = await getBookById(item.productId);
                        return data.listPrice * (item.quantity || 1);
                    })
                );

                const sum = totalPrice.reduce((acc, price) => acc + (price || 0), 0);
                setTotal(sum);
            })();
            return;
        }

        if (location.state?.bookId) {
            // Xử lý state cũ (backward compatibility)
            (async () => {
                const data = await getBookById(location.state.bookId);
                setTotal(data.listPrice * (location.state.quantity || 1));
            })();
            return;
        }

        if (cartItems.length === 0) return;

        (async () => {
            const totalPrice = await Promise.all(
                cartItems.map(async (item) => {
                    if (!item.productId) return 0;
                    const data = await getBookById(item.productId || 0);
                    return data.listPrice * (item.quantity || 1);
                })
            );

            const sum = totalPrice.reduce((acc, price) => acc + (price || 0), 0);

            setTotal(sum);
        })();

    }, [location.state, cartItems]);

    const onClick = () => {
        if (!user?.fullName || !user?.address || !user?.phone) {
            message.error("Chưa có đầy đủ thông tin khách hàng để giao hàng")
            return;
        }

        try {
            if (location.state?.selectedCartItems) {
                (async () => {
                    const selectedItems = location.state.selectedCartItems;
                    const data = selectedItems
                        .filter((item: any) => item.productId !== undefined)
                        .map((item: any) => ({
                            productId: item.productId || 0,
                            quantity: item.quantity || 1
                        }));

                    await createOrders(data);
                })();
            } else if (location.state?.bookId) {
                (async () => {
                    await createOrders([{productId: location.state.bookId, quantity: location.state.quantity || 1}])
                })();
            } else if (cartItems.length > 0) {
                (async () => {
                    const data = cartItems
                        .filter((item): item is CartItem =>
                            item.productId !== undefined
                        )
                        .map((item) => ({
                            productId: item.productId || 0,
                            quantity: item.quantity || 1
                        }));

                    await createOrders(data);
                })();
            }
        } catch (e) {
            console.error(e);
            message.error("Lưu đơn hàng thất bại")
            return;
        }
        message.success("Lưu đơn hàng thành công")
        clearCart();
        navigate("/confirm");
    }

    return (
        <Card className="p-0 rounded-lg overflow-hidden">
            <div className={"flex flex-col"}>
                {/* Tiêu đề */}
                <div className="pb-4">
                    <h2 className="text-base font-semibold">Đơn hàng</h2>
                    <div className="text-sm text-gray-500 mt-0.5 flex items-center">
                        1 sản phẩm.
                        <span className="text-blue-500 ml-1 flex items-center cursor-pointer">
                        Xem thông tin <DownOutlined className="ml-1 text-xs" />
                      </span>
                    </div>
                </div>

                {/* Chi tiết giá */}
                <div className="py-3 space-y-2 text-sm border-t border-b border-gray-200">
                    <div className="flex justify-between text-gray-600">
                        <span>Tổng tiền hàng</span>
                        <span>{formattedPrice(total)}đ</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                        <span>Phí vận chuyển</span>
                        <span>25.000đ</span>
                    </div>
                    <div className="flex justify-between text-green-600">
                        <span>Giảm giá trực tiếp</span>
                        <span>0đ</span>
                    </div>
                    <div className="flex justify-between text-green-600">
                      <span className="flex items-center">
                        Giảm giá vận chuyển
                        <span className="ml-1 text-gray-400">ⓘ</span>
                      </span>
                        <span>-25.000đ</span>
                    </div>
                </div>

                {/* Tổng tiền thanh toán */}
                <div className="py-3">
                    <div className="flex justify-between items-end">
                        <span className="font-semibold text-base">Tổng tiền thanh toán</span>
                        <span className="text-red-500 font-semibold text-lg">{formattedPrice(total)} đ</span>
                    </div>
                    <p className="text-green-600 text-sm mt-0.5 text-right">Tiết kiệm 25.000 đ</p>
                    <p className="text-gray-400 text-xs mt-1 text-right">
                        (Giá này đã bao gồm thuế GTGT, phí đóng gói, phí vận chuyển và các chi phí phát sinh khác)
                    </p>
                </div>

                {/* Nút đặt hàng */}
                <div className="pb-4">
                    <Button
                        type="primary"
                        onClick={onClick}
                        className="w-full h-11 bg-red-500 text-white font-semibold rounded"
                    >
                        Đặt hàng
                    </Button>
                </div>
            </div>
        </Card>
    );
}
