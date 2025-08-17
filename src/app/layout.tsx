import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '机械工程有限公司 - 专业机械设备制造商',
  description: '专业从事机械设备设计、制造和销售的现代化企业，致力于为客户提供优质的产品和服务。',
  keywords: '机械工程, 机械设备, 制造业, 工业设备',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}