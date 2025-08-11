'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRightIcon, CalendarIcon, UserIcon } from '@heroicons/react/24/outline';
import { Article } from '@/shared/types';
import { Button } from '@/components/ui/Button';
import { Loading } from '@/components/ui/Loading';
import { ROUTES } from '@/lib/constants';
import { formatDate } from '@/lib/utils';
import api from '@/lib/api';

export const NewsSection: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLatestArticles = async () => {
      try {
        const response = await api.get<{ success: boolean; data: Article[] }>('/articles/latest?limit=3');
        setArticles(response.data.data);
      } catch (error) {
        console.error('Failed to fetch latest articles:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLatestArticles();
  }, []);

  if (isLoading) {
    return (
      <section className="section-padding bg-gray-50">
        <div className="container">
          <Loading text="加载新闻中..." />
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding bg-gray-50">
      <div className="container">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            最新<span className="text-gradient">动态</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            了解我们的最新发展动态、技术创新和行业资讯
          </p>
        </motion.div>

        {/* Articles grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {articles.map((article, index) => (
            <motion.article
              key={article._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="card card-hover"
            >
              {/* Article image */}
              <div className="h-48 bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                {article.featuredImage ? (
                  <img 
                    src={article.featuredImage} 
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-primary-400 text-center">
                    <div className="w-16 h-16 bg-primary-300 rounded-lg mx-auto mb-2 flex items-center justify-center">
                      <span className="text-2xl">📰</span>
                    </div>
                    <span className="text-sm">新闻图片</span>
                  </div>
                )}
              </div>
              
              <div className="p-6">
                {/* Category and date */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-primary-600 font-medium bg-primary-50 px-2 py-1 rounded">
                    {article.category}
                  </span>
                  <div className="flex items-center text-sm text-gray-500">
                    <CalendarIcon className="h-4 w-4 mr-1" />
                    {formatDate(article.publishedAt || article.createdAt)}
                  </div>
                </div>
                
                {/* Title */}
                <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                  {article.title}
                </h3>
                
                {/* Excerpt */}
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {article.excerpt}
                </p>
                
                {/* Author and read more */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <UserIcon className="h-4 w-4 mr-1" />
                    {article.author}
                  </div>
                  <Link href={`${ROUTES.ARTICLES}/${article._id}`}>
                    <Button variant="ghost" size="sm">
                      阅读更多
                      <ArrowRightIcon className="ml-1 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* View all articles button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link href={ROUTES.ARTICLES}>
            <Button size="lg">
              查看全部动态
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};