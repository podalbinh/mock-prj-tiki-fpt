import { Card, Statistic } from "antd";
import {
  UserOutlined,
  BookOutlined,
  ShoppingCartOutlined,
  AppstoreOutlined,
  DollarOutlined,
  WalletOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { useLoaderData } from "react-router-dom";
import type { DashboardData } from "@/constant/interfaces";
import { getColorByIndex } from "@/utils/colorHelper";

export default function AdminDashboard() {
  const dashboardData = useLoaderData() as DashboardData;
  if (!dashboardData) {
    return <div>Loading...</div>;
  }
  const { statsData, monthlyData, categoryData, recentOrdersData } =
    dashboardData;
  return (
    <div className="space-y-6">
      {/* Main Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg">
          <Statistic
            title={
              <span className="text-white opacity-90">Tổng người dùng</span>
            }
            value={statsData.totalUsers}
            prefix={<UserOutlined className="text-white" />}
            valueStyle={{ color: "white", fontSize: "24px" }}
          />
        </Card>
        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg">
          <Statistic
            title={<span className="text-white opacity-90">Tổng sách</span>}
            value={statsData.totalProducts}
            prefix={<BookOutlined className="text-white" />}
            valueStyle={{ color: "white", fontSize: "24px" }}
          />
        </Card>
        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg">
          <Statistic
            title={<span className="text-white opacity-90">Tổng đơn hàng</span>}
            value={statsData.totalOrders}
            prefix={<ShoppingCartOutlined className="text-white" />}
            valueStyle={{ color: "white", fontSize: "24px" }}
          />
        </Card>
        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg">
          <Statistic
            title={
              <span className="text-white opacity-90">Tổng doanh thu</span>
            }
            value={statsData.totalRevenue}
            prefix={<DollarOutlined className="text-white" />}
            valueStyle={{ color: "white", fontSize: "20px" }}
            formatter={(value) => `${Number(value).toLocaleString("vi-VN")} ₫`}
          />
        </Card>
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-sm">
          <Statistic
            title="Tăng trưởng tháng này"
            value={statsData.monthlyGrowth}
            precision={1}
            suffix="%"
            prefix={<WalletOutlined className="text-green-500" />}
            valueStyle={{ color: "#10b981" }}
          />
        </Card>
        <Card className="shadow-sm">
          <Statistic
            title="Đơn hàng hôm nay"
            value={statsData.todayOrders}
            prefix={<ShoppingOutlined className="text-blue-500" />}
            valueStyle={{ color: "#3b82f6" }}
          />
        </Card>
        <Card className="shadow-sm">
          <Statistic
            title="Danh mục sách"
            value={categoryData.length}
            prefix={<AppstoreOutlined className="text-purple-500" />}
            valueStyle={{ color: "#8b5cf6" }}
          />
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Thống kê theo tháng" className="shadow-sm">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="users"
                stroke="#3b82f6"
                strokeWidth={2}
                name="Người dùng"
              />
              <Line
                type="monotone"
                dataKey="orders"
                stroke="#10b981"
                strokeWidth={2}
                name="Đơn hàng"
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Phân bố danh mục sách (%)" className="shadow-sm">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getColorByIndex(index)} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>

          {/* Custom legend */}
          <div className="mt-4 flex flex-wrap gap-4">
            {categoryData.map((entry, index) => (
              <div key={index} className="flex items-center space-x-2">
                <span
                  className="inline-block w-4 h-4 rounded"
                  style={{ backgroundColor: getColorByIndex(index) }}
                />
                <span className="text-sm">
                  {entry.name} -{" "}
                  {(
                    (entry.value /
                      categoryData.reduce((sum, item) => sum + item.value, 0)) *
                    100
                  ).toFixed(0)}
                  %
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Doanh thu theo tháng (VNĐ)" className="shadow-sm">
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                formatter={(value) => [
                  `${Number(value).toLocaleString("vi-VN")} ₫`,
                  "Doanh thu",
                ]}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#8b5cf6"
                fill="#8b5cf6"
                fillOpacity={0.6}
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Đơn hàng 7 ngày gần đây" className="shadow-sm">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={recentOrdersData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="orders" fill="#f59e0b" name="Số đơn hàng" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
}
