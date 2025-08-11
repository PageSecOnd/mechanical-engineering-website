import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: '机械工程有限公司 - 专业机械工程服务提供商',
  description: '专业的机械工程服务提供商，提供CNC数控机床、精密轴承、设备维护等优质产品和服务。',
  keywords: ['机械工程', 'CNC数控', '精密轴承', '设备维护', '制造业'],
  authors: [{ name: '机械工程有限公司' }],
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className="font-sans">
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}