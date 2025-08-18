import Request from "@/config/api";
import { API_ENDPOINTS } from "@/constant/endpoint";
import type { Book } from "@/constant/interfaces";

export async function bookLoader(): Promise<Book[]> {
  try {
    const response = await Request.get<Book[]>(API_ENDPOINTS.BOOKS, {
      params: {
        _limit: 500,
        _sort: "id",
        _order: "desc",
      },
    });
    return response;
  } catch (error) {
    console.error("Failed to load books:", error);
    return [];
  }
}
