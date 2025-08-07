import { useCallback, useRef, useState } from "react";
import AdminTable from "@/components/common/Table";
import type { CustomTableColumn } from "@/components/common/Table";
import type { User } from "@/constant/interfaces";
import { useLoaderData, useRevalidator } from "react-router-dom";
import ModalFormCreateUser from "../modals/ModalFormCreateUser";
import { App, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useUser } from "@/hooks/useUser";
import ModalConfirm from "../modals/ModalConfirm";

const columns: CustomTableColumn<User>[] = [
  { key: "fullName", title: "Full Name", dataIndex: "fullName" },
  { key: "email", title: "Email", dataIndex: "email" },
  { key: "dateOfBirth", title: "Date of Birth", dataIndex: "dateOfBirth" },
  { key: "role", title: "Role", dataIndex: "role", align: "center" },
];

const UserManagementTable = () => {
  const users = useLoaderData() as User[];
  const [openModal, setOpenModal] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [editingUser, setEditingUser] = useState<User | undefined>(undefined);
  const [isEditing, setIsEditing] = useState(false);
  const { createUser, deleteUser, updateUser } = useUser();
  const revalidator = useRevalidator();
  const { message } = App.useApp();

  const userToDeleteRef = useRef<User | null>(null);

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setIsEditing(true);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    if (isEditing) {
      setEditingUser(undefined);
      setIsEditing(false);
    }
    setOpenModal(false);
  };

  const handleDelete = useCallback((user: User) => {
    userToDeleteRef.current = user;
    setOpenModalDelete(true);
  }, []);

  const handleCancelDelete = useCallback(() => {
    userToDeleteRef.current = null;
    setOpenModalDelete(false);
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    const user = userToDeleteRef.current;
    if (!user) return;

    try {
      await deleteUser(user.id);
      message.success("Xóa người dùng thành công!");
      revalidator.revalidate(); // Triggers data reload via React Router's data APIs
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
        if (isEditing && editingUser) {
          await updateUser(editingUser.id, {
            ...values,
            password: editingUser.password,
          });
          message.success("Cập nhật người dùng thành công!");
        } else {
          await createUser(values);
          message.success("Tạo người dùng thành công!");
        }
        revalidator.revalidate();
      } catch (error) {
        console.error("Error:", error);
        message.error("Hành động thất bại!");
      } finally {
        setOpenModal(false);
      }
    },
    [createUser, isEditing, updateUser, message, revalidator]
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
        onClose={handleCloseModal}
        handleSubmit={handleSubmitForm}
        defaultValues={editingUser}
      />

      <ModalConfirm
        title="Xác nhận xóa người dùng"
        description="Bạn có chắc chắn muốn xóa người dùng này? Hành động này không thể hoàn tác."
        onOk={handleConfirmDelete}
        onCancel={handleCancelDelete}
        open={openModalDelete}
      />
    </>
  );
};

export default UserManagementTable;
