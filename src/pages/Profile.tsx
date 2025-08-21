import { Layout } from "antd";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import CustomBreadcrumb from "@/components/common/Breadcrumb";
import { useMemo, useState } from "react";

const { Content } = Layout;

const Profile = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [showSidebar, setShowSidebar] = useState(false);

  const breadcrumbItems = useMemo(() => {
    const currentPath = location.pathname;
    let dynamicTitle;

    switch (currentPath) {
      case "/profile/account-info":
        dynamicTitle = "Thông tin tài khoản";
        break;
      case "/profile/notifications":
        dynamicTitle = "Thông báo của tôi";
        break;
      case "/profile/orders":
        dynamicTitle = "Đơn hàng của tôi";
        break;
      default:
        dynamicTitle = "Thông tin tài khoản";
    }

    return [
      { title: "Trang chủ", href: "/" },
      { title: dynamicTitle, href: currentPath },
    ];
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen mb-8">
      <div className="flex-1">
        <CustomBreadcrumb items={breadcrumbItems} />
        <Layout className="bg-transparent">
          <Content>
            <div className="max-w-[1450px] w-full mx-auto pb-6 flex flex-col md:flex-row gap-6">
              {/* Sidebar */}
              <div
                className={`${
                  showSidebar ? "block" : "hidden"
                } md:block w-full md:w-64 shadow-sm  z-50 relative`}
              >
                {/* Nút close chỉ hiển thị trên mobile */}
                <button
                  className="absolute top-4 right-4 md:hidden p-2 bg-gray-200 rounded-lg"
                  onClick={() => setShowSidebar(false)}
                >
                  {/* Icon close */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>

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
              <div className="flex-1 p-6 pt-0 shadow-sm rounded-lg">
                {/* Nút toggle sidebar cho mobile */}
                {!showSidebar && (
                  <button
                    className="md:hidden mb-4 p-2 bg-gray-200 rounded-lg"
                    onClick={() => setShowSidebar(true)}
                  >
                    {/* Icon hamburger */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-gray-700"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  </button>
                )}

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
