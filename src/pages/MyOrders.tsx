import { useCallback, useState } from "react";
import AdminTable from "@/components/common/Table";
import type { CustomTableColumn } from "@/components/common/Table";
import type { Order } from "@/constant/interfaces";
import { useLoaderData, useNavigate } from "react-router-dom";
import { Button, Select, Tag } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { OrderStatus, OrderStatusLabel } from "@/constant/enums"; // import enum bạn tạo

const OrderListTable = () => {
  const { Option } = Select;
  const navigate = useNavigate();
  const rawOrders = useLoaderData() as Order[];
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  const handleDetail = useCallback(
    (order: Order) => {
      navigate(`/profile/orders/${order.id}`);
    },
    [navigate]
  );

  const filteredOrders = rawOrders?.filter((order: Order) => {
    return statusFilter ? order.status === statusFilter : true;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case OrderStatus.CONFIRMED:
        return "blue";
      case OrderStatus.DELIVERED:
        return "orange";
      case OrderStatus.COMPLETED:
        return "green";
      case OrderStatus.CANCELLED:
        return "red";
      default:
        return "default";
    }
  };

  const columns: CustomTableColumn<Order>[] = [
    {
      key: "id",
      dataIndex: "id",
      title: "STT",
      render: (_: any, __: Order, index: number) => index + 1,
      align: "center",
    },
    {
      key: "createdAt",
      title: "Ngày đặt hàng",
      dataIndex: "createdAt",
      render: (value: any) => dayjs(value).format("HH:mm DD/MM/YYYY"),
      align: "center",
    },
    {
      key: "totalPrice",
      title: "Tổng tiền",
      dataIndex: "totalPrice",
      align: "center",
    },
    {
      key: "status",
      title: "Trạng thái",
      dataIndex: "status",
      align: "center",
      render: (status: any) => (
        <Tag color={getStatusColor(status)} style={{ textTransform: "capitalize" }}>
          {OrderStatusLabel[status.toUpperCase() as keyof typeof OrderStatusLabel] ||
            status}
        </Tag>
      ),
    },
    {
      title: "Thao tác",
      key: "actions",
      dataIndex: "status",
      align: "center",
      render: (_: unknown, record: Order) => (
        <Button
          type="text"
          icon={<EyeOutlined />}
          onClick={() => handleDetail(record)}
          className="hover:bg-gray-100 transition-colors"
        />
      ),
    },
  ];

  return (
    <div className=" bg-white rounded-lg shadow-sm py-5 px-7">
      <h3 className="text-lg font-semibold text-gray-900 !mb-10">
        Danh sách đơn hàng
      </h3>

      <div className="flex gap-3 mb-4">
        <Select
          placeholder="Lọc theo trạng thái"
          allowClear
          value={statusFilter || undefined}
          onChange={(value) => setStatusFilter(value || null)}
          style={{ width: 200 }}
        >
          <Option value={OrderStatus.CONFIRMED}>
            {OrderStatusLabel.CONFIRMED}
          </Option>
          <Option value={OrderStatus.DELIVERED}>
            {OrderStatusLabel.DELIVERED}
          </Option>
          <Option value={OrderStatus.COMPLETED}>
            {OrderStatusLabel.COMPLETED}
          </Option>
          <Option value={OrderStatus.CANCELLED}>
            {OrderStatusLabel.CANCELLED}
          </Option>
        </Select>

        <Button onClick={() => setStatusFilter(null)}>Bỏ lọc</Button>
      </div>

      <AdminTable<Order>
        data={filteredOrders}
        columns={columns}
        showActions={false}
      />
    </div>
  );
};

export default OrderListTable;
