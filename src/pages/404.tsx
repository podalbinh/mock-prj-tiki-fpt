import { Button, Result } from "antd";
import { ArrowLeftOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

export default function Error404() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <Result
          status="404"
          title={
            <div className="text-gray-800">
              <div className="flex items-center justify-center mb-4">
                <QuestionCircleOutlined className="text-6xl text-orange-500" />
              </div>
              <h1 className="text-4xl font-bold">404</h1>
            </div>
          }
          subTitle={
            <div className="text-gray-600 space-y-2">
              <p className="text-lg font-medium">Không tìm thấy trang</p>
              <p className="text-sm">
                Trang bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển.
                Vui lòng kiểm tra lại đường dẫn.
              </p>
            </div>
          }
          extra={
            <div className="space-y-3">
              <div className="flex flex-col justify-center">
                <Button
                  size="large"
                  icon={<ArrowLeftOutlined />}
                  onClick={handleGoBack}
                  className="px-6 py-2 h-auto"
                >
                  Quay lại
                </Button>
              </div>
              <div className="text-xs text-gray-500 mt-4">
                Mã lỗi: 404 - Page Not Found
              </div>
            </div>
          }
          className="bg-white rounded-lg shadow-lg p-8"
        />
      </div>
    </div>
  );
}
