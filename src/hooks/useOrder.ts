import Request from "@/config/api";
import { API_ENDPOINTS } from "@/constant/endpoint";
import type {
  CreateOrderResponse,
  Order,
  OrderCreate,
} from "@/constant/interfaces";
import { useAppDispatch } from "@/store";
import { setRecentOrder } from "@/store/slices/cartSlice";

export const useOrder = () => {
  const dispatch = useAppDispatch();

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

  const createOrders = async (ordersData: Partial<OrderCreate[]>) => {
    const response = await Request.post<CreateOrderResponse>(
      API_ENDPOINTS.ORDERS_CREATE,
      ordersData
    );
    dispatch(setRecentOrder(response));
    return response;
  };

  return { getAllOrders, updateOrder, createOrders };
};
