import { useUser } from "@/hooks/useUser";
import {
  HomeOutlined,
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/store";
import { setUser } from "@/store/slices/authSlice";
import { App, Button, Form, Input } from "antd";
import ImageUpload from "@/components/common/ImageUploader";
import { useAuth } from "@/hooks/useAuth";

const AdminProfile = () => {
  const dispatch = useAppDispatch();
  const { updateUser } = useUser();
  const { user } = useAuth();
  const { message } = App.useApp();
  const [form] = Form.useForm();
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        address: user.address,
      });
    }
  }, [user]);

  const handleFinish = async (values: any) => {
    try {
      if (!user) return;
      const payload = {
        fullName: values.fullName,
        email: values.email,
        phone: values.phone,
        address: values.address,
        avatarUrl: values.avatarUrl?.[0] || null,
      };

      const response = await updateUser(user.id, payload);
      if (response) {
        localStorage.setItem("user", JSON.stringify(response));
        dispatch(setUser(response));
        message.success("Cập nhật thông tin thành công!");
      }
    } catch (err) {
      console.error("Lỗi cập nhật:", err);
      message.error("Cập nhật thất bại!");
    }
  };

  return (
    <div className="w-full bg-gray-50 p-6">
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        initialValues={{}}
        className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg text-center"
      >
        {/* Upload Avatar */}
        <Form.Item
          name="avatarUrl"
          label="Ảnh đại diện"
          valuePropName="value"
          getValueFromEvent={(value: string[] = []) => value}
          initialValue={user && user.avatarUrl ? [user.avatarUrl] : null}
          className="flex justify-center"
        >
          <ImageUpload
            multiple={false}
            maxCount={1}
            toggleUploading={setIsUploadingAvatar}
            onChange={(value) => {
              form.setFieldValue("avatarUrl", value);
            }}
          />
        </Form.Item>

        {/* Full Name */}
        <Form.Item
          name="fullName"
          label="Họ và tên"
          rules={[
            { required: true, message: "Vui lòng nhập họ và tên!" },
            { min: 2, message: "Tên quá ngắn!" },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="Nhập họ và tên" />
        </Form.Item>

        {/* Phone */}
        <Form.Item
          name="phone"
          label="Số điện thoại"
          rules={[
            { required: true, message: "Vui lòng nhập số điện thoại!" },
            {
              pattern: /^(0[3|5|7|8|9])+([0-9]{8})$/,
              message: "Số điện thoại không hợp lệ!",
            },
          ]}
        >
          <Input
            prefix={<PhoneOutlined />}
            placeholder="Nhập số điện thoại"
            maxLength={10}
          />
        </Form.Item>

        {/* Email */}
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Vui lòng nhập email!" },
            { type: "email", message: "Email không hợp lệ!" },
          ]}
        >
          <Input prefix={<MailOutlined />} placeholder="Nhập email" />
        </Form.Item>

        {/* Address */}
        <Form.Item name="address" label="Địa chỉ">
          <Input prefix={<HomeOutlined />} placeholder="Nhập địa chỉ" />
        </Form.Item>

        {/* Submit Button */}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={isUploadingAvatar}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Lưu thay đổi
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AdminProfile;
