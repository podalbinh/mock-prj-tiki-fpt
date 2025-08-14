import { Card, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";
import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {useBook} from "@/hooks/useBook.ts";
import {useAppSelector} from "@/store";
import {formattedPrice} from "@/utils/priceHelper.ts";
import {useNavigate} from "react-router";

export default function OrderSummary() {
    const location = useLocation();
    const navigate = useNavigate();
    const { getBookById } = useBook();
    const [total, setTotal] = useState<number>(0);
    const cartItems = useAppSelector((state) => state.cart.items);

    useEffect(() => {
        if (location.state) {
            (async () => {
                const data = await getBookById(location.state?.bookId);
                setTotal(data.listPrice * location.state?.quantity);
            })();
            return;
        }

        if (cartItems.length === 0) return;

        (async () => {
            const totalPrice = await Promise.all(
                cartItems.map(async (item) => {
                    if (!item.id) return 0;
                    const data = await getBookById(item.id);
                    return data.listPrice * item.quantity;
                })
            );

            const sum = totalPrice.reduce((acc, price) => acc + (price || 0), 0);

            setTotal(sum);
        })();

    }, []);

    const onClick = () => {
        // Gửi API
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
