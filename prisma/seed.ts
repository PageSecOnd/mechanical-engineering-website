import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // 创建管理员用户
  const adminPassword = await bcrypt.hash('admin123456', 12)
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@mechanical-eng.com' },
    update: {},
    create: {
      email: 'admin@mechanical-eng.com',
      name: '管理员',
      password: adminPassword,
      role: 'ADMIN',
    },
  })

  // 创建分类
  const productCategories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'cnc-machines' },
      update: {},
      create: {
        name: '数控机床',
        slug: 'cnc-machines',
        description: '高精度数控加工设备',
        type: 'PRODUCT',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'robots' },
      update: {},
      create: {
        name: '工业机器人',
        slug: 'robots',
        description: '智能化工业机器人系统',
        type: 'PRODUCT',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'hydraulic' },
      update: {},
      create: {
        name: '液压设备',
        slug: 'hydraulic',
        description: '高性能液压系统设备',
        type: 'PRODUCT',
      },
    }),
  ])

  const articleCategories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'company-news' },
      update: {},
      create: {
        name: '公司新闻',
        slug: 'company-news',
        description: '公司最新动态和新闻',
        type: 'ARTICLE',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'industry-news' },
      update: {},
      create: {
        name: '行业动态',
        slug: 'industry-news',
        description: '机械工程行业最新动态',
        type: 'ARTICLE',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'technical-articles' },
      update: {},
      create: {
        name: '技术文章',
        slug: 'technical-articles',
        description: '技术分享和教程文章',
        type: 'ARTICLE',
      },
    }),
  ])

  // 创建标签
  const tags = await Promise.all([
    prisma.tag.upsert({
      where: { slug: 'automation' },
      update: {},
      create: { name: '自动化', slug: 'automation' },
    }),
    prisma.tag.upsert({
      where: { slug: 'manufacturing' },
      update: {},
      create: { name: '制造业', slug: 'manufacturing' },
    }),
    prisma.tag.upsert({
      where: { slug: 'technology' },
      update: {},
      create: { name: '技术', slug: 'technology' },
    }),
    prisma.tag.upsert({
      where: { slug: 'innovation' },
      update: {},
      create: { name: '创新', slug: 'innovation' },
    }),
  ])

  // 创建系统设置
  await Promise.all([
    prisma.setting.upsert({
      where: { key: 'site_title' },
      update: {},
      create: {
        key: 'site_title',
        value: '机械工程有限公司',
        type: 'TEXT',
      },
    }),
    prisma.setting.upsert({
      where: { key: 'site_description' },
      update: {},
      create: {
        key: 'site_description',
        value: '专业从事机械设备设计、制造和销售的现代化企业',
        type: 'TEXT',
      },
    }),
    prisma.setting.upsert({
      where: { key: 'contact_phone' },
      update: {},
      create: {
        key: 'contact_phone',
        value: '+86 123-4567-8900',
        type: 'TEXT',
      },
    }),
    prisma.setting.upsert({
      where: { key: 'contact_email' },
      update: {},
      create: {
        key: 'contact_email',
        value: 'info@mechanical-eng.com',
        type: 'TEXT',
      },
    }),
    prisma.setting.upsert({
      where: { key: 'contact_address' },
      update: {},
      create: {
        key: 'contact_address',
        value: '北京市朝阳区机械工业园区',
        type: 'TEXT',
      },
    }),
  ])

  console.log('数据库种子数据创建完成!')
  console.log('管理员账号: admin@mechanical-eng.com')
  console.log('管理员密码: admin123456')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })