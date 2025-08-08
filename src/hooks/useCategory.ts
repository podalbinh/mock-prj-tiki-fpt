import Request from "@/config/api";
import {API_ENDPOINTS} from "@/constant/endpoint";
import type {Category} from "@/constant/interfaces";

export const useCategory = () => {
    const getAllCategories = async () => {
        return await Request.get<Category[]>(API_ENDPOINTS.GET_CATEGORIES);
    };

    return {
        getAllCategories: getAllCategories,
    };
};
