import React from "react";
import { Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

interface ConfirmModalProps {
  title: string;
  description: string;
  open: boolean;
  onOk: () => void;
  onCancel: () => void;
  okText?: string;
  cancelText?: string;
  loading?: boolean;
}

const ModalConfirm: React.FC<ConfirmModalProps> = ({
  title,
  description,
  open,
  onOk,
  onCancel,
  okText = "OK",
  cancelText = "Cancel",
  loading = false,
}) => {
  return (
    <Modal
      title={
        <div className="flex items-center gap-3 text-lg font-semibold text-gray-800">
          <ExclamationCircleOutlined className="text-orange-500 text-xl" />
          {title}
        </div>
      }
      open={open}
      onOk={onOk}
      onCancel={onCancel}
      okText={okText}
      cancelText={cancelText}
      confirmLoading={loading}
      centered
      width={480}
      className="confirm-modal"
      okButtonProps={{
        className:
          "bg-red-500 hover:bg-red-600 border-red-500 hover:border-red-600 text-white font-medium px-6 py-2 h-10 rounded-md transition-colors duration-200",
      }}
      cancelButtonProps={{
        className:
          "border-gray-300 text-gray-700 hover:border-gray-400 hover:text-gray-800 font-medium px-6 py-2 h-10 rounded-md transition-colors duration-200",
      }}
    >
      <div className="py-4">
        <p className="text-gray-600 text-base leading-relaxed">{description}</p>
      </div>
    </Modal>
  );
};

export default ModalConfirm;
