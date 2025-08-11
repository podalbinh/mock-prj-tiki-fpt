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

export interface Image {
  base_url: string;
  is_gallery: boolean;
  label: string;
  large_url: string;
  medium_url: string;
  small_url: string;
  thumbnail_url: string;
}

export interface Attribute {
  code: string;
  name: string;
  values: string;
}

export interface Specification {
  name: string;
  attributes: Attribute[];
}

export interface Book {
  id: number;
  name: string;
  authors: Author[];
  description: string;
  images: Image[];
  original_price: number;
  list_price: number;
  rating_average: number;
  short_description: string;
  categories: Category;
  quantity_sold: QuantitySold;
  specifications: Specification[];
}

export interface Item {
  id: number;
  quantity: number;
  name: string;
  price: number;
}

export interface Order {
  id: number;
  customerName: string;
  products: Item[];
  totalPrice: number;
  status: string;
}
export interface RegisterRequest{
  email: string;
  password: string;
  confirmPassword: string;
}
