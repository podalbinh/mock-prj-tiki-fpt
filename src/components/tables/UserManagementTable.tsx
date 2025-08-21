import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import AdminTable from "@/components/common/Table";
import type { CustomTableColumn } from "@/components/common/Table";
import type {
  PageableParams,
  PagedResponse,
  User,
} from "@/constant/interfaces";
import { useLoaderData, useRevalidator } from "react-router-dom";
import ModalFormCreateUser from "../modals/ModalFormCreateUser";
import { App, Avatar, Button, Input, Select, Tag } from "antd";
import { PlusOutlined, SearchOutlined, UserOutlined } from "@ant-design/icons";
import { useUser } from "@/hooks/useUser";
import ModalConfirm from "../modals/ModalConfirm";
import { isNilOrEmpty } from "@/utils/dataHelper";
import TableColumnNoData from "../common/TableColumnNoData";
import { formatDateTime } from "@/utils/dateHelper";
import { debounce } from "lodash";

const userColumns: CustomTableColumn<User>[] = [
  {
    key: "id",
    title: "ID",
    dataIndex: "id",
    align: "center",
    render: (value) =>
      isNilOrEmpty(value) ? (
        <TableColumnNoData />
      ) : (
        <span className="font-medium">{value}</span>
      ),
  },
  {
    key: "fullName",
    title: "Full Name",
    dataIndex: "fullName",
    render: (value, record) =>
      isNilOrEmpty(value) ? (
        <TableColumnNoData />
      ) : (
        <>
          <Avatar src={record.avatarUrl || null} icon={<UserOutlined />} />
          <span className="ml-2">{value}</span>
        </>
      ),
  },
  {
    key: "email",
    title: "Email",
    dataIndex: "email",
    render: (value) =>
      isNilOrEmpty(value) ? (
        <TableColumnNoData />
      ) : (
        <span className="break-all">{value}</span>
      ),
  },
  {
    key: "phone",
    title: "Phone",
    dataIndex: "phone",
    render: (value) => (isNilOrEmpty(value) ? <TableColumnNoData /> : value),
  },
  {
    key: "isActive",
    title: "Active",
    dataIndex: "isActive",
    align: "center",
    render: (value) =>
      value ? (
        <Tag color="green">Active</Tag>
      ) : (
        <Tag color="default">Inactive</Tag>
      ),
  },
  {
    key: "role",
    title: "Role",
    dataIndex: "role",
    align: "center",
    render: (value) =>
      isNilOrEmpty(value) ? (
        <TableColumnNoData />
      ) : value === "ADMIN" ? (
        <Tag color="red">ADMIN</Tag>
      ) : (
        <Tag color="blue">USER</Tag>
      ),
  },
  {
    key: "createdAt",
    title: "Created At",
    dataIndex: "createdAt",
    render: (value) =>
      isNilOrEmpty(value) ? (
        <TableColumnNoData />
      ) : (
        formatDateTime(value as string)
      ),
  },
  {
    key: "updatedAt",
    title: "Updated At",
    dataIndex: "updatedAt",
    render: (value) =>
      isNilOrEmpty(value) ? (
        <TableColumnNoData />
      ) : (
        formatDateTime(value as string)
      ),
  },
];

const UserManagementTable = () => {
  const defaultUsers = useLoaderData() as PagedResponse<User>;
  const [openModal, setOpenModal] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [editingUser, setEditingUser] = useState<User | undefined>(undefined);
  const [isEditing, setIsEditing] = useState(false);
  const { getAllUsers, createUser, deleteUser, updateUser } = useUser();
  const revalidator = useRevalidator();
  const { message } = App.useApp();
  const [pagination, setPagination] = useState({
    page: 1,
    size: 20,
    total: 0,
  });
  const [sorter, setSorter] = useState<{ field?: string; order?: string }>({});
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<User[]>(defaultUsers.data || []);

  const userToDeleteRef = useRef<User | null>(null);

  const fetchUsers = useCallback(
    async (params: PageableParams) => {
      setLoading(true);
      try {
        const response = await getAllUsers({
          ...params,
          page: (params.page || 0) - 1,
        });
        setUsers(response.data);
        setPagination((prev) => ({
          ...prev,
          total: response.totalElements,
        }));
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setLoading(false);
      }
    },
    [getAllUsers]
  );

  const debouncedFetchUsers = useMemo(
    () => debounce(fetchUsers, 500),
    [fetchUsers]
  );

  useEffect(() => {
    const params = {} as PageableParams;
    if (pagination.page) {
      params.page = pagination.page;
    }
    if (pagination.size) {
      params.size = pagination.size;
    }
    if (sorter.field && sorter.order) {
      params.sort = `${sorter.field},${sorter.order}`;
    }
    if (keyword) {
      params.keyword = keyword;
    }
    debouncedFetchUsers(params);

    return () => {
      debouncedFetchUsers.cancel();
    };
  }, [pagination.size, pagination.page, sorter, keyword]);

  useEffect(() => {
    setUsers(defaultUsers.data || []);
  }, [defaultUsers.data]);

  // Table change handler
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleTableChange = (
    newPagination: any,
    filters: any,
    newSorter: any
  ) => {
    setPagination((prev) => ({
      ...prev,
      page: newPagination.current,
      size: newPagination.pageSize,
    }));

    if (newSorter.field && newSorter.order) {
      setSorter({
        field: newSorter.field,
        order:
          newSorter.order === "ascend"
            ? "asc"
            : newSorter.order === "descend"
            ? "desc"
            : undefined,
      });
    } else {
      setSorter({});
    }
  };

  // CRUD
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
          setEditingUser(undefined);
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

        <div className="flex gap-3 px-6 pb-4">
          <Input
            placeholder="Tìm kiếm theo tên hoặc email"
            allowClear
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onPressEnter={() =>
              setPagination((prev) => ({ ...prev, current: 1 }))
            }
            style={{ width: 250 }}
            prefix={<SearchOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
          />

          <Select
            placeholder="Chọn trường sắp xếp"
            allowClear
            value={sorter.field}
            onChange={(value) =>
              setSorter((prev) => ({ ...prev, field: value }))
            }
            style={{ width: 180 }}
          >
            <Select.Option value="fullName">Tên người dùng</Select.Option>
            <Select.Option value="email">Email</Select.Option>
            <Select.Option value="createdAt">Ngày tạo</Select.Option>
          </Select>

          <Select
            placeholder="Chọn chiều sắp xếp"
            allowClear
            value={sorter.order}
            onChange={(value) =>
              setSorter((prev) => ({ ...prev, order: value }))
            }
            style={{ width: 180 }}
          >
            <Select.Option value="asc">Tăng dần</Select.Option>
            <Select.Option value="desc">Giảm dần</Select.Option>
          </Select>
        </div>

        <AdminTable<User>
          data={users}
          columns={userColumns}
          loading={loading}
          pagination={{
            current: pagination.page,
            pageSize: pagination.size,
            total: pagination.total,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} của ${total} mục`,
          }}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onChange={handleTableChange}
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
