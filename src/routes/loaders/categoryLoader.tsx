import Request from "@/config/api";
import { API_ENDPOINTS } from "@/constant/endpoint";
import type { Category } from "@/constant/interfaces";

export async function categoryLoader(): Promise<Category[]> {
  try {
    const response = await Request.get<Category[]>(API_ENDPOINTS.GET_CATEGORIES);
    return response;
  } catch (error) {
    console.error("Failed to load categories:", error);
    return [];
  }
}
