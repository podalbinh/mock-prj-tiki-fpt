export const API_ENDPOINTS = {
  // Authentication API endpoints
  LOGIN: "/login",
  REGISTER: "/register",

  // User API endpoints
  GET_USERS: "/users",
  GET_USER_BY_ID: (id: string) => `/users/${id}`,
  UPDATE_USER: (id: string) => `/users/${id}`,
  DELETE_USER: (id: string) => `/users/${id}`,

  // Book API endpoints
  GET_BOOKS: "/books",
  GET_BOOK_BY_ID: (id: string) => `/books/${id}`,
  CREATE_BOOK: "/books",
  UPDATE_BOOK: (id: string) => `/books/${id}`,
  DELETE_BOOK: (id: string) => `/books/${id}`,

  // Product API endpoints
  GET_PRODUCTS: "/products",
  GET_PRODUCT_BY_ID: (id: string) => `/products/${id}`,
  CREATE_PRODUCT: "/products",
  UPDATE_PRODUCT: (id: string) => `/products/${id}`,
  DELETE_PRODUCT: (id: string) => `/products/${id}`,

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
