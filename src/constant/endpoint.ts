export const API_ENDPOINTS = {
  // Authentication API endpoints
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  ME: "/auth/me",

  // User API endpoints
  USERS: "/users",
  USER_BY_ID: (id: number) => `/users/${id}`,

  // Book API endpoints
  GET_BOOKS: "/books",
  GET_BOOK_BY_ID: (id: number) => `/books/${id}`,
  CREATE_BOOK: (id: number) => `/books/${id}`,
  UPDATE_BOOK: (id: number) => `/books/${id}`,
  DELETE_BOOK: (id: number) => `/books/${id}`,

  // Product API endpoints
  GET_PRODUCTS: "/products",
  GET_PRODUCT_BY_ID: (id: number) => `/products/${id}`,
  CREATE_PRODUCT: "/products",
  UPDATE_PRODUCT: (id: number) => `/products/${id}`,
  DELETE_PRODUCT: (id: number) => `/products/${id}`,
  SEARCH_PRODUCTS: "/products/search",
  GET_PRODUCTS_BY_CATEGORY: (categoryId: number) => `/products/category/${categoryId}`,

  // Category API endpoints
  GET_CATEGORIES: "/categories",
  CREATE_CATEGORY: "/categories",
  UPDATE_CATEGORY: (id: number) => `/categories/${id}`,
  DELETE_CATEGORY: (id: number) => `/categories/${id}`,
  GET_CATEGORY_WITH_THUMBNAIL: "categories/root-with-thumbnail",
  // Order API endpoints
  ORDERS: "/orders",
  GET_BOOK_FEATURED_COLLECTIONS: "/featured-collections",
};

export const PUBLIC_API_ENDPOINTS = [
  API_ENDPOINTS.GET_BOOKS,
  API_ENDPOINTS.GET_CATEGORIES,
  API_ENDPOINTS.GET_PRODUCTS,
  API_ENDPOINTS.SEARCH_PRODUCTS,
  API_ENDPOINTS.LOGIN,
  API_ENDPOINTS.REGISTER,
  API_ENDPOINTS.GET_BOOK_FEATURED_COLLECTIONS,
  API_ENDPOINTS.GET_CATEGORY_WITH_THUMBNAIL,
  API_ENDPOINTS.GET_PRODUCTS_BY_CATEGORY
];
