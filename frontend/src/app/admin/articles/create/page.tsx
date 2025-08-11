'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { MarkdownEditor } from '@/components/admin/MarkdownEditor';
import { Loading } from '@/components/ui/Loading';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuthStore } from '@/store/authStore';
import api from '@/lib/api';
import { Category } from '@/shared/types';
import toast from 'react-hot-toast';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

const articleSchema = z.object({
  title: z.string().min(1, '文章标题不能为空'),
  content: z.string().min(1, '文章内容不能为空'),
  excerpt: z.string().min(1, '文章摘要不能为空'),
  category: z.string().min(1, '请选择文章分类'),
  tags: z.string().optional(),
  featuredImage: z.string().optional(),
  published: z.boolean(),
});

type ArticleFormData = z.infer<typeof articleSchema>;

export default function CreateArticlePage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ArticleFormData>({
    resolver: zodResolver(articleSchema),
    defaultValues: {
      published: false,
    },
  });

  const content = watch('content') || '';

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await api.get('/categories');
      const allCategories = response.data.data.items || [];
      setCategories(allCategories.filter((cat: Category) => cat.type === 'article'));
    } catch (error) {
      console.error('Failed to fetch categories:', error);
      toast.error('获取分类列表失败');
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: ArticleFormData) => {
    try {
      const articleData = {
        ...data,
        author: user?.username || 'admin',
        tags: data.tags ? data.tags.split(',').map(tag => tag.trim()).filter(tag => tag) : [],
        publishedAt: data.published ? new Date() : undefined,
      };

      await api.post('/articles', articleData);
      toast.success('文章创建成功');
      router.push('/admin/articles');
    } catch (error) {
      console.error('Failed to create article:', error);
      toast.error('创建文章失败');
    }
  };

  const generateExcerpt = () => {
    const text = content
      .replace(/[#*`>\-\+]/g, '') // Remove markdown syntax
      .replace(/\n+/g, ' ') // Replace newlines with spaces
      .trim();
    
    const excerpt = text.substring(0, 200);
    setValue('excerpt', excerpt + (text.length > 200 ? '...' : ''));
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
            <Link href="/admin/articles">
              <Button variant="ghost" size="sm">
                <ArrowLeftIcon className="w-5 h-5 mr-2" />
                返回文章列表
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">创建文章</h1>
              <p className="mt-1 text-sm text-gray-500">
                编写并发布新的文章内容
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
                  {...register('title')}
                  label="文章标题"
                  placeholder="请输入文章标题"
                  error={errors.title?.message}
                />
                
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      文章分类
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
                    {...register('tags')}
                    label="标签"
                    placeholder="用逗号分隔多个标签"
                    helperText="例如：技术,教程,机械工程"
                  />
                </div>

                <Input
                  {...register('featuredImage')}
                  label="特色图片"
                  placeholder="请输入图片URL（可选）"
                  error={errors.featuredImage?.message}
                />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <MarkdownEditor
                label="文章内容"
                value={content}
                onChange={(value) => setValue('content', value)}
                placeholder="请输入文章内容，支持Markdown语法..."
                rows={15}
                error={errors.content?.message}
              />
            </div>
          </div>

          {/* Excerpt */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">文章摘要</h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={generateExcerpt}
                  disabled={!content}
                >
                  自动生成摘要
                </Button>
              </div>
              <Input
                {...register('excerpt')}
                placeholder="请输入文章摘要，用于在列表页展示"
                error={errors.excerpt?.message}
                helperText="建议字数在100-200字之间"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <input
                    {...register('published')}
                    type="checkbox"
                    id="published"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="published" className="text-sm font-medium text-gray-700">
                    立即发布
                  </label>
                </div>
                <div className="flex space-x-3">
                  <Link href="/admin/articles">
                    <Button variant="outline">
                      取消
                    </Button>
                  </Link>
                  <Button
                    type="submit"
                    isLoading={isSubmitting}
                    disabled={isSubmitting}
                  >
                    {watch('published') ? '发布文章' : '保存草稿'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}