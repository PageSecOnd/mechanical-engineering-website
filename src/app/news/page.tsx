'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { MagnifyingGlassIcon, CalendarIcon, TagIcon } from '@heroicons/react/24/outline'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { formatDate } from '@/lib/utils'
import Link from 'next/link'
import type { ArticleWithRelations, PaginatedResponse } from '@/types'

export default function NewsPage() {
  const [articles, setArticles] = useState<ArticleWithRelations[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [page, setPage] = useState(1)
  const [pagination, setPagination] = useState<any>({})

  useEffect(() => {
    fetchArticles()
  }, [search, category, page])

  const fetchArticles = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '9',
        ...(search && { search }),
        ...(category && { category }),
      })

      const response = await fetch(`/api/articles?${params}`)
      const data: PaginatedResponse<ArticleWithRelations> = await response.json()
      
      setArticles(data.data)
      setPagination(data.pagination)
    } catch (error) {
      console.error('获取文章失败:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setPage(1)
    fetchArticles()
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="gradient-bg text-white py-16">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">新闻资讯</h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              了解行业动态，获取最新技术资讯和公司新闻
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-gray-50 border-b">
        <div className="container">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <form onSubmit={handleSearch} className="flex-1 flex gap-2">
              <div className="relative flex-1">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="搜索文章..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button type="submit">搜索</Button>
            </form>
            
            <div className="flex gap-2 items-center">
              <TagIcon className="h-5 w-5 text-gray-500" />
              <select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value)
                  setPage(1)
                }}
                className="rounded-md border border-gray-300 px-3 py-2 bg-white"
              >
                <option value="">所有分类</option>
                <option value="company-news">公司新闻</option>
                <option value="industry-news">行业动态</option>
                <option value="technical-articles">技术文章</option>
                <option value="product-updates">产品动态</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16">
        <div className="container">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 aspect-video rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                </div>
              ))}
            </div>
          ) : articles.length > 0 ? (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {articles.map((article, index) => (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="h-full hover:shadow-lg transition-shadow duration-300 group">
                      <div className="aspect-video bg-gray-100 relative overflow-hidden rounded-t-lg">
                        <div className="w-full h-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
                          <span className="text-white text-4xl">📰</span>
                        </div>
                        {article.featured && (
                          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
                            推荐
                          </div>
                        )}
                      </div>
                      
                      <CardHeader>
                        <div className="flex justify-between items-start mb-2">
                          {article.category && (
                            <span className="text-sm text-primary-600 bg-primary-50 px-2 py-1 rounded">
                              {article.category.name}
                            </span>
                          )}
                          <div className="flex items-center text-sm text-gray-500">
                            <CalendarIcon className="h-4 w-4 mr-1" />
                            {formatDate(article.createdAt)}
                          </div>
                        </div>
                        <CardTitle className="text-lg leading-tight group-hover:text-primary-600 transition-colors">
                          {article.title}
                        </CardTitle>
                      </CardHeader>
                      
                      <CardContent>
                        <p className="text-gray-600 mb-4 line-clamp-3">
                          {article.excerpt}
                        </p>
                        
                        {article.tags && article.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-4">
                            {article.tags.slice(0, 3).map((tagRelation) => (
                              <span
                                key={tagRelation.tag.id}
                                className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                              >
                                #{tagRelation.tag.name}
                              </span>
                            ))}
                          </div>
                        )}
                        
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-500">
                            by {article.author.name || article.author.email}
                          </span>
                          <Link href={`/news/${article.slug}`}>
                            <Button size="sm">阅读更多</Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="flex justify-center mt-12">
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      disabled={!pagination.hasPrev}
                      onClick={() => setPage(page - 1)}
                    >
                      上一页
                    </Button>
                    
                    {[...Array(pagination.totalPages)].map((_, i) => (
                      <Button
                        key={i + 1}
                        variant={page === i + 1 ? 'primary' : 'outline'}
                        onClick={() => setPage(i + 1)}
                      >
                        {i + 1}
                      </Button>
                    ))}
                    
                    <Button
                      variant="outline"
                      disabled={!pagination.hasNext}
                      onClick={() => setPage(page + 1)}
                    >
                      下一页
                    </Button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div className="text-6xl mb-4">📰</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                没有找到相关文章
              </h3>
              <p className="text-gray-600">
                请尝试其他搜索条件或浏览所有文章
              </p>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}