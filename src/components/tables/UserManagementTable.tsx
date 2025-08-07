import { useCallback } from "react";
import AdminTable from "@/components/common/Table";
import type { CustomTableColumn } from "@/components/common/Table";
import type { User } from "@/constant/interfaces";
import { useLoaderData } from "react-router-dom";
// import { useUser } from "@/hooks/useUser";

const columns: CustomTableColumn<User>[] = [
  { key: "email", title: "Email", dataIndex: "email" },
  { key: "role", title: "Vai trò", dataIndex: "role", align: "center" },
];

const UserManagementTable = () => {
  const users = useLoaderData() as User[];
  //   const { deleteUser, updateUser } = useUser();

  const handleEdit = useCallback(async (user: User) => {
    //const { id, ...userData } = user;
    //await updateUser(id, userData);
    console.log("Chỉnh sửa:", user);
  }, []);

  const handleDelete = useCallback((user: User) => {
    console.log("Xóa:", user);
  }, []);

  return (
    <AdminTable<User>
      title="Quản lý người dùng"
      data={users}
      columns={columns}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  );
};

export default UserManagementTable;
