import React from "react";
import { Modal, Table } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import type { Order } from "@/constant/interfaces";

interface OrderModalProps {
  title: string;
  order: Order | null;
  open: boolean;
  onCancel: () => void;
  cancelText?: string;
  loading?: boolean;
}

const ModalDetailOrder: React.FC<OrderModalProps> = ({
  title,
  order,
  open,
  onCancel,
  cancelText = "Đóng",
  loading = false,
}) => {
  const productColumns = [
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (price: number) => `${price.toLocaleString()} đ`,
    },
    {
      title: "Thành tiền",
      key: "total",
      render: (_: unknown, record: any) =>
        `${(record.price * record.quantity).toLocaleString()} đ`,
    },
  ];

  return (
    <Modal
      title={
        <div className="flex items-center gap-3 text-lg font-semibold text-gray-800">
          <ExclamationCircleOutlined className="text-orange-500 text-xl" />
          {title}
        </div>
      }
      open={open}
      onCancel={onCancel}
      cancelText={cancelText}
      confirmLoading={loading}
      centered
      width={700}
      className="confirm-modal"
      okButtonProps={{ className: "hidden" }}
      cancelButtonProps={{
        className:
          "border-gray-300 text-gray-700 hover:border-gray-400 hover:text-gray-800 font-medium px-6 py-2 h-10 rounded-md transition-colors duration-200",
      }}
    >
      {order && (
        <div className="py-4">
          <p><strong>Khách hàng:</strong> {order.customerName}</p>
          <p><strong>Trạng thái:</strong> {order.status}</p>
          <p><strong>Tổng tiền:</strong> {order.totalPrice.toLocaleString()} đ</p>

          <h4 className="mt-4 mb-2 font-bold">Danh sách sản phẩm:</h4>
          <Table
            columns={productColumns}
            dataSource={order.products}
            rowKey="id"
            pagination={false}
          />
        </div>
      )}
    </Modal>
  );
};

export default ModalDetailOrder;
