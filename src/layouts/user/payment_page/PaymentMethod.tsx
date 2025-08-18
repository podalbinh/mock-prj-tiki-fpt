import { Radio, Card } from "antd";
import OfferCard from "@/layouts/user/payment_page/OfferCard.tsx";

const offers = [
    {
        title: "Freeship",
        subtitle: "Thẻ Shinhan Platinum",
        condition: "",
        brandLogo: "src/assets/shinhan-bank.svg",
    },
    {
        title: "Freeship",
        subtitle: "Thẻ Shinhan Classic",
        condition: "",
        brandLogo: "src/assets/shinhan-bank.svg",
    },
    {
        title: "Giảm 30k",
        subtitle: "Đơn từ 200k",
        condition: "",
        brandLogo: "src/assets/shinhan-bank.svg",
    },
    {
        title: "Giảm 50k",
        subtitle: "Đơn từ 300k",
        condition: "",
        brandLogo: "src/assets/shinhan-bank.svg",
    },
    {
        title: "Giảm 50k",
        subtitle: "Đơn từ 300k",
        condition: "",
        brandLogo: "src/assets/shinhan-bank.svg",
    },
    {
        title: "Giảm 70k",
        subtitle: "Đơn từ 500k",
        condition: "",
        brandLogo: "src/assets/shinhan-bank.svg",
    },
    {
        title: "Giảm 100k",
        subtitle: "Đơn từ 700k",
        condition: "",
        brandLogo: "src/assets/shinhan-bank.svg",
    },
    {
        title: "Giảm 150k",
        subtitle: "Đơn từ 1 triệu",
        condition: "",
        brandLogo: "src/assets/shinhan-bank.svg",
    },
    {
        title: "Giảm 30k",
        subtitle: "Đơn từ 200k",
        condition: "",
        brandLogo: "src/assets/shinhan-bank.svg",
    },
    {
        title: "Giảm 50k",
        subtitle: "Đơn từ 300k",
        condition: "",
        brandLogo: "src/assets/shinhan-bank.svg",
    },
    {
        title: "Giảm 70k",
        subtitle: "Đơn từ 500k",
        condition: "",
        brandLogo: "src/assets/shinhan-bank.svg",
    },
    {
        title: "Freeship",
        subtitle: "TikiCARD",
        condition: "",
        brandLogo: "src/assets/tiki-card.svg",
    },
];

export default function PaymentMethod() {
    return (
        <Card className={"rounded"}>
            <p className="text-lg font-bold">Chọn hình thức thanh toán</p>

            <div className="flex flex-col space-y-2 p-4 mt-4 w-2/4">
                <Radio.Group className="flex flex-col space-y-2" defaultValue="cash" >
                    <Radio value="cash">
                        <div className="flex items-center py-4">
                            <img
                                src="src/assets/payment.svg"
                                alt="Tiki"
                                className="h-8 mr-2"
                            />
                            <div className={"text-sm font-normal"}>
                                Thanh toán tiền mặt
                            </div>
                        </div>
                    </Radio>
                    <Radio value="viettel">
                        <div className="flex items-center py-4">
                            <img
                                src="src/assets/viettel.svg"
                                alt="Tiki"
                                className="h-8 mr-2"
                            />
                            <div className={"text-sm font-normal"}>
                                Viettel Money
                            </div>
                        </div>
                    </Radio>
                </Radio.Group>
            </div>

            <div className="bg-[#F5F5FA] p-4 rounded-lg">
                <div className="flex items-center">
                    <img
                        src="src/assets/discount-card.svg"
                        alt="Tiki"
                        className="h-4 mr-2"
                    />
                    <div className={"text-sm font-medium text-[#0D5CB6]"}>
                        Ưu đãi thanh toán thẻ
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-2 m-1 lg:grid-cols-3 lg:gap-1">
                    {offers.map((offer, index) => (
                        <OfferCard key={index} {...offer} />
                    ))}
                </div>
            </div>
        </Card>
    );
}
