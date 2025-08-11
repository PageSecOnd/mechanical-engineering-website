export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const SITE_CONFIG = {
  name: '机械工程有限公司',
  description: '专业的机械工程服务提供商',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  keywords: ['机械工程', '制造业', '数控机床', '精密加工'],
};

export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  PRODUCTS: '/products',
  ARTICLES: '/articles',
  CONTACT: '/contact',
  ADMIN: '/admin',
  LOGIN: '/admin/login',
} as const;