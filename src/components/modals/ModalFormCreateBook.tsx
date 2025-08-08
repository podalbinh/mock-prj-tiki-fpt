import { Modal } from "antd";
import type {Book} from "@/constant/interfaces";
import CreateBookForm from "@/components/forms/CreateBookForm.tsx";

interface ModalFormCreateBookProps {
    isOpen: boolean;
    onClose: () => void;
    handleSubmit: (values: Book) => void;
    loading?: boolean;
}

export default function ModalFormCreateBook({
                                                isOpen,
                                                onClose,
                                                handleSubmit,
                                                loading = false,
                                            }: ModalFormCreateBookProps) {

    return (
        <Modal
            title={
                <div className="text-lg font-semibold text-gray-800 border-b pb-3">
                    Tạo sách mới
                </div>
            }
            open={isOpen}
            onCancel={onClose}
            footer={null}
            width={500}
            centered
            className="rounded-lg"
        >
            <div className="pt-4">
                <CreateBookForm
                    onSubmit={handleSubmit}
                    onCancel={onClose}
                    loading={loading}
                />
            </div>
        </Modal>
    );
}
