'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { ImageUpload } from '@/components/admin/ImageUpload';
import { Loading } from '@/components/ui/Loading';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import api from '@/lib/api';
import { Category } from '@/shared/types';
import toast from 'react-hot-toast';
import { ArrowLeftIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

const productSchema = z.object({
  name: z.string().min(1, '产品名称不能为空'),
  description: z.string().min(1, '产品描述不能为空'),
  category: z.string().min(1, '请选择产品分类'),
  images: z.array(z.string()).min(1, '至少需要上传一张产品图片'),
  specifications: z.array(z.object({
    key: z.string().min(1, '规格名称不能为空'),
    value: z.string().min(1, '规格值不能为空'),
  })),
  featured: z.boolean(),
  order: z.number().min(0),
});

type ProductFormData = z.infer<typeof productSchema>;

export default function CreateProductPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      featured: false,
      order: 0,
      images: [],
      specifications: [{ key: '', value: '' }],
    },
  });

  const {
    fields: specFields,
    append: appendSpec,
    remove: removeSpec,
  } = useFieldArray({
    control,
    name: 'specifications',
  });

  const images = watch('images') || [];

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await api.get('/categories');
      const allCategories = response.data.data.items || [];
      setCategories(allCategories.filter((cat: Category) => cat.type === 'product'));
    } catch (error) {
      console.error('Failed to fetch categories:', error);
      toast.error('获取分类列表失败');
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: ProductFormData) => {
    try {
      const productData = {
        ...data,
        specifications: data.specifications.reduce((acc, spec) => {
          if (spec.key && spec.value) {
            acc[spec.key] = spec.value;
          }
          return acc;
        }, {} as Record<string, string>),
      };

      await api.post('/products', productData);
      toast.success('产品创建成功');
      router.push('/admin/products');
    } catch (error) {
      console.error('Failed to create product:', error);
      toast.error('创建产品失败');
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center py-12">
          <Loading />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/admin/products">
              <Button variant="ghost" size="sm">
                <ArrowLeftIcon className="w-5 h-5 mr-2" />
                返回产品列表
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">创建产品</h1>
              <p className="mt-1 text-sm text-gray-500">
                添加新的产品信息
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Basic Info */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">基本信息</h3>
              <div className="space-y-4">
                <Input
                  {...register('name')}
                  label="产品名称"
                  placeholder="请输入产品名称"
                  error={errors.name?.message}
                />
                
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      产品分类
                    </label>
                    <select
                      {...register('category')}
                      className="form-select w-full"
                    >
                      <option value="">请选择分类</option>
                      {categories.map((category) => (
                        <option key={category._id} value={category.name}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                    {errors.category && (
                      <p className="text-sm text-red-600 mt-1">{errors.category.message}</p>
                    )}
                  </div>
                  
                  <Input
                    {...register('order', { valueAsNumber: true })}
                    label="排序"
                    type="number"
                    placeholder="数字越小排序越靠前"
                    error={errors.order?.message}
                  />
                </div>

                <Textarea
                  {...register('description')}
                  label="产品描述"
                  placeholder="请输入产品描述"
                  rows={4}
                  error={errors.description?.message}
                />

                <div className="flex items-center space-x-2">
                  <input
                    {...register('featured')}
                    type="checkbox"
                    id="featured"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="featured" className="text-sm font-medium text-gray-700">
                    设为推荐产品
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Images */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <ImageUpload
                label="产品图片"
                images={images}
                onChange={(newImages) => setValue('images', newImages)}
                maxImages={5}
                error={errors.images?.message}
              />
            </div>
          </div>

          {/* Specifications */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">产品规格</h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => appendSpec({ key: '', value: '' })}
                >
                  <PlusIcon className="w-4 h-4 mr-1" />
                  添加规格
                </Button>
              </div>
              
              <div className="space-y-3">
                {specFields.map((field, index) => (
                  <div key={field.id} className="flex items-center space-x-3">
                    <div className="flex-1">
                      <Input
                        {...register(`specifications.${index}.key`)}
                        placeholder="规格名称（如：尺寸、重量等）"
                        error={errors.specifications?.[index]?.key?.message}
                      />
                    </div>
                    <div className="flex-1">
                      <Input
                        {...register(`specifications.${index}.value`)}
                        placeholder="规格值（如：100mm x 50mm、2.5kg等）"
                        error={errors.specifications?.[index]?.value?.message}
                      />
                    </div>
                    {specFields.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeSpec(index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex justify-end space-x-3">
                <Link href="/admin/products">
                  <Button variant="outline">
                    取消
                  </Button>
                </Link>
                <Button
                  type="submit"
                  isLoading={isSubmitting}
                  disabled={isSubmitting}
                >
                  创建产品
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}