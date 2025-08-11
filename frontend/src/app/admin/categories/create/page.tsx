'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import api from '@/lib/api';
import toast from 'react-hot-toast';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

const categorySchema = z.object({
  name: z.string().min(1, '分类名称不能为空'),
  description: z.string().optional(),
  type: z.enum(['article', 'product']),
  order: z.number().min(0),
});

type CategoryFormData = z.infer<typeof categorySchema>;

export default function CreateCategoryPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      order: 0,
    },
  });

  const onSubmit = async (data: CategoryFormData) => {
    try {
      await api.post('/categories', data);
      toast.success('分类创建成功');
      router.push('/admin/categories');
    } catch (error) {
      console.error('Failed to create category:', error);
      toast.error('创建分类失败');
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/admin/categories">
              <Button variant="ghost" size="sm">
                <ArrowLeftIcon className="w-5 h-5 mr-2" />
                返回分类列表
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">创建分类</h1>
              <p className="mt-1 text-sm text-gray-500">
                创建新的文章或产品分类
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">分类信息</h3>
              <div className="space-y-4">
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
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex justify-end space-x-3">
                <Link href="/admin/categories">
                  <Button variant="outline">
                    取消
                  </Button>
                </Link>
                <Button
                  type="submit"
                  isLoading={isSubmitting}
                  disabled={isSubmitting}
                >
                  创建分类
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}