import type { CustomErrorResponse } from "@/constant/interfaces";
import apiClient from "./apiClient";
import type { AxiosRequestConfig, AxiosResponse } from "axios";

export type CustomResponse<T = unknown> = {
  code: number;
  data: T;
};

// Request class chứa tất cả HTTP methods
export class Request {
  // Generic API call method
  private static async apiCall<T = unknown>(
    config: AxiosRequestConfig
  ): Promise<T> {
    try {
      const response: AxiosResponse<CustomResponse<T>> = await apiClient(
        config
      );
      return response.data.data;
    } catch (error: unknown) {
      const axiosError = error as CustomErrorResponse;

      throw axiosError;
    }
  }

  // GET method
  static get<T = unknown>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.apiCall<T>({
      method: "GET",
      url,
      ...config,
    });
  }

  // POST method
  static post<T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.apiCall<T>({
      method: "POST",
      url,
      data,
      ...config,
    });
  }

  // PUT method
  static put<T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.apiCall<T>({
      method: "PUT",
      url,
      data,
      ...config,
    });
  }

  // DELETE method
  static delete<T = unknown>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.apiCall<T>({
      method: "DELETE",
      url,
      ...config,
    });
  }

  // PATCH method (bonus)
  static patch<T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.apiCall<T>({
      method: "PATCH",
      url,
      data,
      ...config,
    });
  }
}

export default Request;
