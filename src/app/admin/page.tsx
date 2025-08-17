'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  DocumentTextIcon,
  CubeIcon,
  UserGroupIcon,
  EyeIcon,
} from '@heroicons/react/24/outline'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'

interface DashboardStats {
  articles: number
  products: number
  users: number
  views: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    articles: 0,
    products: 0,
    users: 0,
    views: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      // 这里应该调用实际的API获取统计数据
      // 暂时使用模拟数据
      setTimeout(() => {
        setStats({
          articles: 25,
          products: 15,
          users: 3,
          views: 1250,
        })
        setLoading(false)
      }, 1000)
    } catch (error) {
      console.error('获取统计数据失败:', error)
      setLoading(false)
    }
  }

  const statCards = [
    {
      title: '文章总数',
      value: stats.articles,
      icon: DocumentTextIcon,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: '产品总数',
      value: stats.products,
      icon: CubeIcon,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: '用户总数',
      value: stats.users,
      icon: UserGroupIcon,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      title: '总浏览量',
      value: stats.views,
      icon: EyeIcon,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
  ]

  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">仪表板</h1>
        <p className="text-gray-600">欢迎来到管理后台，这里是系统概览</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className={`p-3 rounded-lg ${card.bgColor}`}>
                    <card.icon className={`h-6 w-6 ${card.color}`} />
                  </div>
                  <div className="ml-4 flex-1">
                    <p className="text-sm font-medium text-gray-600">{card.title}</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {loading ? (
                        <div className="h-8 w-16 bg-gray-200 rounded animate-pulse"></div>
                      ) : (
                        card.value.toLocaleString()
                      )}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>最近文章</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {loading ? (
                  [...Array(3)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  ))
                ) : (
                  [
                    { title: '智能制造技术发展趋势', date: '2024-01-15' },
                    { title: '公司获得ISO9001质量认证', date: '2024-01-10' },
                    { title: '2024年工业自动化技术发展报告', date: '2024-01-05' },
                  ].map((article, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                      <div>
                        <p className="font-medium text-gray-900">{article.title}</p>
                        <p className="text-sm text-gray-500">{article.date}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>最近产品</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {loading ? (
                  [...Array(3)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  ))
                ) : (
                  [
                    { name: 'CNC-5000 五轴数控加工中心', price: '¥850,000' },
                    { name: 'ROBOT-6000 六轴工业机器人', price: '¥320,000' },
                    { name: 'HYD-3000 液压成型设备', price: '¥180,000' },
                  ].map((product, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                      <div>
                        <p className="font-medium text-gray-900">{product.name}</p>
                        <p className="text-sm text-primary-600 font-semibold">{product.price}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-8"
      >
        <Card>
          <CardHeader>
            <CardTitle>快速操作</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="p-4 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <DocumentTextIcon className="h-8 w-8 text-blue-600 mb-2" />
                <h3 className="font-semibold text-gray-900">新建文章</h3>
                <p className="text-sm text-gray-600">创建新的文章内容</p>
              </button>
              <button className="p-4 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <CubeIcon className="h-8 w-8 text-green-600 mb-2" />
                <h3 className="font-semibold text-gray-900">添加产品</h3>
                <p className="text-sm text-gray-600">添加新的产品信息</p>
              </button>
              <button className="p-4 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <UserGroupIcon className="h-8 w-8 text-purple-600 mb-2" />
                <h3 className="font-semibold text-gray-900">用户管理</h3>
                <p className="text-sm text-gray-600">管理系统用户</p>
              </button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}