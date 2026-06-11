export interface ProductVariant {
  id: string;
  name: string;
  price?: number;
  basePrice?: number;
  compareAtPrice?: number;
  weight?: string;
  packSize?: string;
  stock: number;
  isActive?: boolean;
  sortOrder?: number;
  productId?: string;
}

export interface ProductImage {
  id: string;
  url: string;
  alt?: string | null;
  isPrimary?: boolean;
  sortOrder?: number;
  productId?: string;
}

export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  image?: string | null;
  description?: string | null;
  parentId?: string | null;
  sortOrder?: number;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  shortDescription?: string | null;
  category?: ProductCategory | string;
  categorySlug?: string;
  categoryId?: string;
  price?: number;
  basePrice?: number | any;
  compareAtPrice?: number | any | null;
  images?: ProductImage[] | string[];
  rating?: number;
  reviewCount?: number;
  isBestSeller?: boolean;
  isNew?: boolean;
  isFeatured?: boolean;
  stock?: number;
  sku?: string;
  ingredients?: string | null;
  benefits?: string | null;
  storageInfo?: string | null;
  nutritionInfo?: Record<string, string>;
  variants?: ProductVariant[];
  videos?: any[];
  reviews?: any[];
  tags?: string[];
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  _count?: { reviews?: number };
}

export interface CartItem {
  productId: string;
  variantId?: string;
  name: string;
  slug: string;
  price: number;
  image: string;
  quantity: number;
  weight?: string;
}

export interface Category {
  name: string;
  slug: string;
  description: string;
  emoji: string;
  color: string;
  productCount?: number;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  verified: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  publishedAt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  comment: string;
  avatar?: string;
}
