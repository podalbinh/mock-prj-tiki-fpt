import React, { useMemo } from "react";
import { Card, Statistic, Row, Col } from "antd";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { Order } from "@/constant/interfaces";
import { useLoaderData } from "react-router-dom";

const COLORS = ["#4CAF50", "#FFC107", "#F44336", "#3688f4ff"];

const STATUS_LABELS: Record<string, string> = {
  confirmed: "Đã xác nhận",
  pending: "Đang giao hàng",
  completed: "Đã giao hàng",
  cancelled: "Đã hủy",
};

const OrderDashboard = () => {
  const orders = useLoaderData() as Order[];
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, o) => sum + (o.totalPrice || 0), 0);
  const pendingOrders = orders.filter((o) => o.status === "pending").length;

  const pieData = useMemo(() => {
    const statusCount: Record<string, number> = {};
    orders.forEach((o) => {
      statusCount[o.status] = (statusCount[o.status] || 0) + 1;
    });
    return Object.keys(statusCount).map((status) => ({
      name: STATUS_LABELS[status] || status,
      value: statusCount[status],
    }));
  }, [orders]);

  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      {/* Cards thống kê */}
      <Row gutter={16} className="mb-6">
        <Col span={8}>
          <Card variant="borderless" className="shadow-sm">
            <Statistic title="Tổng số đơn" value={totalOrders} />
          </Card>
        </Col>
        <Col span={8}>
          <Card variant="borderless" className="shadow-sm">
            <Statistic
              title="Tổng doanh thu"
              value={totalRevenue}
              precision={0}
              suffix="₫"
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card variant="borderless" className="shadow-sm">
            <Statistic title="Đơn đang chờ" value={pendingOrders} />
          </Card>
        </Col>
      </Row>

      <Row gutter={16}>
        {/* Pie Chart */}
        <Col span={12}>
          <Card
            title="Tỷ lệ đơn hàng theo trạng thái"
            variant="borderless"
            className="shadow-sm"
          >
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label
                >
                  {pieData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default OrderDashboard;
