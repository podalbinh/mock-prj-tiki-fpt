import { useCallback, useRef, useState } from "react";
import AdminTable from "@/components/common/Table";
import type { CustomTableColumn } from "@/components/common/Table";
import type { User } from "@/constant/interfaces";
import { useLoaderData } from "react-router-dom";
import ModalFormCreateUser from "../modals/ModalFormCreateUser";
import { Button, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useUser } from "@/hooks/useUser";
import ModalConfirm from "../modals/ModalConfirm";

const columns: CustomTableColumn<User>[] = [
  { key: "fullName", title: "Full Name", dataIndex: "fullName" },
  { key: "email", title: "Email", dataIndex: "email" },
  { key: "dateOfBirth", title: "Date of Birth", dataIndex: "dateOfBirth" },
  { key: "role", title: "Vai trò", dataIndex: "role", align: "center" },
];

const UserManagementTable = () => {
  const users = useLoaderData() as User[];
  const [openModal, setOpenModal] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const { createUser, deleteUser } = useUser();

  const userToDeleteRef = useRef<User | null>(null);

  //TODO: Implement edit and delete functionality
  const handleEdit = useCallback(async (user: User) => {
    //const { id, ...userData } = user;
    //await updateUser(id, userData);
    console.log("Chỉnh sửa:", user);
  }, []);

  const handleDelete = useCallback((user: User) => {
    userToDeleteRef.current = user;
    setOpenModalDelete(true);
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    const user = userToDeleteRef.current;
    if (!user) return;

    try {
      await deleteUser(user.id);
      message.success("Xóa người dùng thành công!");
      // bạn nên trigger revalidate ở đây (VD: bằng useFetcher.load hoặc navigate để reload)
    } catch (error) {
      console.error("Xóa người dùng thất bại:", error);
      message.error("Xóa người dùng thất bại!");
    } finally {
      userToDeleteRef.current = null;
      setOpenModalDelete(false);
    }
  }, [deleteUser]);

  const handleSubmitForm = useCallback(
    async (values: User) => {
      try {
        await createUser(values);
        message.success("Tạo người dùng thành công!");
      } catch (error) {
        console.error("Error creating user:", error);
        message.error("Tạo người dùng thất bại!");
      } finally {
        setOpenModal(false);
      }
    },
    [createUser]
  );

  return (
    <>
      <div className={`bg-white rounded-lg shadow-sm`}>
        <div className="flex px-6 py-4 justify-between">
          <h3 className="text-lg font-semibold text-gray-900">
            Quản lý người dùng
          </h3>

          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setOpenModal(true)}
            size="large"
            className="bg-blue-600 hover:bg-blue-700"
          >
            Tạo người dùng mới
          </Button>
        </div>
        <AdminTable<User>
          data={users}
          columns={columns}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      <ModalFormCreateUser
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        handleSubmit={handleSubmitForm}
      />

      <ModalConfirm
        title="Xác nhận xóa người dùng"
        description="Bạn có chắc chắn muốn xóa người dùng này? Hành động này không thể hoàn tác."
        onOk={handleConfirmDelete}
        onCancel={() => setOpenModalDelete(false)}
        open={openModalDelete}
      />
    </>
  );
};

export default UserManagementTable;
