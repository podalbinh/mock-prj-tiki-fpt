import { Layout, Typography } from "antd";

const { Footer: AntFooter } = Layout;
const { Text } = Typography;

export default function AdminFooter() {
  return (
    <AntFooter className="text-center bg-gray-100 border-t border-gray-300">
      <Text type="secondary">
        Admin Panel ©{new Date().getFullYear()} - Được phát triển bởi Your
        Company
      </Text>
    </AntFooter>
  );
}
