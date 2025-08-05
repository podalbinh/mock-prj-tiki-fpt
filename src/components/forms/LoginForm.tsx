import { Card, Form, Input, Button, Typography, Row, Col } from "antd";
import {
  GoogleOutlined,
  AppleOutlined,
  FacebookOutlined,
} from "@ant-design/icons";
import axios from "axios";

const { Title, Text, Link } = Typography;

export function LoginForm({ className }: { className?: string }) {
  const onFinish = (values: any) => {
    console.log("Login values:", values);
    axios.post("http://localhost:3001/auth/login", values)
      .then(response => {
        console.log("Login successful:", response.data);
      })
      .catch(error => {
        console.error("Login failed:", error);
      });
  };

  return (
    <div
      className={`flex justify-center items-center min-h-screen ${className}`}
    >
      <Card style={{ maxWidth: 800, width: "100%" }}>
        <Row gutter={24}>
          <Col xs={24} md={12}>
            <Form layout="vertical" onFinish={onFinish}>
              <div className="text-center mb-6">
                <Title level={2}>Welcome back</Title>
                <Text type="secondary">Login to your Acme Inc account</Text>
              </div>

              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: "Please enter your email" }]}
              >
                <Input placeholder="m@example.com" />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please enter your password" },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <div className="flex justify-end mb-4">
                <Link href="#">Forgot your password?</Link>
              </div>

              <Form.Item>
                <Button type="primary" htmlType="submit" block>
                  Login
                </Button>
              </Form.Item>

              <div className="text-center my-4 text-muted">
                Or continue with
              </div>

              <Row gutter={8} justify="space-between">
                <Col span={8}>
                  <Button icon={<AppleOutlined />} block>
                    Apple
                  </Button>
                </Col>
                <Col span={8}>
                  <Button icon={<GoogleOutlined />} block>
                    Google
                  </Button>
                </Col>
                <Col span={8}>
                  <Button icon={<FacebookOutlined />} block>
                    Meta
                  </Button>
                </Col>
              </Row>

              <div className="text-center mt-6">
                <Text type="secondary">
                  Don’t have an account? <Link href="#">Sign up</Link>
                </Text>
              </div>
            </Form>
          </Col>

          <Col xs={0} md={12}>
            <div className="h-full w-full bg-gray-100 flex items-center justify-center">
              <img
                src="/placeholder.svg"
                alt="Login Illustration"
                className="object-cover w-full h-full"
              />
            </div>
          </Col>
        </Row>
      </Card>
    </div>
  );
}
