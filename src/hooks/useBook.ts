import Request from "@/config/api";
import { API_ENDPOINTS } from "@/constant/endpoint";
import type { Book } from "@/constant/interfaces";

export const useBook = () => {
    const getAllBooks = async () => {
        const response = await Request.get<Book[]>(API_ENDPOINTS.GET_BOOKS);
        return response;
    };

    const getBookById = async (id: number) => {
        const response = await Request.get<Book>(API_ENDPOINTS.GET_BOOK_BY_ID(id));
        return response;
    };

    const createBook = async (userData: Partial<Book>) => {
        const response = await Request.post<Book>(API_ENDPOINTS.CREATE_BOOK, userData);
        return response;
    };

    const updateBook = async (id: number, userData: Partial<Book>) => {
        const response = await Request.put<Book>(
            API_ENDPOINTS.UPDATE_BOOK(id),
            userData
        );
        return response;
    };

    const deleteBook = async (id: number) => {
        await Request.delete(API_ENDPOINTS.DELETE_BOOK(id));
    };

    return {
        getAllBooks: getAllBooks,
        getBookById: getBookById,
        createBook: createBook,
        updateBook: updateBook,
        deleteBook: deleteBook
    };
};
