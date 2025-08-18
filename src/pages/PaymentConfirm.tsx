import { Button, Card, Divider, Empty, Image } from "antd";
import PaymentHeader from "@/layouts/user/payment/PaymentHeader";
import FreeshipBanner from "@/components/common/FreeshipBanner";
import PaymentFooter from "@/layouts/user/payment/PaymentFooter";
import confirmPaymentBg from "@/assets/confirm-payment-bg.png";
import confirmIcon from "@/assets/icon-confirm-payment.png";
import { useAppSelector } from "@/store";
import { useNavigate } from "react-router-dom";

export default function PaymentConfirmation() {
  const recentOrder = useAppSelector((state) => state.cart.recentOrder);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50">
      <FreeshipBanner />
      <PaymentHeader isConfirm />

      {recentOrder ? (
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main confirmation card */}
            <div className="lg:col-span-2">
              <div className="relative overflow-hidden border-0 shadow-lg bg-white rounded-md min-h-[500px] flex flex-col">
                <div className="absolute z-30 top-16 left-10 hidden sm:block">
                  <Image src={confirmIcon} preview={false} />
                </div>
                <div className="relative">
                  {/* Gradient background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-blue-600">
                    <Image src={confirmPaymentBg} preview={false} />
                  </div>

                  <div className="relative z-10 p-8 text-white flex justify-end">
                    <div className="w-full sm:w-3/4 pl-4">
                      <h2 className="text-2xl font-bold mb-1">
                        Yay, đặt hàng thành công!
                      </h2>
                      <p className="text-blue-100">
                        Chuẩn bị tiền mặt {recentOrder.totalAmount} đ
                      </p>
                    </div>
                  </div>
                </div>

                {/* Payment details */}
                <div className="w-full sm:w-3/4 self-end p-8">
                  <div className="grid grid-cols-2 border-b border-gray-200 text-gray-600 mb-4">
                    <h3 className="">Phương thức thanh toán</h3>
                    <h3 className="text-right">Thanh toán tiền mặt</h3>
                  </div>
                  <div className="grid grid-cols-2">
                    <p className="text-gray-800">Tổng cộng</p>
                    <div className="text-right">
                      <p className="text-xl font-semibold text-gray-800">
                        {recentOrder.totalAmount} đ
                      </p>
                      <p className="text-xs text-gray-500">
                        (Đã bao gồm VAT nếu có)
                      </p>
                    </div>
                  </div>

                  {/* Return button */}
                  <div className="mt-6 col-span-2">
                    <Button
                      color="primary"
                      variant="outlined"
                      className="w-full h-10 rounded-sm"
                      onClick={() => navigate("/")}
                    >
                      Quay về trang chủ
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Order details sidebar */}
            <div className="lg:col-span-1">
              <Card className="shadow-sm">
                <div className="mb-4 flex justify-between items-center">
                  <div>
                    <span className="text-gray-600">Mã đơn hàng:</span>
                    <span className="font-semibold ml-2">
                      {recentOrder.orderId}
                    </span>
                  </div>
                  <Button type="link" className="p-0 h-auto text-blue-500">
                    Xem đơn hàng
                  </Button>
                </div>

                <Divider />

                <div className="mb-4">
                  <p className="text-gray-600 mb-2">
                    {recentOrder.deliveryDate}
                  </p>
                </div>

                <div className="flex items-center">
                  <div className="aspect-[2/3] shrink-0 w-16 bg-gray-100 rounded mr-3 flex items-center justify-center">
                    <Image
                      alt="Chat GPT Thực Chiến"
                      src={recentOrder.thumbnailUrl}
                      className="rounded shadow-md"
                      preview={false}
                    />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">
                      {recentOrder.productName}
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-[400px] flex-col gap-5">
          <Empty description="Không có đơn hàng nào" />
          <div>
            <Button
              color="primary"
              variant="outlined"
              className="min-w-32 h-10 rounded-md"
              onClick={() => navigate("/")}
            >
              Quay về trang chủ
            </Button>
          </div>
        </div>
      )}

      <PaymentFooter />
    </div>
  );
}
