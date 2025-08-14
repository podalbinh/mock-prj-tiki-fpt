import { Radio, Card } from "antd";
import {formattedPrice} from "@/utils/priceHelper.ts";
import BookPaymentCard from "@/layouts/user/payment_page/BookPaymentCard.tsx";
import {RightOutlined} from "@ant-design/icons";

export default function DeliveryMethod() {
    return (
        <Card className={"rounded"}>
            <p className="text-lg font-bold">Chọn hình thức giao hàng</p>
            <div className="flex flex-col space-y-2 bg-[#F0F8FF] border rounded-lg p-4 mt-4 w-2/4">
                <Radio.Group className="flex flex-col space-y-2">
                    <Radio value="fast">
                        <div className="flex items-center">
                            <img
                                src="src/assets/now.svg"
                                alt="Tiki"
                                className="h-4 mr-2"
                            />
                            <div>
                                Giao siêu tốc 2h <span className="text-green-600 bg-white rounded">-25K</span>
                            </div>
                        </div>
                    </Radio>
                    <Radio value="save">
                        Giao tiết kiệm <span className="text-green-600 bg-white rounded">-16K</span>
                    </Radio>
                </Radio.Group>
            </div>

            <div className="mt-4 border p-4 rounded-xl border-[#DDDDE3]">
                {/*Hiển thị thông tin giao hàng đã chọn*/}
                <div className="flex items-center">
                    <img
                        src="src/assets/package.svg"
                        alt="Tiki"
                        className="h-4 mr-2"
                    />
                    <div className="text-green-600 bg-white">
                       Gói: Giao siêu tốc 2h, trước 13h hôm nay
                    </div>
                </div>

                <div className="flex mt-2 w-2/4 items-center">
                    <div className="flex items-center">
                        <img
                            src="src/assets/now.svg"
                            alt="Tiki"
                            className="h-4 mr-2"
                        />
                        <div>
                            Giao siêu tốc 2H
                        </div>
                    </div>
                    <div className={"flex-1"}></div>
                    <div className="flex items-center gap-2 justify-center">
                        <div className={"text-gray-500 line-through text-xs font-medium"}>
                            {formattedPrice(25000)} ₫
                        </div>
                        <div className="text-green-600 font-medium text-sm font-medium">
                            MIỄN PHÍ
                        </div>
                    </div>
                    <img
                        src="src/assets/info.svg"
                        alt="Tiki"
                        className="h-3 mx-1"
                    />
                </div>

                {/*Hiển thị thông tin sách mua*/}
                <BookPaymentCard/>
            </div>

            <hr className={"my-3"}/>

            <div className={"flex items-center"}>
                <img
                    src="src/assets/discount.svg"
                    alt="Tiki"
                    className="h-4 mr-2"
                />
                <div className="text-sm font-normal">
                    Thêm mã khuyến mãi của Shop
                </div>
                <RightOutlined className={"text-gray-400 ml-2"}/>
            </div>

        </Card>
    );
}
