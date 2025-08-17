import React from "react";
import { Button, Modal } from "antd";
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
      onCancel={onCancel}
      onOk={onOk}
      open={open}
      confirmLoading={loading}
      centered
      width={480}
      className="confirm-modal"
      footer={
        <div className="flex gap-4 justify-end">
          <Button onClick={onCancel}>{cancelText}</Button>
          <Button onClick={onOk} color="danger" variant="solid">
            {okText}
          </Button>
        </div>
      }
    >
      <div className="py-4">
        <p className="text-gray-600 text-base leading-relaxed">{description}</p>
      </div>
    </Modal>
  );
};

export default ModalConfirm;
