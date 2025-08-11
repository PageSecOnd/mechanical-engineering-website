import React from 'react';
import Link from 'next/link';
import { ROUTES } from '@/lib/constants';
import { 
  PhoneIcon, 
  EnvelopeIcon, 
  MapPinIcon,
  ChatBubbleBottomCenterTextIcon
} from '@heroicons/react/24/outline';

const footerLinks = {
  company: [
    { name: '关于我们', href: ROUTES.ABOUT },
    { name: '企业文化', href: '/about#culture' },
    { name: '发展历程', href: '/about#history' },
    { name: '资质荣誉', href: '/about#honors' },
  ],
  products: [
    { name: '机械设备', href: `${ROUTES.PRODUCTS}?category=机械设备` },
    { name: '零部件', href: `${ROUTES.PRODUCTS}?category=零部件` },
    { name: '工程服务', href: `${ROUTES.PRODUCTS}?category=工程服务` },
    { name: '技术支持', href: '/support' },
  ],
  news: [
    { name: '公司新闻', href: `${ROUTES.ARTICLES}?category=公司新闻` },
    { name: '行业动态', href: `${ROUTES.ARTICLES}?category=行业动态` },
    { name: '技术文章', href: `${ROUTES.ARTICLES}?category=技术文章` },
  ],
  support: [
    { name: '联系我们', href: ROUTES.CONTACT },
    { name: '在线留言', href: `${ROUTES.CONTACT}#form` },
    { name: '技术支持', href: '/support' },
    { name: '售后服务', href: '/after-sales' },
  ],
};

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-10 w-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">ME</span>
              </div>
              <div>
                <div className="text-xl font-bold">机械工程有限公司</div>
                <div className="text-sm text-gray-400">Mechanical Engineering Co., Ltd.</div>
              </div>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              专业的机械工程服务提供商，致力于为客户提供高质量的机械设备和解决方案。
              拥有20年行业经验，服务客户遍布全国。
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPinIcon className="h-5 w-5 text-primary-400" />
                <span className="text-gray-300">北京市海淀区中关村科技园区创新大厦18层</span>
              </div>
              <div className="flex items-center space-x-3">
                <PhoneIcon className="h-5 w-5 text-primary-400" />
                <span className="text-gray-300">+86 400-123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <EnvelopeIcon className="h-5 w-5 text-primary-400" />
                <span className="text-gray-300">contact@mechanical-eng.com</span>
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">公司信息</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">产品服务</h3>
            <ul className="space-y-2">
              {footerLinks.products.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">客户服务</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 机械工程有限公司. 保留所有权利.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                隐私政策
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                服务条款
              </Link>
              <Link href="/sitemap" className="text-gray-400 hover:text-white text-sm transition-colors">
                网站地图
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};