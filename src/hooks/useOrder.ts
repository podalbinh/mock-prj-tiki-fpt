import Request from "@/config/api";
import { API_ENDPOINTS } from "@/constant/endpoint";
import type { Order } from "@/constant/interfaces";

export const useOrder = () => {
  const getAllOrders = async () => {
    const response = await Request.get<Order[]>(API_ENDPOINTS.ORDERS);
    return response;
  };

  const updateOrder = async (id: number, orderData: Partial<Order>) => {
    const response = await Request.put<Order>(
      API_ENDPOINTS.ORDER_BY_ID(id),
      orderData
    );
    return response;
  };

  return { getAllOrders, updateOrder };
};
