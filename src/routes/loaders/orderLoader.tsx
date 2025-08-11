import Request from "@/config/api";
import { API_ENDPOINTS } from "@/constant/endpoint";
import type { Order } from "@/constant/interfaces";

export async function orderLoader(): Promise<Order[]> {
  try {
    const response = await Request.get<Order[]>(API_ENDPOINTS.ORDERS);
    console.log('response',response)
    return response;
  } catch (error) {
    console.error("Failed to load orders:", error);
    throw new Response("Failed to load orders", { status: 500 });
  }
}
