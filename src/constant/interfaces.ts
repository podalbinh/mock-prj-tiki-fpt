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
}

export interface QuantitySold {
  text: string;
  value: number;
}

export interface Image {
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
  sku: string;
  name: string;
  authors: Author[];
  description: string;
  images: Image[];
  originalPrice: number;
  listPrice: number;
  ratingAverage: number;
  shortDescription: string;
  publisherVn: string;
  publicationDate: string;
  dimensions: string;
  bookCover: string;
  numberOfPage: string;
  stockQuantity: number;
  isActive: boolean;
  categories: Category;
  quantitySold: QuantitySold;
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

export interface ImageUploadResponse {
  url: string;
  id: string;
  error?: string;
}
