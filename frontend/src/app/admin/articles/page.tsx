'use client';

import React, { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Loading } from '@/components/ui/Loading';
import Link from 'next/link';
import api from '@/lib/api';
import { Article } from '@/shared/types';
import toast from 'react-hot-toast';
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all');

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const response = await api.get('/articles');
      setArticles(response.data.data.items || []);
    } catch (error) {
      console.error('Failed to fetch articles:', error);
      toast.error('获取文章列表失败');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('确定要删除这篇文章吗？此操作不可恢复。')) {
      return;
    }

    try {
      await api.delete(`/articles/${id}`);
      toast.success('文章删除成功');
      await fetchArticles();
    } catch (error) {
      console.error('Failed to delete article:', error);
      toast.error('删除文章失败');
    }
  };

  const togglePublished = async (article: Article) => {
    try {
      await api.put(`/articles/${article._id}`, {
        ...article,
        published: !article.published,
      });
      toast.success(`文章已${article.published ? '设为草稿' : '发布'}`);
      await fetchArticles();
    } catch (error) {
      console.error('Failed to update article:', error);
      toast.error('更新文章状态失败');
    }
  };

  const filteredArticles = articles.filter((article) => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === 'published') return matchesSearch && article.published;
    if (filter === 'draft') return matchesSearch && !article.published;
    return matchesSearch;
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">文章管理</h1>
            <p className="mt-1 text-sm text-gray-500">
              管理和编辑您的文章内容
            </p>
          </div>
          <Link href="/admin/articles/create">
            <Button>
              <PlusIcon className="w-5 h-5 mr-2" />
              新建文章
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
                    placeholder="搜索文章标题、摘要或分类..."
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
                  全部 ({articles.length})
                </Button>
                <Button
                  variant={filter === 'published' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setFilter('published')}
                >
                  已发布 ({articles.filter(a => a.published).length})
                </Button>
                <Button
                  variant={filter === 'draft' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setFilter('draft')}
                >
                  草稿 ({articles.filter(a => !a.published).length})
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Articles List */}
        {loading ? (
          <div className="flex justify-center py-12">
            <Loading />
          </div>
        ) : (
          <div className="bg-white shadow rounded-lg overflow-hidden">
            {filteredArticles.length === 0 ? (
              <div className="text-center py-12">
                <div className="mx-auto h-12 w-12 text-gray-400">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="mt-2 text-sm font-medium text-gray-900">暂无文章</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {searchTerm ? '没有找到匹配的文章' : '开始创建您的第一篇文章吧'}
                </p>
                {!searchTerm && (
                  <div className="mt-6">
                    <Link href="/admin/articles/create">
                      <Button>
                        <PlusIcon className="w-5 h-5 mr-2" />
                        新建文章
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {filteredArticles.map((article) => (
                  <div key={article._id} className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-3">
                          <h3 className="text-lg font-medium text-gray-900 truncate">
                            {article.title}
                          </h3>
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              article.published
                                ? 'bg-green-100 text-green-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}
                          >
                            {article.published ? '已发布' : '草稿'}
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                          {article.excerpt}
                        </p>
                        <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                          <span>分类: {article.category}</span>
                          <span>作者: {article.author}</span>
                          <span>
                            创建: {new Date(article.createdAt).toLocaleDateString('zh-CN')}
                          </span>
                          {article.publishedAt && (
                            <span>
                              发布: {new Date(article.publishedAt).toLocaleDateString('zh-CN')}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => togglePublished(article)}
                        >
                          <EyeIcon className="w-4 h-4" />
                          {article.published ? '取消发布' : '发布'}
                        </Button>
                        <Link href={`/admin/articles/${article._id}/edit`}>
                          <Button variant="ghost" size="sm">
                            <PencilIcon className="w-4 h-4" />
                            编辑
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(article._id)}
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