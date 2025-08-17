'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  HomeIcon,
  DocumentTextIcon,
  CubeIcon,
  TagIcon,
  FolderIcon,
  CogIcon,
  UserGroupIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { Button } from '@/components/ui/Button'
import { signOut } from 'next-auth/react'

const navigation = [
  { name: '仪表板', href: '/admin', icon: HomeIcon },
  { name: '文章管理', href: '/admin/articles', icon: DocumentTextIcon },
  { name: '产品管理', href: '/admin/products', icon: CubeIcon },
  { name: '分类管理', href: '/admin/categories', icon: FolderIcon },
  { name: '标签管理', href: '/admin/tags', icon: TagIcon },
  { name: '用户管理', href: '/admin/users', icon: UserGroupIcon },
  { name: '系统设置', href: '/admin/settings', icon: CogIcon },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    if (status === 'loading') return

    if (!session || session.user.role !== 'ADMIN') {
      router.push('/auth/signin')
      return
    }
  }, [session, status, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!session || session.user.role !== 'ADMIN') {
    return null
  }

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      {/* Mobile sidebar */}
      <div className={`lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 flex z-40">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
          <motion.div
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            className="relative flex-1 flex flex-col max-w-xs w-full bg-white"
          >
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                onClick={() => setSidebarOpen(false)}
                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              >
                <XMarkIcon className="h-6 w-6 text-white" />
              </button>
            </div>
            <Sidebar />
          </motion.div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64">
          <Sidebar />
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        {/* Top bar */}
        <div className="lg:hidden">
          <div className="flex items-center justify-between bg-white px-4 py-2 border-b border-gray-200">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-gray-500 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
            <h1 className="text-lg font-semibold text-gray-900">管理后台</h1>
            <div></div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          {children}
        </main>
      </div>
    </div>
  )
}

function Sidebar() {
  const { data: session } = useSession()

  return (
    <div className="flex flex-col h-full bg-white border-r border-gray-200">
      {/* Logo */}
      <div className="flex items-center h-16 px-6 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 bg-primary-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">ME</span>
          </div>
          <span className="text-xl font-bold text-gray-900">管理后台</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="group flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-50 hover:text-primary-600 transition-colors"
          >
            <item.icon className="flex-shrink-0 -ml-1 mr-3 h-5 w-5" />
            <span className="truncate">{item.name}</span>
          </Link>
        ))}
      </nav>

      {/* User info */}
      <div className="flex-shrink-0 border-t border-gray-200 px-4 py-4">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="h-8 w-8 bg-primary-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">
                {session?.user.name?.[0] || session?.user.email[0]}
              </span>
            </div>
          </div>
          <div className="ml-3 flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {session?.user.name || session?.user.email}
            </p>
            <p className="text-xs text-gray-500 truncate">管理员</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => signOut()}
            className="ml-2"
          >
            <ArrowRightOnRectangleIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}