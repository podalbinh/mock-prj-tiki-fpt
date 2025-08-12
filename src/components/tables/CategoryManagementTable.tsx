import { useState, useCallback, useRef } from "react";
import type { CustomTableColumn } from "@/components/common/Table";
import AdminTable from "@/components/common/Table";
import { App, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import type { Category } from "@/constant/interfaces";
import { useLoaderData, useRevalidator } from "react-router-dom";
import ModalFormCreateCategory from "../modals/ModalFormCreateCategory";
import { useCategory } from "@/hooks/useCategory";
import ModalConfirm from "../modals/ModalConfirm";

const columns: CustomTableColumn<Category>[] = [
  { key: "id", title: "ID", dataIndex: "id", align: "center" },
  { key: "name", title: "Categories", dataIndex: "name", align: "center" },
  {
    key: "parentName",
    title: "Parent Category",
    dataIndex: "parent",
    align: "center",
    render: (value: any) => (value ? value.name : "No Parent"),
  },
];

const CategoryManagementTable = () => {
  const { message } = App.useApp();

  const categories = useLoaderData() as Category[];
  const { createCategory, updateCategory, deleteCategory } = useCategory();
  const revalidator = useRevalidator();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | undefined>(
    undefined
  );

  const categoryToDeleteRef = useRef<Category | null>(null);

  const handleCloseModal = () => {
    setIsOpenModal(false);
    setEditingCategory(undefined);
    setIsEditing(false);
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setIsOpenModal(true);
    setIsEditing(true);
  };

  const handleDelete = useCallback((category: Category) => {
    categoryToDeleteRef.current = category;
    setIsOpenModalDelete(true);
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    const category = categoryToDeleteRef.current;
    if (!category) return;

    try {
      await deleteCategory(category.id);
      message.success("Xóa danh mục thành công!");
      revalidator.revalidate();
    } catch (error) {
      console.error("Xóa danh mục thất bại:", error);
      message.error("Xóa danh mục thất bại!");
    } finally {
      categoryToDeleteRef.current = null;
      setIsOpenModalDelete(false);
    }
  }, [deleteCategory]);

  const handleCancelDelete = useCallback(() => {
    categoryToDeleteRef.current = null;
    setIsOpenModalDelete(false);
  }, []);

  const handleSubmitForm = useCallback(
    async (values: Category) => {
      try {
        if (isEditing && editingCategory) {
          await updateCategory(editingCategory.id, values);
          message.success("Cập nhật danh mục thành công!");
        } else {
          await createCategory(values);
          message.success("Tạo danh mục thành công!");
        }
        revalidator.revalidate();
      } catch (error) {
        console.error("Error:", error);
        message.error("Hành động thất bại!");
      } finally {
        setIsOpenModal(false);
      }
    },
    [createCategory, isEditing, message, revalidator]
  );

  return (
    <>
      <div className={`bg-white rounded-lg shadow-sm`}>
        <div className="flex px-6 py-4 justify-between">
          <h3 className="text-lg font-semibold text-gray-900">
            Quản lý danh mục
          </h3>

          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsOpenModal(true)}
            size="large"
            className="bg-blue-600 hover:bg-blue-700"
          >
            Tạo danh mục mới
          </Button>
        </div>
        <AdminTable<Category>
          data={categories}
          columns={columns}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      <ModalFormCreateCategory
        isOpen={isOpenModal}
        onClose={handleCloseModal}
        handleSubmit={handleSubmitForm}
        defaultValues={editingCategory}
      />

      <ModalConfirm
        title="Xác nhận xóa danh mục"
        description="Bạn có chắc chắn muốn xóa danh mục này? Hành động này không thể hoàn tác."
        onOk={handleConfirmDelete}
        onCancel={handleCancelDelete}
        open={isOpenModalDelete}
      />
    </>
  );
};

export default CategoryManagementTable;
