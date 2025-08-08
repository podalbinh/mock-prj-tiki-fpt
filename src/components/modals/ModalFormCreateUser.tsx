import { Modal } from "antd";
import CreateUserForm from "../forms/CreateUserForm";
import type { User } from "@/constant/interfaces";

interface ModalFormCreateUserProps {
  isOpen: boolean;
  onClose: () => void;
  handleSubmit: (values: User) => void;
  defaultValues?: User;
  loading?: boolean;
}

export default function ModalFormCreateUser({
  isOpen,
  onClose,
  handleSubmit,
  defaultValues,
  loading = false,
}: ModalFormCreateUserProps) {
  return (
    <Modal
      title={
        <div className="text-lg font-semibold text-gray-800 border-b pb-3">
          Tạo người dùng mới
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
        <CreateUserForm
          onSubmit={handleSubmit}
          onCancel={onClose}
          loading={loading}
          isUpdating={!!defaultValues}
          defaultValues={defaultValues}
        />
      </div>
    </Modal>
  );
}
