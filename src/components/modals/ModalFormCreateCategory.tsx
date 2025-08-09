import type { Category } from "@/constant/interfaces";
import { Modal } from "antd";
import CreateCategoryForm from "../forms/CreateCategoryForm";

interface ModalFormCreateCategoryProps {
    isOpen: boolean;
    onClose: () => void;
    handleSubmit: (values: Category) => void;
    defaultValues?: Category;
    loading?: boolean;
}

const ModalFormCreateCategory = ({
    isOpen,
    onClose,
    handleSubmit,
    defaultValues,
    loading = false
}: ModalFormCreateCategoryProps) => {
    return (
        <Modal
            title={
                <div className="text-lg font-semibold text-gray-800 border-b pb-3">
                    { !!defaultValues? "Sửa danh mục": "Tạo danh mục" }
                </div>
            }
            open={isOpen}
            onCancel={onClose}
            footer={null}
            width={500}
            centered
            className="rounded-lg"
            destroyOnHidden
        >

            <div className="pt-4">
                <CreateCategoryForm
                    onSubmit={handleSubmit}
                    onCancel={onClose}
                    loading={loading}
                    defaultValues={defaultValues}
                />
            </div>
        </Modal>
    )
}

export default ModalFormCreateCategory
