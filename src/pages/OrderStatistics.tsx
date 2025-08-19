import React, { useMemo } from "react";
import { Card, Statistic } from "antd";
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
import { OrderStatus, OrderStatusLabel } from "@/constant/enums";

const COLORS = ["#4CAF50", "#FFC107", "#F44336", "#3688f4ff"];

const OrderDashboard = () => {
  const orders = useLoaderData() as Order[];
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce(
    (sum, o) => sum + (o.totalPrice || 0),
    0
  );

  const deliveringOrders = orders.filter(
    (o) => o.status === OrderStatus.DELIVERED
  ).length;

  const pieData = useMemo(() => {
    const statusCount: Record<string, number> = {};
    orders.forEach((o) => {
      statusCount[o.status] = (statusCount[o.status] || 0) + 1;
    });
    return Object.keys(statusCount).map((status) => ({
      name: OrderStatusLabel[
        status.toUpperCase() as keyof typeof OrderStatusLabel
      ],
      value: statusCount[status],
    }));
  }, [orders]);

  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      {/* Cards thống kê */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="shadow-sm">
          <Statistic title="Tổng số đơn" value={totalOrders} />
        </Card>
        <Card className="shadow-sm">
          <Statistic
            title="Tổng doanh thu"
            value={totalRevenue}
            precision={0}
            suffix="₫"
          />
        </Card>
        <Card className="shadow-sm">
          <Statistic title="Đơn đang giao" value={deliveringOrders} />
        </Card>
      </div>

      {/* Pie Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card
          title="Tỷ lệ đơn hàng theo trạng thái"
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
      </div>
    </div>
  );
};

export default OrderDashboard;
