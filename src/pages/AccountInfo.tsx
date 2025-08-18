import { useUser } from "@/hooks/useUser";
import { DeleteOutlined, FacebookOutlined, GoogleOutlined, HomeOutlined, LockOutlined, MailOutlined, MobileOutlined, PhoneOutlined, UserOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/store";
import { setUser } from "@/store/slices/authSlice";
import { App, Button, Form, Input } from "antd";
import ImageUpload from "@/components/common/ImageUploader";


const AccountInfo = () => {
  const userJson = localStorage.getItem("user");
  const user = userJson ? JSON.parse(userJson) : null;
  const dispatch = useAppDispatch();
  const { updateUser } = useUser();
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
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Personal Information */}
          <div className="w-full mx-auto bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-6 text-gray-800">Cập nhật thông tin cá nhân</h2>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
          initialValues={{}}
        >
          {/* Upload Avatar */}
          <Form.Item
            name="avatarUrl"
            label="Ảnh đại diện"
            valuePropName="value"
            getValueFromEvent={(value: string[] = []) => value}
            initialValue={
              user.avatarUrl ? [user.avatarUrl] : null
            }
          >
            <ImageUpload
              multiple={false}
              maxCount={1}
              toggleUploading={setIsUploadingAvatar}
              onChange={(value)=>{
                form.setFieldValue('avatarUrl',value)
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
            <Input prefix={<PhoneOutlined />} placeholder="Nhập số điện thoại" maxLength={10} />
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

          {/* Right Column - Contact & Security */}
          <div className="space-y-6">

            {/* Security Section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Bảo mật</h2>

              <div className="space-y-4">
                {/* Password Setup */}
                <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <LockOutlined className="text-gray-500 w-5 h-5" />
                    <span className="text-sm font-medium text-gray-700">Thiết lập mật khẩu</span>
                  </div>
                </div>

                {/* PIN Setup */}
                <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <MobileOutlined className="text-gray-500 w-5 h-5" />
                    <span className="text-sm font-medium text-gray-700">Thiết lập mã PIN</span>
                  </div>
                </div>

                {/* Delete Account */}
                <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <DeleteOutlined className="text-gray-500 w-5 h-5" />
                    <span className="text-sm font-medium text-gray-700">Yêu cầu xóa tài khoản</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media Connections */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Liên kết mạng xã hội</h2>

              <div className="space-y-4">
                {/* Facebook */}
                <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <FacebookOutlined className="text-blue-600 w-8 h-8 rounded-full" />
                    <span className="text-sm font-medium text-gray-700">Facebook</span>
                  </div>
                </div>

                {/* Google */}
                <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <GoogleOutlined className="text-red-500 w-8 h-8 rounded-full" />
                    <span className="text-sm font-medium text-gray-700">Google</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
  )
};

export default AccountInfo;
