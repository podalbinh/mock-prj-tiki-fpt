export interface User {
  id: number;
  email: string;
  role: "admin" | "user";
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
  id: string;
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
