import { Button, Layout } from "antd";
import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  UserOutlined,
  BellOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import { useAuth } from "@/hooks/useAuth";

const { Content } = Layout;

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  }

  return (
    <div className="flex flex-col min-h-screen mb-8">
      <div className="flex-1">
        <Layout className="bg-transparent">
          <Content>
            <div className="max-w-[1450px] w-full mx-auto py-6 flex gap-6">
              {/* Sidebar */}
              <div className="w-64 shadow-sm">
                <div className="p-6 flex items-center gap-2">
                  <img
                    src={user?.avatarUrl ?? ""}
                    alt="Avatar"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">Tài khoản của</span>
                    <span className="font-semibold text-gray-800">
                      {user?.fullName || "Người dùng"}
                    </span>
                  </div>
                </div>
                <nav>
                  <ul className="mt-2 space-y-1">
                    <li className="flex items-center gap-2 px-6 py-2 hover:bg-gray-100 cursor-pointer">
                      <i className="fa-solid fa-user text-gray-500"></i>
                      <Link to="/profile/account-info" className="flex-1">
                        Thông tin tài khoản
                      </Link>
                    </li>
                    <li className="flex items-center gap-2 px-6 py-2 hover:bg-gray-100 cursor-pointer">
                      <i className="fa-solid fa-bell text-gray-500"></i>
                      <Link to="/profile/notifications" className="flex-1">
                        Thông báo của tôi
                      </Link>
                    </li>
                    <li className="flex items-center gap-2 px-6 py-2 hover:bg-gray-100 cursor-pointer">
                      <i className="fa-solid fa-file-lines text-gray-500"></i>
                      <Link to="/profile/orders" className="flex-1">
                        Quản lý đơn hàng
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>

              {/* Main content */}
              <div className="flex-1 p-6 shadow-sm rounded-lg">
                <Outlet />
              </div>
            </div>
          </Content>
        </Layout>
      </div>
    </div>
  );
};

export default Profile;
