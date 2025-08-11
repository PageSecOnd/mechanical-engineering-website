'use client';

import React, { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Loading } from '@/components/ui/Loading';
import Link from 'next/link';
import api from '@/lib/api';
import { Product } from '@/shared/types';
import toast from 'react-hot-toast';
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  StarIcon,
  MagnifyingGlassIcon,
  PhotoIcon,
  CubeIcon,
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'featured' | 'normal'>('all');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await api.get('/products');
      setProducts(response.data.data.items || []);
    } catch (error) {
      console.error('Failed to fetch products:', error);
      toast.error('获取产品列表失败');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('确定要删除这个产品吗？此操作不可恢复。')) {
      return;
    }

    try {
      await api.delete(`/products/${id}`);
      toast.success('产品删除成功');
      await fetchProducts();
    } catch (error) {
      console.error('Failed to delete product:', error);
      toast.error('删除产品失败');
    }
  };

  const toggleFeatured = async (product: Product) => {
    try {
      await api.put(`/products/${product._id}`, {
        ...product,
        featured: !product.featured,
      });
      toast.success(`产品已${product.featured ? '取消推荐' : '设为推荐'}`);
      await fetchProducts();
    } catch (error) {
      console.error('Failed to update product:', error);
      toast.error('更新产品状态失败');
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === 'featured') return matchesSearch && product.featured;
    if (filter === 'normal') return matchesSearch && !product.featured;
    return matchesSearch;
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">产品管理</h1>
            <p className="mt-1 text-sm text-gray-500">
              管理和编辑您的产品信息
            </p>
          </div>
          <Link href="/admin/products/create">
            <Button>
              <PlusIcon className="w-5 h-5 mr-2" />
              新建产品
            </Button>
          </Link>
        </div>

        {/* Filters and Search */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="搜索产品名称、描述或分类..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant={filter === 'all' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setFilter('all')}
                >
                  全部 ({products.length})
                </Button>
                <Button
                  variant={filter === 'featured' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setFilter('featured')}
                >
                  推荐 ({products.filter(p => p.featured).length})
                </Button>
                <Button
                  variant={filter === 'normal' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setFilter('normal')}
                >
                  普通 ({products.filter(p => !p.featured).length})
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="flex justify-center py-12">
            <Loading />
          </div>
        ) : (
          <div className="bg-white shadow rounded-lg overflow-hidden">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <div className="mx-auto h-12 w-12 text-gray-400">
                  <CubeIcon className="h-12 w-12" />
                </div>
                <h3 className="mt-2 text-sm font-medium text-gray-900">暂无产品</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {searchTerm ? '没有找到匹配的产品' : '开始创建您的第一个产品吧'}
                </p>
                {!searchTerm && (
                  <div className="mt-6">
                    <Link href="/admin/products/create">
                      <Button>
                        <PlusIcon className="w-5 h-5 mr-2" />
                        新建产品
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 p-6">
                {filteredProducts.map((product) => (
                  <div key={product._id} className="group relative bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                    {/* Product Image */}
                    <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                      {product.images && product.images.length > 0 ? (
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-48 object-cover"
                        />
                      ) : (
                        <div className="w-full h-48 flex items-center justify-center">
                          <PhotoIcon className="h-12 w-12 text-gray-400" />
                        </div>
                      )}
                      {/* Featured badge */}
                      {product.featured && (
                        <div className="absolute top-2 right-2">
                          <StarIconSolid className="h-6 w-6 text-yellow-400" />
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-medium text-gray-900 truncate">
                            {product.name}
                          </h3>
                          <p className="mt-1 text-sm text-gray-500">
                            分类: {product.category}
                          </p>
                          <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                            {product.description}
                          </p>
                          <div className="mt-2 text-xs text-gray-400">
                            创建: {new Date(product.createdAt).toLocaleDateString('zh-CN')}
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="mt-4 flex items-center justify-between">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleFeatured(product)}
                          className="flex items-center"
                        >
                          {product.featured ? (
                            <StarIconSolid className="w-4 h-4 mr-1 text-yellow-400" />
                          ) : (
                            <StarIcon className="w-4 h-4 mr-1" />
                          )}
                          {product.featured ? '取消推荐' : '设为推荐'}
                        </Button>
                        <div className="flex items-center space-x-1">
                          <Link href={`/admin/products/${product._id}/edit`}>
                            <Button variant="ghost" size="sm">
                              <PencilIcon className="w-4 h-4" />
                            </Button>
                          </Link>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(product._id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <TrashIcon className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}