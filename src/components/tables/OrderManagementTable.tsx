import { useCallback, useState } from "react";
import AdminTable from "@/components/common/Table";
import type { CustomTableColumn } from "@/components/common/Table";
import type { Order } from "@/constant/interfaces";
import { useLoaderData } from "react-router-dom";
import {  Button, Input, Select, Tag } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import ModalDetailOrder from "../modals/ModalDetailOrder";

const OrderManagementTable = () => {
  const { Search } = Input;
  const { Option } = Select;

  const rawOrders = useLoaderData() as Order[];
  
  const columns: CustomTableColumn<Order>[] = [
    { key: "customerName", title: "Customer", dataIndex: "customerName" },
    { key: "totalPrice", title: "Total price", dataIndex: "totalPrice" },
   {
  key: "status",
  title: "Status",
  dataIndex: "status",
  align: "center",
  render: (status: any) => {
    let color = "";

    switch (status) {
      case "pending":
        color = "orange";
        break;
      case "confirmed":
        color = "blue";
        break;
      case "completed":
        color = "green";
        break;
      case "cancelled":
        color = "red";
        break;
      default:
        color = "default";
    }

    return <Tag color={color} style={{ textTransform: "capitalize" }}>{status}</Tag>;
  },
}
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
      <div className={`bg-white rounded-lg shadow-sm`}>
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-10">
            Quản lý đơn hàng
          </h3>
          <div className="flex gap-3">
            {/* Tìm kiếm theo tên khách hàng */}
            <Search
              placeholder="Tìm theo tên khách hàng"
              allowClear
              value={searchText}
              onSearch={(value) => setSearchText(value)}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ width: 250 }}
            />

            {/* Filter theo status */}
            <Select
              placeholder="Lọc theo trạng thái"
              allowClear
              value={statusFilter || undefined}
              onChange={(value) => setStatusFilter(value || null)}
              style={{ width: 180 }}
            >
              <Option value="confirmed">Confirmed</Option>
              <Option value="pending">Pending</Option>
              <Option value="cancelled">Cancelled</Option>
              <Option value="completed">Completed</Option>
            </Select>

            <Button
              onClick={() => {
                setSearchText("");
                setStatusFilter(null);
              }}
            >
              Bỏ lọc
            </Button>
          </div>
        </div>

        <AdminTable<Order>
          data={filteredOrders}
          columns={[...columns, actionColumn]}
          showActions={false}
        />
      </div>

      <ModalDetailOrder
        title="Chi tiết đơn hàng"
        onCancel={() => setOpenDetailModal(false)}
        open={openDetailModal}
        order={selectedOrder}
      />
    </>
  );
};

export default OrderManagementTable;
