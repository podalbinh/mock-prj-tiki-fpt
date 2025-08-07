export const API_ENDPOINTS = {
  // Authentication API endpoints
  LOGIN: "/login",
  REGISTER: "/register",

  // User API endpoints
  USERS: "/users",
  USER_BY_ID: (id: number) => `/users/${id}`,

  // Book API endpoints
  GET_BOOKS: "/books",
  GET_BOOK_BY_ID: (id: number) => `/books/${id}`,
  CREATE_BOOK: "/books",
  UPDATE_BOOK: (id: number) => `/books/${id}`,
  DELETE_BOOK: (id: number) => `/books/${id}`,

  // Product API endpoints
  GET_PRODUCTS: "/products",
  GET_PRODUCT_BY_ID: (id: number) => `/products/${id}`,
  CREATE_PRODUCT: "/products",
  UPDATE_PRODUCT: (id: number) => `/products/${id}`,
  DELETE_PRODUCT: (id: number) => `/products/${id}`,

  // Category API endpoints
  GET_CATEGORIES: "/categories",
  CREATE_CATEGORY: "/categories",
};

export const PUBLIC_API_ENDPOINTS = [
  API_ENDPOINTS.GET_BOOKS,
  API_ENDPOINTS.GET_CATEGORIES,
  API_ENDPOINTS.GET_PRODUCTS,
  API_ENDPOINTS.LOGIN,
  API_ENDPOINTS.REGISTER,
];
