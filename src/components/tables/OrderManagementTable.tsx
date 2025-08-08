import { useCallback, useRef, useState } from "react";
import AdminTable from "@/components/common/Table";
import type { CustomTableColumn } from "@/components/common/Table";
import type { Order} from "@/constant/interfaces";
import { useLoaderData } from "react-router-dom";
import { Button, Dropdown, message, Space } from "antd";
import { useUser } from "@/hooks/useUser";
import ModalConfirm from "../modals/ModalConfirm";
import type { ColumnType } from "antd/es/table";
import { DeleteOutlined, EditOutlined, EyeOutlined, MoreOutlined,  } from "@ant-design/icons";
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
        dataIndex: "status",
        render: (_: unknown, record: any) => {
        const menuItems = [
            {
            key: "edit",
            label: (
                <Space>
                <EditOutlined />
                Chỉnh sửa
                </Space>
            ),
            //   onClick: () => onEdit?.(record),
            },
            {
            key: "delete",
            label: (
                <Space>
                <EyeOutlined />
                Xem
                </Space>
            ),
            onClick: () => handleDetail(record),
            danger: true,
            },
        ];

        return (
            <Dropdown
            menu={{ items: menuItems }}
            trigger={["click"]}
            placement="bottomRight"
            >
            <Button
                type="text"
                icon={<MoreOutlined />}
                className="hover:bg-gray-100 transition-colors"
            />
            </Dropdown>
        );
        },
    };

  const orders = useLoaderData() as Order[];
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const { createUser, deleteUser } = useUser();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const orderRef = useRef<Order | null>(null);

  //TODO: Implement edit and delete functionality
  const handleEdit = useCallback(async (user: Order) => {
    //const { id, ...userData } = user;
    //await updateUser(id, userData);
    console.log("Chỉnh sửa:", user);
  }, []);

  const handleDetail = useCallback((order: Order) => {
    setSelectedOrder(order); 
    setOpenDetailModal(true); 
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    const user = orderRef.current;
    if (!user) return;

    try {
      await deleteUser(user.id);
      message.success("Xóa người dùng thành công!");
      // bạn nên trigger revalidate ở đây (VD: bằng useFetcher.load hoặc navigate để reload)
    } catch (error) {
      console.error("Xóa người dùng thất bại:", error);
      message.error("Xóa người dùng thất bại!");
    } finally {
      orderRef.current = null;
      setOpenModalDelete(false);
    }
  }, [deleteUser]);

//   const handleSubmitForm = useCallback(
//     async (values: Order) => {
//       try {
//         await createUser(values);
//         message.success("Tạo người dùng thành công!");
//       } catch (error) {
//         console.error("Error creating user:", error);
//         message.error("Tạo người dùng thất bại!");
//       } finally {
//         setOpenModal(false);
//       }
//     },
//     [createUser]
//   );

  return (
    <>
      <div className={`bg-white rounded-lg shadow-sm`}>
        <div className="flex px-6 py-4 justify-between">
          <h3 className="text-lg font-semibold text-gray-900">
            Quản lý đơn hàng
          </h3>
        </div>
        <AdminTable<Order>
          data={orders}
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
