import React, { useEffect, useState } from "react";
import { Button, message, Modal, Select, Table } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import type { Order } from "@/constant/interfaces";
import { useOrder } from "@/hooks/useOrder";

interface OrderModalProps {
  title: string;
  order: Order | null;
  open: boolean;
  onCancel: () => void;
  onUpdate?: () => void;
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
  onUpdate
}) => {

  const [status, setStatus] = useState<string>();
  const { updateOrder } = useOrder();
  
  useEffect(() => {
    if (open) {
      setStatus(order?.status);
    }
  }, [order, open]);

   const handleUpdate = async () => {
    if (!order || !status) return;

    try {
       await updateOrder(order.id, {
           status
        });
      message.success("Cập nhật trạng thái thành công");
      onCancel();
      onUpdate?.();
    } catch (error) {
      console.error(error);
      message.error("Có lỗi xảy ra khi cập nhật đơn hàng");
    }
  };
  
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
      footer={null}
    >
      {order && (
        <div className="py-4">
          <p><strong>Khách hàng:</strong> {order.customerName}</p>
          
          <div className="mb-3">
            <strong>Trạng thái:</strong>{" "}
            <Select
              value={status}
              onChange={(value) => setStatus(value)}
              style={{ width: 200 }}
            >
              <Select.Option value="pending">Pending</Select.Option>
              <Select.Option value="confirmed">Confirmed</Select.Option>
              <Select.Option value="completed">Completed</Select.Option>
              <Select.Option value="cancelled">Cancelled</Select.Option>
            </Select>
          </div>

          <p><strong>Tổng tiền:</strong> {order.totalPrice.toLocaleString()} đ</p>

          <h4 className="mt-4 mb-2 font-bold">Danh sách sản phẩm:</h4>
          <Table
            columns={productColumns}
            dataSource={order.products}
            rowKey="id"
            pagination={false}
          />

          <div className="flex justify-end gap-3 mt-6">
            <Button onClick={onCancel}>Hủy</Button>
            <Button type="primary" onClick={handleUpdate}>
              Lưu thay đổi
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default ModalDetailOrder;
