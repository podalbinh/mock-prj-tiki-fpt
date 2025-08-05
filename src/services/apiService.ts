import Request from '@/config/api';
import type { ApiResponse } from '@/config/api';

// Types cho User API
interface User {
  id: string;
  name: string;
  email: string;
}

interface CreateUserData {
  name: string;
  email: string;
}

interface UpdateUserData {
  name?: string;
  email?: string;
}

// User API functions - sử dụng Request class
export const userApi = {
  getUsers: () => Request.get<User[]>('/users'),
  getUserById: (id: string) => Request.get<User>(`/users/${id}`),
  createUser: (userData: CreateUserData) => Request.post<User>('/users', userData),
  updateUser: (id: string, userData: UpdateUserData) => Request.put<User>(`/users/${id}`, userData),
  deleteUser: (id: string) => Request.delete<void>(`/users/${id}`),
};

// Export types for use in components
export type { User, CreateUserData, UpdateUserData, ApiResponse };
