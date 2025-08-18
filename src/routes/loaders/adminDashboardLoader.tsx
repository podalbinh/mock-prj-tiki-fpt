import Request from "@/config/api";
import { API_ENDPOINTS } from "@/constant/endpoint";
import type { DashboardData } from "@/constant/interfaces";

export async function adminDashboardLoader(): Promise<DashboardData> {
  try {
    const response = await Request.get<DashboardData>(
      API_ENDPOINTS.ADMIN_DASHBOARD
    );
    return response;
  } catch (error) {
    console.error("Failed to load admin dashboard data:", error);
    return {} as DashboardData;
  }
}
