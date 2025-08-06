import { Layout } from "antd";
import AdminHeader from "./Header";
import AdminSidebar from "./SideBar";
import AdminFooter from "./Footer";
import { useState } from "react";
import { Outlet } from "react-router-dom";

const { Content } = Layout;

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout className="min-h-screen">
      <AdminSidebar collapsed={collapsed} />

      <Layout
        className={`transition-all duration-200 ${
          collapsed ? "ml-20" : "ml-[250px]"
        }`}
      >
        <AdminHeader collapsed={collapsed} onToggle={toggleSidebar} />

        <Content className="mt-6 mx-4 min-h-[calc(100vh-112px)] overflow-auto">
          <div className="p-6 bg-white rounded-lg shadow-[0_1px_2px_0_rgba(0,0,0,0.03),_0_1px_6px_-1px_rgba(0,0,0,0.02),_0_2px_4px_0_rgba(0,0,0,0.02)]">
            <Outlet />
          </div>
        </Content>

        <AdminFooter />
      </Layout>
    </Layout>
  );
}
