export interface User {
  id: number;
  email: string;
  password: string;
  fullName?: string;
  phone?: string;
  avatar?: string | null;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  role: "ADMIN" | "USER";
}

export interface Author {
  id: number;
  name: string;
  slug: string;
}

export interface Category {
  id: number;
  name: string;
}

export interface QuantitySold {
  text: string;
  value: number;
}

export interface Book {
  id: number;
  name: string;
  authors: Author[];
  description: string;
  original_price: number;
  list_price: number;
  rating_average: number;
  short_description: string;
  categories: Category;
  quantity_sold: QuantitySold;
}

export interface Item {
  id: number;
  quantity: number;
  name: string;
  price: number;
}

export interface Order {
  id: number;
  shop: string;
  customer_name: string;
  products: Item[];
  total_price: number;
  status: string;
}
export interface RegisterRequest{
  email: string;
  password: string;
  confirmPassword: string;
}
