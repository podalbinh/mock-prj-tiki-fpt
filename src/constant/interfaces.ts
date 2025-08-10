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

export interface SidebarCategory {
  id: number;
  name: string;
  thumbnailUrl?: string | null;
  parentId?: number | null;
  parentName?: string | null;
  subcategories?: SidebarCategory[] | null;
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

export interface Product {
  id: number;
  title: string;
  author: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  sold: number;
  thumbnailUrl: string;
  hasAd: boolean;
  hasTikiNow: boolean;
  isTopDeal: boolean;
  isFreeshipXtra: boolean;
  isAuthentic: boolean;
}

export interface ProductSearchResponse {
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalElements: number;
  last: boolean;
  sortBy: string;
  orderBy: string;
  content: Product[];
}

export interface CategoryWithThumbnail {
  id: number;
  name: string;
  thumbnailUrl?: string | null;
}