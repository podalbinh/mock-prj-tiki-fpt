import Request from "@/config/api";
import { API_ENDPOINTS } from "@/constant/endpoint";
import type { Book } from "@/constant/interfaces";

export const useBook = () => {
  const getAllBooks = async () => {
    return await Request.get<Book[]>(API_ENDPOINTS.PRODUCTS);
  };

  const getTopSellingBooks = async () => {
    const response = await Request.get<Book[]>(API_ENDPOINTS.PRODUCTS, {
      params: {
        _limit: 10,
        _sort: "quantitySold",
        _order: "desc",
      },
    });
    return response
      .filter((book) => book.quantitySold !== undefined)
      .slice(0, 10);
  };

  const getBookById = async (id: number) => {
    return await Request.get<Book>(API_ENDPOINTS.PRODUCT_BY_ID(id));
  };

  const createBook = async (bookData: Partial<Book>) => {
    return await Request.post<Book>(API_ENDPOINTS.PRODUCTS, bookData);
  };

  const updateBook = async (id: number, bookData: Partial<Book>) => {
    return await Request.put<Book>(API_ENDPOINTS.PRODUCT_BY_ID(id), bookData);
  };

  const deleteBook = async (id: number) => {
    await Request.delete(API_ENDPOINTS.PRODUCT_BY_ID(id));
  };

  return {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook,
    getTopSellingBooks,
  };
};
