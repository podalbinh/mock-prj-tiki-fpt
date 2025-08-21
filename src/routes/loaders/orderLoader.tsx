import Request from "@/config/api";
import { API_ENDPOINTS } from "@/constant/endpoint";
import type { Order } from "@/constant/interfaces";

export async function orderLoader(): Promise<Order[]> {
  try {
    const response = await Request.get<Order[]>(API_ENDPOINTS.ORDERS);
    return response;
  } catch (error) {
    console.error("Failed to load orders:", error);
    return [];
  }
}

export async function myOrderLoader(): Promise<Order[]> {
  try {
    const response = await Request.get<Order[]>(API_ENDPOINTS.MY_ORDERS);
    return response;
  } catch (error) {
    console.error("Failed to load orders:", error);
    return [];
  }
}

export async function orderDetailLoader(id: number): Promise<Order[]> {
  try {
    const response = await Request.get<Order[]>(API_ENDPOINTS.ORDER_BY_ID(id));
    return response;
  } catch (error) {
    console.error("Failed to load orders:", error);
    return [];
  }
}
