import { User, Article, Product, Category, Tag } from '@prisma/client'

export type UserWithRelations = User & {
  articles?: Article[]
  products?: Product[]
}

export type ArticleWithRelations = Article & {
  author: User
  category?: Category
  tags: {
    tag: Tag
  }[]
}

export type ProductWithRelations = Product & {
  author: User
  category?: Category
}

export type CategoryWithRelations = Category & {
  articles?: Article[]
  products?: Product[]
  _count?: {
    articles: number
    products: number
  }
}

export interface PaginationParams {
  page?: number
  limit?: number
  search?: string
  category?: string
  status?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

export interface SearchParams {
  [key: string]: string | string[] | undefined
}