import Request from "@/config/api";
import { API_ENDPOINTS } from '@/constant/endpoint';
import type { Category } from '@/constant/interfaces';

export const useCategory = () => {
    const createCategory = async (categoryData: Partial<Category>) => {
        const response = await Request.post<Category>(API_ENDPOINTS.CREATE_CATEGORY, categoryData);
        return response;
    };

    const updateCategory = async (id: number, categoryData: Partial<Category>) => {
        const response = await Request.put<Category>(API_ENDPOINTS.UPDATE_CATEGORY(id), categoryData);
        return response;
    };

    const deleteCategory = async (id: number) => {
        const response = await Request.delete<Category>(API_ENDPOINTS.DELETE_CATEGORY(id));
        return response;
    };

    return { createCategory, updateCategory, deleteCategory }
}
