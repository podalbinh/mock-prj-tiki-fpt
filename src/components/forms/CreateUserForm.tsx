import { Form, Input, DatePicker, Select, Button, Space } from "antd";
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  CalendarOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import type { FormProps } from "antd";
import { formatDate, parseDate } from "@/utils/dateHelper";
import type { User } from "@/constant/interfaces";

const { Option } = Select;

interface CreateUserFormProps {
  onSubmit?: (values: User) => void;
  onCancel?: () => void;
  loading?: boolean;
  defaultValues?: User;
  isUpdating?: boolean;
}

export default function CreateUserForm({
  onSubmit,
  onCancel,
  loading = false,
  defaultValues,
  isUpdating = false,
}: CreateUserFormProps) {
  const [form] = Form.useForm();

  const handleFinish: FormProps<User>["onFinish"] = (values) => {
    const formattedValues = {
      ...values,
      dateOfBirth: values.dateOfBirth ? formatDate(values.dateOfBirth) : "",
    };
    onSubmit?.(formattedValues);
  };

  const handleFinishFailed: FormProps<User>["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const roleOptions = [
    { value: "ADMIN", label: "Admin" },
    { value: "USER", label: "User" },
  ];
  console.log("defaultValues", defaultValues);
  return (
    <div className="w-full max-w-md mx-auto">
      <Form
        form={form}
        name="createUser"
        layout="vertical"
        onFinish={handleFinish}
        onFinishFailed={handleFinishFailed}
        autoComplete="off"
        className="space-y-4"
        initialValues={{
          ...defaultValues,
          dateOfBirth: defaultValues?.dateOfBirth
            ? parseDate(defaultValues.dateOfBirth)
            : undefined,
        }}
      >
        <Form.Item
          label={
            <span className="text-sm font-medium text-gray-700">Họ và tên</span>
          }
          name="fullName"
          rules={[
            { required: true, message: "Vui lòng nhập họ và tên!" },
            { min: 2, message: "Họ và tên phải có ít nhất 2 ký tự!" },
            { max: 50, message: "Họ và tên không được vượt quá 50 ký tự!" },
          ]}
        >
          <Input
            prefix={<UserOutlined className="text-gray-400" />}
            placeholder="Nhập họ và tên"
            className="h-10"
          />
        </Form.Item>

        <Form.Item
          label={
            <span className="text-sm font-medium text-gray-700">Ngày sinh</span>
          }
          name="dateOfBirth"
          rules={[{ required: true, message: "Vui lòng chọn ngày sinh!" }]}
        >
          <DatePicker
            placeholder="Chọn ngày sinh"
            className="w-full h-10"
            format="DD/MM/YYYY"
            suffixIcon={<CalendarOutlined className="text-gray-400" />}
          />
        </Form.Item>

        <Form.Item
          label={
            <span className="text-sm font-medium text-gray-700">Vai trò</span>
          }
          name="role"
          rules={[{ required: true, message: "Vui lòng chọn vai trò!" }]}
        >
          <Select
            placeholder="Chọn vai trò"
            className="h-10"
            suffixIcon={<TeamOutlined className="text-gray-400" />}
          >
            {roleOptions.map((option) => (
              <Option key={option.value} value={option.value}>
                {option.label}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label={
            <span className="text-sm font-medium text-gray-700">Email</span>
          }
          name="email"
          rules={[
            { required: true, message: "Vui lòng nhập email!" },
            { type: "email", message: "Email không hợp lệ!" },
          ]}
        >
          <Input
            prefix={<MailOutlined className="text-gray-400" />}
            placeholder="Nhập địa chỉ email"
            className="h-10"
          />
        </Form.Item>

        {!isUpdating && (
          <Form.Item
            label={
              <span className="text-sm font-medium text-gray-700">
                Mật khẩu
              </span>
            }
            name="password"
            rules={[
              { required: true, message: "Vui lòng nhập mật khẩu!" },
              { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự!" },
              { max: 20, message: "Mật khẩu không được vượt quá 20 ký tự!" },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="text-gray-400" />}
              placeholder="Nhập mật khẩu"
              className="h-10"
            />
          </Form.Item>
        )}

        <Form.Item className="mb-0 pt-4">
          <Space className="w-full justify-end">
            <Button onClick={onCancel} className="px-6">
              Hủy
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="px-6 bg-blue-600 hover:bg-blue-700"
            >
              Tạo người dùng
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
}
