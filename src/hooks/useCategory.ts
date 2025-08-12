import Request from "@/config/api";
import { API_ENDPOINTS } from "@/constant/endpoint";
import type { Category, PageableParams } from "@/constant/interfaces";

export const useCategory = () => {
  const getAllCategories = async () => {
    return await Request.get<Category[]>(API_ENDPOINTS.CATEGORIES);
  };

  const searchCategories = async (params: PageableParams) => {
    return await Request.get<Category[]>(API_ENDPOINTS.SEARCH_CATEGORIES, {
      params: { ...params },
    });
  };

  const createCategory = async (categoryData: Partial<Category>) => {
    const response = await Request.post<Category>(
      API_ENDPOINTS.CATEGORIES,
      categoryData
    );
    return response;
  };

  const updateCategory = async (
    id: number,
    categoryData: Partial<Category>
  ) => {
    const response = await Request.put<Category>(
      API_ENDPOINTS.CATEGORY_BY_ID(id),
      categoryData
    );
    return response;
  };

  const deleteCategory = async (id: number) => {
    const response = await Request.delete<Category>(
      API_ENDPOINTS.CATEGORY_BY_ID(id)
    );
    return response;
  };

  const getCategoryWithThumbnail = async () => {
    return await Request.get<Category[]>(
      API_ENDPOINTS.GET_CATEGORY_WITH_THUMBNAIL
    );
  };

  return {
    getAllCategories,
    searchCategories,
    createCategory,
    updateCategory,
    deleteCategory,
    getCategoryWithThumbnail,
  };
};
