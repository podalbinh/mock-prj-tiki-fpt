import { Button, Result } from "antd";
import { LockOutlined, HomeOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

export default function Error403() {
  const navigate = useNavigate();
  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <Result
          status="403"
          title={
            <div className="text-gray-800">
              <div className="flex items-center justify-center mb-4">
                <LockOutlined className="text-6xl text-red-500" />
              </div>
              <h1 className="text-4xl font-bold">403</h1>
            </div>
          }
          subTitle={
            <div className="text-gray-600 space-y-2">
              <p className="text-lg font-medium">Truy cập bị từ chối</p>
              <p className="text-sm">
                Bạn không có quyền truy cập vào trang này. Vui lòng liên hệ quản
                trị viên nếu bạn cho rằng đây là lỗi.
              </p>
            </div>
          }
          extra={
            <div className="space-y-3">
              <Button
                type="primary"
                size="large"
                icon={<HomeOutlined />}
                onClick={handleGoHome}
                className="px-8 py-2 h-auto"
              >
                Quay về trang chủ
              </Button>
              <div className="text-xs text-gray-500 mt-4">
                Mã lỗi: 403 - Forbidden Access
              </div>
            </div>
          }
          className="bg-white rounded-lg shadow-lg p-8"
        />
      </div>
    </div>
  );
}
