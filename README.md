# 机械工程企业网站

一个完整的机械工程企业网站，包含前台展示和后台管理系统。支持Markdown语法解析和现代化动画效果。

## 🚀 功能特性

### 前台功能
- **企业首页**：轮播图、核心业务展示、最新产品、企业资讯
- **产品中心**：产品分类、搜索、详情页面、图片画廊
- **新闻资讯**：文章列表、分类筛选、Markdown渲染、标签系统
- **企业介绍**：公司简介、发展历程、联系方式
- **响应式设计**：完美支持桌面端、平板、手机

### 后台管理
- **文章管理**：创建、编辑、删除文章，支持Markdown编辑器
- **产品管理**：产品信息管理、图片上传、规格参数
- **分类管理**：文章和产品分类管理
- **标签管理**：文章标签系统
- **用户管理**：用户权限控制
- **系统设置**：网站基本信息配置

### 技术亮点
- **Markdown支持**：完整的Markdown语法解析，包括代码高亮、表格、图片等
- **现代化动画**：基于Framer Motion的流畅过渡动画
- **SEO优化**：完善的SEO配置和结构化数据
- **类型安全**：完整的TypeScript类型定义
- **性能优化**：图片懒加载、代码分割、缓存策略

## 🛠️ 技术栈

### 前端
- **框架**: Next.js 14 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **动画**: Framer Motion
- **组件**: Headless UI + Heroicons
- **Markdown**: react-markdown + remark/rehype插件
- **状态管理**: Zustand
- **表单**: React Hook Form + Zod

### 后端
- **API**: Next.js API Routes
- **数据库**: SQLite (开发) / PostgreSQL (生产)
- **ORM**: Prisma
- **身份验证**: NextAuth.js
- **密码加密**: bcryptjs

## 📦 快速开始

### 环境要求
- Node.js 18+
- npm 或 yarn
- Git

### 安装步骤

1. **克隆项目**
```bash
git clone https://github.com/PageSecOnd/mechanical-engineering-website.git
cd mechanical-engineering-website
```

2. **安装依赖**
```bash
npm install
```

3. **环境配置**
```bash
cp .env.local.example .env.local
```

编辑 `.env.local` 文件，配置必要的环境变量：
```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"
```

4. **初始化数据库**
```bash
npx prisma db push
npm run db:seed
```

5. **启动开发服务器**
```bash
npm run dev
```

6. **访问应用**
- 前台: http://localhost:3000
- 后台: http://localhost:3000/admin
- 管理员账号: admin@mechanical-eng.com
- 管理员密码: admin123456

## 📁 项目结构

```
mechanical-engineering-website/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/            # 认证页面
│   │   ├── admin/             # 后台管理
│   │   ├── api/               # API路由
│   │   ├── products/          # 产品页面
│   │   ├── news/              # 新闻页面
│   │   └── about/             # 关于页面
│   ├── components/            # 可复用组件
│   │   ├── ui/                # 基础UI组件
│   │   ├── admin/             # 后台组件
│   │   ├── layout/            # 布局组件
│   │   └── markdown/          # Markdown组件
│   ├── lib/                   # 工具函数
│   │   ├── prisma.ts          # 数据库连接
│   │   ├── auth.ts            # 身份验证
│   │   ├── utils.ts           # 通用工具
│   │   └── markdown.ts        # Markdown处理
│   ├── types/                 # TypeScript类型
│   └── styles/                # 样式文件
├── prisma/                    # 数据库配置
│   ├── schema.prisma          # 数据库模式
│   └── seed.ts               # 种子数据
├── public/                    # 静态资源
└── docs/                      # 项目文档
```

## 🎨 设计系统

### 颜色主题
- **主色调**: 深蓝色 (#1e3a8a)
- **辅助色**: 蓝色 (#3b82f6)
- **背景色**: 白色、灰色系列
- **文字色**: 深灰色系列

### 组件库
项目包含完整的UI组件库：
- Button - 按钮组件
- Input - 输入框组件
- Card - 卡片组件
- Modal - 模态框组件
- Loading - 加载组件

### 动画效果
基于Framer Motion实现：
- 页面切换动画
- 元素进入/退出动画
- 悬停效果
- 滚动触发动画

## 📝 API文档

### 文章API
- `GET /api/articles` - 获取文章列表
- `POST /api/articles` - 创建文章
- `GET /api/articles/[id]` - 获取文章详情
- `PUT /api/articles/[id]` - 更新文章
- `DELETE /api/articles/[id]` - 删除文章

### 产品API
- `GET /api/products` - 获取产品列表
- `POST /api/products` - 创建产品
- `GET /api/products/[id]` - 获取产品详情
- `PUT /api/products/[id]` - 更新产品
- `DELETE /api/products/[id]` - 删除产品

## 🔒 权限系统

### 用户角色
- **ADMIN**: 管理员，拥有所有权限
- **USER**: 普通用户，只能查看内容

### 权限控制
- 后台管理需要管理员权限
- API接口有相应的权限验证
- 前台内容对所有用户开放

## 🚀 部署指南

### Vercel部署
1. 推送代码到GitHub
2. 在Vercel导入项目
3. 配置环境变量
4. 自动部署完成

### 其他平台
项目支持部署到任何支持Next.js的平台：
- Netlify
- Railway
- DigitalOcean App Platform

### 数据库配置
生产环境推荐使用PostgreSQL：
```env
DATABASE_URL="postgresql://username:password@localhost:5432/dbname"
```

## 📚 开发指南

### 添加新页面
1. 在 `src/app` 目录下创建新的路由文件
2. 使用现有的布局组件
3. 遵循项目的设计规范

### 创建新组件
1. 在 `src/components` 相应目录下创建组件
2. 使用TypeScript类型定义
3. 添加适当的动画效果

### 数据库修改
1. 修改 `prisma/schema.prisma`
2. 运行 `npx prisma db push`
3. 更新相关的TypeScript类型

## 🤝 贡献指南

1. Fork项目
2. 创建功能分支
3. 提交更改
4. 推送到分支
5. 创建Pull Request

## 📄 许可证

本项目采用MIT许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🆘 支持

如果您遇到任何问题或有建议，请：
- 创建GitHub Issue
- 发送邮件到: support@mechanical-eng.com
- 查看项目文档: [docs/](docs/)

## 🎯 路线图

- [ ] 多语言支持
- [ ] 在线客服系统
- [ ] 产品比较功能
- [ ] 高级搜索
- [ ] 数据分析面板
- [ ] 移动端App

---

**机械工程有限公司** - 专业的机械设备制造商