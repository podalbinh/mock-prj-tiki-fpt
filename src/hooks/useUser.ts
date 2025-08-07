import Request from "@/config/api";
import { API_ENDPOINTS } from "@/constant/endpoint";
import type { User } from "@/constant/interfaces";

export const useUser = () => {
  const getAllUsers = async () => {
    const response = await Request.get<User[]>(API_ENDPOINTS.USERS);
    return response;
  };

  const getUserById = async (id: string) => {
    const response = await Request.get<User>(API_ENDPOINTS.USER_BY_ID(id));
    return response;
  };

  const createUser = async (userData: Partial<User>) => {
    const response = await Request.post<User>(API_ENDPOINTS.USERS, userData);
    return response;
  };

  const updateUser = async (id: string, userData: Partial<User>) => {
    const response = await Request.put<User>(
      API_ENDPOINTS.USER_BY_ID(id),
      userData
    );
    return response;
  };

  const deleteUser = async (id: string) => {
    await Request.delete(API_ENDPOINTS.USER_BY_ID(id));
  };

  return { getAllUsers, getUserById, createUser, updateUser, deleteUser };
};
