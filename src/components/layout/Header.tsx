'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { motion } from 'framer-motion'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Button } from '@/components/ui/Button'

const navigation = [
  { name: '首页', href: '/' },
  { name: '产品中心', href: '/products' },
  { name: '新闻资讯', href: '/news' },
  { name: '关于我们', href: '/about' },
  { name: '联系我们', href: '/contact' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { data: session } = useSession()

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex w-full items-center justify-between py-4">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">ME</span>
              </div>
              <span className="text-xl font-bold text-gray-900">机械工程</span>
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-primary-600 transition-colors duration-200 font-medium"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {session ? (
              <div className="flex items-center space-x-4">
                {session.user.role === 'ADMIN' && (
                  <Link href="/admin">
                    <Button variant="outline" size="sm">
                      管理后台
                    </Button>
                  </Link>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => signOut()}
                >
                  退出登录
                </Button>
              </div>
            ) : (
              <Link href="/auth/signin">
                <Button size="sm">登录</Button>
              </Link>
            )}
          </div>

          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        <motion.div
          initial={false}
          animate={{ height: mobileMenuOpen ? 'auto' : 0 }}
          className="md:hidden overflow-hidden"
        >
          <div className="space-y-1 pb-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-3 py-2 text-gray-700 hover:text-primary-600 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            {session ? (
              <div className="space-y-2 pt-4 border-t border-gray-200">
                {session.user.role === 'ADMIN' && (
                  <Link
                    href="/admin"
                    className="block px-3 py-2 text-primary-600 font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    管理后台
                  </Link>
                )}
                <button
                  onClick={() => {
                    signOut()
                    setMobileMenuOpen(false)
                  }}
                  className="block w-full text-left px-3 py-2 text-gray-700 font-medium"
                >
                  退出登录
                </button>
              </div>
            ) : (
              <div className="pt-4 border-t border-gray-200">
                <Link
                  href="/auth/signin"
                  className="block px-3 py-2 text-primary-600 font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  登录
                </Link>
              </div>
            )}
          </div>
        </motion.div>
      </nav>
    </header>
  )
}