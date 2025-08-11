import { useUser } from "@/hooks/useUser";
import { DeleteOutlined, FacebookOutlined, GoogleOutlined, LockOutlined, MailOutlined, MobileOutlined, PhoneOutlined, UserOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useAppDispatch } from "@/store";
import { setUser } from "@/store/slices/authSlice";

const AccountInfo = () => {
    const userJson = localStorage.getItem("user");
    const user = userJson ? JSON.parse(userJson) : null;
    const dispatch = useAppDispatch();
    const { updateUser } = useUser();

    const [fullName, setFullName] = useState(user?.fullName || "");

    const handleSaveProfile = async () => {
        try {
            const response = await updateUser(user.id, {
                fullName: fullName,
            });

            if (response) {
                localStorage.setItem("user", JSON.stringify(response));
                dispatch(setUser(response));
                alert("Cập nhật thành công!");
            } else {
                    alert("Cập nhật thất bại");
            }
        } catch (err) {
            console.error("Lỗi cập nhật:", err);
            alert("Có lỗi xảy ra.");
        }
    };


  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Personal Information */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Thông tin cá nhân</h2>

            {/* Profile Avatar */}
            <div className="flex items-center mb-6">
              <div className="relative">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                  <UserOutlined className="text-blue-500 text-3xl" />
                </div>
              </div>
            </div>

            {/* Name Field */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Họ & Tên</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Gender */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">Giới tính</label>
              <div className="flex space-x-6">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    defaultChecked 
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Nam</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Nữ</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="other"
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Khác</span>
                </label>
              </div>
            </div>

            {/* Country */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">Quốc tịch</label>
              <select defaultValue="vn" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-400">
                <option>Chọn quốc tịch</option>
                <option value="vn">Việt Nam</option>
                <option value="us">Hoa Kỳ</option>
                <option value="jp">Nhật Bản</option>
                <option value="kr">Hàn Quốc</option>
              </select>
            </div>

            {/* Save Button */}
            <button onClick={handleSaveProfile} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md transition-colors">
              Lưu thay đổi
            </button>
          </div>

          {/* Right Column - Contact & Security */}
          <div className="space-y-6">
            {/* Phone & Email Section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Số điện thoại và Email</h2>

              {/* Phone Number */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg mb-4">
                <div className="flex items-center space-x-3">
                  <PhoneOutlined className="text-gray-500 w-5 h-5" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Số điện thoại</p>
                    <p className="text-sm text-gray-900">{user?.phone}</p>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <MailOutlined className="text-gray-500 w-5 h-5" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Địa chỉ email</p>
                    <p className="text-sm text-gray-900">{user?.email || ""}</p>
                  </div>
                </div>
              </div>
            </div>

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
