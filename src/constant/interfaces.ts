export interface User {
  id: number;
  email: string;
  password: string;
  fullName?: string;
  phone?: string;
  avatarUrl?: string | null;
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
  parent: Category | null;
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

export interface ImageBook {
  baseUrl: string;
  isGallery: boolean;
  label: string;
  largeUrl: string;
  mediumUrl: string;
  smallUrl: string;
  thumbnailUrl: string;
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
  images: ImageBook[];
  originalPrice: number;
  listPrice: number;
  ratingAverage: number;
  shortDescription: string;
  publisherVn: string;
  publicationDate: string;
  dimensions: string;
  dichGia: string;
  manufacturer: string;
  bookCover: string;
  numberOfPage: string;
  stockQuantity: number;
  isActive: boolean;
  categoriesId: number;
  quantitySold: number;
  thumbnailUrl: string;
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
export interface RegisterRequest {
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

export interface ImageUploadResponse {
  url: string;
  id: string;
  error?: string;
}

export interface ProductItem {
  id: number;
  url: string;
  discountPercent: number;
}

export interface FeaturedCollectionData {
  logo: string;
  title: string;
  sponsor: string;
  ratingText: string;
  listProduct: ProductItem[];
  rating: number;
}

export interface PageableParams {
  page?: number;
  size?: number;
  sort?: string;
  keyword?: string;
}
