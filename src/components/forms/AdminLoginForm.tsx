import { useState } from "react";
import { Form, Input, Button, Card, Typography, Alert } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const { Title, Text } = Typography;

interface LoginForm {
  email: string;
  password: string;
}

export default function AdminLoginForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const onFinish = async (values: LoginForm) => {
    try {
      setLoading(true);
      setError("");

      const success = await login(values.email, values.password);

      if (success) {
        navigate("/admin/dashboard", { replace: true });
      } else {
        setError("Email hoặc mật khẩu không đúng");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Đã có lỗi xảy ra, vui lòng thử lại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <Card className="shadow-lg">
          <div className="text-center mb-8">
            <Title level={2}>Đăng nhập Admin</Title>
            <Text type="secondary">Vui lòng đăng nhập để tiếp tục</Text>
          </div>

          {error && (
            <Alert message={error} type="error" showIcon className="mb-4" />
          )}

          <Form name="login" onFinish={onFinish} layout="vertical" size="large">
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Vui lòng nhập email!" },
                { type: "email", message: "Email không hợp lệ!" },
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="admin@example.com"
              />
            </Form.Item>

            <Form.Item
              name="password"
              label="Mật khẩu"
              rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Mật khẩu"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="w-full"
              >
                Đăng nhập
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
}
