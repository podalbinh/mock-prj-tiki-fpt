import { useCallback, useState } from "react";
import AdminTable from "@/components/common/Table";
import type { CustomTableColumn } from "@/components/common/Table";
import type { Order } from "@/constant/interfaces";
import { useLoaderData, useRevalidator } from "react-router-dom";
import { Button, Input, Select, Tag } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import ModalDetailOrder from "../modals/ModalDetailOrder";
import { OrderStatus, OrderStatusLabel } from "@/constant/enums";

const OrderManagementTable = () => {
  const { Search } = Input;
  const { Option } = Select;

  const rawOrders = useLoaderData() as Order[];
  const revalidator = useRevalidator();

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
    { key: "customerName", title: "Customer", dataIndex: "customerName" },
    { key: "totalPrice", title: "Total price", dataIndex: "totalPrice" },
    {
      key: "status",
      title: "Status",
      dataIndex: "status",
      align: "center",
      render: (status: any) => {
        const color = getStatusColor(status);
        const label =
          OrderStatusLabel[status.toUpperCase() as keyof typeof OrderStatusLabel] ||
          status;
        return (
          <Tag color={color} style={{ textTransform: "capitalize" }}>
            {label}
          </Tag>
        );
      },
    },
  ];

  const actionColumn: CustomTableColumn<Order> = {
    title: "Actions",
    key: "actions",
    align: "center",
    dataIndex: "status",
    render: (_: unknown, record: Order) => (
      <Button
        type="text"
        icon={<EyeOutlined />}
        onClick={() => handleDetail(record)}
        className="hover:bg-gray-100 transition-colors"
      />
    ),
  };

  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  const handleDetail = useCallback((order: Order) => {
    setSelectedOrder(order);
    setOpenDetailModal(true);
  }, []);

  const filteredOrders = rawOrders?.filter((order: Order) => {
    const matchName = order.customerName
      ?.toLowerCase()
      .includes(searchText.toLowerCase());
    const matchStatus = statusFilter ? order.status === statusFilter : true;
    return matchName && matchStatus;
  });

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Quản lý đơn hàng
        </h3>

        {/* Bộ lọc */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
          {/* Search */}
          <Search
            placeholder="Tìm theo tên khách hàng"
            allowClear
            value={searchText}
            onSearch={(value) => setSearchText(value)}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full sm:w-64"
          />

          {/* Filter */}
          <Select
            placeholder="Lọc theo trạng thái"
            allowClear
            value={statusFilter || undefined}
            onChange={(value) => setStatusFilter(value || null)}
            className="w-full sm:w-48"
          >
            {Object.entries(OrderStatus).map(([key, value]) => (
              <Option key={value} value={value}>
                {OrderStatusLabel[key as keyof typeof OrderStatusLabel]}
              </Option>
            ))}
          </Select>

          <Button
            onClick={() => {
              setSearchText("");
              setStatusFilter(null);
            }}
            className="w-full sm:w-auto"
          >
            Bỏ lọc
          </Button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <AdminTable<Order>
            data={filteredOrders}
            columns={[...columns, actionColumn]}
            showActions={false}
          />
        </div>
      </div>

      <ModalDetailOrder
        title="Chi tiết đơn hàng"
        onCancel={() => setOpenDetailModal(false)}
        open={openDetailModal}
        order={selectedOrder}
        onUpdate={() => revalidator.revalidate()}
      />
    </>
  );
};

export default OrderManagementTable;
