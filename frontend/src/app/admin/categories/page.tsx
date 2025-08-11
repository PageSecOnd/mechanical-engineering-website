'use client';

import React, { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Loading } from '@/components/ui/Loading';
import api from '@/lib/api';
import { Category } from '@/shared/types';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  TagIcon,
  DocumentTextIcon,
  CubeIcon,
} from '@heroicons/react/24/outline';

const categorySchema = z.object({
  name: z.string().min(1, '分类名称不能为空'),
  description: z.string().optional(),
  type: z.enum(['article', 'product']),
  order: z.number().min(0),
});

type CategoryFormData = z.infer<typeof categorySchema>;

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [filter, setFilter] = useState<'all' | 'article' | 'product'>('all');

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      order: 0,
    },
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await api.get('/categories');
      setCategories(response.data.data.items || []);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
      toast.error('获取分类列表失败');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('确定要删除这个分类吗？此操作不可恢复。')) {
      return;
    }

    try {
      await api.delete(`/categories/${id}`);
      toast.success('分类删除成功');
      await fetchCategories();
    } catch (error) {
      console.error('Failed to delete category:', error);
      toast.error('删除分类失败');
    }
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setValue('name', category.name);
    setValue('description', category.description || '');
    setValue('type', category.type);
    setValue('order', category.order);
    setIsCreating(true);
  };

  const onSubmit = async (data: CategoryFormData) => {
    try {
      if (editingCategory) {
        await api.put(`/categories/${editingCategory._id}`, data);
        toast.success('分类更新成功');
      } else {
        await api.post('/categories', data);
        toast.success('分类创建成功');
      }
      reset();
      setIsCreating(false);
      setEditingCategory(null);
      await fetchCategories();
    } catch (error) {
      console.error('Failed to save category:', error);
      toast.error(editingCategory ? '更新分类失败' : '创建分类失败');
    }
  };

  const handleCancel = () => {
    reset();
    setIsCreating(false);
    setEditingCategory(null);
  };

  const filteredCategories = categories.filter((category) => {
    if (filter === 'all') return true;
    return category.type === filter;
  });

  const articleCategories = categories.filter(c => c.type === 'article');
  const productCategories = categories.filter(c => c.type === 'product');

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">分类管理</h1>
            <p className="mt-1 text-sm text-gray-500">
              管理文章和产品的分类组织
            </p>
          </div>
          {!isCreating && (
            <Button onClick={() => setIsCreating(true)}>
              <PlusIcon className="w-5 h-5 mr-2" />
              新建分类
            </Button>
          )}
        </div>

        {/* Create/Edit Form */}
        {isCreating && (
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {editingCategory ? '编辑分类' : '新建分类'}
              </h3>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Input
                    {...register('name')}
                    label="分类名称"
                    placeholder="请输入分类名称"
                    error={errors.name?.message}
                  />
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      分类类型
                    </label>
                    <select
                      {...register('type')}
                      className="form-select w-full"
                    >
                      <option value="article">文章分类</option>
                      <option value="product">产品分类</option>
                    </select>
                    {errors.type && (
                      <p className="text-sm text-red-600 mt-1">{errors.type.message}</p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Textarea
                    {...register('description')}
                    label="分类描述"
                    placeholder="请输入分类描述（可选）"
                    rows={3}
                    error={errors.description?.message}
                  />
                  <Input
                    {...register('order', { valueAsNumber: true })}
                    label="排序"
                    type="number"
                    placeholder="数字越小排序越靠前"
                    error={errors.order?.message}
                  />
                </div>
                <div className="flex justify-end space-x-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCancel}
                  >
                    取消
                  </Button>
                  <Button
                    type="submit"
                    isLoading={isSubmitting}
                  >
                    {editingCategory ? '更新' : '创建'}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex gap-2">
              <Button
                variant={filter === 'all' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setFilter('all')}
              >
                <TagIcon className="w-4 h-4 mr-1" />
                全部 ({categories.length})
              </Button>
              <Button
                variant={filter === 'article' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setFilter('article')}
              >
                <DocumentTextIcon className="w-4 h-4 mr-1" />
                文章分类 ({articleCategories.length})
              </Button>
              <Button
                variant={filter === 'product' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setFilter('product')}
              >
                <CubeIcon className="w-4 h-4 mr-1" />
                产品分类 ({productCategories.length})
              </Button>
            </div>
          </div>
        </div>

        {/* Categories List */}
        {loading ? (
          <div className="flex justify-center py-12">
            <Loading />
          </div>
        ) : (
          <div className="bg-white shadow rounded-lg overflow-hidden">
            {filteredCategories.length === 0 ? (
              <div className="text-center py-12">
                <div className="mx-auto h-12 w-12 text-gray-400">
                  <TagIcon className="h-12 w-12" />
                </div>
                <h3 className="mt-2 text-sm font-medium text-gray-900">暂无分类</h3>
                <p className="mt-1 text-sm text-gray-500">
                  开始创建您的第一个分类吧
                </p>
                <div className="mt-6">
                  <Button onClick={() => setIsCreating(true)}>
                    <PlusIcon className="w-5 h-5 mr-2" />
                    新建分类
                  </Button>
                </div>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {filteredCategories
                  .sort((a, b) => a.order - b.order)
                  .map((category) => (
                    <div key={category._id} className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0">
                              {category.type === 'article' ? (
                                <DocumentTextIcon className="h-6 w-6 text-blue-500" />
                              ) : (
                                <CubeIcon className="h-6 w-6 text-green-500" />
                              )}
                            </div>
                            <div>
                              <h3 className="text-lg font-medium text-gray-900">
                                {category.name}
                              </h3>
                              <div className="flex items-center space-x-4 text-sm text-gray-500">
                                <span
                                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                    category.type === 'article'
                                      ? 'bg-blue-100 text-blue-800'
                                      : 'bg-green-100 text-green-800'
                                  }`}
                                >
                                  {category.type === 'article' ? '文章分类' : '产品分类'}
                                </span>
                                <span>排序: {category.order}</span>
                                <span>
                                  创建: {new Date(category.createdAt).toLocaleDateString('zh-CN')}
                                </span>
                              </div>
                              {category.description && (
                                <p className="mt-1 text-sm text-gray-600">
                                  {category.description}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 ml-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(category)}
                          >
                            <PencilIcon className="w-4 h-4" />
                            编辑
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(category._id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <TrashIcon className="w-4 h-4" />
                            删除
                          </Button>
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