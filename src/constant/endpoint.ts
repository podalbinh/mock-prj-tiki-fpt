export const API_ENDPOINTS = {
  // Authentication API endpoints
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  ME: "/auth/me",

  // User API endpoints
  USERS: "/users",
  USER_BY_ID: (id: number) => `/users/${id}`,

  // Book API endpoints
  GET_BOOKS: "/products",
  GET_BOOK_BY_ID: (id: number) => `/products/${id}`,
  CREATE_BOOK: "/products",
  UPDATE_BOOK: (id: number) => `/products/${id}`,
  DELETE_BOOK: (id: number) => `/products/${id}`,

  // Product API endpoints
  GET_PRODUCTS: "/products",
  GET_PRODUCT_BY_ID: (id: number) => `/products/${id}`,
  CREATE_PRODUCT: "/products",
  UPDATE_PRODUCT: (id: number) => `/products/${id}`,
  DELETE_PRODUCT: (id: number) => `/products/${id}`,

  // Category API endpoints
  GET_CATEGORIES: "/categories",
  CREATE_CATEGORY: "/categories",
  UPDATE_CATEGORY: (id: number) => `/categories/${id}`,
  DELETE_CATEGORY: (id: number) => `/categories/${id}`,

  // Order API endpoints
  ORDERS: "/orders",

  // Image upload endpoint
  UPLOAD_IMAGE: "images/upload",
  DELETE_IMAGE: (fileId: string) => `images/delete/${fileId}`,
};

export const PUBLIC_API_ENDPOINTS = [
  API_ENDPOINTS.GET_BOOKS,
  API_ENDPOINTS.GET_CATEGORIES,
  API_ENDPOINTS.GET_PRODUCTS,
  API_ENDPOINTS.LOGIN,
  API_ENDPOINTS.REGISTER,
];
