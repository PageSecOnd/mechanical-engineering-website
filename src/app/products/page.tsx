'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/outline'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import Link from 'next/link'
import type { ProductWithRelations, PaginatedResponse } from '@/types'

export default function ProductsPage() {
  const [products, setProducts] = useState<ProductWithRelations[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [page, setPage] = useState(1)
  const [pagination, setPagination] = useState<any>({})

  useEffect(() => {
    fetchProducts()
  }, [search, category, page])

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '12',
        ...(search && { search }),
        ...(category && { category }),
      })

      const response = await fetch(`/api/products?${params}`)
      const data: PaginatedResponse<ProductWithRelations> = await response.json()
      
      setProducts(data.data)
      setPagination(data.pagination)
    } catch (error) {
      console.error('获取产品失败:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setPage(1)
    fetchProducts()
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
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">产品中心</h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              专业的机械设备，为您的生产提供强有力的支持
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
                  placeholder="搜索产品..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button type="submit">搜索</Button>
            </form>
            
            <div className="flex gap-2 items-center">
              <FunnelIcon className="h-5 w-5 text-gray-500" />
              <select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value)
                  setPage(1)
                }}
                className="rounded-md border border-gray-300 px-3 py-2 bg-white"
              >
                <option value="">所有分类</option>
                <option value="cnc-machines">数控机床</option>
                <option value="robots">工业机器人</option>
                <option value="hydraulic">液压设备</option>
                <option value="tools">机械工具</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="container">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 aspect-square rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : products.length > 0 ? (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {products.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="h-full hover:shadow-lg transition-shadow duration-300 group">
                      <div className="aspect-square bg-gray-100 relative overflow-hidden rounded-t-lg">
                        {product.images && product.images.length > 0 ? (
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
                            <span className="text-white text-4xl">⚙️</span>
                          </div>
                        )}
                        {product.featured && (
                          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
                            推荐
                          </div>
                        )}
                      </div>
                      <CardHeader>
                        <CardTitle className="text-lg leading-tight">
                          {product.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 mb-4 line-clamp-2">
                          {product.description}
                        </p>
                        <div className="flex justify-between items-center">
                          {product.price && (
                            <span className="text-xl font-semibold text-primary-600">
                              ¥{product.price.toLocaleString()}
                            </span>
                          )}
                          <Link href={`/products/${product.slug}`}>
                            <Button size="sm">查看详情</Button>
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
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                没有找到相关产品
              </h3>
              <p className="text-gray-600">
                请尝试其他搜索条件或浏览所有产品
              </p>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}