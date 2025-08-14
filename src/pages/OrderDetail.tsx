import { Link, useLoaderData, useRevalidator } from "react-router-dom";
import type { Order } from "@/constant/interfaces";
import { useOrder } from "@/hooks/useOrder";
import { App } from "antd";

const OrderDetail = () => {
    const { updateOrder } = useOrder();
    const { message } = App.useApp();
    const revalidator = useRevalidator();

  const order = useLoaderData() as Order;

  const formatCurrency = (value: number) =>
    value.toLocaleString("vi-VN", { style: "currency", currency: "VND" });

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };
  
    const handleCancelOrder = async () => {
        try {
            await updateOrder(order.id, { status: "cancelled" }); // status backend chấp nhận là "cancelled"
            message.success("Đã hủy đơn hàng thành công!");
            revalidator.revalidate();
        } catch (error) {
            message.error("Lỗi khi hủy đơn hàng");
        }
    };


  return (
    <div className="bg-gray-50 font-sans min-h-screen py-10">
      <div className="max-w-4xl mx-auto p-4 bg-white shadow-lg">
        {/* Header */}
        <div className="border-b pb-4 mb-6">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold text-gray-800">
              Chi tiết đơn hàng #{order.id} -{" "}
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </h1>
            <div className="text-sm text-gray-500">
              Ngày đặt hàng: {order.createdAt ? formatDate(order.createdAt) : "Không xác định"}
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Customer Information */}
          <div>
            <h2 className="text-sm font-semibold text-gray-600 uppercase mb-3">
              GIA CHỦ NGƯỜI NHẬN
            </h2>
            <div className="space-y-2">
              <div className="font-medium">{order.customerName}</div>
              <div className="text-sm text-gray-600">Địa chỉ: {order.address}</div>
              {/* Nếu có điện thoại trong data, thay số điện thoại cứng */}
              <div className="text-sm text-gray-600">Điện thoại: 0942438803</div>
            </div>
          </div>

          {/* Delivery + Payment */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-sm font-semibold text-gray-600 uppercase mb-3">
                HÌNH THỨC GIAO HÀNG
              </h2>
              <div className="space-y-2">
                <div className="text-red-500 font-medium">NOW Giao Siêu Tốc</div>
                <div className="text-sm text-gray-600">Giao thứ 4, trước 13h, 28/03</div>
                <div className="text-sm text-gray-600">
                  Được giao bởi TINHOW Smart Logistics (giao từ Hà Nội)
                </div>
                <div className="text-sm text-gray-600">Miễn phí vận chuyển</div>
              </div>
            </div>

            <div>
              <h2 className="text-sm font-semibold text-gray-600 uppercase mb-3">
                HÌNH THỨC THANH TOÁN
              </h2>
              <div className="text-sm text-gray-600">
                Thanh toán tiền mặt khi nhận hàng
              </div>
            </div>
          </div>
        </div>

        {/* Product Table */}
        <div className="mt-8 overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr className="text-left text-sm text-gray-600">
                <th className="py-3 px-4">Sản phẩm</th>
                <th className="py-3 px-4 text-center">Giá</th>
                <th className="py-3 px-4 text-center">Số lượng</th>
                <th className="py-3 px-4 text-center">Giảm giá</th>
                <th className="py-3 px-4 text-right">Tạm tính</th>
              </tr>
            </thead>
            <tbody>
              {order.products.map((product) => (
                <tr key={product.id} className="border-b">
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                        <div className="w-12 h-16 flex-shrink-0">
                            <img
                                src={product.thumbnail}
                                alt={product.name}
                                className="w-full h-full object-cover rounded"
                            />
                        </div>
                      <div>
                        <div className="font-medium">{product.name}</div>
                        {/* Nếu bạn có trường mô tả hoặc sku thì thêm vào đây */}
                        {/* <div className="text-sm text-gray-500">Mô tả sản phẩm</div> */}
                        {/* <div className="text-xs text-gray-500 mt-1">Sku: ...</div> */}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-center">{formatCurrency(product.price)}</td>
                  <td className="py-4 px-4 text-center">{product.quantity}</td>
                  <td className="py-4 px-4 text-center">0 ₫</td>
                  <td className="py-4 px-4 text-right font-medium">
                    {formatCurrency(product.price * product.quantity)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Order Summary */}
        <div className="mt-6 flex justify-end">
          <div className="w-full max-w-sm space-y-2">
            <div className="flex justify-between text-sm">
              <span>Tạm tính</span>
              <span>{formatCurrency(order.totalPrice)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Phí vận chuyển</span>
              <span>25,000 ₫</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Giảm giá vận chuyển</span>
              <span>-25,000 ₫</span>
            </div>
            <div className="border-t pt-2">
              <div className="flex justify-between font-semibold text-lg">
                <span>Tổng cộng</span>
                <span className="text-red-500">{formatCurrency(order.totalPrice)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex justify-between items-center">
          <Link
            to="/profile/orders" // ← Đường dẫn trang danh sách đơn hàng của bạn
            className="text-blue-500 text-sm hover:underline"
            >
            ← Quay lại đơn hàng của tôi
            </Link>
          <div className="space-x-3">
            {order.status === "confirmed" && (
                <button 
                    className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-2 rounded font-medium"
                    onClick={handleCancelOrder}
                >
                    Hủy đơn hàng
                </button>
            )}
            <button className="bg-orange-custom hover:bg-orange-600 text-white px-6 py-2 rounded font-medium">
              Theo dõi đơn hàng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
