import { connectDatabase } from '../config/database';
import { User } from '../models/User';
import { Category } from '../models/Category';
import { SiteSettings } from '../models/SiteSettings';
import { Article } from '../models/Article';
import { Product } from '../models/Product';
import { hashPassword } from '../utils/helpers';

const seedData = async () => {
  try {
    console.log('Connecting to database...');
    await connectDatabase();

    // Clear existing data
    console.log('Clearing existing data...');
    await Promise.all([
      User.deleteMany({}),
      Category.deleteMany({}),
      Article.deleteMany({}),
      Product.deleteMany({}),
      SiteSettings.deleteMany({})
    ]);

    // Create admin user
    console.log('Creating admin user...');
    const adminPassword = await hashPassword(process.env.ADMIN_PASSWORD || 'admin123456');
    const adminUser = new User({
      username: process.env.ADMIN_USERNAME || 'admin',
      email: process.env.ADMIN_EMAIL || 'admin@example.com',
      password: adminPassword,
      role: 'admin'
    });
    await adminUser.save();

    // Create categories
    console.log('Creating categories...');
    const articleCategories = await Category.insertMany([
      { name: '公司新闻', type: 'article', order: 1 },
      { name: '行业动态', type: 'article', order: 2 },
      { name: '技术文章', type: 'article', order: 3 }
    ]);

    const productCategories = await Category.insertMany([
      { name: '机械设备', type: 'product', order: 1 },
      { name: '零部件', type: 'product', order: 2 },
      { name: '工程服务', type: 'product', order: 3 }
    ]);

    // Create sample articles
    console.log('Creating sample articles...');
    const articles = await Article.insertMany([
      {
        title: '公司荣获"2024年度优秀机械工程企业"称号',
        content: '# 公司荣获殊荣\n\n我们公司在激烈的竞争中脱颖而出，荣获"2024年度优秀机械工程企业"称号。这是对我们在机械工程领域持续创新和卓越表现的认可。\n\n## 获奖原因\n\n1. 技术创新能力突出\n2. 产品质量优异\n3. 客户服务优质\n4. 社会责任担当\n\n我们将继续努力，为客户提供更优质的产品和服务。',
        excerpt: '我们公司荣获"2024年度优秀机械工程企业"称号，这是对我们在机械工程领域持续创新和卓越表现的认可。',
        author: '管理员',
        category: articleCategories[0].name,
        tags: ['公司新闻', '荣誉', '2024'],
        published: true,
        publishedAt: new Date()
      },
      {
        title: '新型智能制造设备正式投产',
        content: '# 智能制造新突破\n\n经过多月的研发和测试，我们的新型智能制造设备正式投入生产。该设备采用最先进的自动化技术，大幅提升了生产效率。\n\n## 设备特点\n\n- 高精度加工\n- 智能化控制\n- 节能环保\n- 操作简便\n\n这标志着我们在智能制造领域迈出了重要一步。',
        excerpt: '新型智能制造设备正式投产，采用最先进的自动化技术，大幅提升生产效率。',
        author: '技术部',
        category: articleCategories[2].name,
        tags: ['智能制造', '设备', '技术'],
        published: true,
        publishedAt: new Date(Date.now() - 86400000) // 1 day ago
      }
    ]);

    // Create sample products
    console.log('Creating sample products...');
    await Product.insertMany([
      {
        name: 'CNC数控机床',
        description: '高精度CNC数控机床，适用于各种金属加工需求。采用先进的数控技术，确保加工精度和效率。',
        category: productCategories[0].name,
        images: [],
        specifications: {
          '加工精度': '±0.01mm',
          '主轴转速': '0-8000rpm',
          '工作台尺寸': '800x400mm',
          '功率': '7.5kW'
        },
        featured: true,
        order: 1
      },
      {
        name: '精密轴承',
        description: '高品质精密轴承，适用于高速、高精度的机械设备。具有优异的耐磨性和使用寿命。',
        category: productCategories[1].name,
        images: [],
        specifications: {
          '内径': '10-200mm',
          '外径': '30-400mm',
          '精度等级': 'P4-P2',
          '材质': '轴承钢GCr15'
        },
        featured: true,
        order: 2
      },
      {
        name: '设备维护服务',
        description: '专业的机械设备维护服务，包括定期保养、故障诊断、零件更换等。确保设备正常运行。',
        category: productCategories[2].name,
        images: [],
        specifications: {
          '服务范围': '全国',
          '响应时间': '24小时内',
          '保修期': '12个月',
          '技术支持': '7x24小时'
        },
        featured: false,
        order: 3
      }
    ]);

    // Create site settings
    console.log('Creating site settings...');
    await SiteSettings.create({
      companyName: '机械工程有限公司',
      companyDescription: '专业的机械工程服务提供商，致力于为客户提供高质量的机械设备和解决方案。',
      contactEmail: 'contact@mechanical-eng.com',
      contactPhone: '+86 400-123-4567',
      contactAddress: '北京市海淀区中关村科技园区创新大厦18层',
      seoTitle: '机械工程有限公司 - 专业机械工程服务提供商',
      seoDescription: '专业的机械工程服务提供商，提供CNC数控机床、精密轴承、设备维护等优质产品和服务。',
      seoKeywords: ['机械工程', 'CNC数控', '精密轴承', '设备维护', '制造业'],
      carouselImages: [
        {
          image: '/api/placeholder/carousel/1',
          title: '专业机械工程服务',
          description: '20年专业经验，为您提供最优质的机械工程解决方案'
        },
        {
          image: '/api/placeholder/carousel/2',
          title: '智能制造技术',
          description: '引领行业技术革新，打造智能化生产线'
        },
        {
          image: '/api/placeholder/carousel/3',
          title: '全方位服务支持',
          description: '从设计到生产，从安装到维护，为您提供一站式服务'
        }
      ],
      socialLinks: [
        { platform: 'weixin', url: '#' },
        { platform: 'weibo', url: '#' },
        { platform: 'linkedin', url: '#' }
      ]
    });

    console.log('Seed data created successfully!');
    console.log('Admin user:', {
      username: adminUser.username,
      email: adminUser.email,
      password: process.env.ADMIN_PASSWORD || 'admin123456'
    });

    process.exit(0);
  } catch (error) {
    console.error('Seed data creation failed:', error);
    process.exit(1);
  }
};

// Run if this script is executed directly
if (require.main === module) {
  seedData();
}

export default seedData;