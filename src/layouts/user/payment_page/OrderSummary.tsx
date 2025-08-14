import { Card, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";

export default function OrderSummary() {
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
                        <span>169.000đ</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                        <span>Phí vận chuyển</span>
                        <span>25.000đ</span>
                    </div>
                    <div className="flex justify-between text-green-600">
                        <span>Giảm giá trực tiếp</span>
                        <span>-59.000đ</span>
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
                        <span className="text-red-500 font-semibold text-lg">110.000 đ</span>
                    </div>
                    <p className="text-green-600 text-sm mt-0.5 text-right">Tiết kiệm 84.000 đ</p>
                    <p className="text-gray-400 text-xs mt-1 text-right">
                        (Giá này đã bao gồm thuế GTGT, phí đóng gói, phí vận chuyển và các chi phí phát sinh khác)
                    </p>
                </div>

                {/* Nút đặt hàng */}
                <div className="pb-4">
                    <Button
                        type="primary"
                        className="w-full h-11 bg-red-500 text-white font-semibold rounded"
                    >
                        Đặt hàng
                    </Button>
                </div>
            </div>
        </Card>
    );
}
