export interface User {
    _id: string;
    username: string;
    email: string;
    role: 'admin' | 'editor';
    createdAt: Date;
    updatedAt: Date;
}
export interface Article {
    _id: string;
    title: string;
    content: string;
    excerpt: string;
    author: string;
    category: string;
    tags: string[];
    featuredImage?: string;
    published: boolean;
    publishedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}
export interface Product {
    _id: string;
    name: string;
    description: string;
    category: string;
    images: string[];
    specifications: Record<string, string>;
    featured: boolean;
    order: number;
    createdAt: Date;
    updatedAt: Date;
}
export interface Category {
    _id: string;
    name: string;
    description?: string;
    type: 'article' | 'product';
    order: number;
    createdAt: Date;
    updatedAt: Date;
}
export interface SiteSettings {
    _id: string;
    companyName: string;
    companyDescription: string;
    contactEmail: string;
    contactPhone: string;
    contactAddress: string;
    seoTitle: string;
    seoDescription: string;
    seoKeywords: string[];
    carouselImages: {
        image: string;
        title: string;
        description: string;
        link?: string;
    }[];
    socialLinks: {
        platform: string;
        url: string;
    }[];
    updatedAt: Date;
}
export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    message?: string;
    error?: string;
}
export interface PaginationParams {
    page: number;
    limit: number;
}
export interface PaginatedResponse<T> {
    items: T[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        pages: number;
    };
}
export interface ContactForm {
    name: string;
    email: string;
    phone?: string;
    company?: string;
    subject: string;
    message: string;
}
export interface LoginCredentials {
    username: string;
    password: string;
}
export interface RegisterData {
    username: string;
    email: string;
    password: string;
}
export interface AuthResponse {
    user: User;
    token: string;
}
//# sourceMappingURL=types.d.ts.map