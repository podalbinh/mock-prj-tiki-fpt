import { useCallback, useState } from "react";
import AdminTable from "@/components/common/Table";
import type { CustomTableColumn } from "@/components/common/Table";
import type { Order} from "@/constant/interfaces";
import { useLoaderData } from "react-router-dom";
import { Button } from "antd";
import { Input, Select } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import ModalDetailOrder from "../modals/ModalDetailOrder";



const OrderManagementTable = () => {
    const columns: CustomTableColumn<Order>[] = [
        { key: "shop", title: "Shop", dataIndex: "shop" },
        { key: "customer_name", title: "Customer", dataIndex: "customer_name" },
        { key: "total_price", title: "Total price", dataIndex: "total_price" },
        { key: "status", title: "Status", dataIndex: "status", align: "center" },
    ];

   const actionColumn: CustomTableColumn<Order> = {
        title: "Thao tác",
        key: "actions",
        align: "center",
        dataIndex:"status",
        render: (_: unknown, record: Order) => (
            <Button
            type="text"
            icon={<EyeOutlined />}
            onClick={() => handleDetail(record)}
            className="hover:bg-gray-100 transition-colors"
            />
        ),
    };

    const { Search } = Input;
    const { Option } = Select;
    const orders = useLoaderData() as Order[];
    const [openDetailModal, setOpenDetailModal] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [searchText, setSearchText] = useState("");
    const [statusFilter, setStatusFilter] = useState<string | null>(null);

    const handleDetail = useCallback((order: Order) => {
        setSelectedOrder(order); 
        setOpenDetailModal(true); 
    }, []);

    const filteredOrders = orders?.filter(order => {
        const matchName = order?.customer_name?.toLowerCase()
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
                onSearch={value => setSearchText(value)}
                onChange={e => setSearchText(e.target.value)}
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
          columns={[...columns,actionColumn]}
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
