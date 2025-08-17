import Request from "@/config/api";
import { API_ENDPOINTS } from "@/constant/endpoint";
import type { Book } from "@/constant/interfaces";
import { useRef } from "react";

// Global cache outside of hook to persist across re-renders
const globalBookCache = new Map<number, Book>();

export const useBook = () => {
  const bookCache = useRef<Map<number, Book>>(globalBookCache);

  const getAllBooks = async () => {
    return await Request.get<Book[]>(API_ENDPOINTS.BOOKS);
  };

  const getTopSellingBooks = async () => {
    const response = await Request.get<Book[]>(API_ENDPOINTS.BOOKS, {
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
    // Check cache first
    if (bookCache.current.has(id)) {
      console.log(`useBook: Returning cached book for ID ${id}`);
      return bookCache.current.get(id)!;
    }

    // Fetch from API if not in cache
    console.log(`useBook: Fetching book for ID ${id}`);
    const book = await Request.get<Book>(API_ENDPOINTS.BOOK_BY_ID(id));
    
    // Cache the result
    bookCache.current.set(id, book);
    
    return book;
  };

  const createBook = async (bookData: Partial<Book>) => {
    const book = await Request.post<Book>(API_ENDPOINTS.BOOKS, bookData);
    // Clear cache when creating new book
    bookCache.current.clear();
    return book;
  };

  const updateBook = async (id: number, bookData: Partial<Book>) => {
    const book = await Request.put<Book>(API_ENDPOINTS.BOOK_BY_ID(id), bookData);
    // Update cache when updating book
    bookCache.current.set(id, book);
    return book;
  };

  const deleteBook = async (id: number) => {
    await Request.delete(API_ENDPOINTS.BOOK_BY_ID(id));
    // Remove from cache when deleting book
    bookCache.current.delete(id);
  };

  const getBookFeaturedCollections = () => Request.get<any>(API_ENDPOINTS.GET_BOOK_FEATURED_COLLECTIONS);

  // Clear cache method for manual cache management
  const clearCache = () => {
    bookCache.current.clear();
  };

  return {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook,
    getTopSellingBooks,
    getBookFeaturedCollections,
    clearCache
  };
};
