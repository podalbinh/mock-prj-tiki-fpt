import { Button } from "antd";
import {InfoCircleOutlined, RightOutlined} from "@ant-design/icons";

export default function VoucherSection() {
    return (
        <div className="flex flex-col gap-5 bg-white rounded-lg p-4">
            {/* Tiêu đề */}
            <div className="flex justify-between items-center">
                <span className="font-medium">Tiki Khuyến Mãi</span>
                <span className="text-gray-500 text-sm flex items-center">
                  Có thể chọn 2
                  <InfoCircleOutlined className="ml-1 text-gray-400" />
                </span>
            </div>

            {/* Voucher */}
            <div className="flex items-center overflow-hidden">
                <div className="relative inline-block">
                    {/* SVG nền */}
                    <img
                        src="src/assets/freeship.svg"
                        alt="Tiki"
                        className="h-[60px] w-full"
                    />

                    {/* Nội dung chồng lên */}
                    <div className="absolute inset-0 flex items-center justify-between px-3">
                        <div className="flex items-center justify-center">
                            <img
                                src="src/assets/freeship-car.svg"
                                alt="freeship"
                                className="w-11 h-11"
                            />
                        </div>
                        <div className="flex-1 flex items-center px-2">
                            <div className="font-medium flex-1">Giảm 25K</div>
                            <InfoCircleOutlined className="ml-2 text-blue-500"/>
                        </div>
                        <Button type="primary" className="bg-blue-500">
                            Bỏ Chọn
                        </Button>
                    </div>
                </div>
            </div>

            {/* Link chọn mã khác */}
            <div className="flex items-center text-[#0A68FF] cursor-pointer">
                <img
                    src="src/assets/discount.svg"
                    alt="Tiki"
                    className="h-4 mr-2"
                />
                <div className={"text-sm"}>Chọn hoặc nhập mã khác</div>
                <RightOutlined className={"text-[#0A68FF] ml-2"}/>
            </div>
        </div>
    );
}
