'use client';

import React, { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/Button';
import { Loading } from '@/components/ui/Loading';
import Link from 'next/link';
import api from '@/lib/api';
import {
  DocumentTextIcon,
  CubeIcon,
  TagIcon,
  EyeIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';

interface DashboardStats {
  articles: {
    total: number;
    published: number;
    draft: number;
  };
  products: {
    total: number;
    featured: number;
  };
  categories: {
    total: number;
    articleCategories: number;
    productCategories: number;
  };
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      
      // Fetch articles stats
      const articlesResponse = await api.get('/articles');
      const articles = articlesResponse.data.data.items || [];
      
      // Fetch products stats
      const productsResponse = await api.get('/products');
      const products = productsResponse.data.data.items || [];
      
      // Fetch categories stats
      const categoriesResponse = await api.get('/categories');
      const categories = categoriesResponse.data.data.items || [];

      setStats({
        articles: {
          total: articles.length,
          published: articles.filter((a: any) => a.published).length,
          draft: articles.filter((a: any) => !a.published).length,
        },
        products: {
          total: products.length,
          featured: products.filter((p: any) => p.featured).length,
        },
        categories: {
          total: categories.length,
          articleCategories: categories.filter((c: any) => c.type === 'article').length,
          productCategories: categories.filter((c: any) => c.type === 'product').length,
        },
      });
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statsCards = [
    {
      name: '文章管理',
      href: '/admin/articles',
      icon: DocumentTextIcon,
      stats: stats ? [
        { label: '总文章数', value: stats.articles.total },
        { label: '已发布', value: stats.articles.published },
        { label: '草稿', value: stats.articles.draft },
      ] : [],
      actions: [
        { label: '查看所有', href: '/admin/articles', icon: EyeIcon },
        { label: '新建文章', href: '/admin/articles/create', icon: PlusIcon },
      ],
    },
    {
      name: '产品管理',
      href: '/admin/products',
      icon: CubeIcon,
      stats: stats ? [
        { label: '总产品数', value: stats.products.total },
        { label: '推荐产品', value: stats.products.featured },
      ] : [],
      actions: [
        { label: '查看所有', href: '/admin/products', icon: EyeIcon },
        { label: '新建产品', href: '/admin/products/create', icon: PlusIcon },
      ],
    },
    {
      name: '分类管理',
      href: '/admin/categories',
      icon: TagIcon,
      stats: stats ? [
        { label: '总分类数', value: stats.categories.total },
        { label: '文章分类', value: stats.categories.articleCategories },
        { label: '产品分类', value: stats.categories.productCategories },
      ] : [],
      actions: [
        { label: '查看所有', href: '/admin/categories', icon: EyeIcon },
        { label: '新建分类', href: '/admin/categories/create', icon: PlusIcon },
      ],
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">仪表板</h1>
          <p className="mt-1 text-sm text-gray-500">
            欢迎使用管理后台，这里是您的系统概览
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <Loading />
          </div>
        ) : (
          <>
            {/* Stats cards */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {statsCards.map((card) => (
                <div
                  key={card.name}
                  className="bg-white overflow-hidden shadow rounded-lg"
                >
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <card.icon className="h-6 w-6 text-gray-400" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">
                            {card.name}
                          </dt>
                          <dd className="mt-1 space-y-1">
                            {card.stats.map((stat, index) => (
                              <div key={index} className="flex justify-between">
                                <span className="text-sm text-gray-600">{stat.label}</span>
                                <span className="text-sm font-medium text-gray-900">{stat.value}</span>
                              </div>
                            ))}
                          </dd>
                        </dl>
                      </div>
                    </div>
                    <div className="mt-4 flex space-x-2">
                      {card.actions.map((action, index) => (
                        <Link key={index} href={action.href}>
                          <Button
                            variant={index === 0 ? 'outline' : 'primary'}
                            size="sm"
                            className="flex items-center"
                          >
                            <action.icon className="w-4 h-4 mr-1" />
                            {action.label}
                          </Button>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick actions */}
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  快速操作
                </h3>
                <div className="mt-5">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <Link href="/admin/articles/create">
                      <Button className="w-full justify-center">
                        <DocumentTextIcon className="w-5 h-5 mr-2" />
                        新建文章
                      </Button>
                    </Link>
                    <Link href="/admin/products/create">
                      <Button className="w-full justify-center" variant="outline">
                        <CubeIcon className="w-5 h-5 mr-2" />
                        新建产品
                      </Button>
                    </Link>
                    <Link href="/admin/categories/create">
                      <Button className="w-full justify-center" variant="outline">
                        <TagIcon className="w-5 h-5 mr-2" />
                        新建分类
                      </Button>
                    </Link>
                    <Link href="/admin/settings">
                      <Button className="w-full justify-center" variant="outline">
                        网站设置
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
}