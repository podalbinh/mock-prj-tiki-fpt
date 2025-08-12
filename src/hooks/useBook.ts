import Request from "@/config/api";
import { API_ENDPOINTS } from "@/constant/endpoint";
import type { Book } from "@/constant/interfaces";

export const useBook = () => {
  const getAllBooks = async () => {
    return await Request.get<Book[]>(API_ENDPOINTS.BOOKS);
  };

    const getTopSellingBooks = async () => {
        const response = await Request.get<Book[]>(
            API_ENDPOINTS.BOOKS,
            { params: {
                _limit: 10,
                _sort: "quantitySold",
                _order: "desc"
            }}
    );
        return response.filter((book) => book.quantitySold !== undefined).slice(0, 10);
    }

    const getBookById = async (id: number) => {
        return await Request.get<Book>(API_ENDPOINTS.BOOK_BY_ID(id));
    };

    const createBook = async (bookData: Partial<Book>) => {
        console.log("create book: " + bookData);
        return await Request.post<Book>(API_ENDPOINTS.BOOKS, bookData);
    };

    const updateBook = async (id: number, bookData: Partial<Book>) => {
        console.log("update book: " + bookData);
        return await Request.put<Book>(
            API_ENDPOINTS.BOOK_BY_ID(id),
            bookData
        );
    };

    const deleteBook = async (id: number) => {
        await Request.delete(API_ENDPOINTS.BOOK_BY_ID(id));
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
