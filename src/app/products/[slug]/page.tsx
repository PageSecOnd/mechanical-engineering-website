'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeftIcon, StarIcon, ShoppingCartIcon } from '@heroicons/react/24/outline'
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import MarkdownRenderer from '@/components/markdown/MarkdownRenderer'
import Link from 'next/link'
import type { ProductWithRelations } from '@/types'

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const [product, setProduct] = useState<ProductWithRelations | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)

  useEffect(() => {
    fetchProduct()
  }, [params.slug])

  const fetchProduct = async () => {
    try {
      const response = await fetch(`/api/products/${params.slug}`)
      if (response.ok) {
        const data = await response.json()
        setProduct(data)
      }
    } catch (error) {
      console.error('获取产品详情失败:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container py-16">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="aspect-square bg-gray-200 rounded-lg"></div>
              <div className="space-y-4">
                <div className="h-8 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">产品不存在</h1>
          <Link href="/products">
            <Button>返回产品列表</Button>
          </Link>
        </div>
        <Footer />
      </div>
    )
  }

  const images = product.images && product.images.length > 0 ? product.images : ['/images/placeholder.jpg']

  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="container py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link href="/" className="hover:text-primary-600">首页</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-primary-600">产品中心</Link>
          <span>/</span>
          <span className="text-gray-900">{product.name}</span>
        </nav>

        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link href="/products">
            <Button variant="ghost" size="sm">
              <ArrowLeftIcon className="h-4 w-4 mr-2" />
              返回产品列表
            </Button>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="space-y-4">
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 transition-colors ${
                        selectedImage === index ? 'border-primary-500' : 'border-transparent'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>
              
              <div className="flex items-center space-x-4 mb-4">
                {product.category && (
                  <span className="bg-primary-50 text-primary-600 px-3 py-1 rounded-full text-sm font-medium">
                    {product.category.name}
                  </span>
                )}
                {product.featured && (
                  <span className="bg-red-50 text-red-600 px-3 py-1 rounded-full text-sm font-medium">
                    推荐产品
                  </span>
                )}
              </div>

              <div className="flex items-center space-x-2 mb-6">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <StarIconSolid key={i} className="h-5 w-5" />
                  ))}
                </div>
                <span className="text-gray-600 text-sm">(128 评价)</span>
              </div>

              {product.price && (
                <div className="mb-6">
                  <span className="text-3xl font-bold text-primary-600">
                    ¥{product.price.toLocaleString()}
                  </span>
                  <span className="text-gray-500 ml-2">起</span>
                </div>
              )}
            </div>

            <div className="prose prose-gray max-w-none">
              <p className="text-lg text-gray-700">{product.description}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="flex-1">
                <ShoppingCartIcon className="h-5 w-5 mr-2" />
                立即询价
              </Button>
              <Button variant="outline" size="lg">
                收藏产品
              </Button>
            </div>

            {/* Quick Specs */}
            {product.specifications && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">产品规格</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {Object.entries(product.specifications as Record<string, any>).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-2 border-b border-gray-100 last:border-b-0">
                        <span className="text-gray-600">{key}:</span>
                        <span className="font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </div>

        {/* Product Details */}
        {product.content && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-16"
          >
            <div className="border-t border-gray-200 pt-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">产品详情</h2>
              <MarkdownRenderer content={product.content} />
            </div>
          </motion.div>
        )}

        {/* Related Products */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16"
        >
          <div className="border-t border-gray-200 pt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">相关产品</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* 这里可以添加相关产品的逻辑 */}
              {[1, 2, 3, 4].map((i) => (
                <Card key={i} className="hover:shadow-lg transition-shadow duration-300">
                  <div className="aspect-square bg-gray-100 rounded-t-lg"></div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2">相关产品 {i}</h3>
                    <p className="text-gray-600 text-sm mb-4">产品描述...</p>
                    <Button size="sm" variant="outline" className="w-full">
                      查看详情
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  )
}