import Request from "@/config/api";
import {API_ENDPOINTS} from "@/constant/endpoint";
import type {Book} from "@/constant/interfaces";

export const useBook = () => {
    const getAllBooks = async () => {
        return await Request.get<Book[]>(API_ENDPOINTS.GET_BOOKS);
    };

    const getTopSellingBooks = async () => {
        const response = await Request.get<Book[]>(
            API_ENDPOINTS.GET_BOOKS,
            { params: {
                // _limit: 10,
                _sort: "quantity_sold.value",
                _order: "desc"
            }}
    );
        return response.filter((book) => book.quantity_sold !== undefined).slice(0, 10);
    }

    const getBookById = async (id: number) => {
        return await Request.get<Book>(API_ENDPOINTS.GET_BOOK_BY_ID(id));
    };

    const createBook = async (bookData: Partial<Book>) => {
        return await Request.post<Book>(API_ENDPOINTS.CREATE_BOOK, bookData);
    };

    const updateBook = async (id: number, bookData: Partial<Book>) => {
        return await Request.put<Book>(
            API_ENDPOINTS.UPDATE_BOOK(id),
            bookData
        );
    };

    const deleteBook = async (id: number) => {
        await Request.delete(API_ENDPOINTS.DELETE_BOOK(id));
    };

    return {
        getAllBooks: getAllBooks,
        getBookById: getBookById,
        createBook: createBook,
        updateBook: updateBook,
        deleteBook: deleteBook,
        getTopSellingBooks: getTopSellingBooks,
    };
};
