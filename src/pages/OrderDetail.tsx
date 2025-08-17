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
    <div className="font-sans min-h-screen">
      <div className="max-w-6xl mx-auto p-4 ">
        {/* Header */}
        <div className="pb-4 mb-6">
          <div className="flex justify-between items-center">
            <h1 className="text-xl">
              <span className="text-gray-700 font-normal">
                Chi tiết đơn hàng #{order.id} -{" "}
              </span>
              {{
                confirmed: "Đã xác nhận",
                pending: "Đang giao hàng",
                completed: "Đã giao hàng",
                cancelled: "Đã hủy"
              }[order.status] || order.status}
          </h1>
            <div className="text-sm text-gray-800">
              Ngày đặt hàng: {order.createdAt ? formatDate(order.createdAt) : "Không xác định"}
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-3">
  {/* Địa chỉ */}
  <div className="flex flex-col h-full">
    <h2 className="text-sm font-semibold text-gray-600 uppercase mb-3">
      ĐỊA CHỈ NGƯỜI NHẬN
    </h2>
    <div className="space-y-2 flex-1 bg-white p-4 rounded-lg shadow-sm border">
      <div className="font-bold">{order.customerName.toUpperCase()}</div>
      <div className="text-sm text-gray-600">Địa chỉ: {order.address}</div>
      <div className="text-sm text-gray-600">Điện thoại: 0942438803</div>
    </div>
  </div>

  {/* Giao hàng */}
  <div className="flex flex-col h-full">
    <h2 className="text-sm font-semibold text-gray-600 uppercase mb-3">
      HÌNH THỨC GIAO HÀNG
    </h2>
    <div className="space-y-2 flex-1 bg-white p-4 rounded-lg shadow-sm border ">
      <div className="font-normal text-gray-600">
        <span className="font-medium text-red-600">NOW</span> Giao Siêu Tốc
      </div>
      <div className="text-sm text-gray-600">Giao thứ 4, trước 13h, 28/03</div>
      <div className="text-sm text-gray-600">
        Được giao bởi TINHOW Smart Logistics (giao từ Hà Nội)
      </div>
      <div className="text-sm text-gray-600">Miễn phí vận chuyển</div>
    </div>
  </div>

  {/* Thanh toán */}
  <div className="flex flex-col h-full">
    <h2 className="text-sm font-semibold text-gray-600 uppercase mb-3">
      HÌNH THỨC THANH TOÁN
    </h2>
    <div className="bg-white p-4 rounded-lg shadow-sm border text-sm text-gray-600 flex-1">
      Thanh toán tiền mặt khi nhận hàng
    </div>
  </div>
</div>


<div className="bg-white p-6 mt-6 pt-2">
        {/* Product Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="">
              <tr className="text-left text-gray-500 text-base border-b border-gray-100">
                <th className="py-3 px-4 font-normal ">Sản phẩm</th>
                <th className="py-3 px-4 text-center font-normal">Giá</th>
                <th className="py-3 px-4 text-center font-normal">Số lượng</th>
                <th className="py-3 px-4 text-center font-normal">Giảm giá</th>
                <th className="py-3 px-4 text-right font-normal">Tạm tính</th>
              </tr>
            </thead>
            <tbody>
              {order.products.map((product) => (
                <tr key={product.id} className="">
                  <td className="py-4 px-4">
                    <div className="flex items-start space-x-3">
                        <div className="w-16 h-16 flex-shrink-0">
                            <img
                                src={product.thumbnail}
                                alt={product.name}
                                className="w-full h-full object-cover rounded"
                            />
                        </div>
                      <div>
                        {/* Thông tin sản phẩm */}
                      <div className="flex flex-col space-y-2">
                        <div className="">{product.name}</div>
                        <div className="text-sm text-gray-800">
                          Cung cấp bởi <span className="text-blue-600">Tiki Trading</span>
                        </div>

                        {/* Badge đổi trả */}
                        <img src="/src/assets/return_badge.png" alt="RETURN_BADGE" className="size-fit" />

                        {/* SKU */}
                        <div className="text-sm text-gray-800">
                          Sku: 9831074249227
                        </div>

                        {/* Nút chat */}
                        <button className="mt-1 px-3 py-1 border border-blue-500 text-blue-600 text-sm rounded hover:bg-blue-50 w-fit">
                          Chat với nhà bán
                        </button>
                      </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 align-top text-center ">{formatCurrency(product.price)}</td>
                  <td className="py-4 px-4  align-top text-center ">{product.quantity}</td>
                  <td className="py-4 px-4 align-top text-center ">0 ₫</td>
                  <td className="py-4 px-4  align-top text-right ">
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
              <span className="text-gray-600">Tạm tính</span>
              <span>{formatCurrency(order.totalPrice)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Phí vận chuyển</span>
              <span>25,000 ₫</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Giảm giá vận chuyển</span>
              <span>-25,000 ₫</span>
            </div>
            <div className="pt-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tổng cộng</span>
                <span className="text-red-600 text-lg">{formatCurrency(order.totalPrice)}</span>
              </div>
            </div>
            <div className="flex justify-between">
              <div></div>
              {order.status === "confirmed" && (
                <button 
                    className="bg-yellow-300 hover:bg-yellow-400 text-gray-700 px-6 py-2 rounded mt-1"
                    onClick={handleCancelOrder}
                >
                    Hủy đơn hàng
                </button>
            )}
            </div>
          </div>
          
        </div>

        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex gap-4 items-center">
          <Link
            to="/profile/orders" // ← Đường dẫn trang danh sách đơn hàng của bạn
            className="text-blue-600 text-sm hover:underline"
            >
            {'<<'} Quay lại đơn hàng của tôi
            </Link>
          <div className="space-x-3">
            <button className="bg-yellow-300 hover:bg-yellow-400 text-gray-800 font-medium px-6 py-2 rounded font-medium">
              Theo dõi đơn hàng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
