import Request from "@/config/api";
import { API_ENDPOINTS } from "@/constant/endpoint";
import type { PagedResponse, User } from "@/constant/interfaces";

export async function userLoader(): Promise<PagedResponse<User>> {
  try {
    const response = await Request.get<PagedResponse<User>>(
      API_ENDPOINTS.USERS
    );
    return response;
  } catch (error) {
    console.error("Failed to load users:", error);
    return {
      data: [],
      totalElements: 0,
      currentPage: 0,
      hasNext: false,
      hasPrevious: false,
      pageSize: 0,
      totalPages: 0,
    } as PagedResponse<User>;
  }
}
