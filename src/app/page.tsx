'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRightIcon, CheckIcon } from '@heroicons/react/24/outline'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative gradient-bg text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative container py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                专业机械工程
                <span className="block text-blue-200">解决方案</span>
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                我们专注于为客户提供高质量的机械设备和工程服务，
                拥有20年的行业经验和专业的技术团队。
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/products">
                  <Button size="lg" className="bg-white text-primary-600 hover:bg-gray-100">
                    查看产品
                    <ArrowRightIcon className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary-600">
                    联系我们
                  </Button>
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-square bg-white/10 rounded-2xl backdrop-blur-sm p-8">
                <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center">
                  <span className="text-6xl">⚙️</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              为什么选择我们
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              我们拥有专业的技术团队和丰富的行业经验，为客户提供全方位的机械工程解决方案
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: '专业技术',
                description: '拥有20年的行业经验和专业的工程师团队',
                icon: '🔧',
              },
              {
                title: '质量保证',
                description: 'ISO9001质量管理体系认证，确保产品质量',
                icon: '✅',
              },
              {
                title: '售后服务',
                description: '24/7技术支持和完善的售后服务体系',
                icon: '🛠️',
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardHeader className="text-center">
                    <div className="text-4xl mb-4">{feature.icon}</div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-center">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-24">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              主要产品
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              我们提供各种类型的机械设备，满足不同行业的需求
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: '数控机床',
                description: '高精度数控加工设备，适用于各种金属加工',
                image: '/images/cnc-machine.jpg',
                price: '¥850,000',
              },
              {
                name: '工业机器人',
                description: '智能化工业机器人，提高生产效率',
                image: '/images/robot.jpg',
                price: '¥320,000',
              },
              {
                name: '液压设备',
                description: '高性能液压系统，稳定可靠',
                image: '/images/hydraulic.jpg',
                price: '¥180,000',
              },
            ].map((product, index) => (
              <motion.div
                key={product.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="aspect-video bg-gray-200 relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
                      <span className="text-white text-4xl">📱</span>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{product.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-semibold text-primary-600">
                        {product.price}
                      </span>
                      <Button size="sm">查看详情</Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center mt-12"
          >
            <Link href="/products">
              <Button size="lg">
                查看所有产品
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-24 bg-gray-50">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              最新资讯
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              了解行业动态和公司最新消息
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: '智能制造技术发展趋势',
                excerpt: '探讨当前智能制造技术的发展趋势和未来展望...',
                date: '2024-01-15',
                category: '技术前沿',
              },
              {
                title: '公司获得ISO9001质量认证',
                excerpt: '我公司顺利通过ISO9001质量管理体系认证...',
                date: '2024-01-10',
                category: '公司新闻',
              },
              {
                title: '新产品发布会成功举办',
                excerpt: '我公司新一代数控机床产品发布会圆满成功...',
                date: '2024-01-05',
                category: '产品动态',
              },
            ].map((article, index) => (
              <motion.div
                key={article.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-sm text-primary-600 bg-primary-50 px-2 py-1 rounded">
                        {article.category}
                      </span>
                      <span className="text-sm text-gray-500">{article.date}</span>
                    </div>
                    <CardTitle className="text-lg leading-tight">
                      {article.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{article.excerpt}</p>
                    <Button variant="ghost" size="sm">
                      阅读更多
                      <ArrowRightIcon className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center mt-12"
          >
            <Link href="/news">
              <Button size="lg">
                查看所有资讯
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 gradient-bg text-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              准备开始您的项目？
            </h2>
            <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
              联系我们的专业团队，我们将为您提供最适合的机械工程解决方案
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="bg-white text-primary-600 hover:bg-gray-100">
                  立即咨询
                </Button>
              </Link>
              <Link href="/products">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary-600">
                  查看产品
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}