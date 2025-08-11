'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  CogIcon, 
  ShieldCheckIcon, 
  UsersIcon, 
  ClockIcon 
} from '@heroicons/react/24/outline';

const features = [
  {
    icon: CogIcon,
    title: '精密制造',
    description: '采用先进的CNC数控技术，确保产品精度达到行业领先水平'
  },
  {
    icon: ShieldCheckIcon,
    title: '质量保证',
    description: '严格的质量控制体系，每道工序都经过专业检测认证'
  },
  {
    icon: UsersIcon,
    title: '专业团队',
    description: '20年行业经验的工程师团队，提供专业技术支持'
  },
  {
    icon: ClockIcon,
    title: '快速交付',
    description: '优化的生产流程，确保订单快速完成和及时交付'
  }
];

const stats = [
  { number: '20+', label: '年专业经验' },
  { number: '500+', label: '服务客户' },
  { number: '1000+', label: '成功项目' },
  { number: '99%', label: '客户满意度' }
];

export const AboutSection: React.FC = () => {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container">
        {/* Company intro */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            关于<span className="text-gradient">机械工程</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            我们是一家专业的机械工程服务提供商，致力于为客户提供高质量的机械设备和解决方案。
            凭借20年的行业经验和先进的技术，我们已经成为业界信赖的合作伙伴。
          </p>
        </motion.div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <feature.icon className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-lg p-8"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};