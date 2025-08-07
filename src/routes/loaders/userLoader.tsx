import Request from "@/config/api";
import { API_ENDPOINTS } from "@/constant/endpoint";
import type { User } from "@/constant/interfaces";

export async function userLoader(): Promise<User[]> {
  try {
    const response = await Request.get<User[]>(API_ENDPOINTS.USERS);
    return response;
  } catch (error) {
    console.error("Failed to load users:", error);
    throw new Response("Failed to load users", { status: 500 });
  }
}
